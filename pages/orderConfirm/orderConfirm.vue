<template>
	<view>
		<d-header></d-header>
		<view class="main u-flex u-row-center u-p-40">
			<view class="wrapper u-flex u-col-top">
				<view class="wrap-item menu">
					<d-menu :active="menuActive"></d-menu>
				</view>
				<view class="wrap-item content u-p-b-80 u-m-b-80">
					<view class="content-header u-flex u-row-between u-border-bottom" id="cs">
						<view class="c-h-item u-flex">
							<navigator open-type="navigateBack" class="u-m-r-20 d-theme-color">
								<i class="custom-icon-left-circle custom-icon u-font-36"></i>
							</navigator>
							<view class="header-title u-m-r-80">创建订单</view>
							<el-button v-if="company.name" type="primary" size="mini" icon="el-icon-shopping-bag-1">店铺：{{company.name}}</el-button>
						</view>
					</view>
					<view class="content-form-wrap">
						<el-form :inline="true" :model="confirmOrder" class="demo-form-inline">
							<el-form-item label="支付方式" class="u-m-b-0">
								<el-select v-model="confirmOrder.pay_type">
									<el-option label="现金" value="1"></el-option>
									<el-option :disabled="sz != 1" label="赊账" value="2"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="交收方式" class="u-m-b-0">
								<el-select v-model="confirmOrder.receive_type">
									<el-option :disabled="list1.length == 0" label="送货" value="1"></el-option>
									<el-option :disabled="ziti == 1" label="自提" value="2"></el-option>
								</el-select>
							</el-form-item>
						</el-form>
					</view>
					<view class="content-addr-wrap" v-if="confirmOrder.receive_type == 1">
						<view class="letter-box">
							<view class="letter-border">
								<view class="u-flex u-p-b-20">
									<view class="item-left u-m-r-40 u-flex ">
										<view class="default-label u-m-r-10" v-if="addressData.auto == 1">默认</view>
										<view class="name u-m-r-20">{{addressData.name}}</view>
										<view class="mobile">{{addressData.mobile}}</view>
									</view>
									<view class="item-right">
										<el-button class="u-p-0" type="text" @click="handleShowAddrBox">
											<view class="u-flex">
												选择其他地址<i class="custom-icon-right-circle custom-icon u-p-l-10"></i>
											</view>
										</el-button>
									</view>

								</view>
								<view class="u-flex address u-line-2">
									{{addressData.regional_name}}
									{{addressData.address}}
								</view>
							</view>
						</view>
					</view>
					<view class="content-table-wrap" v-if="list1.length > 0">
						<el-table ref="list1" :data="list1" border tooltip-effect="dark" style="width: 100%"
							:header-cell-style="{background: '#F5F7FA'}">
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
									<view class="ykj-label d-theme-color"
										v-if="scope.row.price != '议价' && scope.row.talk_price == 2">一口价</view>

								</template>
							</el-table-column>
							<el-table-column label="数量" width="180" align="right">
								<template slot-scope="scope">
									× {{scope.row.num}}
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
									<view class="ykj-label d-theme-color"
										v-if="scope.row.price != '议价' && scope.row.talk_price == 2">一口价</view>

								</template>
							</el-table-column>
						</el-table>
					</view>
					<view class="content-table-wrap" v-if="list2.length > 0">
						<el-table ref="list2" :data="list2" tooltip-effect="dark" style="width: 100%">
							<el-table-column label="以下列表商品交收方式只允许自提">
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
										<view class="ykj-label d-theme-color"
											v-if="scope.row.price != '议价' && scope.row.talk_price == 2">一口价</view>

									</template>
								</el-table-column>
								<el-table-column label="数量" width="180" align="right">
									<template slot-scope="scope">
										× {{scope.row.num}}
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
										<view class="ykj-label d-theme-color"
											v-if="scope.row.price != '议价' && scope.row.talk_price == 2">一口价</view>

									</template>
								</el-table-column>
							</el-table-column>
						</el-table>
					</view>
					<view class="content-total-wrap">
						<el-row>
							<el-col :span="24" class="u-flex u-row-right">
								<view class="total-label">总计商品数量</view>
								<view class="total-value">{{totalNum}} 件</view>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24" class="u-flex u-row-right ">
								<view class="total-label">总计金额</view>
								<view class="total-value">
									<u-count-to color="#dd0000" :duration="500" :endVal="totalPrice" :decimals="2"
										separator=","></u-count-to>
									<text class="u-p-l-10">元</text>
								</view>
							</el-col>
						</el-row>
						<el-row class="u-m-t-40 u-m-b-40">
							<el-col :span="24" class="u-flex u-row-right">
								<el-button type="danger" @click="handleCreateOrder">创建订单</el-button>
							</el-col>
						</el-row>
					</view>
				</view>
			</view>
		</view>

		<el-dialog class="addr-table" title="收货地址列表" :visible.sync="addrTableDialog" width="70%">
			<el-table height="400" :data="addrList" ref="addrTable" highlight-current-row v-loading="addrLoading"
				@current-change="handleCurrentChange">
				<!-- <el-table-column property="id" label="id" width="150"></el-table-column> -->
				<el-table-column label="收货人" width="150">
					<template slot-scope="scope">
						<i class="el-icon-check u-m-r-10 d-danger-color" v-if="currentRow.id == scope.row.id"></i>
						{{scope.row.name}}
						<view class="default-label u-m-l-10" v-if="scope.row.auto">默认</view>
					</template>
				</el-table-column>
				<el-table-column property="mobile" label="手机号" width="200"></el-table-column>
				<el-table-column label="详细地址">
					<template slot-scope="scope">
						{{scope.row.regional_name}}{{scope.row.address}}
					</template>
				</el-table-column>
				<view slot="empty" class="empty-wrap">当前无收货地址</view>
			</el-table>
			<span slot="footer" class="dialog-footer">
				<!-- <span class="footer-sub d-theme-color u-p-r-60" style="font-size: 14px;">{{curTableCoupon}}</span> -->
				
				<!-- <el-button type="primary" @click="handleRefreshData" icon="el-icon-refresh" plain>刷新数据</el-button> -->
				<el-button type="primary" @click="handleAddrAddmin" icon="el-icon-setting" plain>管理收获地址</el-button>
				<el-button type="danger" @click="addrTableDialog = false">取 消</el-button>
				<el-button type="primary" @click="handleConfirmAddr">确 定</el-button>
			</span>
		</el-dialog>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				menuActive: '2-2',
				list1: [],
				list2: [],
				ziti: 0,
				sz: 1,
				company: {},
				addrTableDialog: false,
				confirmOrder: {
					pay_type: '1',
					receive_type: '1'
				},
				addressData: {
					id: '',
					name: '',
					mobile: '',
					address: '',
					regional_name: '',
					auto: 0,
				},
				addrLoading: false,
				currentRow: {},
				checkedList: [],
				addrList: []
			}
		},
		computed: {
			...mapState(['cart']),
			totalNum() {
				return this.checkedList.reduce((sum, ele) => {
					return sum + ele.num
				}, 0)
			},
			totalPrice() {
				let total = 0;
				total = this.checkedList.reduce((sum, ele) => {
					let p = 0
					if (uni.$u.test.number(ele.price)) {
						p = ele.price * ele.num
					}
					return sum + p
				}, 0)
				return total
			},
		},
		async onLoad() {
			this.filterListData()
			uni.showLoading()
			await this.getData()
		},
		onShow() {
			uni.$emit('updateAddrPage')
		},
		methods: {
			...mapMutations(['updateCartList']),
			handleShowAddrBox() {
				this.addrTableDialog = true;
				this.currentRow = this.addressData
			},
			filterListData() {
				let list1 = []
				let list2 = []
				this.checkedList = this.cart.filter(ele => ele.checked)
				this.checkedList.forEach(ele => {
					if (ele.self && ele.self.includes("2")) {
						this.ziti = 1
					}

					if ((ele.self && ele.self.includes("1")) && ele.talk_price == 2) {
						list2.push(ele)
					} else {
						list1.push(ele)
					}
				})
				this.list1 = list1
				this.list2 = list2
				if(this.list1.length == 0) {
					this.confirmOrder.receive_type = '2'
					this.addressData.id = -1
				}
			},
			async handleRefreshData() {
				this.addrLoading = true;
				this.addrList = []
				await this.getData()
				this.addrLoading = false;
				this.$refs.addrTable.doLayout()
				
			},
			async getData() {
				let res = await this.$http.get('orderConfirm')
				if(res.code != 1) return;
				this.company = res.company.Company
				if(!this.addressData.id) {
					if(this.list1.length == 0) this.addressData = res.moren 
					// this.currentRow = res.moren 
				}else if(res.moren.id != this.addressData.id){
					this.addressData.auto = 0
					// this.currentRow.auto = 0
				}else {
					this.addressData.auto = 1
					// this.currentRow.auto = 1
				}
				this.addrList = res.list
				this.sz = res.sz
				this.$message({
					type: 'success',
					message: '数据加载完成!'
				});
			},
			handleCurrentChange(val) {
				this.currentRow = val;
			},
			handleConfirmAddr() {
				if (this.currentRow.id) {
					this.addressData = this.currentRow;
					this.addrTableDialog = false
				}
			},
			handleAddrAddmin() {
				this.addrTableDialog = false
				uni.navigateTo({
					url: '/pages/addr/addr',
					events: {
						bindEvent: () => {
							uni.$once('updateAddrPage',(data) => {
								this.handleRefreshData()
							})
						}
					}
				})
			},
			async handleCreateOrder() {
				let pid_array = []
				this.cart.forEach(item => {
					if(item.checked) {
						pid_array.push({
							cid:item.cid,
							pid:item.id,
							num:item.num
						})
					}
				})
				let res = await this.$http.get('User/ordercreate', {
					params: {
						pid_array: JSON.stringify(pid_array),
						buy_address_id: this.addressData.id,
						pay_tool: this.confirmOrder.pay_type
					}
				})
				if(res.code != 1) return;
				
				
				this.updateCartList({
					action: 'delete',
					idArr: pid_array.map(ele => ele.pid),
				})
				this.$confirm('订单创建成功！', '消息', {
					confirmButtonText: '跳至订单管理',
					cancelButtonText: '回到购物车',
					type: 'success'
				}).then(() => {
					uni.redirectTo({
						url: `/pages/orderList/orderList`
					})
				}).catch(() => {
					uni.redirectTo({
						url: '/pages/cart/cart'
					})
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	$p-img-w: 70px !default;
	.default-label {
		font-size: 12px;
		color: #fff;
		background-color: $u-error;
		padding: 2px 8px;
		border-radius: 3px;
		display: inline-block;
		line-height: 16px;

	}

	.wrapper {
		 

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

				.letter-border {
					padding: 30px;
					background: #fdfdfd;
				}

				.letter-box {
					padding: 3px;
					box-sizing: border-box;
					background: linear-gradient(45deg,
							#f22121 12.5%,
							$theme-bg-color 12.5%,
							$theme-bg-color 25%,
							#2c6dd6 25%,
							#2c6dd6 37.5%,
							$theme-bg-color 37.5%,
							$theme-bg-color 50%,
							#f22121 50%,
							#f22121 62.5%,
							$theme-bg-color 62.5%,
							$theme-bg-color 75%,
							#2c6dd6 75%,
							#2c6dd6 87.5%,
							$theme-bg-color 87.5%,
							$theme-bg-color 100%);
					background-size: 70px 70px;
				}

				.content-addr-wrap {
					padding: 10px 30px 10px;

					.name {}

					.address {
						color: #888;
						font-size: 14px;
					}

					.mobile {}
				}

				.content-form-wrap {
					padding: 25px 30px 15px;
				}

				.content-table-wrap {
					padding: 10px 30px 10px;

					.ykj-label {
						display: inline-block;
						background-color: lighten($theme-color, 42%);
						border: 1px solid lighten($theme-color, 20%);
						border-radius: 3px;
						line-height: 1em;
						font-size: 12px;
						padding: 3px 10px;
					}

					.el-table /deep/ {
						th.el-table__cell {
							font-weight: normal;
							color: #666;
							padding: 5px 0;
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

				.content-total-wrap {
					padding: 20px 30px 10px;

					.el-row {
						padding: 5px 0;

						.el-col {}
					}

					.total-label {
						padding-right: 20px;
						color: #999;
						font-size: 16px;
					}

					.total-value {
						color: #333;
						font-size: 20px;
					}
				}
			}
		}
	}
</style>
