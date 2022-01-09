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
							<view class="header-title">提现申请</view>
						</view>
					</view>
					<view class="form-wrap">
						<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px">
							<el-form-item label="选择提现银行卡" prop="card">
								<el-select v-model="ruleForm.card" placeholder="请选择">
									<el-option label="银行卡1" value="1"></el-option>
									<el-option label="银行卡2" value="2"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="提现金额" prop="money">
								<el-input v-model="ruleForm.money"></el-input>
							</el-form-item>
							<el-form-item label="手续费">
								<el-input v-model="money2" readonly></el-input>
							</el-form-item>
							<el-form-item label="到账金额">
								<el-input v-model="money3" readonly></el-input>
							</el-form-item>
							<el-form-item label="备注" prop="bz">
								<el-input v-model="ruleForm.bz"></el-input>
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
				menuActive: "3-3",
				money2: 0,
				money3: 0,
				ruleForm: {
					card: '',
					money: 0,
					bz: '',
				},
				rules: {
					card: [
						{
							required: true,
							message: '请选择银行卡',
							trigger: 'blur'
						},
					],
					money: [{
						required: true,
						message: '充值金额不能为空',
						trigger: 'blur'
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
