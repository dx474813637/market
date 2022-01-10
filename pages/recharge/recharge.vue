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
							<view class="header-title">我要充值</view>
						</view>
					</view>
					<view class="form-wrap">
						<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px">
							<el-form-item label="充值账户" prop="czzh">
								<el-input :value="user_fundaccno" readonly></el-input>
							</el-form-item>
							<el-form-item label="充值类型" prop="czlx">
								<el-select v-model="ruleForm.czlx" placeholder="请选择">
									<el-option label="直接充值" value="1"></el-option>
									<el-option label="财务充值" :disabled="sinopay_type != 'B'" value="2"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item v-if="ruleForm.czlx == 2">
								<view style="line-height: 20px;">财务充值：即发送一条充值记录给Sinopay平台，请财务充值。最少充值10元。</view>
							</el-form-item>
							<el-form-item label="选择充值卡" prop="card" v-if="sinopay_type == 'C'">
								<el-select v-model="ruleForm.card" placeholder="请选择">
									<el-option
										v-for="(item,index) in list"
										:label="`${item.plantBankName}（${item.accNo}）`" 
										:value="item.id"
										:key="item.id"
									></el-option>
									<el-option
										v-for="(item,index) in lista"
										:label="`${item.bank_name}（仅认证）- 该银行卡不支持充值`" 
										:value="item.id"
										:key="item.id"
										disabled
									></el-option>
									
								</el-select>
							</el-form-item>
							<el-form-item label="充值金额" prop="money">
								<el-input v-model.number="ruleForm.money" autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="手续费">
								<el-input :value="money2" readonly></el-input>
							</el-form-item>
							<el-form-item label="到账金额">
								<el-input :value="money3" readonly></el-input>
							</el-form-item>
							<el-form-item label="备注" prop="bz" v-if="sinopay_type == 'B'">
								<el-input v-model="ruleForm.bz" autocomplete="off"></el-input>
							</el-form-item>
							
							<el-form-item>
								<el-button type="primary" @click="submitForm('ruleForm')">充 值</el-button>
								<el-button type="danger" plain v-if="sinopay_type == 'C'">
									<navigator url="/pages/bankcard/bankcard">添加新的银行卡</navigator>
								</el-button>
							</el-form-item>
						</el-form>
					</view>
				
					<view class="form-wrap" v-if="backForm">
						{{backForm}}
					</view>
				</view>
			</view>
		</view>

		<el-dialog 
			title="短信验证" 
			:visible.sync="codeFormDialog" 
			width="40%" 
			:modal-append-to-body="false"
			:close-on-click-modal="false"
			:close-on-press-escape="false"
		>
		  <el-form :model="codeForm" :rules="codeRules" ref="code" label-width="80px">
		    <el-form-item label="验证码" prop="code" required>
				<el-row >
					<el-col >
						<el-input v-model="codeForm.code"></el-input>
					</el-col>
				</el-row>
		    </el-form-item>
		  </el-form>
		  <view slot="footer" class="dialog-footer">
			<el-button type="primary" @click="submitForm('code')">确定</el-button>
			<el-button type="danger" plain @click="codeFormDialog = false">不充了</el-button>
		  </view>
		</el-dialog>
	</view>
</template>

<script>
	export default {
		data() {
			var checkMoney = (rule, value, callback) => {
				if (!value) {
				  return callback(new Error('金额不能为空'));
				}
				this.$nextTick(() => {
				  if (!Number.isInteger(value)) {
					callback(new Error('请输入数字值'));
				  } else {
					if (value <= 0) {
					  callback(new Error('充值金额必须大于0元'));
					} else {
					  callback();
					}
				  }
				});
			};
			return {
				menuActive: "3-1",
				ruleForm: {
					czzh: '',
					czlx: '1',
					card: '',
					money: 0,
					bz: ''
				},
				rules: {
					card: [
						{
							required: true,
							message: '请选择银行卡',
							trigger: 'blur'
						},
					],
					money: [
						{ validator: checkMoney,  trigger: 'blur' }
					],
				},
				user_fundaccno: '',
				list: [],
				lista: [],
				sinopay_type: '',
				quick_id: "",
				backForm: '',
				codeFormDialog: false,
				codeForm: {
					code: ''
				},
				codeRules: {
					code: [
						{
							required: true,
							message: '请输入短信验证码',
							trigger: ['blur', 'change']
						}
					]
				},
			}
		},
		computed: {
			money2() {
				return 0
			},
			money3() {
				if(this.ruleForm.money < 0 || !Number.isInteger(this.ruleForm.money)) return 0
				return this.ruleForm.money
			},
			paramsObj() {
				let obj = {
					user_fundaccno: this.user_fundaccno,
					amount: this.money3,
				}
					
				if(this.sinopay_type == 'C') {
					obj.bind_id = this.ruleForm.card
				}else if(this.sinopay_type == 'B') {
					obj.type = this.ruleForm.czlx
					obj.remark = this.ruleForm.bz
				}
				return obj
			}
		},
		async onLoad(opt) {
			if(opt && opt.hasOwnProperty('user_fundaccno')) {
				this.user_fundaccno = opt.user_fundaccno;
				this.czzh = opt.user_fundaccno;
				uni.showLoading()
				await this.getData()
			}else {
				this.$message.error('参数有误');
				uni.navigateTo({
					url: '/pages/money_center/money_center'
				})
			}
			
		},
		methods: {
			async getData() {
				let res = await this.$http.get('recharge2', {
					params: {
						user_fundaccno: this.user_fundaccno
					}
				})
				if(res.code != 1) return 
				this.sinopay_type = res.sinopay_type
				this.list = res.list
				this.lista = res.lista
				
			},
			submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						uni.showLoading()
						if(formName == 'ruleForm') {
							this.handleRecharge()
						}else if(formName == 'code') {
							this.yanzhengcode()
						}
						
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			async handleRecharge() {
				let res = await this.$http.get('User/quick_apply', {
					params: this.paramsObj
				})
				if(res.code != 1) return;
				if(this.sinopay_type == "C") {
					this.quick_id = res.quick_id;
					this.codeFormDialog = true
				}
				if(this.sinopay_type == "B") {
					if(this.paramsObj.type == '1') {
						this.backForm = res.form
					}else {
						this.$confirm(res.msg, '消息', {
						  confirmButtonText: '返回资金中心',
						  cancelButtonText: '继续充值',
						  type: 'success'
						}).then(() => {
						  uni.navigateTo({
						  	url: '/pages/money_center/money_center'
						  })
						}).catch(() => {
						  uni.redirectTo({
						  	url: `/pages/recharge/recharge?user_fundaccno=${this.user_fundaccno}`
						  })        
						});
					}
				}
			},
			async yanzhengcode() {
				let res = await this.$http.get('User/success_recharge', {
					params: {
						user_fundaccno: this.user_fundaccno,
						quick_id: this.quick_id,
						verifyCode: this.codeForm.code,
						json: 1,
					}
				})
				if(res.code != 1) return;
				this.$confirm(res.msg, '消息', {
				  confirmButtonText: '返回资金中心',
				  cancelButtonText: '继续充值',
				  type: 'success'
				}).then(() => {
				  uni.navigateTo({
				  	url: '/pages/money_center/money_center'
				  })
				}).catch(() => {
				  uni.redirectTo({
				  	url: `/pages/recharge/recharge?user_fundaccno=${this.user_fundaccno}`
				  })        
				});
			}
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
