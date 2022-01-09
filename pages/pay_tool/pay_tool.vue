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
							<view class="header-title">订单支付</view>
						</view>
					</view>
					<view class="tools-wrap u-flex">
						<view class="tools-time-down u-flex u-p-20">
							<text class="u-p-r-16">支付剩余时间</text>
							<u-count-down :time="15 * 60 * 1000" format="mm:ss" autoStart></u-count-down>
						</view>
						<view class="tools-price u-flex ">
							<view>¥</view>
							<view class="num">
								<u-count-to autoplay :endVal="info.pay_price" decimals="2" separator="," duration="800" fontSize="40" color="#000"></u-count-to>
							</view>
						</view>
						<view class="tools-seller u-p-20 u-font-30">{{info.c_name}}</view>
						<view class="tools-radio-wrap u-p-20">
							<view 
								class="item-radio u-flex" 
								v-for="(item, index) in tool_list" 
								:key="item.value"
								:class="{
									disabled: item.disabled
								}"
								@click="handleChangeTools(index)"
							>
								<view class="item-content">
									<view class="u-flex i-c-main">
										<i :class="[item.icon, item.value, 'u-m-r-20 i-c-icon']"></i>
										<view>{{item.name}}</view>
									</view>
									<view class="u-p-l-80 i-c-sub u-font-24 d-danger-color">
										<template v-if="item.errMsg">
											{{item.errMsg}}
										</template>
										<template v-else-if="item.value == 'sinopay'">
											可用余额 ¥ {{money}}元
										</template>
									</view>
								</view>
								<view class="item-right">
									<el-radio :id="`tool${item.value}`" v-model="paytool" :label="item.value">
										<span></span>
									</el-radio>
								</view>
							</view>
							<el-button type="primary" round @click="handlePay">确认支付</el-button>
						</view>
					
						
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				menuActive: '2-1',
				order_id: "",
				coupon_id: "",
				coupon_guid: "",
				coupon_list: null,
				paytool: 'sinopay',
				info: {},
				money: 0,
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
				tool_list: [
					{
						name: 'Sinopay支付',
						icon: 'custom-icon-card_fill custom-icon',
						value: 'sinopay',
						disabled: false,
						errMsg: "",
					},
					{
						name: '微信支付',
						icon: 'custom-icon-weixinzhifu1 custom-icon',
						value: 'wx',
						disabled: false,
						errMsg: ""
					},
				]
			}
		},
		async onLoad(opt) {
			if(opt && opt.order_id) {
				this.order_id = opt.order_id
				this.coupon_id = opt.coupon_id
				uni.showLoading()
				await this.getData()
			}else {
				this.$alert('参数有误', '警告', {
					  confirmButtonText: '确定',
					  type: 'error',
					  callback: () => {
							uni.navigateTo({
								url: "/pages/index/index"
							})
					  }
				});
			}
		},
		methods: {
			async getData() {
				
				let res = await this.$http.get('pay_tools', {
					params: {
						order_id: this.order_id,
						coupon_id: this.coupon_id
					}
				})
				if(res.code != 1) return;
				this.money = res.money
				if(res.money < res.list.pay_price) {
					this.tool_list[0].disabled = true
					this.tool_list[0].errMsg = '余额不足'
				}
				this.info = res.list
			},
			handleChangeTools(index) {
				if(this.tool_list[index].disabled) return
				this.paytool = this.tool_list[index].value
			},
			handlePay() {
				if(this.paytool == 'sinopay') {
					this.pwdFormDialog = true;
				}else if(this.paytool == 'wx') {
					window.location.href = `/weixin_pay.html?order_id=${this.order_id}&coupon_id=${this.coupon_id}&coupon_guid=${this.coupon_guid}`
				}
			},
			submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						let res = await this.$http.get('User/sinopay', {
							params: {
								order_id: this.order_id,
								psw: this.payPwdForm.pwd,
								coupon_guid: this.coupon_guid,
								coupon_id: this.coupon_id
							}
						})
						if(res.code != 1) return;
						this.$message({
							type: 'success',
							message: '支付成功'
						});
						uni.redirectTo({
							url: `/pages/orderDetail/orderDetail?id=${this.order_id}`
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
				.tools-wrap {
					padding: 30px 50px;
					width: 80%;
					flex-direction: column;
					.tools-time-down {
						color: #999;
						font-size: 14px;
						/deep/ .u-count-down__text {
							color: $u-error;
						}
					}
					.tools-price {
						font-size: 20px;
						.num {
							font-size: 40px;
							padding-bottom: 10px;
							padding-left: 10px;
						}
					}
					.tools-seller {
						color: #666;
					}
					.tools-radio-wrap {
						margin-top: 50px;
						.el-button {
							width: 80%;
							margin-top: 60px;
							position: relative;
							left: 50%;
							transform: translateX(-50%);
							padding-top: 15px;
							padding-bottom: 15px;
							border-radius: 40px;
							font-size: 16px;
						}
						.item-radio {
							cursor: pointer;
							min-height: 50px;
							width: 400px;
							padding: 10px 20px;
							border: 1px solid $theme-bg-color;
							border-radius: 10px;
							transition: all .3s;
							margin-bottom: 20px;
							position: relative;
							&.disabled {
								&:hover {
									border-color: $theme-bg-color;
								}
								&:after {
									content: "";
									position: absolute;
									width: 100%;
									height: 100%;
									left: 0;
									top: 0;
									background-color: rgba(255,255,255,.4);
								}
							}
							&:last-child {
								margin-bottom: 0;
							}
							&:hover {
								border-color: lighten($theme-color, 20%);
								background-color: #fdfdfd;
							}
							.item-content {
								flex: 0 0 calc(100% - 40px);
								width: calc(100% - 40px);
								.i-c-main {
									.i-c-icon {
										font-size: 30px;
										color: $theme-color;
										&.wx {
											color: #00bd00;
										}
									}
								}
								.i-c-sub {
									
								}
							}
							.item-right {
								flex: 0 0 40px;
								width: 40px;
							}
						}
					}
				}
			}
		}
	}
</style>
