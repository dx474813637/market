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
							<view class="header-title">订单详情</view>
						</view>
					</view>
					<view class="content-steps-wrap">
						<el-steps :active="stepsActive" process-status="process" finish-status="success" align-center>
							<el-step icon="el-icon-sold-out">
								<view class="step-title" slot="title">
									下单成功
								</view>
							</el-step>

							<el-step icon="el-icon-chat-dot-square">
								<view class="step-title" slot="title">
									订单订立
								</view>
							</el-step>

							<el-step icon="el-icon-postcard">
								<view class="step-title" slot="title">
									支付成功
								</view>
							</el-step>

							<el-step icon="el-icon-box">
								<view class="step-title" slot="title">
									待收货
								</view>
							</el-step>

							<el-step icon="el-icon-circle-check">
								<view class="step-title" slot="title">
									订单完成
								</view>
							</el-step>
						</el-steps>
					</view>
					<view class="content-addr-info">
						<el-table :data="addrData" style="width: 100%">
							<el-table-column :label="`收货信息 - ${info.list.buyGetType}`">
								<el-table-column prop="name" label="收货人" width="200" v-if="info.list.address_name">
								</el-table-column>
								<el-table-column prop="phone" label="手机" width="200" v-if="info.list.address_mobile">
								</el-table-column>
								<el-table-column prop="address" label="收货地址">
								</el-table-column>
							</el-table-column>
						</el-table>
					</view>
					<view class="content-order-info">
						<el-row type="flex" align="middle" :gutter="colGutter">
							<el-col :span="24" class="order-label-col title u-flex u-row-between">
								<view class="item u-flex">
									<view class="order-label">订单ID：{{info.list.id}}</view>
									<view class="order-label">卖家：{{info.list.c_name}}</view>
									<view class="order-label">收货方式：{{info.list.buyGetType}}</view>
									
								</view>
								<view class="item u-flex">
									
								</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle" :gutter="colGutter">
							<el-col :span="5" class="order-label-col">
								<view class="order-label">产品总价</view>
							</el-col>
							<el-col>
								<view class="order-info">{{info.list.pay_price}} 元</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle" :gutter="colGutter">
							<el-col :span="5" class="order-label-col">
								<view class="order-label">订立现金价格</view>
							</el-col>
							<el-col>
								<view class="order-info">{{info.list.pay_price}} 元</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle" :gutter="colGutter">
							<el-col :span="5" class="order-label-col">
								<view class="order-label">订单状态</view>
							</el-col>
							<el-col>
								<view class="order-info">{{info.list.toState}}</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle" :gutter="colGutter">
							<el-col :span="5" class="order-label-col">
								<view class="order-label">用户支付状态</view>
							</el-col>
							<el-col>
								<view class="order-info u-flex">
									<template v-if="info.list.pay_status == 0">
										<template v-if="info.list.pay_tool == 2">
											--
										</template>
										<template v-if="info.list.pay_tool != 2">
											等待支付
										</template>
									</template>
									<template v-if="info.list.pay_status == 1">
										等待支付
									</template>
									<template v-if="info.list.pay_status == 2">
										退款中
									</template>
									<template v-if="info.list.pay_status == 3">
										<template v-if="info.list.tran_state == 0">
											等待卖家发货
										</template>
										<template v-if="info.list.tran_state == 1">
											等待收货
										</template>
										<template v-if="(info.list.tran_state == 4) && (info.list.pay_tool == 1) && (info.list.address_id != -1)">
											买家资金已冻结
										</template>
									</template>
									<template v-if="info.list.pay_status == 4">
										等待支付
									</template>
									<template v-if="info.list.pay_status == 5">
										<template v-if="info.list.pay_tool == 2">
											赊账支付成功
										</template>
										<template v-if="info.list.pay_tool != 2">
											支付成功
										</template>
									</template>
									<template v-if="info.list.pay_status == 6">
										支付失败
									</template>
									<template v-if="info.list.pay_status == 7">
										已退款
									</template>
									<template v-if="info.list.pay_status == 8">
										已部分退款
									</template>
									<template v-if="info.list.pay_status == 9">
										已冻结
									</template>
									<template v-if="info.list.pay_status == 10">
										等待支付
									</template>
									<template v-if="info.list.pay_status == 11">
										等待支付
									</template>
									<template v-if="info.list.pay_status == 13">
										受监管-冻结支付
									</template>
									<template v-if="info.list.pay_status == 14">
										受监管-直接支付
									</template>
								</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle" :gutter="colGutter">
							<el-col :span="5" class="order-label-col">
								<view class="order-label">支付工具</view>
							</el-col>
							<el-col>
								<view class="order-info">{{info.list.toTools}}</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle" :gutter="colGutter">
							<el-col :span="5" class="order-label-col">
								<view class="order-label">支付方式</view>
							</el-col>
							<el-col>
								<view class="order-info">{{info.list.toPayType}}</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle" :gutter="colGutter">
							<el-col :span="5" class="order-label-col">
								<view class="order-label">优惠券</view>
							</el-col>
							<el-col>
								<view class="order-info u-flex">
									{{info.list.coupon_guid}}
								</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle" :gutter="colGutter" v-if="info.list.coupon_guid">
							<el-col :span="5" class="order-label-col">
								<view class="order-label">优惠价格</view>
							</el-col>
							<el-col>
								<view class="order-info u-flex">
									{{info.list.coupon_price}} 元
								</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle" :gutter="colGutter">
							<el-col :span="5" class="order-label-col">
								<view class="order-label">实付价格</view>
							</el-col>
							<el-col>
								<view class="order-info u-flex">
									{{info.list.final_price}} 元
								</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle" :gutter="colGutter" v-if="info.list.days">
							<el-col :span="5" class="order-label-col">
								<view class="order-label">赊账账期</view>
							</el-col>
							<el-col>
								<view class="order-info">{{info.list.days}}</view>
							</el-col>
						</el-row>
						<!-- <el-row type="flex" align="middle" :gutter="colGutter">
							<el-col :span="5" class="order-label-col">
								<view class="order-label">是否签约</view>
							</el-col>
							<el-col>
								<view class="order-info">{{info.list.pay_price}}</view>
							</el-col>
						</el-row> -->
						<el-row type="flex" align="middle" :gutter="colGutter">
							<el-col :span="5" class="order-label-col">
								<view class="order-label">发货状态</view>
							</el-col>
							<el-col>
								<view class="order-info">{{info.list.toTranState}}</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle" :gutter="colGutter" v-if="info.list.tran_id">
							<el-col :span="5" class="order-label-col">
								<view class="order-label">运单号</view>
							</el-col>
							<el-col>
								<view class="order-info">{{info.list.tran_id}}</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle" :gutter="colGutter" v-if="info.list.tran_price" >
							<el-col :span="5" class="order-label-col">
								<view class="order-label">运费</view>
							</el-col>
							<el-col>
								<view class="order-info">{{info.list.tran_price}}</view>
							</el-col>
						</el-row>
					</view>
					<view class="content-btns-wrap u-flex">
						<view class="item-btns u-p-r-50" v-if="info.button.button1">
							<el-button type="primary">{{info.button.button1_name}}</el-button>
						</view>
						<view class="item-btns u-p-r-50" v-if="info.button.button2">
							<el-button type="danger" @click="handleExitOrderMsg">{{info.button.button2_name}}</el-button>
						</view>
						<view class="item-btns u-p-r-50" v-if="info.button.button3">
							<el-button type="primary" @click="handleShowCouponBox">{{info.button.button3_name}}</el-button>
						</view>
						<view class="item-btns u-p-r-50" v-if="info.button.button4">
							<el-button type="primary" @click="handlePayOrder">{{info.button.button4_name}}</el-button>
						</view>
						<view class="item-btns u-p-r-50" v-if="info.button.button6">
							<el-button type="primary" @click="cancleOrderPrice">{{info.button.button6_name}}</el-button>
						</view>
						<view class="item-btns u-p-r-50" v-if="info.button.button7">
							<el-button type="primary">{{info.button.button7_name}}</el-button>
						</view>
						<view class="item-btns u-p-r-50" v-if="info.button.button8">
							<el-button type="primary" @click="handleApplyTranSelfMsg">{{info.button.button8_name}}</el-button>
						</view>
						<view class="item-btns u-p-r-50" v-if="info.button.button9">
							<el-button type="primary" @click="handleConfirmOrderFinal">{{info.button.button9_name}}</el-button>
						</view>
					</view>
					<view class="content-goods-info">
						<el-table :data="info.list.list_product" border style="width: 100%">
							<el-table-column label="订单产品">
								<el-table-column label="产品图片" width="105">
									<template slot-scope="scope">
										<el-image class="p-img" fit="cover" :src="scope.row.pic1"></el-image>
									</template>
								</el-table-column>
								<el-table-column label="产品名称">
									<template slot-scope="scope">
										<view class="p_info">
											<view class="p_i_title u-line-2">{{scope.row.p_name}}</view>
											<view v-if="scope.row.model">规格型号：{{scope.row.model}}</view>
										</view>
									</template>
								</el-table-column>
								<el-table-column label="产品单价" width="160" align="right">
									<template slot-scope="scope">
										<text class="u-p-r-10">¥</text>
										{{ scope.row.single_price }}
									</template>
								</el-table-column>
								<el-table-column prop="number" label="产品数量" width="160" align="right">
								</el-table-column>
								<el-table-column label="产品价格" width="160" align="right">
									<template slot-scope="scope">
										<text class="u-p-r-10">¥</text>
										{{ scope.row.pay_price }}
									</template>
								</el-table-column>
							</el-table-column>
						</el-table>
					</view>
				</view>
			</view>
		</view>
		<el-dialog class="coupon-table" title="我的优惠券" :visible.sync="couponShow" width="70%">
		  <el-table height="400" :data="info.coupon" ref="couponTable" highlight-current-row @current-change="handleCurrentChange">
		    <el-table-column property="id" label="id" width="150"></el-table-column>
		    <el-table-column property="title" label="优惠劵名称" width="200"></el-table-column>
		    <el-table-column label="优惠度">
				<template slot-scope="scope">
					{{scope.row.coupon}} 元
				</template>
			</el-table-column>
		    <el-table-column label="使用门槛" width="200">
				<template slot-scope="scope">
					满 {{scope.row.term}} 元
				</template>
			</el-table-column>
		    <el-table-column label="有效期">
				<template slot-scope="scope">
					{{scope.row.news_start.split(' ')[0]}}<text class="u-p-l-20 u-p-r-20">~</text>{{scope.row.news_end.split(' ')[0]}}
				</template>
			</el-table-column>
			<view slot="empty" class="empty-wrap">当前无可使用的优惠券</view>
		  </el-table>
		   <span slot="footer" class="dialog-footer u-flex u-col-top">
			  <span class="footer-sub d-theme-color u-p-r-60" style="font-size: 14px;">{{curTableCoupon}}</span>
		      <el-button @click="couponShow = false">取 消</el-button>
		      <el-button type="primary" @click="handleConfirmCoupon">确 定</el-button>
		    </span>
		</el-dialog>
		<el-dialog title="支付密码验证" :visible.sync="pwdFormDialog" width="40%" destroyOnClose>
		  <el-form :model="payPwdForm" label-width="80px">
		    <el-form-item label="密码"  required>
		      <el-input type="password" v-model="payPwdForm.pwd" show-password></el-input>
		    </el-form-item>
		  </el-form>
		  <view slot="footer" class="dialog-footer">
			<el-button type="primary" @click="handleConfirmPayOrder">确定</el-button>
		  </view>
		</el-dialog>
		<el-dialog title="短信验证" :visible.sync="codeFormDialog" width="40%" destroyOnClose>
		  <el-form :model="codeForm" label-width="80px">
		    <el-form-item label="验证码"  required>
				<el-row >
					<el-col :span="16">
						<el-input v-model="codeForm.code"></el-input>
					</el-col>
					<el-col :span="8" class="u-p-l-20">
						 <el-button style="width: 100%;" type="primary" plain>获取验证码</el-button>
					</el-col>
				</el-row>
		      
			 
		    </el-form-item>
		  </el-form>
		  <view slot="footer" class="dialog-footer">
			<el-button type="primary" @click="codeFormDialog = false">确定</el-button>
		  </view>
		</el-dialog>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				menuActive: '2-1',
				id: '',
				stepsActive: 3,
				colGutter: 0,
				addrData: [{
				  name: '',
				  phone: '',
				  address: ''
				}],
				payPwdForm: {
					pwd: ''
				},
				codeForm: {
					code: ''
				},
				couponShow: false,
				pwdFormDialog: false,
				codeFormDialog: false,
				currentRow: null,
				couponList: [
					{
						api: 10000,
						cate: 1,
						cdate: "2021-11-17 10:23:46",
						cid: 78,
						commission: 0,
						coupon: 0.1,
						date: "2021-11-17",
						description: "",
						dtime: "2021-11-17 10:23:46",
						end: 1643587200,
						guid: "0C2B5D05-0E6E-8609-CBBB-6D955CC9BDF2",
						id: 238,
						img: "",
						intro: "",
						login: "sktsyh",
						news_api: 10000,
						news_end: "2022-01-31 08:00:00",
						news_id: 78,
						news_login: "ceshi1123",
						news_start: "2021-11-17 08:00:00",
						news_state: 0,
						number: 100,
						start: 1637107200,
						state: 0,
						term: 1,
						title: "双十一活动",
						uptime: "2021-11-18 14:05:31",
					},
					{
						api: 10000,
						cate: 1,
						cdate: "2021-11-17 10:23:46",
						cid: 78,
						commission: 0,
						coupon: 0.1,
						date: "2021-11-17",
						description: "",
						dtime: "2021-11-17 10:23:46",
						end: 1643587200,
						guid: "0C2B5D05-0E6E-8609-CBBB-6D955CC9BDF2",
						id: 2,
						img: "",
						intro: "",
						login: "sktsyh",
						news_api: 10000,
						news_end: "2022-01-31 08:00:00",
						news_id: 78,
						news_login: "ceshi1123",
						news_start: "2021-11-17 08:00:00",
						news_state: 0,
						number: 100,
						start: 1637107200,
						state: 0,
						term: 100000000000,
						title: "双十一活动",
						uptime: "2021-11-18 14:05:31",
					}
				],
				info: {
					address: {
						list: [],
					},
					list: {
						list: {},
						address_re: {},
						company: {},
						list_product: [],
						title: {}
					},
					button: {},
					coupon: [],
					sell_cards: {
						card_wx: {}
					}
				}
			}
		},
		async onLoad(opt) {
			if(opt && opt.id) {
				this.id = opt.id
				uni.showLoading({
					title: '数据加载中'
				})
				await this.getData()
			}
			
		},
		computed: {
			curTableCoupon() {
				if(!this.currentRow) return '当前无选择'
				let coupon = this.currentRow
				return `当前勾选【id：${coupon.id}】【${coupon.title}】优惠券。点击【确认】优惠即可生效，此行为不可撤销`
			}
		},
		methods: {
			async getData() {
				let res = await this.$http.get('orderDetail.html', {
					params: {
						order_id: this.id
					}
				})
				this.$message({
					type: 'success',
					message: '获取成功!'
				});
				this.addrData = [{
					  name: res.list.address_name,
					  phone: res.list.address_mobile,
					  address: res.list.address
				}]
				this.info = res
			},
			handlePayOrder() {
				if(true) {
					this.$confirm(`有可使用的优惠项，是否放弃优惠直接支付订单?`, '提示', {
						confirmButtonText: '狠心放弃优惠',
						cancelButtonText: '看看优惠',
						type: 'warning'
					}).then(() => {
						this.handleShowPwdBox()
					}).catch((e) => {
						this.handleShowCouponBox()
					});
				}
			},
			handleConfirmPayOrder() {
				if(!this.payPwdForm.pwd) return
				this.$message({
					type: 'success',
					message: '支付成功!'
				});
				this.handleShowPwdBox()
			},
			//取消订单
			handleExitOrderMsg() {
				this.$confirm(`是否取消订单?`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '在考虑一下',
					type: 'warning'
				}).then(async () => {
					let res = await this.$http.get('/User/order_cancel', {params: {order_id: this.id}})
					if(res.code != 1) return
					this.$message({
						type: 'success',
						message: res.msg || '成功'
					});
					uni.showLoading({
						title: '获取最新数据中'
					})
					await this.getData()
				}).catch(() => {
					       
				});
			},			
			
			handleShowCouponBox() {
				this.couponShow = !this.couponShow
			},
			handleShowPwdBox() {
				this.pwdFormDialog = !this.pwdFormDialog
			},
			handleCurrentChange(val) {
				// console.log(val)
				this.currentRow = val;
			},
			//使用优惠券
			async handleConfirmCoupon() {
				uni.showLoading({
					title: '正在处理中'
				})
				let res = await this.$http.get('User/check_coupon_product_list', {params: {
					id: this.currentRow.cid,
					order_id: this.id
				}})
				if(res.code == 2) return false
				this.$message({
					type: 'success',
					message: '优惠券使用成功!'
				});
				this.handleShowCouponBox()
				uni.showLoading({
					title: '获取最新数据中'
				})
				await this.getData()
				
			},
			
			//退回订立价
			handleExitOrderMsg() {
				this.$confirm(`是否退回订立价?`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '再考虑一下',
					type: 'warning'
				}).then(async () => {
					let res = await this.$http.get('/User/roll_back_tran_price', {params: {order_id: this.id}})
					if(res.code != 1) return
					this.$message({
						type: 'success',
						message: res.msg || '成功'
					});
					uni.showLoading({
						title: '获取最新数据中'
					})
					await this.getData()
				}).catch(() => {
					       
				});
			},
		
			//确认订立价
			handleExitOrderMsg() {
				this.$confirm(`是否确认订立价?`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '再考虑一下',
					type: 'warning'
				}).then(async () => {
					let res = await this.$http.get('/User/check_tran_price', {params: {order_id: this.id}})
					if(res.code != 1) return
					this.$message({
						type: 'success',
						message: res.msg || '成功'
					});
					uni.showLoading({
						title: '获取最新数据中'
					})
					await this.getData()
				}).catch(() => {
						   
				});
			},			
			
			//确认申请提货
			handleApplyTranSelfMsg() {
				this.$confirm(`是否确认申请提货?`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '再考虑一下',
					type: 'warning'
				}).then(async () => {
					let res = await this.$http.get('/User/apply_tran_self', {params: {order_id: this.id}})
					if(res.code != 1) return
					this.$message({
						type: 'success',
						message: res.msg || '成功'
					});
					uni.showLoading({
						title: '获取最新数据中'
					})
					await this.getData()
				}).catch(() => {
						   
				});
			},	
					
			//确认收货
			handleConfirmOrderFinal() {
				this.$confirm(`是否确认收货?`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '再考虑一下',
					type: 'warning'
				}).then(async () => {
					if(this.info.list.pay_tool == 9) {
						
					}
					else if(this.info.list.pay_tool == 2) {
						
					}
					else {
						
					}
					
					
					
					
					
					
					let res = await this.$http.get('/User/apply_tran_self', {params: {order_id: this.id}})
					if(res.code != 1) return
					this.$message({
						type: 'success',
						message: res.msg || '成功'
					});
					uni.showLoading({
						title: '获取最新数据中'
					})
					await this.getData()
				}).catch(() => {
						   
				});
			},
		}
	}
</script>

<style scoped lang="scss">
	.coupon-table {
		/deep/ .el-dialog__footer {
			display: flex;
			justify-content: flex-end;
		}
	}
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

				.content-steps-wrap {
					padding: 40px 20px 20px;
					font-size: 14px;

					.step-title {
						font-size: 14px;
					}

					/deep/ .el-step__icon.is-icon {
						width: 70px;
						font-size: 25px;
					}
				}
				.content-order-info {
					padding: 10px 30px;
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
							&.order-label-col {
								background-color: #F5F7FA;
								border-right: 1px solid #e7e7e7;
								color: #666;
								&.title .order-label {
									color: #333;
									margin-right: 15px;
								}
							}
						}
					}
				}
				.content-btns-wrap,
				.content-addr-info,
				.content-goods-info  {
					padding: 15px 30px;
					.p_info {
						line-height: 20px;
						height: 80px;
						color: #999;
						.p_i_title {
							margin-bottom: 5px;
							color: #000;
						}
					}
					.p-img {
						width: 80px;
						height: 80px;
						border-radius: 4px;
					}
					/deep/ .el-table {
						thead {
							.cell {
								font-weight: normal;
								color: #666;
							}
							tr:first-child {
								.cell {
									color: #333;
									font-weight: bold;
								}
							}
							.el-table__cell {
								padding: 6px 0;
							}
						}
					}
				}

			}
		}
	}
</style>
