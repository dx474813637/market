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
							<view class="header-title">修改登录密码</view>
						</view>
					</view>

					<view class="form-wrap">
						<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
							<el-form-item label="原始密码" prop="old_pwd">
								<el-input v-model="ruleForm.old_pwd"></el-input>
							</el-form-item>
							<el-form-item label="新 密 码" prop="new_pwd">
								<el-input v-model="ruleForm.new_pwd"></el-input>
							</el-form-item>
							<el-form-item label="确认密码" prop="cfm_pwd">
								<el-input v-model="ruleForm.cfm_pwd"></el-input>
							</el-form-item>
							<el-form-item label="选择获取方式" prop="type">
								<el-radio-group v-model="ruleForm.type">
									<el-radio label="1">按绑定手机</el-radio>
									<el-radio label="0">按绑定邮箱</el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item label="验证码" prop="code">
								<el-input v-model="ruleForm.code"></el-input>
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
			return {
				menuActive: 'safe',
				ruleForm: {
					old_pwd: '',
					new_pwd: '',
					cfm_pwd: '',
					type: '1',
					code: ''
					
				},
				rules: {
					old_pwd: [{
						required: true,
						message: '请输入您的原始密码',
						trigger: 'blur'
					}, ],
					sex: [{
						required: true,
						message: '请选择活动资源',
						trigger: 'change'
					}],
				}

			}
		},
		onLoad() {

		},
		methods: {

			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						alert('submit!');
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
		width: 1300px;

		.wrap-item {
			&.menu {
				width: 180px;
				flex: 0 0 180px
			}
			
			.form-wrap {
				padding: 30px 50px;
				width: 600px;
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
