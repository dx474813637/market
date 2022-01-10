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
							<view class="header-title">注册支付平台（Sinopay）账号</view>
						</view>
					</view>
					<view class="form-wrap">
						<el-form :model="typeForm" label-width="140px">
							<el-form-item label="账户类型" prop="type">
								<el-select v-model="typeForm.type" placeholder="请选择账户类型">
									<el-option label="个人" value="1"></el-option>
									<el-option label="个体工商户" value="2"></el-option>
									<el-option label="企业" value="3"></el-option>
								</el-select>
							</el-form-item>
						</el-form>
						<el-form :model="ruleForm" :rules="rules" ref="regForm" label-width="140px">
							<template v-if="typeForm.type == 1 || typeForm.type == 2">
								<el-form-item label="姓名" prop="name">
									<el-input v-model="ruleForm.name"></el-input>
								</el-form-item>
								<el-form-item label="身份证" prop="sfz">
									<el-input v-model="ruleForm.sfz"></el-input>
								</el-form-item>
							</template>
							<template v-if="typeForm.type == 2">
								<el-form-item label="公司名称" prop="cpyname">
									<el-input v-model="ruleForm.cpyname"></el-input>
								</el-form-item>
								<el-form-item label="信用统一代码" prop="cpycode">
									<el-input v-model="ruleForm.cpycode"></el-input>
								</el-form-item>
							</template>
							<template v-if="typeForm.type == 3">
								<el-form-item label="企业名称" prop="cpyname2">
									<el-row>
										<el-col :span="16">
											<el-input v-model="ruleForm.cpyname2"></el-input>
										</el-col>
										<el-col :offset="1" :span="7">
											<el-button type="primary" plain class="getCode">查找公司</el-button>
										</el-col>
									</el-row>
								</el-row>
								</el-form-item>
								<el-form-item label="信用统一代码" prop="cpycode2">
									<el-input v-model="ruleForm.cpycode2"></el-input>
								</el-form-item>
								<el-form-item label="法人姓名" prop="name2">
									<el-input v-model="ruleForm.name2"></el-input>
								</el-form-item>
								<el-form-item label="法人身份证" prop="sfz2">
									<el-input v-model="ruleForm.sfz2"></el-input>
								</el-form-item>
								<el-form-item label="联系人" prop="contact">
									<el-input v-model="ruleForm.contact"></el-input>
								</el-form-item>
							</template>
							
							<el-form-item label="手机号" prop="phone">
								<el-input v-model="ruleForm.phone"></el-input>
							</el-form-item>
							<el-form-item label="验证码" prop="code">
								<el-row>
									<el-row>
										<el-col :span="16">
											<el-input v-model="ruleForm.code"></el-input>
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
								</el-row>
								
							</el-form-item>
							<el-form-item>
								<view class="agree">
									<el-checkbox v-model="checked">我已阅读并同意</el-checkbox>
									<el-link :underline="false" href="https://my.orangebank.com.cn/orgLogin/hd/act/jianzb/jzbxy.html" target="_blank">《平安银行电子商务“见证宝”商户服务协议》</el-link>
									<el-link :underline="false" href="https://auth.orangebank.com.cn/#/m/cDealOne" target="_blank">《平安数字用户协议》</el-link>
								</view>
								
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="submitForm('regForm')">提交</el-button>
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
				menuActive: "3-1",
				typeForm: {
					type: '1',
				},
				checked: false,
				ruleForm: {
					name: '',
					sfz: '',
					cpyname: '',
					cpycode: '',
					cpyname2: '',
					cpycode2: '',
					name2: '',
					sfz2: '',
					contact: '',
					phone: '',
					code: '',
					
				},
				time: 60*1000,
				SendMsgDisabled: false,
			}
		},
		watch: {
			rules(v) {
				this.$nextTick(()=>{
					this.$refs.regForm.resetFields()
				})
				
			}
		},
		computed: {
			rules() {
				let rule = {
					phone: [{required: true, message: '手机号不能为空', trigger: 'blur'}],
					code: [{required: true, message: '验证码不能为空', trigger: 'blur'}],
				}
				if(this.typeForm.type == '1') {
					rule = {
						...rule,
						name: [{required: true, message: '姓名不能为空', trigger: 'blur'}],
						sfz: [{required: true, message: '身份证不能为空', trigger: 'blur'}],
					}
				}else if(this.typeForm.type == '2') {
					rule = {
						...rule,
						name: [{required: true, message: '姓名不能为空', trigger: 'blur'}],
						sfz: [{required: true, message: '身份证不能为空', trigger: 'blur'}],
						cpyname: [{required: true, message: '公司名称不能为空', trigger: 'blur'}],
						cpycode: [{required: true, message: '信用统一代码不能为空', trigger: 'blur'}],
					}
				}else if(this.typeForm.type == '3') {
					rule = {
						...rule,
						name2: [{required: true, message: '法人姓名不能为空', trigger: 'blur'}],
						sfz2: [{required: true, message: '法人身份证不能为空', trigger: 'blur'}],
						cpyname2: [{required: true, message: '企业名称不能为空', trigger: 'blur'}],
						cpycode2: [{required: true, message: '信用统一代码不能为空', trigger: 'blur'}],
						contact: [{required: true, message: '联系人不能为空', trigger: 'blur'}],
					}
				}
				return rule
			},
			paramsObj() {
				let params = {
					phone: this.ruleForm.phone,
					code: this.ruleForm.code,
				}
				if(this.typeForm.type == '1') {
					params = {
						...params,
						name: this.ruleForm.name,
						sfz: this.ruleForm.sfz,
					}
				}else if(this.typeForm.type == '2') {
					params = {
						...params,
						name: this.ruleForm.name,
						sfz: this.ruleForm.sfz,
						cpyname: this.ruleForm.cpyname,
						cpycode: this.ruleForm.cpycode,
					}
				}else if(this.typeForm.type == '3') {
					params = {
						...params,
						name2: this.ruleForm.name2,
						sfz2: this.ruleForm.sfz2,
						cpyname2: this.ruleForm.cpyname2,
						cpycode2: this.ruleForm.cpycode2,
						contact: this.ruleForm.contact,
					}
				}
				return params
			}
		},
		onLoad() {

		},
		methods: {
			handlevalidate(e) {
				console.log(e)
			},
			submitForm(formName) {
				if(!this.checked) {
					this.$alert('请阅读并同意勾选用户协议', '提示', {
					  confirmButtonText: '确定'
					});
					return
				}
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						
						let res = await this.$http.get('User/sinopay_create', {
							params: this.paramsObj
						})
						if(res.code != 1) return;
						this.$confirm(res.msg, '消息', {
						  confirmButtonText: '返回资金中心',
						  type: 'success'
						}).then(() => {
						  uni.navigateTo({
						  	url: '/pages/money_center/money_center'
						  })
						}).catch(() => {
						  uni.navigateTo({
						  	url: '/pages/money_center/money_center'
						  })      
						});
						
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			async handleSendCode() {
				if(this.SendMsgDisabled) return
				
				this.$refs.regForm.validateField('phone', async (errorMessage) => {
					if(errorMessage) return
					this.SendMsgDisabled = true;
					this.$nextTick(() =>{
						this.$refs.codeCountDown.start()
					})
					let res = await this.$http.get('User/get_mobile_code', {
						params: {
							mobile: this.ruleForm.phone
						}
					})
					if(res.code != 1) return;
					this.$message({
						type: 'success',
						message: '短信验证已发送'
					});
				})
				
			},			
			handleCountDownFinsh() {
				this.SendMsgDisabled = false;
				this.$refs.codeCountDown.reset()
			},
		}
	}
</script>

<style scoped lang="scss">
	.wrapper {
		 
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
				padding: 40px 50px;
				width: 600px;
				.agree {
					line-height: 20px;
					
					.el-link {
						line-height: 20px;
						display: inline;
					}
				}
				.el-row .el-col .el-button {
					width: 100%;
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
