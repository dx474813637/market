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
							<navigator url="/pages/sinpay_safe/sinpay_safe" class="u-m-r-20 d-theme-color">
								<i class="custom-icon-left-circle custom-icon u-font-36"></i>
							</navigator>
							<view class="header-title">
								<template v-if="type=='set'">
									设置
								</template>
								<template v-else-if="type=='update'">
									修改
								</template>
								Sinopay支付密码
							</view>
						</view>
					</view>
					
					<view class="form-wrap" v-if="type=='set'">
						<el-form :model="ruleForm_set" :rules="rules_set" ref="ruleForm_set" label-width="100px" >
							
							<el-form-item label="新 密 码" prop="new_pwd" required>
								<el-input type="password" v-model="ruleForm_set.new_pwd" clearable show-password></el-input>
							</el-form-item>
							<el-form-item label="确认密码" prop="cfm_pwd" required>
								<el-input type="password" v-model="ruleForm_set.cfm_pwd" clearable show-password></el-input>
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
											:disabled="SendMsgDisabled_set"
											@click="handleSendCode('set')"
										>
											<template v-if="SendMsgDisabled_set">
												<view class="u-flex">
													<u-count-down
														:time="time_set"
														format="ss"
														:autoStart="false"
														ref="codeCountDown_set"
														@finish="handleCountDownFinsh('set')"
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
								<el-button type="primary" @click="submitForm('ruleForm_set')">提交</el-button>
								<!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
							</el-form-item>
						</el-form>
					</view>

					<view class="form-wrap" v-if="type=='update'">
						<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" >
							<el-form-item label="原始密码" prop="old_pwd" required>
								<el-input type="password" v-model="ruleForm.old_pwd" clearable show-password></el-input>
							</el-form-item>
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
											:disabled="SendMsgDisabled_update"
											@click="handleSendCode('update')"
										>
											<template v-if="SendMsgDisabled_update">
												<view class="u-flex">
													<u-count-down
														:time="time_update"
														format="ss"
														:autoStart="false"
														ref="codeCountDown_update"
														@finish="handleCountDownFinsh('update')"
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
				ruleForm_set: {
					new_pwd: '',
					cfm_pwd: '',
					code: ''
				},
				time_set: 60*1000,
				time_update: 60*1000,
				SendMsgDisabled_set: false,
				SendMsgDisabled_update: false,
				ruleForm: {
					old_pwd: '',
					new_pwd: '',
					cfm_pwd: '',
					code: ''
				},
				type: 'set',
				rules_set: {
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
				rules: {
					old_pwd: [{
						required: true,
						message: '请输入您的原始密码',
						trigger: 'blur'
					}, ],
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
				}

			}
		},
		onLoad(opt) {
			if(opt && opt.hasOwnProperty('type')) {
				this.type = opt.type
			}
		},
		methods: {
			async handleSendCode(type) {
				if(this['SendMsgDisabled_'+type]) return
				this['SendMsgDisabled_'+type] = true;
				this.$nextTick(() =>{
					this.$refs['codeCountDown_'+type].start()
				})
				let res = await this.$http.get('User/passwd_sendsms')
				if(res.code == 1) {
					this.$message({
						type: 'success',
						message: '短信验证已发送'
					});
				}
				
			},
			handleCountDownFinsh(name) {
				this['SendMsgDisabled_'+name] = false;
				this.$refs['codeCountDown_'+name].reset()
			},
			submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						let res 
						if(formName == 'ruleForm_set') {
							res  = await this.$http.get('User/sinopay_create_passwd', {
								params: {
									npay_passwd: this.ruleForm_set.new_pwd,
									cpay_passwd: this.ruleForm_set.cfm_pwd,
									code: this.ruleForm_set.code
								}
							})
						}
						else if(formName == 'ruleForm') {
							res  = await this.$http.get('User/sinopay_change_passwd', {
								params: {
									opay_passwd: this.ruleForm.old_pwd,
									npay_passwd: this.ruleForm.new_pwd,
									cpay_passwd: this.ruleForm.cfm_pwd,
									code: this.ruleForm.code
								}
							})
						}
						if(res.code != 1) return;
						this.$message({
							type: 'success',
							message: `sinopay登录密码操作成功`
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
