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
							<view class="header-title">账号信息</view>
						</view>
					</view>
					<view class="form-wrap">
						<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
							<el-form-item label="会员类型" prop="memberCate">
								<el-input v-model="ruleForm.memberCate" readonly></el-input>
							</el-form-item>
							<el-form-item label="您的账号" prop="login">
								<el-input v-model="ruleForm.login" readonly></el-input>
							</el-form-item>
							<el-form-item label="您的姓名" prop="name">
								<el-input v-model="ruleForm.name"></el-input>
							</el-form-item>
							<el-form-item label="邮箱" prop="email">
								<el-input v-model="ruleForm.email"></el-input>
							</el-form-item>
							<el-form-item label="手机" prop="phone">
								<el-input v-model="ruleForm.phone"></el-input>
							</el-form-item>
							<el-form-item label="性别" prop="sex">
								<el-radio-group v-model="ruleForm.sex">
									<el-radio label="1">男</el-radio>
									<el-radio label="0">女</el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item label="下拉框样例" prop="region">
								<el-select v-model="ruleForm.region" placeholder="请选择活动区域">
									<el-option label="区域一" value="shanghai"></el-option>
									<el-option label="区域二" value="beijing"></el-option>
								</el-select>
							</el-form-item>
							
							<el-form-item label="开关样例" prop="delivery">
								<el-switch v-model="ruleForm.delivery"></el-switch>
							</el-form-item>
							<el-form-item label="多选样例" prop="type">
								<el-checkbox-group v-model="ruleForm.type">
									<el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
									<el-checkbox label="地推活动" name="type"></el-checkbox>
									<el-checkbox label="线下主题活动" name="type"></el-checkbox>
									<el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
								</el-checkbox-group>
							</el-form-item>
							<el-form-item label="富文本样例" prop="desc">
								<el-input type="textarea" v-model="ruleForm.desc"></el-input>
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
				menuActive: "1-2",
				ruleForm: {
					memberCate: '超级会员',
					login: 'huiyuannetsun',
					name: '',
					phone: '18757127948',
					email: '456@email.com',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					sex: '1',
					desc: ''
				},
				rules: {
					name: [{
							required: true,
							message: '请输入您的姓名',
							trigger: 'blur'
						},
					],
					phone: [
						{
							required: true,
							message: '请输入您的手机',
							trigger: 'blur'
						},
					],
					email: [{
						required: true,
						message: '请输入您的邮箱',
						trigger: 'blur'
					}],
					region: [{
						required: true,
						message: '请选择活动区域',
						trigger: 'change'
					}],
					type: [{
						type: 'array',
						required: true,
						message: '请至少选择一个活动性质',
						trigger: 'change'
					}],
					sex: [{
						required: true,
						message: '请选择活动资源',
						trigger: 'change'
					}],
					desc: [{
						required: true,
						message: '请填写活动形式',
						trigger: 'blur'
					}]
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
		}
	}
</style>
