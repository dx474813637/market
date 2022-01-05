<template>
	<view>
		<d-header></d-header>
		<view class="main u-flex u-row-center u-p-40">
			<view class="wrapper u-flex u-col-top">
				<view class="wrap-item menu">
					<d-menu :active="menuActive"></d-menu>
				</view>
				<view class="wrap-item content">
					<view class="content-header u-flex u-row-between u-border-bottom" id="cs">
						<view class="c-h-item u-flex">
							<view class="header-title">购物车</view>
						</view>
					</view>
					<div class="content-table-wrap" >
						<el-table ref="cartTable" :data="cart" tooltip-effect="dark" style="width: 100%"
							@selection-change="handleSelectionChange">
							<el-table-column type="selection" width="55">
							</el-table-column>
							<el-table-column label="商品信息">
								<template slot-scope="scope">
									<view class="p-card u-flex u-col-top">
										<el-link class="p-c-item item-img" :underline="false"
											href="https://www.baidu.com" target="_blank">
											<el-image class="p-img" fit="cover" :src="scope.row.pic1"></el-image>
										</el-link>
										<view class="p-c-item item-info">
											<el-link class="p-title u-line-1" :underline="false"
												href="https://www.baidu.com" target="_blank">{{scope.row.name}}
											</el-link>
											<view class="info-brand u-line-1">品牌：{{scope.row.brand}}</view>
											<view class="info-model u-line-1">规格型号：{{scope.row.model}}</view>
										</view>
									</view>
								</template>
							</el-table-column>
							<el-table-column label="单价" width="150" align="right">
								<template slot-scope="scope">
									<view>
										<template v-if="scope.row.price != '议价'">
											<text class="u-p-r-10">¥</text>
										</template>
										<template v-else>需</template>
										{{scope.row.price}}
										<text class="u-p-l-10">/ {{scope.row.unit}}</text>
									</view>
									<view class="ykj-label d-theme-color" v-if="scope.row.price != '议价' && scope.row.talk_price == 2">一口价</view>
									
								</template>
							</el-table-column>
							<el-table-column label="数量" width="180" align="center">
								<template slot-scope="scope">
									<el-input-number 
										size="mini" 
										:value="scope.row.num" 
										:precision="0" 
										:step="1" 
										:data-id="scope.row.id"
										step-strictly 
										@change="handleChangeNum"
										:min="1"
									></el-input-number>
								</template>
							</el-table-column>
							<el-table-column label="金额" width="120" align="right">
								<template slot-scope="scope">
									<view>
										<template v-if="scope.row.price == '议价'">需议价</template>
										<template v-else>
											<text class="u-p-r-10">¥</text>
											{{ scope.row.num * scope.row.price }}
										</template>
									</view>
									<view class="ykj-label d-theme-color" v-if="scope.row.price != '议价' && scope.row.talk_price == 2">一口价</view>
									
								</template>
							</el-table-column>
							<el-table-column label="操作" width="60" align="right">
								<template slot-scope="scope">
									<el-popconfirm placement="left" title="确认删除该商品？" class="u-p-0"
										@confirm="handleDelet(scope.row.id)">
										<el-button slot="reference" type="text" size="mini">删除</el-button>
									</el-popconfirm>
								</template>
							</el-table-column>
							<view slot="empty" class="empty-wrap" 	>
								<el-image fit="cover" class="empty-img" src="../../static/img/empty.png"></el-image>
								<view class="u-flex u-row-center">
									<text>购物车为空，</text>
									<el-link href="https://www.baidu.com" target="_blank" type="primary">去逛逛</el-link>
								</view>
							</view>
						</el-table>
					</div>
					<view class="content-tj-wrap fixed">
						<view class="tj-box u-flex u-row-between u-border-top" >
							<view class="item-left u-flex">
								<view class="item all-btn u-flex">
									<el-checkbox :disabled="cart.length == 0" :indeterminate="isIndeterminate" v-model="allChecked" @change="handleChangeAllChecked">全选</el-checkbox>
									<view class="u-p-l-40">已选择<text class="d-danger-color u-p-l-14 u-p-r-14">{{checkedGoodsNum}}</text>件商品</view>
								</view>
								<view class="item delet-btn u-flex">
									<el-button type="text" @click="handleDeletM">删除选中</el-button>
								</view>

							</view>
							<view class="item-right u-flex">
								<view class="item-price u-flex">
									<view class="price-sub u-p-r-10">总金额</view>
									<el-popover placement="top" width="200" trigger="hover">
										<i class="el-icon-question" slot="reference"></i>
										其中总金额不含运费
										<template v-if="checkedTalkGoodsNum>0">
											，且包含了<text class="d-danger-color">{{checkedTalkGoodsNum}}</text>件议价商品
										</template>
									</el-popover>
									<view class="price u-flex u-col-bottom">
										<text class="dw">¥</text>
										<u-count-to ref="uCountTo" :startVal="start" :endVal="end" :decimals="2" separator="," duration="600" color="#ed5656"></u-count-to>
										<text style="display: none;">{{checkedPrice}}</text>
									</view>
								</view>
								<view class="item-buy-btn u-flex u-row-center" @click="handleConfirmOrder">去结算</view>
							</view>
						</view>
					</view>

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState, mapMutations} from 'vuex' 
	export default {
		data() {
			return {
				menuActive: '2-2',
				multipleSelection: [],
				allChecked: false,
				start: 0,
				end: 0,
				otherCheckedId: []
			}
		},
		computed: {
			...mapState(['cart']),
			isIndeterminate() {
				
				if(this.multipleSelection.length == this.cart.length || this.multipleSelection.length == 0) {
					return false
				}else {
					return true
				}
			},
			checkedPrice() {
				this.start = this.end
				if(!this.multipleSelection || this.multipleSelection.length == 0) {
					this.end = 0
					return 0
				}
				let count = this.multipleSelection.reduce((total, item, index) => {
					if(item.price == '议价') {
						return total
					}else {
						return total += (item.price * item.num)
					}
				}, 0)
				this.end = count
				return count
			},
			checkedTalkGoodsNum() {
				if(!this.multipleSelection || this.multipleSelection.length == 0) return 0
				return this.multipleSelection.reduce((total, item, index) => {
					if(item.price == '议价') {
						return total += item.num
					}
					return total
				}, 0)
			},
			checkedGoodsNum() {
				if(!this.multipleSelection || this.multipleSelection.length == 0) return 0
				return this.multipleSelection.reduce((total, item, index) => {
					return total += item.num
				}, 0)
			},
		},
		watch: {
			end(n) {
				this.$refs.uCountTo.reStart();
			},
			multipleSelection(n) {
				let obj = {
					action: 'updateChecked',
					arr: n.map(ele => ele.id)
				}
				if(this.otherCheckedId && this.otherCheckedId.length > 0) {
					obj.arr = this.otherCheckedId
					this.toggleSelection(this.cart.filter(ele => ele.checked))
					this.otherCheckedId = []
				}
				this.updateCartList(obj)
			}
		},
		mounted() {
			this.toggleSelection(this.cart.filter(ele => ele.checked))
		},
		methods: {
			...mapMutations(['updateCartList']),
			handleChangeAllChecked(c) {
				this.$refs.cartTable.toggleAllSelection()
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
				if(this.multipleSelection.length == this.cart.length) {
					this.allChecked = true
				}else {
					this.allChecked = false
				}
			},
			toggleSelection(rows) {
				if (rows) {
					rows.forEach(row => {
						this.$refs.cartTable.toggleRowSelection(row);
					});
				} else {
					this.$refs.cartTable.clearSelection();
				}
			},
			handleDeletM() {
				this.$confirm(`确认删除当前选中的${this.checkedGoodsNum}件商品, 是否继续?`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.updateCartList({
						action: 'delete',
						idArr: this.multipleSelection.map(ele => ele.id),
					})
					this.$message({
						type: 'success',
						message: '删除成功!'
					}); 
				}).catch(() => {
					        
				});  
			},
			handleDelet(id) {
				this.otherCheckedId = this.cart.filter(item => item.id != id && item.checked).map(ele => ele.id)
				this.updateCartList({
					action: 'delete',
					idArr: [id],
				})
			},
			handleChangeNum(num, oldValue, tarVm) {
				if( num != oldValue) {
					this.updateCartList({
						action: 'updateNumber',
						id: tarVm.$attrs['data-id'],
						num,
					})
				}
				
			},
			handleConfirmOrder() {
				uni.navigateTo({
					url: "/pages/orderConfirm/orderConfirm"
				})
			}
		}
	}
</script>
<style scoped lang="scss">
	$p-img-w: 70px !default;

	.wrapper {
		width: 1300px;
		.empty-wrap {
			font-size: 16px;
			line-height: 30px;
			.empty-img {
				width: 200px;
				height: 200px;
				margin: 40px auto;
			}
			.el-link {
				font-size: 16px;
				line-height: 25px;
			}
		}
		.el-table::before {
			display: none;
		}
		.wrap-item {
			&.menu {
				width: 180px;
				flex: 0 0 180px
			}

			&.content {
				margin-left: 20px;
				width: calc(100% - 200px);
				flex: 0 0 calc(100% - 200px);
				background-color: #fff;
				padding-bottom: 80px;
				min-height: 90vh;

				.content-header {
					padding: 0 30px;

					.c-h-item {
						.header-title {
							font-size: 16px;
							color: #666;
							line-height: 60px;
							color: $theme-color;
							position: relative;

							&:after {
								content: "";
								position: absolute;
								bottom: 0;
								width: 100%;
								left: 0;
								height: 2px;
								background-color: $theme-color;
							}
						}
					}
				}

				.content-table-wrap {
					padding: 20px 30px 10px;
					min-height: 50vh;
					.ykj-label {
						display: inline-block;
						background-color: lighten($theme-color, 42%);
						border: 1px solid lighten($theme-color, 20%);
						border-radius: 3px;
						line-height: 1em;
						font-size: 12px;
						padding: 3px 10px;
					}
				}

				.content-tj-wrap {
					&.fixed {
						position: fixed;
						bottom: 0;
						left: 0;
						z-index: 200;
						width: 100%;
						.tj-box {
							background-color: #fff;
							width: 1100px;
							transform: translateX(100px);
							margin: 0 auto;
						}
					}
					.tj-box {
						height: 80px;
						margin-top: 60px;
						.item-left {
							height: 100%;
							font-size: 14px;
							line-height: 20px;
							padding-left: 30px;

							.item {
								height: 100%;
								padding: 0 14px;

								&.all-btn {}

								&.delet-btn {}
							}
						}

						.item-right {
							height: 100%;

							.item-price {
								// height: 100%;
								padding: 0 10px;

								.el-icon-question {
									color: #f90;
								}

								.price-sub {
									font-size: 14px;
								}

								.price {
									font-size: 28px;
									color: #ed2920;
									padding: 0px 15px .1em;
									
									.dw {
										font-size: 18px;
										padding-right: 5px;
										padding-bottom: 2px;
									}
								}
							}

							.item-buy-btn {
								background-color: #ed2920;
								color: #fff;
								width: 150px;
								height: 100%;
								font-size: 18px;
								cursor: pointer;
								transition: all .3s;
								&:hover {
									background-color: #d3221c;
								}
							}

						}
					}
				}

				.p-card {
					padding-right: 40px;

					.p-c-item {
						display: block;

						&.item-img {
							width: $p-img-w;
							height: $p-img-w;
							flex: 0 0 $p-img-w;

							.p-img {
								width: $p-img-w;
								height: $p-img-w;
								border-radius: 4px;
							}
						}

						&.item-info {
							width: calc(100% - #{$p-img-w});
							flex: 0 0 calc(100% - #{$p-img-w});
							padding-left: 10px;
							line-height: 20px;

							.p-title {
								font-size: 15px;
								padding-bottom: 8px;
								width: 100%;
								display: block;

							}

							.info-brand,
							.info-model {
								color: #999;
								font-size: 13px;
							}
						}
					}
				}
			}
		}
	}
</style>
