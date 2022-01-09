<template>
	<view  >
		<d-header></d-header>
		<view class="main u-flex u-row-center u-p-40">
			<view class="wrapper u-flex u-col-top">
				<view class="wrap-item menu">
					<d-menu :active="menuActive"></d-menu>
				</view>
				<view class="wrap-item content">
					<view class="content-header u-m-b-30">
						<view class="item-top u-flex u-row-between">
							<view class="item u-flex">
								<text>用户名：{{user.name}}，欢迎您</text>
							</view>
							<view class="item u-flex">
								<text>创建AI智能名片</text>
								<text class="d-theme-color u-p-l-20 u-p-r-20">开启营销之旅</text>
								<el-button size="mini" type="primary">立即开启</el-button>
							</view>
						</view>
						<view class="item-center u-flex u-row-between">
							<view class="i-c-avatar">
								<el-image :src="user.mem_pic" fit="fill"></el-image>
							</view>
							<view class="i-c-data u-flex u-row-around">
								<navigator url="/pages/orderList/orderList" class="item-d u-flex">
									<view class="i-d-num">{{my_data.order}}</view>
									<view class="i-d-title">我的订单</view>
								</navigator>
								<navigator url="/pages/money_center/money_center" class="item-d u-flex">
									<view class="i-d-num">{{my_data.account}}</view>
									<view class="i-d-title">支付余额</view>
								</navigator>
								<navigator url="/pages/coupon/coupon" class="item-d u-flex">
									<view class="i-d-num">{{my_data.coupon}}</view>
									<view class="i-d-title">优惠券</view>
								</navigator>
							</view>
							<view class="i-c-btns u-flex">
								<navigator url="/pages/withdrawal/withdrawal" class="item-btn">
									<el-button type="primary">在线充值</el-button>
								</navigator>
							</view>
						</view>
					</view>
					<view class="content-order u-p-40">
							<el-card class="box-card" shadow="never">
								  <div slot="header" class="u-flex u-row-between card-header">
										<view class="item-left">
											<u-tabs :list="tableList" lineHeight="0" :inactiveStyle="{color: '#999'}" :activeStyle="{fontWeight: 'bold'}" @change="handleChangeActive"></u-tabs>
										</view>
										<!-- <span>
											{{item.name}}
											<template v-if="item.show">
												（{{item.num}}）
											</template>
										</span> -->
										<view class="u-flex item-right">
											<template v-if="tableList[active].show">
												<el-button class="u-m-r-30" type="text" @click="handleLoadOrderData(active, tableList[active].type)" icon="el-icon-refresh">刷新</el-button>
											</template>
											
											<el-button type="text" @click="handleGotoOrderList">更多{{tableList[active].name}}<i class="el-icon-d-arrow-right el-icon--right"></i></el-button>
										</view>
										
								  </div>
								  <div class="text item">
									  
									<view v-for="(item, index) in tableList" :key="item.type">
										<template v-if="active == index">
											<template v-if="item.show">
												<el-table :ref="`orderTable${item.type}`" v-loading="item.loading" :data="item.data" style="width: 100%" border :header-cell-style="{
													background: '#f8f8f8',
													border: '0',
													fontWeight: 'normal',
													color: '#777'
												}">
													<el-table-column label="订单号" prop="id" width="90px">
													</el-table-column>
													<el-table-column label="卖家" prop="c_name">
													</el-table-column>
													<el-table-column label="下单时间" prop="ctime" width="180px" align="right">
													</el-table-column>
													<el-table-column label="订立价" width="150px" align="right">
														<template slot-scope="scope">
															<view class="">{{scope.row.pay_price | toFixed2}} 元</view>
														</template>
													</el-table-column>
													<el-table-column label="订单状态" prop="toState" width="120px" align="center">
													</el-table-column>
													<el-table-column label="支付类型" prop="toPayType" width="120px" align="center">
														<template slot-scope="scope">
															<view>{{scope.row.toTools}}</view>
															<view>{{scope.row.toPayType}}</view>
														</template>
													</el-table-column>
													<el-table-column label="操作" width="120px" align="center">
														<template slot-scope="scope">
															<navigator :url="`/pages/orderDetail/orderDetail?id=${scope.row.id}`">
																<el-button type="text" >{{scope.row.toPayState}}</el-button>
															</navigator>
														</template>
													</el-table-column>
												</el-table>
											</template>
											<template v-else>
												<view class="before-load-wrap  u-flex u-row-center">
													<el-button type="primary" @click="handleLoadOrderData(index, item.type)" plain size="medium">加载第一页数据</el-button>
												</view>
											</template>
										</template>
										
										  
									</view>  	
									
									  
								  </div>
							</el-card>
						
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				menuActive: '1-1',
				active: 0,
				tableList: [
					{
						type: 1,
						name: '待支付订单',
						show: false,
						badge: {
							value: 0,
							isDot: true
						},
						loading: false,
						data: []
					},
					{
						type: 2,
						name: '待交收订单',
						show: false,
						badge: {
							value: 0,
							isDot: true
						},
						loading: false,
						data: []
					},
					{
						type: 3,
						name: '已完成订单',
						show: false,
						badge: {
							value: 0,
							isDot: true
						},
						loading: false,
						data: []
					}
				],
				my_data: {}
			}
		}, 
		computed: {
			...mapState(['user'])
		},
		async onLoad() {
			uni.showLoading()
			await this.getData()
			await this.handleLoadOrderData(0, 1)
		},
		methods: {
			async getData() {
				let res = await this.$http.get('my')
				if(res.code != 1) return;
				this.my_data = res
				this.$message({
					type: 'success',
					message: res.msg || '成功'
				});
			},
			async handleLoadOrderData(index, type) {
				this.tableList[index].show = true
				this.tableList[index].loading = true
				let res = await this.$http.get('order', {params: {type, p: 1}})
				this.tableList[index].loading = false
				if(res.code != 1) return;
				
				this.tableList[index].data = res.list.list_order
				this.tableList[index].badge.value = res.list.pw_rec_total
				this.tableList[index].badge.isDot = false
			},
			handleChangeActive(item) {
				this.active = item.index
			},
			handleGotoOrderList() {
				uni.navigateTo({
					url: '/pages/orderList/orderList?type=' + this.tableList[this.active].type
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.before-load-wrap {
		height: 240px;
	}
	.card-header {
		/deep/ .u-tabs__wrapper__nav__item {
			cursor: pointer;
		}
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
				// background-color: #fff;
				min-height: 90vh;
				.content-header {
					background-color: #fff;
					padding: 20px;
					.item-top {
						margin-bottom: 20px;
						.item {
							background-color: #fdfdfd;
							padding: 10px;
							font-size: 12px;
							color: #666;
							border: 1px solid #e7e7e7;
							&:first-child {
								// border-left: 0;
								border-radius: 0 3px 3px 0;
							}
							&:last-child {
								// border-right: 0;
								border-radius: 3px 0 0 3px;
							}
						}
					}
					.item-center {
						border-radius: 100px 0 0 100px;
						background-color: #f8f8f8;
						padding: 20px;
						.i-c-avatar {
							width: 90px;
							height: 90px;
							border: 4px solid #fff;
							border-radius: 50%;
							margin-left: 60px;
							box-shadow: 0 0 5px rgba(0,0,0,.1);
							.el-image {
								width: 100%;
								height: 100%;
								border-radius: 50%;
							}
						}
						.i-c-data {
							flex: 1;
							padding: 0 20px;
							.item-d {
								flex-direction: column;
								.i-d-num {
									font-size: 28px;
									margin-bottom: 5px;
								}
								.i-d-title {
									font-size: 14px;
									color: #777;
								}
							}
						}
						.i-c-btns {
							padding-left: 50px;
							.item-btn {
								
							}
						}
					}
				}
				.content-order {
					background-color: #fff;
					.el-card {
						margin-bottom: 20px;
					}
				}
			}
		}
	}
</style>
