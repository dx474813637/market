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
							<view class="header-title">邮箱绑定</view>
						</view>
					</view>
					<view class="step-wrap u-p-40">
						<el-steps simple :active="stepIndex" finish-status="success">
							<el-step title="验证信息"  icon="el-icon-key"></el-step>
							<el-step title="绑定新邮箱" icon="el-icon-lock"></el-step>
							<el-step title="绑定成功" icon="el-icon-warning-outline"></el-step>
						</el-steps>
					</view>
					<view class="form-wrap">
						<template v-if="stepIndex == 0">
							<el-form key="" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" label-position="left">
								<el-form-item label="已绑定邮箱号">
									<p>x***@n***.com</p>
								</el-form-item>
								<el-form-item label="邮箱验证码" prop="code">
									<el-row>
										<el-col :span="16">
											<el-input v-model="ruleForm.code" clearable></el-input>
										</el-col>
										<el-col :offset="1" :span="7">
											<el-button type="primary" plain class="getCode">获取验证码</el-button>
										</el-col>
									</el-row>
								
								</el-form-item>
								
								<el-form-item>
									<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
								</el-form-item>
							</el-form>
						</template>
						<template v-else-if="stepIndex == 1">
							<el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" label-position="left">
								<el-form-item label="新邮箱" prop="email">
									<el-input v-model="ruleForm2.email" clearable></el-input>
								</el-form-item>
								<el-form-item label="邮箱验证码" prop="code2">
									<el-row>
										<el-col :span="16">
											<el-input v-model="ruleForm2.code2" clearable></el-input>
										</el-col>
										<el-col :offset="1" :span="7">
											<el-button type="primary" plain class="getCode">获取验证码</el-button>
										</el-col>
									</el-row>
								
								</el-form-item>
								
								<el-form-item>
									<el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
								</el-form-item>
							</el-form>
						</template>
						<template v-else>
							<el-result icon="success" title="成功绑定邮箱" >
								<template slot="extra">
									<navigator open-type="navigateBack">
										<el-button type="primary" size="medium">返回</el-button>
									</navigator>
								    
								</template>
							</el-result>
						</template>
						
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
				menuActive: '1-3',
				stepIndex: 0,
				ruleForm: {
					code2: ''
				},
				ruleForm2: {
					email: '',
					code: ''
				},
				rules: {
					code: { required: true, message: '请输入验证码', trigger: ['blur', 'change']}
				},
				rules2: {
					email: [{ required: true, message: '请输入邮箱', trigger: ['blur', 'change']}],
					code2: { required: true, message: '请输入验证码', trigger: ['blur', 'change']}
				}
			}
		},
		onLoad() {

		},
		methods: {

			submitForm(formName) {
				console.log(formName)
				this.$refs[formName].validate((valid) => {
					if (valid) {
						alert('submit!');
						if(this.stepIndex != 2) {
							this.stepIndex = this.stepIndex + 1
						}
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
			}
		}
	}
</style>
