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
							<el-table-column label="收货信息 - 卖家送货">
								<el-table-column prop="name" label="收货人" width="200">
								</el-table-column>
								<el-table-column prop="phone" label="手机" width="200">
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
									<a href="" target="_blank">
										<el-button type="primary" plain size="mini" icon="" >联系卖家</el-button>
									</a>
									
								</view>
								<view class="item u-flex">
									<el-button type="danger" plain size="mini" icon="" @click="handleExitOrder">取消订单</el-button>
								</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle" :gutter="colGutter">
							<el-col :span="5" class="order-label-col">
								<view class="order-label">产品总价</view>
							</el-col>
							<el-col>
								<view class="order-info">{{info.list.pay_price}}</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle" :gutter="colGutter">
							<el-col :span="5" class="order-label-col">
								<view class="order-label">运费</view>
							</el-col>
							<el-col>
								<view class="order-info">{{info.list.pay_price}}</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle" :gutter="colGutter">
							<el-col :span="5" class="order-label-col">
								<view class="order-label">订立现金价格</view>
							</el-col>
							<el-col>
								<view class="order-info">{{info.list.pay_price}}</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle" :gutter="colGutter">
							<el-col :span="5" class="order-label-col">
								<view class="order-label">订单状态</view>
							</el-col>
							<el-col>
								<view class="order-info">{{info.list.pay_price}}</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle" :gutter="colGutter">
							<el-col :span="5" class="order-label-col">
								<view class="order-label">用户支付状态</view>
							</el-col>
							<el-col>
								<view class="order-info u-flex">
									{{info.list.pay_price}}
									<el-button type="primary" class="u-m-l-30" size="mini" @click="codeFormDialog = true">确认收货</el-button>
								</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle" :gutter="colGutter">
							<el-col :span="5" class="order-label-col">
								<view class="order-label">支付工具</view>
							</el-col>
							<el-col>
								<view class="order-info">{{info.list.pay_price}}</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle" :gutter="colGutter">
							<el-col :span="5" class="order-label-col">
								<view class="order-label">支付方式</view>
							</el-col>
							<el-col>
								<view class="order-info">{{info.list.pay_price}}</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle" :gutter="colGutter">
							<el-col :span="5" class="order-label-col">
								<view class="order-label">优惠券</view>
							</el-col>
							<el-col>
								<view class="order-info u-flex">
									{{info.list.pay_price}}
									<el-button type="primary" class="u-m-l-30" size="mini" @click="handleShowCouponBox">使用优惠</el-button>
								</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle" :gutter="colGutter">
							<el-col :span="5" class="order-label-col">
								<view class="order-label">支付金额</view>
							</el-col>
							<el-col>
								<view class="order-info u-flex">
									{{info.list.pay_price}}
									<el-button type="primary" class="u-m-l-30" size="mini" @click="handlePayOrder">支付订单</el-button>
								</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle" :gutter="colGutter">
							<el-col :span="5" class="order-label-col">
								<view class="order-label">赊账账期</view>
							</el-col>
							<el-col>
								<view class="order-info">{{info.list.pay_price}}</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle" :gutter="colGutter">
							<el-col :span="5" class="order-label-col">
								<view class="order-label">是否签约</view>
							</el-col>
							<el-col>
								<view class="order-info">{{info.list.pay_price}}</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle" :gutter="colGutter">
							<el-col :span="5" class="order-label-col">
								<view class="order-label">发货状态</view>
							</el-col>
							<el-col>
								<view class="order-info">{{info.list.pay_price}}</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle" :gutter="colGutter">
							<el-col :span="5" class="order-label-col">
								<view class="order-label">收货时间</view>
							</el-col>
							<el-col>
								<view class="order-info">{{info.list.pay_price}}</view>
							</el-col>
						</el-row>
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
											<view>规格型号：{{scope.row.model}}</view>
										</view>
									</template>
								</el-table-column>
								<el-table-column prop="single_price" label="产品单价" width="160" align="right">
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
		  <el-table height="400" :data="couponList" ref="couponTable" highlight-current-row @current-change="handleCurrentChange">
		    <el-table-column property="id" label="id" width="150"></el-table-column>
		    <el-table-column property="title" label="优惠劵名称" width="200"></el-table-column>
		    <el-table-column label="优惠度">
				<template slot-scope="scope">
					{{scope.row.coupon}}
				</template>
			</el-table-column>
		    <el-table-column label="优惠期">
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
				timestamp: new Date().getTime(),
				stepsActive: 3,
				colGutter: 0,
				addrData: [{
				  name: '王小虎',
				  phone: '18700000000',
				  address: '浙江省杭州市西湖区莫干山路187易盛大厦12楼'
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
					list: {
						Order_info: "",
						address: "",
						address_id: -1,
						address_mobile: null,
						address_name: null,
						address_re: "[]",
						buyGetType: "卖家送货",
						buy_get_type: 0,
						buy_name: "沈凯婷",
						c_name: "杭州有意思测试有限公司",
						cid: 65180,
						company: {
							c_ctime: "65180-93027",
							name: "杭州有意思测试有限公司",
						},
						coupon_guid: "",
						coupon_id: 0,
						coupon_price: 0,
						ctime: "2021-12-22 16:59:22",
						dinli_day: "0000-00-00 00:00:00",
						final_price: 0,
						final_time: null,
						from_type: "new_m",
						id: 1004127,
						list_product: [
							{
								coupon_price: 0,
								ctime: "2021-12-22 16:59:22",
								id: 9820,
								login: "sktsyh",
								model: "dasda 300$#@",
								number: 1,
								order_id: 1004127,
								p_name: "涤纶POY半光(50D/36F)涤纶POY半光(50D/36F)涤纶POY半光(50D/36F)涤纶POY半光(50D/36F)涤纶POY半光(50D/36F)涤纶POY半光(50D/36F)涤纶POY半光(50D/36F)",
								pay_price: 0,
								pic1: "../../static/img/p1.jpg",
								pic2: "",
								pic3: "",
								pic4: "",
								pic5: "",
								pid: 2866,
								post_ip: "",
								post_time: "2021-12-22 16:59:22",
								poster_id: "sktsyh",
								remark: "",
								sell_login: "ceshi1123",
								single_price: 0,
								state: 0,
							}
						],
						login: "sktsyh",
						other: "",
						pay_price: 0,
						pay_price_piao: 0,
						pay_status: 0,
						pay_status_zdy: 9,
						pay_tool: 1,
						pay_type: 0,
						post_ip: "",
						post_time: "2021-12-22 16:59:22",
						poster_id: "sktsyh",
						product_names: "涤纶POY半光(50D/36F)|",
						product_price: 0,
						remark: null,
						self_time: "",
						sell_login: "ceshi1123",
						sinopay_id: "",
						sinopay_pay_pass: 1,
						state: 0,
						talk_price: 1,
						toAgreement: "不签约",
						toPayState: "等待支付",
						toPayType: "担保支付",
						toState: "待议价",
						toTools: "现金",
						toTranState: "未发货",
						tran_day: "0000-00-00 00:00:00",
						tran_id: "",
						tran_price: 0,
						tran_remark: "",
						tran_start_day: "0000-00-00 00:00:00",
						tran_state: 0,
						xcx_status_zzzz: "等待支付",
						yourself_state: 0,
					}
				}
			}
		},
		onLoad(opt) {
			if(opt && opt.id) {
				this.id = opt.id
			}
			this.timestamp = new Date().getTime()
		},
		computed: {
			curTableCoupon() {
				if(!this.currentRow) return '当前无选择'
				let coupon = this.currentRow
				return `当前勾选【id：${coupon.id}】【${coupon.title}】优惠券。点击【确认】优惠即可生效，此行为不可撤销`
			}
		},
		methods: {
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
			handleExitOrder() {
				this.$confirm(`是否取消订单?`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '在考虑一下',
					type: 'warning'
				}).then(() => {
					
					this.$message({
						type: 'success',
						message: '取消订单!'
					});
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
				console.log(val)
				this.currentRow = val;
			},
			handleConfirmCoupon() {
				this.$message({
					type: 'success',
					message: '优惠券使用成功!'
				});
				this.handleShowCouponBox()
			}
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
