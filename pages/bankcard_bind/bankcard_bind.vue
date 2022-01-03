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
							<view class="header-title">申请绑定提现银行卡</view>
						</view>
					</view>
					<view class="form-wrap">
						<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px">
							<el-form-item label="选择现金账户" prop="user_fundaccno">
								<el-select v-model="ruleForm.user_fundaccno" placeholder="请选择">
									<el-option label="1111010000123 - 收款账户" value="1"></el-option>
									<el-option label="1111010000122 - 付款账户" value="2"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="账户名" prop="bank_accname">
								<el-input v-model="ruleForm.bank_accname"></el-input>
							</el-form-item>
							<el-form-item label="证件号码" prop="card_id">
								<el-input v-model="ruleForm.card_id"></el-input>
							</el-form-item>
							<template v-if="limit == 1">
								<el-form-item label="法人姓名" prop="legal_name">
									<el-input v-model="ruleForm.legal_name"></el-input>
								</el-form-item>
								<el-form-item label="法人身份证" prop="lecerti_code">
									<el-input v-model="ruleForm.lecerti_code"></el-input>
								</el-form-item>
							</template>
							
							<el-form-item label="开户行名称" prop="bank_name">
								<el-input v-model="ruleForm.bank_name"></el-input>
							</el-form-item>
							<el-form-item label="银行账户号" prop="bank_accno">
								<el-input v-model="ruleForm.bank_accno"></el-input>
							</el-form-item>
							<el-form-item label="手机号" prop="mobile">
								<el-input v-model="ruleForm.mobile"></el-input>
							</el-form-item>
							<el-form-item>
								<el-checkbox v-model="checked">同意</el-checkbox>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
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
				menuActive: "3-2",
				checked: false,
				limit: 1, //1企业账户 //2个人账户
				ruleForm: {
					user_fundaccno: '',
					bank_accname: 'bank_accname',
					card_id: 'card_id',
					bank_name: 'bank_name',
					bank_accno: 'bank_accno',
					mobile: 'mobile',
					legal_name: 'legal_name',
					lecerti_code: 'lecerti_code'
				}
			}
		},
		computed: {
			rules() {
				let r = {
					user_fundaccno: [{
						required: true,
						message: '请选择现金账户',
						trigger: ['blur', 'change']
					}, ],
					bank_accname: [{
						required: true,
						message: '账户名不能为空',
						trigger: ['blur', 'change']
					}, ],
					card_id: [{
						required: true,
						message: '证件号码不能为空',
						trigger: ['blur', 'change']
					}, ],
					bank_name: [{
						required: true,
						message: '开户行名称不能为空',
						trigger: ['blur', 'change']
					}, ],
					bank_accno: [{
						required: true,
						message: '银行账户号不能为空',
						trigger: ['blur', 'change']
					}, ],
					mobile: [{
						required: true,
						message: '手机号不能为空',
						trigger: ['blur', 'change']
					}, ],
				}
				if (this.limit == 1) {
					r = {
						...r,
						legal_name: [{
							required: true,
							message: '法人姓名不能为空',
							trigger: ['blur', 'change']
						}, ],
						lecerti_code: [{
							required: true,
							message: '法人身份证不能为空',
							trigger: ['blur', 'change']
						}, ],
					}
				}
				return r
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
