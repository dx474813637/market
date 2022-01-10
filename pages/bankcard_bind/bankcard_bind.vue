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
							<view class="header-title">银行卡绑定</view>
						</view>
					</view>
					<view class="form-wrap">
						<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" :validate-on-rule-change="false">
							
							<el-form-item label="银行卡号" prop="bank_accno">
								<el-input v-model="ruleForm.bank_accno" clearable></el-input>
							</el-form-item>
							<el-form-item label="银行名" prop="bank_name">
								<view class="u-flex">
									<view class="u-m-r-20 u-flex">
										<template v-if="logo">
											<el-image fit="contain" :src="logo" class="logo"></el-image>
										</template>
										<template v-else>
											<i class="custom-icon-creditcard custom-icon u-font-40 d-theme-color"></i>
										</template>
									</view>
									
									<view v-if="ruleForm.bank_name">{{ruleForm.bank_name}}</view>
									<view v-else class="" style="color: #999">填写完整的银行卡号，系统将自动关联银行名</view>
									
									<template v-if="loading">
										<i class="el-icon-loading u-font-32 u-m-l-30"></i>
									</template>
								</view>
							</el-form-item>
							<template v-if="list.sinop_type == 'C'">
								<el-form-item label="持卡人" prop="bank_accname" clearable>
									<el-input v-model="ruleForm.bank_accname"></el-input>
								</el-form-item>
								<el-form-item label="身份证" prop="card_id" clearable>
									<el-input v-model="ruleForm.card_id"></el-input>
								</el-form-item>
							</template>
							<template v-else-if="list.sinop_type == 'B'">
								<el-form-item label="公司户名" prop="bank_accname" clearable>
									<el-input v-model="ruleForm.bank_accname"></el-input>
								</el-form-item>
								<el-form-item label="信用代码" prop="card_id" clearable>
									<el-input v-model="ruleForm.card_id"></el-input>
								</el-form-item>
								<el-form-item label="法人姓名" prop="legal_name" clearable>
									<el-input v-model="ruleForm.legal_name"></el-input>
								</el-form-item>
								<el-form-item label="法人身份证" prop="lecerti_code" clearable>
									<el-input v-model="ruleForm.lecerti_code"></el-input>
								</el-form-item>
							</template>
							<el-form-item label="手机号" prop="mobile" clearable>
								<el-input v-model="ruleForm.mobile" placeholder="请输入该卡在银行的预留手机号"></el-input>
							</el-form-item>
							
							
							<el-form-item>
								<view class="agree">
									<el-checkbox v-model="checked">我已阅读并同意</el-checkbox>
									<el-link :underline="false" href="https://my.orangebank.com.cn/orgLogin/hd/act/jianzb/jzbxy.html" target="_blank">《平安银行电子商务“见证宝”商户服务协议》</el-link>
									<el-link :underline="false" href="https://auth.orangebank.com.cn/#/m/cDealOne" target="_blank">《平安数字用户协议》</el-link>
								</view>
								
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
				user_fundaccno: "",
				checked: false,
				logo: '',
				loading: false,
				list: {},
				limit: 1, //1企业账户 //2个人账户
				ruleForm: {
					user_fundaccno: '',
					bank_accname: '',
					card_id: '',
					bank_accno: '',
					mobile: '',
					legal_name: '',
					lecerti_code: '',
					bank_name: ''
				}
			}
		},
		watch: {
			['ruleForm.bank_accno'](n) {
				uni.$u.debounce(this.lookUpBank, 1600)
			}
		},
		computed: {
			rules() {
				let r = {
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
					bank_accno: [{
						required: true,
						message: '银行账户号不能为空',
						trigger: ['blur', 'change']
					}, ],
					bank_name: [{
						required: true,
						message: '银行名不能为空',
						trigger: ['change']
					}, ],
					mobile: [{
						required: true,
						message: '手机号不能为空',
						trigger: ['blur', 'change']
					}, ],
				}
				if (this.list.sinop_type == 'B') {
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
			},
			paramsObj() {
				let r = {
					bank_accname: this.ruleForm.bank_accname,
					card_id: this.ruleForm.card_id,
					bank_accno: this.ruleForm.bank_accno,
					mobile: this.ruleForm.mobile,
					user_fundaccno: this.ruleForm.user_fundaccno,
					bank_name: this.ruleForm.bank_name,
				}
				if (this.list.sinop_type == 'B') {
					r = {
						...r,
						legal_name: this.ruleForm.legal_name,
						lecerti_code: this.ruleForm.lecerti_code,
					}
				}
				return r
			}
		},
		async onLoad(opt) {
			if(opt && opt.hasOwnProperty('user_fundaccno')) {
				this.user_fundaccno = this.ruleForm.user_fundaccno = opt.user_fundaccno
				uni.showLoading()
				await this.getData()
			}
		},
		methods: {
			async lookUpBank() {
				this.loading = true
				let res = await this.$http.get('User/sinopay_bank_name', {
					params: {
						no: this.ruleForm.bank_accno
					}
				})
				this.loading = false
				this.ruleForm.bank_name = res.list || ''
				this.logo = res.logo || ''
			},
			submitForm(formName) {
				if(!this.checked) {
					this.$alert('请阅读并同意勾选用户协议', '提示', {
					  confirmButtonText: '确定'
					});
					return
				}
				this.$refs[formName].validate( (valid) => {
					if (valid) {
						this.handleBindApply()
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			async getData() {
				let res = await this.$http.get('card_add.html', {
					params: {
						user_fundaccno: this.user_fundaccno
					}
				})
				if(res.code != 1) return;
				this.list = res.list;
				if(res.list.name)  this.ruleForm.bank_accname = res.list.name;
				if(res.list.bind_info.market_reg_no) this.ruleForm.card_id = res.list.bind_info.market_reg_no;
			},
			async handleBindApply() {
				let res = await this.$http.get('User/bind_apply', {
					params: this.paramsObj
				})
				if(res.code != 1) return;
				this.$confirm('绑定成功', '提示', {
				  confirmButtonText: '查看绑定详情',
				  cancelButtonText: '返回资金中心',
				  type: 'success'
				}).then(() => {
					uni.redirectTo({
						url: `/pages/bankcard_detail/bankcard_detail?id${res.bind_id}`
					})
				 }).catch(() => {
					uni.navigateTo({
						url: '/pages/money_center/money_center'
					})
						  
				});
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.logo {
		height: 35px;
		width: 50px;
		display: block;
	}
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

				.agree {
					line-height: 20px;
					
					.el-link {
						line-height: 20px;
						display: inline;
					}
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
</style>
