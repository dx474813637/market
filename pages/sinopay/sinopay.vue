<template>
	<view  >
		<d-header></d-header>
		<view class="main u-flex u-row-center u-p-40">
			<view class="wrapper u-flex u-col-top">
				<view class="wrap-item menu">
					<d-menu :active="menuActive"></d-menu>
				</view>
				<view class="wrap-item content">
					<view class="content-header u-flex u-row-between u-border-bottom">
						<view class="c-h-item u-flex">
							<view class="header-title">Sinopay支付帐号</view>
						</view>
					</view>
					<view class="content-sinopay">
						<el-row type="flex" align="middle">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">Sinopay账号</view>
							</el-col>
							<el-col>
								<view class="sinopay-info">SUNSIRS_skt123</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">用户类型账号</view>
							</el-col>
							<el-col>
								<view class="sinopay-info">个人</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">用户名称</view>
							</el-col>
							<el-col>
								<view class="sinopay-info">沈凯婷</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">认证状态</view>
							</el-col>
							<el-col>
								<view class="sinopay-info">已认证</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">登录密码</view>
							</el-col>
							<el-col>
								<view class="sinopay-info">
									<navigator url="/pages/sinopay_safe_login_pwd/sinopay_safe_login_pwd" class="u-m-r-20">
										<el-button type="text" class="u-p-t-0 u-p-b-0">修改支付账号登录密码</el-button>
									</navigator>
								</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">支付密码</view>
							</el-col>
							<el-col>
								<view class="sinopay-info u-flex">
									<navigator url="/pages/sinopay_safe_pay_pwd/sinopay_safe_pay_pwd" class="u-m-r-20">
										<el-button type="text" class="u-p-t-0 u-p-b-0">点击设置</el-button>
									</navigator>
									<navigator url="/pages/sinopay_safe_pay_pwd/sinopay_safe_pay_pwd" class="u-m-r-20">
										<el-button type="text" class="u-p-t-0 u-p-b-0">修改密码</el-button>
									</navigator>
									<navigator url="/pages/sinopay_safe_pay_forget/sinopay_safe_pay_forget" class="u-m-r-20">
										<el-button type="text" class="u-p-t-0 u-p-b-0">忘记密码</el-button>
									</navigator>
								</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">绑定状态</view>
							</el-col>
							<el-col>
								<view class="sinopay-info">已绑定</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">绑定操作时间</view>
							</el-col>
							<el-col>
								<view class="sinopay-info">2021-01-20 16:00:57</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">操作</view>
							</el-col>
							<el-col>
								<view class="sinopay-info u-flex">
									<el-button type="primary" plain size="mini">解除绑定</el-button>
									<el-button type="primary" size="mini" @click="handleTakeAccount">开通资金账户</el-button>
									
								</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">我的账户</view>
							</el-col>
							<el-col>
								<view class="sinopay-info u-flex">
									<navigator url="/pages/sinopay_account/sinopay_account" class="u-m-r-20">
										<el-button type="text" class="u-p-t-0 u-p-b-0">付款账户</el-button>
									</navigator>
									<navigator url="/pages/sinopay_account/sinopay_account" class="u-m-r-20">
										<el-button type="text" class="u-p-t-0 u-p-b-0">收款账户</el-button>
									</navigator>
								</view>
							</el-col>
						</el-row>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				menuActive: '3-2',
			}
		}, 
		computed: {
			
		},
		methods: {
			handleTakeAccount() {
				this.$confirm('是否开通支付平台向下的资金账户?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
				  uni.navigateTo({
					url: "/pages/sinopay_account/sinopay_account"
				  })
				}).catch(() => {
						 
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.wrapper {
		width: 1300px;
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
				.content-sinopay {
					padding: 20px 30px;
					.el-row {
						border-left: 1px solid #e7e7e7;
						border-right: 1px solid #e7e7e7;
						border-top: 1px solid #e7e7e7;
						&:last-child {
							border-bottom: 1px solid #e7e7e7;
						}
						.el-col {
							padding: 5px 10px;
							line-height: 20px;
							min-height: 45px;
							display: flex;
							align-items: center;
							font-size: 14px;
							border-right: 1px solid #e7e7e7;
							&:last-child {
								border-right: 0;
							}
							&.sinopay-label-col {
								background-color: #F5F7FA;
								border-right: 1px solid #e7e7e7;
								color: #666;
								&.title .sinopay-label {
									color: #333;
									margin-right: 15px;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
