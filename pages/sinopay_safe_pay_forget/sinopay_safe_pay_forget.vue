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
							<navigator open-type="navigateBack" class="u-m-r-20 d-theme-color">
								<i class="custom-icon-left-circle custom-icon u-font-36"></i>
							</navigator>
							<view class="header-title">重置Sinopay账号支付密码</view>
						</view>
					</view>

					<view class="form-wrap">
						<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
							<el-form-item label="新 密 码" prop="new_pwd" required>
								<el-input type="password" v-model="ruleForm.new_pwd" clearable show-password></el-input>
							</el-form-item>
							<el-form-item label="确认密码" prop="cfm_pwd" required>
								<el-input type="password" v-model="ruleForm.cfm_pwd" clearable show-password></el-input>
							</el-form-item>
							<el-form-item>
								<view style="line-height: 24px; color: #666;">
									<view>
										密码可使用任何英文字母及阿拉伯数字组合，不得少于6个字符 <br>
										并区分英文字母大小写。例如：JohN123DoLe。
									</view>
								</view>
							</el-form-item>
							<el-form-item label="验证码" prop="code">
								<el-row>
									<el-col :span="16">
										<el-input v-model="ruleForm.code" clearable></el-input>
									</el-col>
									<el-col :offset="1" :span="7">
										<el-button 
											type="primary" 
											plain 
											class="getCode" 
											:disabled="SendMsgDisabled"
											@click="handleSendCode()"
										>
											<template v-if="SendMsgDisabled">
												<view class="u-flex">
													<u-count-down
														:time="time"
														format="ss"
														:autoStart="false"
														ref="codeCountDown"
														@finish="handleCountDownFinsh"
													></u-count-down>
													<text class="u-p-l-10">秒后再操作</text>
												</view>
												
											</template>
											<template v-else>
												获取短信验证码
											</template>
										</el-button>
									</el-col>
								</el-row>

							</el-form-item>

							<el-form-item>
								<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
								<!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
							</el-form-item>
						</el-form>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.ruleForm.cfm_pwd !== '') {
						this.$refs.ruleForm.validateField('cfm_pwd');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.ruleForm.new_pwd) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				menuActive: '3-1',
				time: 60*1000,
				SendMsgDisabled: false,
				ruleForm: {
					new_pwd: '',
					cfm_pwd: '',
					code: ''

				},
				rules: {
					new_pwd: [{
						validator: validatePass,
						trigger: ['blur', 'change']
					}],
					cfm_pwd: [{
						validator: validatePass2,
						trigger: ['blur', 'change']
					}],
					code: [{
						required: true,
						message: '请输入验证码',
						trigger: 'change'
					}]
				},
				

			}
		},
		onLoad() {

		},
		methods: {
			async handleSendCode() {
				if(this.SendMsgDisabled) return
				this.SendMsgDisabled = true;
				this.$nextTick(() =>{
					this.$refs.codeCountDown.start()
				})
				
				let res = await this.$http.get('User/sinopay_reset_passwd_mobile')
				if(res.code != 1) return;
				this.$message({
					type: 'success',
					message: '短信验证已发送'
				});
			},
			handleCountDownFinsh() {
				this.SendMsgDisabled = false;
				this.$refs.codeCountDown.reset()
			},
			submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						let res = await this.$http.get('User/sinopay_reset_passwd', {
							params: {
								code: this.ruleForm.code,
								npay_passwd: this.ruleForm.new_pwd,
								cpay_passwd: this.ruleForm.cfm_pwd,
							}
						})
						if(res.code != 1) return;
						this.$message({
							type: 'success',
							message: 'sinopay登录密码修改成功'
						});
						uni.navigateTo({
							url: "/pages/sinpay_safe/sinpay_safe"
						})
						
						
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
		}
	}
</script>

<style scoped lang="scss">
	.getCode {
		display: block;
		width: 100%;
		.u-count-down {
			/deep/ .u-count-down__text {
				line-height: 1em;
				color: inherit;
			}
		}
	}

	.wrapper {
		 

		.wrap-item {
			&.menu {
				width: 180px;
				flex: 0 0 180px
			}

			.form-wrap {
				padding: 30px 50px;
				.el-form {
					width: 600px;
				}

				.el-select {
					width: 100%;

					.el-input {
						width: 100%;
					}
				}
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


			}
		}
	}
</style>
