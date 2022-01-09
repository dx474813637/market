<template>
	<view  >
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
							<view class="header-title">赊账详情</view>
						</view>
					</view>
					<view class="content-sinopay">
						<el-row type="flex" align="middle">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">来源订单</view>
							</el-col>
							<el-col>
								<view class="sinopay-info">
									<navigator :url="`/pages/orderDetail/orderDetail?id=${info.order_id}`">{{info.order_id}}</navigator>
								</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">卖家</view>
							</el-col>
							<el-col>
								<view class="sinopay-info">{{info.c_name}}</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">赊账金额</view>
							</el-col>
							<el-col>
								<view class="sinopay-info">{{info.final_price}}</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">赊账期限</view>
							</el-col>
							<el-col>
								<view class="sinopay-info">{{info.days}}</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">赊账开始日</view>
							</el-col>
							<el-col>
								<view class="sinopay-info">{{info.start_day}}</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">赊账到期日</view>
							</el-col>
							<el-col>
								<view class="sinopay-info">{{info.end_day}}</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">还款状态</view>
							</el-col>
							<el-col>
								<view class="sinopay-info">
									<template v-if="info.over_status == 0">
										等待还款
									</template>
									<template v-else-if="info.over_status == 5">
										已还款
									</template>
								</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">还款状态</view>
							</el-col>
							<el-col>
								<view class="sinopay-info">
									<template v-if="info.over_status == 0">
										未逾期
									</template>
									<template v-else-if="info.over_status == 1">
										已逾期
									</template>
								</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="top" v-if="info.credit_offline && info.credit_offline.content">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">线下还款信息</view>
							</el-col>
							<el-col style="flex-direction: column; align-items: flex-start;">
								<view class="sinopay-info">
									{{info.credit_offline && info.credit_offline.content}}
								</view>
								<view class="sinopay-info pic" v-if="info.credit_offline && info.credit_offline.pic">
									<image :src="info.credit_offline.pic" mode="widthFix" style="width: 400px;"></image>
								</view>
							</el-col>
						</el-row>
						
						
					</view>
					
					<view class="content-btns-wrap u-flex">
						<el-button type="primary" class="u-m-r-40" @click="editOutlineInfo">编辑线下还款信息</el-button>
						<el-button type="primary" @click="onlinePay">在线还款</el-button>
						
					</view>
				</view>
			</view>
		</view>
		
		<el-dialog title="支付密码验证" :visible.sync="pwdFormDialog" width="40%">
		  <el-form :model="payPwdForm" :rules="payPwdRules" ref="payPwd" label-width="80px">
		    <el-form-item label="密码" required prop="pwd">
		      <el-input type="password" v-model="payPwdForm.pwd" show-password></el-input>
		    </el-form-item>
		  </el-form>
		  <view slot="footer" class="dialog-footer">
			<el-button type="primary" @click="submitForm('payPwd')">确定</el-button>
		  </view>
		</el-dialog>
		
		<el-dialog title="编辑线下还款信息表单" :visible.sync="outlineFormDialog" width="40%">
		  <el-form ref="outform" :model="outlineform" :rules="outlineRules" label-width="80px">
		    <el-form-item label="还款信息" prop="content">
		      <el-input v-model="outlineform.content" autocomplete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="图片">
				<u-upload
					:fileList="fileList1"
					@afterRead="afterRead"
					@delete="deletePic"
					name="uploadImg"
					:maxCount="1"
					ref="uploadImg"
				></u-upload>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="outlineFormDialog = false">取 消</el-button>
		    <el-button type="primary" @click="submitForm('outform')">确 定</el-button>
		  </div>
		</el-dialog>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				menuActive: '2-1',
				pwdFormDialog: false,
				payPwdForm: {
					pwd: ''
				},
				payPwdRules: {
					pwd: [
						{
							required: true,
							message: '请输入支付密码',
							trigger: ['blur', 'change'],
						}
					]
				},
				info: {},
				outlineFormDialog:false,
				fileList1: [],
				outlineform: {
					pic: '',
					content: '',
				},
				outlineRules: {
					content: [{ required: true, message: '还款信息不能为空', trigger: ['change'] }]
				}
			}
		}, 
		async onLoad(opt) {
			if(opt && opt.id) {
				this.id = opt.id;
			}
			uni.showLoading()
			await this.getData()
			
		},
		computed: {
			
		},
		methods: {
			afterRead(e) {
				console.log(e.file)
				if (window.FileReader) {
					var reader = new FileReader();                        
					reader.readAsDataURL(e.file.thumb); 
						 
					 reader.onload = () => {
						 console.log(reader.result)
						 this.outlineform.pic = reader.result
					 }
				}else {
					alert("浏览器版本不兼容");
				}
			},
			deletePic(event) {
				
			},
			async getData() {
				let data = await this.$http.get('credit_detail', {
					params: {
						id: this.id
					}
				})
				if(data.code != 1) return
				this.info = data.list
				this.outlineform.content = this.info.credit_offline.content
				this.$message({
					type: 'success',
					message: '数据加载完成!'
				});
			},
			editOutlineInfo() {
				this.outlineFormDialog = true
			},
			onlinePay() {
				this.pwdFormDialog = true
			},
			async handleOnline() {
				let res = await this.$http.get('User/repayment', {params: {
					id: this.order_id,
					pay_passwd: this.payPwdForm.pwd
				}})
				if(res.code != 1) return;
				this.pwdFormDialog = false
				this.$message({
					type: 'success',
					message: '在线还款成功'
				});
				uni.showLoading({
					title: '获取最新数据中'
				})
				await this.getData()
			},
			async handleOutLine() {
				let res = await this.$http.get('offline_change', {params: {
					id: this.info.order_id,
					content: this.outlineform.content,
					pic: '' 
				}})
				if(res.code != 1) return;
				this.outlineFormDialog = false
				this.$message({
					type: 'success',
					message: '提交线下还款表单成功'
				});
				uni.showLoading({
					title: '获取最新数据中'
				})
				await this.getData()
			},
			submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						
						if(formName == 'payPwdForm') {
							await this.handleOnline()
						}else if(formName == 'outform') {
							await this.handleOutLine()
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
				.content-btns-wrap {
					padding: 20px 30px 50px;
				}
				.content-sinopay {
					padding: 20px 30px;
					.ahref {
						font-size: 14px;
						line-height: 25px;
						color: $theme-color;
						padding: 10px 0;
					}
					.el-row {
						border-left: 1px solid #e7e7e7;
						border-right: 1px solid #e7e7e7;
						border-top: 1px solid #e7e7e7;
						&:last-child {
							border-bottom: 1px solid #e7e7e7;
						}
						.el-col {
							padding: 5px 10px;
							line-height: 20px;
							min-height: 45px;
							display: flex;
							align-items: center;
							font-size: 14px;
							border-right: 1px solid #e7e7e7;
							&:last-child {
								border-right: 0;
							}
							&.sinopay-label-col {
								background-color: #F5F7FA;
								border-right: 1px solid #e7e7e7;
								color: #666;
								&.title .sinopay-label {
									color: #333;
									margin-right: 15px;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
