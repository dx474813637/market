<template>
	<view  >
		<d-header></d-header>
		<view class="main u-flex u-row-center u-p-40">
			<view class="wrapper u-flex u-col-top">
				<view class="wrap-item menu">
					<d-menu :active="menuActive"></d-menu>
				</view>
				<view class="wrap-item content">
					<view class="center-header u-flex u-m-b-40">
						<view class="item-left u-flex">
							<view class="item-top u-flex ">
								<view class="top-avatar">
									<el-image :src="user.mem_pic"></el-image>
								</view>
								<view class="name">Hi, {{sinopay.name}}</view>
								<view class="welcome">你好，欢迎登录</view>
							</view>
							<view class="item-bottom">
								<navigator class="zhxx" url="/pages/sinopay/sinopay">账号信息</navigator>
							</view>
						</view>
						<view class="item-right">
							<el-card shadow="never">
							    <view slot="header" class="clearfix">
									<view class="u-flex u-row-between">
										<view class="item u-flex">
											<view class="name">{{sinopay.name}} （账号：{{sinopay.bind_info.market_login}}）</view>
											<navigator 
												v-if="sinopay.bind_info.state != 2" 
												:url="`/pages/bankcard_bind/bankcard_bind?user_fundaccno=${walletInfo.user_fundaccno_b}`"
											>
												<el-button round class="u-m-l-30" type="primary" plain size="mini">绑卡认证</el-button>
											</navigator>
											
										</view>
										<view class="item u-flex">
											<navigator url="/pages/sinopay/sinopay"  class="item-btn">
												<template v-if="sinopay.auth_state == 1">
													<i class="custom-icon-verified custom-icon"></i>
													<view class="btn-title">已认证</view>
												</template>
												<template v-else>
													<i class="custom-icon-warning-circle custom-icon"></i>
													<view class="btn-title">未认证</view>
												</template>
												
											</navigator>
											<navigator url="/pages/sinopay_pay_list/sinopay_pay_list"  class="item-btn">
												<i class="custom-icon-YUAN custom-icon"></i>
												<view class="btn-title">付款记录</view>
											</navigator>
											<navigator url="/pages/sinpay_safe/sinpay_safe"  class="item-btn">
												<i class="custom-icon-setting custom-icon"></i>
												<view class="btn-title">安全设置</view>
											</navigator>
										</view>
									</view>
							    </view>
								<view class="text item u-flex m-v-wrap">
									<view class="item-left u-flex">
										<view class="money-view u-flex u-row-around">
											<view class="m-v-item u-flex">
												<view class="num">{{walletInfo.info.bal}}</view>
												<view class="t">可用余额（元）</view>
											</view>
											<view class="m-v-item u-flex">
												<view class="num">{{walletInfo.info.bal_freeze}}</view>
												<view class="t">冻结金额（元）</view>
											</view>
											<view class="m-v-item u-flex">
												<view class="num">{{walletInfo.info.bal_refund}}</view>
												<view class="t">可提金额（元）</view>
											</view>
										</view>
									</view>
									<view class="item-right u-flex u-row-center">
										<navigator url="/pages/sinopay_account/sinopay_account?type=1" class="u-m-b-30">
											<el-button type="primary" plain size="medium">付款账户信息</el-button>
										</navigator>
										<navigator :url="`/pages/recharge/recharge?user_fundaccno=${walletInfo.info.user_fundaccno}`">
											<el-button type="danger" size="medium">充值</el-button>
										</navigator>
									</view>
									
								</view>
							</el-card>
						</view>
					</view>
					<view class="content-card-wrap u-m-b-40">
						<el-card shadow="never">
							<view slot="header" class="clearfix">
								<span>业务操作</span>
							</view>
							<view class="text item card-m u-flex">
								<navigator url="/pages/bankcard/bankcard" class="c-m-item u-border u-flex u-row-center">
									<view class="icon-wrap">
										<i class="custom-icon custom-icon-idcard"></i>
									</view>
									<view class="c-m-title">绑卡认证 / 绑卡查询 / 转账充值</view>
								</navigator>
								<navigator url="/pages/recharge_list/recharge_list" class="c-m-item u-border u-flex u-row-center">
									<view class="icon-wrap">
										<i class="custom-icon custom-icon-creditcard"></i>
									</view>
									<view class="c-m-title">充值记录</view>
								</navigator>
								<template v-if="walletInfo.info">
									<navigator url="/pages/sinopay_account/sinopay_account?type=2" class="c-m-item u-border u-flex u-row-center">
										<view class="icon-wrap">
											<i class="custom-icon custom-icon-accountbook"></i>
										</view>
										<view class="c-m-title">收款账户<text>{{sinopay.user_fundaccno_s}}</text></view>
									</navigator>
								</template>
								
							</view>
						</el-card>
					</view>
					<view class="content-card-wrap">
						<el-card shadow="never">
							<view slot="header" class="clearfix">
								<view class="u-flex u-row-between">
									<view>绑卡</view>
									<navigator class="u-font-28 d-theme-color" url="/pages/bankcard_list/bankcard_list">管理</navigator>
								</view>
							</view>
							<view class="text item ">
								<scroll-view 
									scroll-x 
									show-scrollbar
								>
									<view  class="card-list u-flex">
										<view class="item-card">
											<d-bank-card cardNum="" bankName="中国工商银行"></d-bank-card>
										</view>
										<view class="item-card">
											<d-bank-card cardNum="" bankName="中国工商银行"></d-bank-card>
										</view>
										<view class="item-card">
											<d-bank-card cardNum="" bankName="中国工商银行"></d-bank-card>
										</view>
										<view class="item-card">
											<d-bank-card cardNum="" bankName="中国工商银行"></d-bank-card>
										</view>
										
									</view>
									
								</scroll-view>
							</view>
						</el-card>
					</view>
				</view>
			</view>
		</view>
		<el-dialog
		  title="提示"
		  :visible.sync="dialogVisible"
		  width="550px"
		  :close-on-click-modal="false"
		  :close-on-press-escape="false"
		  :show-close="false"
		  :modal-append-to-body="false"
		>
			<span>您还未绑定支付账号，您可以进行以下操作：</span>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="handleGoReg">注册新账号</el-button>
				<el-button type="primary" @click="handleGoBind" plain>绑定已有账号</el-button>
				
			</span>
		</el-dialog>
		
	</view>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	export default {
		data() {
			return {
				menuActive: '3-1',
				dialogVisible: false,
				walletInfo: {
					info: {}
				},
				State: 0,
			}
		}, 
		async onLoad() {
			// this.showRegDialog()
			uni.showLoading()
			await this.getData()
		},
		computed: {
			...mapState(['sinopay', 'user']),
		},
		methods: {
			...mapMutations(['updateSinopay']),
			async getData() {
				let data = await this.$http.get('moneyCenter3')
				this.updateSinopay(data.list);
				this.walletInfo = data.user_fundaccno_b;
				if(data.State == 1) {
					this.dialogVisible = true
				}
			},
			handleChangeFlag() {
				this.dialogVisible = !this.dialogVisible
			},
			showRegDialog() {
				this.handleChangeFlag()
			},
			handleGoReg() {
				this.handleChangeFlag()
				uni.navigateTo({
					url: "/pages/sinopay_reg/sinopay_reg"
				})
			},
			handleGoBind() {
				this.handleChangeFlag()
				uni.navigateTo({
					url: "/pages/sinopay_bind/sinopay_bind"
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.card-list {
		width: 100%;
		padding: 10px 0;
		.item-card {
			padding-right: 20px;
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
				.center-header {
					height: 240px;
					>.item-left {
						width: 200px;
						flex: 0 0 200px;
						height: 100%;
						background-color: $theme-color;
						color: #fff;
						flex-direction: column;
						.item-top {
							flex: 0 0 calc(100% - 40px);
							height: calc(100% - 40px);
							flex-direction: column;
							.top-avatar {
								margin-top: 25px;
								.el-image {
									width: 60px;
									height: 60px;
									border-radius: 50%;
									margin: 0 auto;
								}
							}
							.welcome {
								font-size: 14px;
							}
							.name {
								margin: 6px auto;
							}
						}
						.item-bottom {
							height: 40px;
							flex: 0 0 40px;
							background-color: darken($theme-color, 20%);
							color: #fff;
							width: 100%;
							.zhxx {
								line-height: 40px;
								width: 100%;
								text-align: center;
							}
						}
					}
					>.item-right {
						width: calc(100% - 200px);
						flex: 0 0 calc(100% - 200px);
						height: 100%;
						background-color: #fff;
						.el-card {
							height: 100%;
							border: 0;
							/deep/ .el-card__header {
								padding-bottom: 12px;
							}
							.item-btn {
								text-align: center;
								padding: 0px 12px 0;
								width: 60px;
								.custom-icon {
									font-size: 28px;
									color: $theme-color;
								}
								.btn-title {
									font-size: 12px;
									margin-top: 3px;
									color: #666;
								}
							}
							.m-v-wrap {
								height: 120px;
								>.item-left {
									height: 100%;
									flex: 0 0 calc(100% - 200px);
									width: calc(100% - 200px);
								}
								>.item-right {
									height: 100%;
									flex: 0 0 200px;
									flex-direction: column;
									width: 200px;
									navigator {
										width: 70%;
									}
									.el-button {
										width: 100%;
									}
								}
							}
							.money-view {
								width: 100%;
								.m-v-item {
									flex-direction: column;
									.num {
										font-size: 26px;
										margin-bottom: 6px;
									}
									.t {
										font-size: 14px;
										color: #999;
									}
								}
							}
						}
					}
				}
				.content-card-wrap {
					.card-m {
						width: 100%;
						.c-m-item {
							flex: 0 0 30%;
							width: 30%;
							margin-left: 5%;
							border-radius: 3px;
							flex-direction: column;
							border-color: #eee!important;
							height: 150px;
							&:hover {
								background-color: #f8f8f8;
								.icon-wrap {
									background-color: #fff;
								}
							}
							&:first-child {
								margin-left: 0;
							}
							.icon-wrap {
								padding: 10px;
								border-radius: 50%;
								background-color: #f8f8f8;
								margin-bottom: 12px;
								.custom-icon {
									font-size: 30px;
									color: $theme-color;
									
								}
							}
							.c-m-title {
								color: #666;
							}
							
						}
					}
				}
			}
		}
	}
</style>
