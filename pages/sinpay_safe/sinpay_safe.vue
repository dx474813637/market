<template>
	<view>
		<d-header></d-header>
		<view class="main u-flex u-row-center u-p-40">
			<view class="wrapper u-flex u-col-top">
				<view class="wrap-item menu">
					<d-menu :active="menuActive"></d-menu>
				</view>
				<view class="wrap-item content">
					<view class="content-header u-flex u-row-between u-border-bottom">
						<view class="c-h-item u-flex">
							<navigator url="/pages/money_center/money_center" class="u-m-r-20 d-theme-color">
								<i class="custom-icon-left-circle custom-icon u-font-36"></i>
							</navigator>
							<view class="header-title">Sinopay安全设置</view>
						</view>
					</view>
					<view class="content-main-wrap ">
						<el-row :gutter="30" class="row u-font-28 u-p-t-40 u-p-b-40" type="flex" align="middle">
							<el-col :span="2">
								<view class="u-flex icon">
									<i class="el-icon-lock u-font-40"></i>
								</view>
							</el-col>
							<el-col :span="5">
								<view class="title u-font-30">修改登录密码</view>
							</el-col>
							<el-col :span="14">
								<view class="sub">此密码注册时以短信发送至绑定手机</view>
							</el-col>
							<el-col :span="3">
								<view class="u-flex u-row-right">
									<navigator url="/pages/sinopay_safe_login_pwd/sinopay_safe_login_pwd">
										<el-button type="primary" size="small"><i class="el-icon-edit"></i></el-button>
									</navigator>
								</view>
							</el-col>
						</el-row>
						<el-row :gutter="20" class="row u-font-28 u-p-t-40 u-p-b-40" type="flex" align="middle">
							<el-col :span="2">
								<view class="u-flex icon">
									<i class="el-icon-setting u-font-40"></i>
								</view>
							</el-col>
							<el-col :span="5">
								<view class="title u-font-30">设置或修改支付密码</view>
							</el-col>
							<el-col :span="14">
								<view class="sub">此密码需在注册开户后设置</view>
							</el-col>
							<el-col :span="3">
								<view class="u-flex u-row-right">
									<el-button type="primary" size="small" @click="handleSetOrUpdate">
										<i class="el-icon-edit"></i>
									</el-button>
									
								</view>
							</el-col>
						</el-row>
						<el-row :gutter="20" class="row u-font-28 u-p-t-40 u-p-b-40" type="flex" align="middle">
							<el-col :span="2">
								<view class="u-flex icon">
									<i class="el-icon-warning-outline u-font-40"></i>
								</view>
							</el-col>
							<el-col :span="5">
								<view class="title u-font-30">忘记支付密码</view>
							</el-col>
							<el-col :span="14">
								<view class="sub">忘记支付密码通过短信验证重置</view>
							</el-col>
							<el-col :span="3">
								<view class="u-flex u-row-right">
									<navigator url="/pages/sinopay_safe_pay_forget/sinopay_safe_pay_forget">
										<el-button type="primary" size="small"><i class="el-icon-edit"></i></el-button>
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
	import {mapState, mapActions} from 'vuex';
	export default {
		data() {
			return {
				menuActive: '3-1'
			}
		},
		computed: {
			...mapState(['sinopay']),
		},
		async onLoad() {
			uni.showLoading()
			await this.getSinopay()
		},
		methods: {
			...mapActions(['getSinopay']),
			handleSetOrUpdate() {
				
				if(this.sinopay.sinopay_pay_pass == 1) {
					uni.navigateTo({
						url: '/pages/sinopay_safe_pay_pwd/sinopay_safe_pay_pwd?type=update'
					})
				} else {
					uni.navigateTo({
						url: '/pages/sinopay_safe_pay_pwd/sinopay_safe_pay_pwd?type=set'
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
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

				.content-main-wrap {
					padding: 40px 30px;

					.row {
						&:hover {
							background-color: #f8f8f8;
						}
						.value {
							color: #999;
						}

						.sub {
							color: #999;
						}

						.icon {
							color: $theme-color;
						}
					}
				}
			}
		}
	}
</style>
