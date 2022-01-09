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
							<view class="header-title">账号安全</view>
						</view>
					</view>
					<view class="content-main-wrap ">
						<el-row :gutter="30" class="row u-font-28 u-p-t-40 u-p-b-40" type="flex" align="middle">
							<el-col :span="2">
								<view class="u-flex icon">
									<i class="el-icon-lock u-font-40"></i>
								</view>
							</el-col>
							<el-col :span="3">
								<view class="title u-font-30">登录密码</view>
							</el-col>
							<el-col :span="3">
								<view class="value">******</view>
							</el-col>
							<el-col :span="13">
								<view class="sub">安全性高的密码可以使账号更安全。建议您定期更换密码，且设置一个包含数字和字母，并长度超过6位以上的密码。</view>
							</el-col>
							<el-col :span="3">
								<view class="u-flex u-row-right">
									<navigator url="/pages/memberSafe_pwd/memberSafe_pwd">
										<el-button type="primary" size="small"><i class="el-icon-edit"></i></el-button>
									</navigator>
								</view>
							</el-col>
						</el-row>
						<el-row :gutter="20" class="row u-font-28 u-p-t-40 u-p-b-40" type="flex" align="middle">
							<el-col :span="2">
								<view class="u-flex icon">
									<i class="el-icon-message u-font-40"></i>
								</view>
							</el-col>
							<el-col :span="3">
								<view class="title u-font-30">邮箱绑定</view>
							</el-col>
							<el-col :span="3">
								<view class="value">x***@n***.com</view>
							</el-col>
							<el-col :span="13">
								<view class="sub">当您将帐号绑定邮箱时，可以通过邮箱找回密码，使您的帐号更加安全。</view>
							</el-col>
							<el-col :span="3">
								<view class="u-flex u-row-right">
									<navigator url="/pages/memberSafe_email/memberSafe_email">
										<el-button type="primary" size="small"><i class="el-icon-edit"></i></el-button>
									</navigator>
								</view>
							</el-col>
						</el-row>
						<el-row :gutter="20" class="row u-font-28 u-p-t-40 u-p-b-40" type="flex" align="middle">
							<el-col :span="2">
								<view class="u-flex icon">
									<i class="el-icon-mobile-phone u-font-40"></i>
								</view>
							</el-col>
							<el-col :span="3">
								<view class="title u-font-30">手机绑定</view>
							</el-col>
							<el-col :span="3">
								<view class="value">已绑定</view>
							</el-col>
							<el-col :span="13">
								<view class="sub">绑定手机后，您即可享受丰富的手机服务，如手机登录、手机找回密码等。</view>
							</el-col>
							<el-col :span="3">
								<view class="u-flex u-row-right">
									<navigator url="/pages/memberSafe_phone/memberSafe_phone">
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
	export default {
		data() {
			return {
				menuActive: '1-3'
			}
		},
		onLoad() {

		},
		methods: {

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
