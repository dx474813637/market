<template>
	<view>
		<d-header></d-header>
		<view class="main u-flex u-row-center u-p-40">
			<view class="wrapper u-flex u-col-top">
				<view class="wrap-item menu">
					<d-menu :active="menuActive"></d-menu>
				</view>
				<view class="wrap-item content">
					<view class="content-header u-flex u-row-between u-border-bottom u-m-b-20">
						<view class="c-h-item u-flex">
							<navigator open-type="navigateBack" class="u-m-r-20 d-theme-color">
								<i class="custom-icon-left-circle custom-icon u-font-36"></i>
							</navigator>
							<view class="header-title">订单详情</view>
						</view>
					</view>
					<!-- <view class="content-steps-wrap">
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
					</view> -->
					<view class="content-addr-info" v-if="info.list.address_id !== 0">
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
									{{info.list.coupon_guid || '无'}}
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
							<a href="http://my.i.msg.toocle.com/?_a=msg&f=detail&name=ceshi1123" target="_blank"><el-button type="primary" >{{info.button.button1_name}}</el-button></a>
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
						<view class="item-btns u-p-r-50" v-if="info.button.button5">
							<el-button type="primary" @click="handleShowAddrBox">{{info.button.button5_name}}</el-button>
						</view>
						<view class="item-btns u-p-r-50" v-if="info.button.button6">
							<el-button type="primary" @click="handleExitPayPriceMsg">{{info.button.button6_name}}</el-button>
						</view>
						<view class="item-btns u-p-r-50" v-if="info.button.button7">
							<el-button type="primary" @click="handleConfirmPayPriceMsg">{{info.button.button7_name}}</el-button>
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
		
		<el-dialog class="coupon-table" title="我的地址列表" :visible.sync="addrTableShow" width="70%">
		  <el-table height="400" :data="info.address.list" ref="addrTable" highlight-current-row @current-change="handleCurrentAddr" v-if="info.address">
		    <el-table-column property="id" label="id" width="50"></el-table-column>
			<el-table-column label="收货人" width="150">
		    	<template slot-scope="scope">
		    		<i class="el-icon-check u-m-r-10 d-danger-color" v-if="currentRow_addr.id == scope.row.id"></i>
		    		{{scope.row.name}}
		    		<view class="default-label u-m-l-10" v-if="scope.row.auto">默认</view>
		    	</template>
		    </el-table-column>
		    <el-table-column property="mobile" label="手机号" width="200"></el-table-column>
		    <el-table-column label="详细地址">
		    	<template slot-scope="scope">
		    		{{scope.row.regional_name}}{{scope.row.address}}
		    	</template>
		    </el-table-column>
		    <view slot="empty" class="empty-wrap">当前无收货地址</view>
		  </el-table>
		   <span slot="footer" class="dialog-footer u-flex u-col-top">
			  <span class="footer-sub d-theme-color u-p-r-60" style="font-size: 14px;">{{curTableAddr}}</span>
		      <el-button @click="addrTableShow = false">取 消</el-button>
		      <el-button type="primary" @click="handleConfirmAddr">确 定</el-button>
		    </span>
		</el-dialog>
		
		
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
		
		
		
		
		<el-dialog title="短信验证" :visible.sync="codeFormDialog" width="40%">
		  <el-form :model="codeForm" :rules="codeRules" ref="code" label-width="80px">
		    <el-form-item label="验证码" prop="code" required>
				<el-row >
					<el-col :span="16">
						<el-input v-model="codeForm.code"></el-input>
					</el-col>
					<el-col :span="8" class="u-p-l-20">
						 <el-button 
							style="width: 100%;" 
							type="primary" 
							plain 
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
		    </el-form-item>
		  </el-form>
		  <view slot="footer" class="dialog-footer">
			<el-button type="primary" @click="submitForm('code')">确定</el-button>
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
				// stepsActive: 3,
				colGutter: 0,
				addrData: [{
				  name: '',
				  phone: '',
				  address: ''
				}],
				time: 60*1000,
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
				couponShow: false,
				addrTableShow: false,
				pwdFormDialog: false,
				codeFormDialog: false,
				currentRow: {},
				SendMsgDisabled: false,
				currentRow_addr: {},
				couponList: [],
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
				if(!this.currentRow.id) return '当前无选择'
				let coupon = this.currentRow
				return `当前勾选【id：${coupon.id}】【${coupon.title}】优惠券。点击【确认】优惠即可生效，此行为不可撤销`
			},
			curTableAddr() {
				if(!this.currentRow_addr.id) return '当前无选择'
				let addr = this.currentRow_addr
				return `当前勾选【id：${addr.id}】为收货地址。点击【确认】即可生效，此行为不可撤销`
			}
		},
		methods: {
			async getData() {
				let res = await this.$http.get('orderDetail', {
					params: {
						order_id: this.id
					}
				})
				this.$message({
					type: 'success',
					message: '数据加载完成!'
				});
				this.addrData = [{
					  name: res.list.address_name,
					  phone: res.list.address_mobile,
					  address: res.list.address
				}]
				this.info = res
			},
			// 支付
			handlePayOrder() {
				if(true) {
					this.$confirm(`有可使用的优惠项，是否放弃优惠直接支付订单?`, '提示', {
						confirmButtonText: '狠心放弃优惠',
						cancelButtonText: '看看优惠',
						type: 'warning'
					}).then(() => {
						uni.navigateTo({
							url: `/pages/pay_tool/pay_tool?order_id=${this.id}&&coupon_id=${this.info.list.coupon_id}`
						})
					}).catch((e) => {
						this.handleShowCouponBox()
					});
				}
			},

			//取消订单
			handleExitOrderMsg() {
				this.$confirm(`是否取消订单?`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '再考虑一下',
					type: 'warning'
				}).then(async () => {
					let res = await this.$http.get('User/order_cancel', {params: {order_id: this.id}})
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
			handleShowAddrBox() {
				this.addrTableShow = !this.addrTableShow
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
			
			//选择收货地址
			handleCurrentAddr(val) {
				this.currentRow_addr = val;
			},
			async handleConfirmAddr(val) {
				uni.showLoading({
					title: '正在处理中'
				})
				let res = await this.$http.get('User/set_buy_get_type', {params: {
					buy_address_id: this.currentRow_addr.id,
					order_id: this.id
				}})
				if(res.code == 2) return false
				this.$message({
					type: 'success',
					message: '提交收货地址成功!'
				});
				this.handleShowAddrBox()
				uni.showLoading({
					title: '获取最新数据中'
				})
				await this.getData()
				
			},
			//退回订立价
			handleExitPayPriceMsg() {
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
			handleConfirmPayPriceMsg() {
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
					let baseParamsObj = {
						order_id: this.id
					}
					if(this.info.list.pay_tool == 9) {
						let res = await this.$http.get('User/sinopay_ok2', {params: baseParamsObj});
						if(res.code != 1) return;
						
					}
					else if(this.info.list.pay_tool == 2) {
						//弹出短信验证输入框
						this.codeFormDialog = true;
						this.handleSendCode()
						
						return
					}
					else {
						//弹出支付密码输入框
						this.pwdFormDialog = true;
						return
					}
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
			//发送短信验证码
			async handleSendCode() {
				if(this.SendMsgDisabled) return
				this.SendMsgDisabled = true;
				this.$nextTick(() =>{
					this.$refs.codeCountDown.start()
				})
				
				let res = await this.$http.get('User/get_mobile_code_order', {
					params: {
						order_id: this.id
					}
				})
				if(res.code != 1) return;
				this.$message({
					type: 'success',
					message: '短信验证已发送'
				});
			},
			handleCountDownFinsh() {
				this.SendMsgDisabled = false;
				this.$refs.codeCountDown.reset()
			},
			
			//验证表单
			submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						let res
						if(formName == 'code') {
							res = await this.sinopayOkByCode()
							if(res.code != 1) return;
							this.codeFormDialog = false
						}
						else if(formName == 'payPwd') {
							res = await this.sinopayOkByPwd()
							if(res.code != 1) return;
							this.pwdFormDialog = false
						}
						
						this.$message({
							type: 'success',
							message: '收货成功'
						});
						uni.showLoading({
							title: '获取最新数据中'
						})
						await this.getData()
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			async sinopayOkByPwd() {
				return await this.$http.get('User/sinopay_ok', {
					params: {
						order_id: this.id,
						psw: this.payPwdForm.pwd
					}
				})
			},
			async sinopayOkByCode() {
				return await this.$http.get('User/sinopay_ok3', {
					params: {
						order_id: this.id,
						code: this.codeForm.code
					}
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.default-label {
		font-size: 12px;
		color: #fff;
		background-color: $u-error;
		padding: 2px 8px;
		border-radius: 3px;
		display: inline-block;
		line-height: 16px;
	
	}
	.u-count-down {
		/deep/ .u-count-down__text {
			line-height: 1em;
			color: inherit;
		}
	}
	.coupon-table {
		/deep/ .el-dialog__footer {
			display: flex;
			justify-content: flex-end;
		}
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
