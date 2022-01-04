<template>
	<view  >
		<d-header></d-header>
		<view class="main u-flex u-row-center u-p-40">
			<view class="wrapper u-flex u-col-top">
				<view class="wrap-item menu">
					<d-menu :active="menuActive"></d-menu>
				</view>
				<view class="wrap-item content">
					<view class="content-header u-m-b-30">
						<view class="item-top u-flex u-row-between">
							<view class="item u-flex">
								<text>用户名：DHJSAHDJS8153，欢迎您</text>
							</view>
							<view class="item u-flex">
								<text>创建AI智能名片</text>
								<text class="d-theme-color u-p-l-20 u-p-r-20">开启营销之旅</text>
								<el-button size="mini" type="primary">立即开启</el-button>
							</view>
						</view>
						<view class="item-center u-flex u-row-between">
							<view class="i-c-avatar">
								<el-image src="../../static/img/p1.jpg" fit="fill"></el-image>
							</view>
							<view class="i-c-data u-flex u-row-around">
								<navigator url="" class="item-d u-flex">
									<view class="i-d-num">320</view>
									<view class="i-d-title">我的订单</view>
								</navigator>
								<navigator url="" class="item-d u-flex">
									<view class="i-d-num">0</view>
									<view class="i-d-title">余额</view>
								</navigator>
								<navigator url="" class="item-d u-flex">
									<view class="i-d-num">1</view>
									<view class="i-d-title">优惠券</view>
								</navigator>
							</view>
							<view class="i-c-btns u-flex">
								<navigator url="" class="item-btn">
									<el-button type="primary">在线充值</el-button>
								</navigator>
							</view>
						</view>
					</view>
					<view class="content-order u-p-40">
						<el-card class="box-card" shadow="never">
							  <div slot="header" class="clearfix">
									<span>待付款订单（3）</span>
									<el-button style="float: right; padding: 3px 0" type="text">
										<navigator url="/pages/orderList/orderList">查看全部</navigator>
									</el-button>
							  </div>
							  <div class="text item">
								  <el-table ref="orderTable" :default-expand-all="false" :data="tableData" style="width: 100%" border :header-cell-style="{
								  	background: '#f8f8f8',
								  	border: '0',
								  	fontWeight: 'normal',
								  	color: '#777'
								  }">
									<el-table-column label="订单号" prop="id" width="90px">
								  	</el-table-column>
								  	<el-table-column label="卖家" prop="c_name">
								  	</el-table-column>
								  	<el-table-column label="下单时间" prop="ctime" width="180px">
								  		<!-- <template slot-scope="scope">
								  			<view>{{scope.row.ctime.split(' ')[0]}}</view>
								  			<view>{{scope.row.ctime.split(' ')[1]}}</view>
								  		</template> -->
								  	</el-table-column>
								  	<el-table-column label="订立价" prop="pay_price" width="100px">
								  	</el-table-column>
								  	<el-table-column label="订单状态" prop="state" width="90px">
								  	</el-table-column>
								  	<el-table-column label="支付类型" prop="pay_tool" width="90px">
								  	</el-table-column>
								  	<el-table-column label="支付状态" prop="pay_status" width="90px">
								  	</el-table-column>
								  </el-table>
							  </div>
						</el-card>
						<el-card class="box-card" shadow="never">
							  <div slot="header" class="clearfix">
									<span>待发货订单（3）</span>
									<el-button style="float: right; padding: 3px 0" type="text">
										<navigator url="/pages/orderList/orderList">查看全部</navigator>
									</el-button>
							  </div>
							  <div class="text item">
								  <el-table ref="orderTable" :default-expand-all="false" :data="tableData" style="width: 100%" border :header-cell-style="{
								  	background: '#f8f8f8',
								  	border: '0',
								  	fontWeight: 'normal',
								  	color: '#777'
								  }">
									<el-table-column label="订单号" prop="id" width="90px">
								  	</el-table-column>
								  	<el-table-column label="卖家" prop="c_name">
								  	</el-table-column>
								  	<el-table-column label="下单时间" prop="ctime" width="180px">
								  		<!-- <template slot-scope="scope">
								  			<view>{{scope.row.ctime.split(' ')[0]}}</view>
								  			<view>{{scope.row.ctime.split(' ')[1]}}</view>
								  		</template> -->
								  	</el-table-column>
								  	<el-table-column label="订立价" prop="pay_price" width="100px">
								  	</el-table-column>
								  	<el-table-column label="订单状态" prop="state" width="90px">
								  	</el-table-column>
								  	<el-table-column label="支付类型" prop="pay_tool" width="90px">
								  	</el-table-column>
								  	<el-table-column label="支付状态" prop="pay_status" width="90px">
								  	</el-table-column>
								  </el-table>
							  </div>
						</el-card>
						<el-card class="box-card" shadow="never">
							  <div slot="header" class="clearfix">
									<span>待收获订单（3）</span>
									<el-button style="float: right; padding: 3px 0" type="text">
										<navigator url="/pages/orderList/orderList">查看全部</navigator>
									</el-button>
							  </div>
							  <div class="text item">
								  <el-table ref="orderTable" :default-expand-all="false" :data="tableData" style="width: 100%" border :header-cell-style="{
								  	background: '#f8f8f8',
								  	border: '0',
								  	fontWeight: 'normal',
								  	color: '#777'
								  }">
									<el-table-column label="订单号" prop="id" width="90px">
								  	</el-table-column>
								  	<el-table-column label="卖家" prop="c_name">
								  	</el-table-column>
								  	<el-table-column label="下单时间" prop="ctime" width="180px">
								  		<!-- <template slot-scope="scope">
								  			<view>{{scope.row.ctime.split(' ')[0]}}</view>
								  			<view>{{scope.row.ctime.split(' ')[1]}}</view>
								  		</template> -->
								  	</el-table-column>
								  	<el-table-column label="订立价" prop="pay_price" width="100px">
								  	</el-table-column>
								  	<el-table-column label="订单状态" prop="state" width="90px">
								  	</el-table-column>
								  	<el-table-column label="支付类型" prop="pay_tool" width="90px">
								  	</el-table-column>
								  	<el-table-column label="支付状态" prop="pay_status" width="90px">
								  	</el-table-column>
								  </el-table>
							  </div>
						</el-card>
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
				menuActive: '1-1',
				tableData: [
					{
						Order_info: "",
						address: "浙江省杭州市西湖区莫干山路187易盛大厦12楼",
						address_id: 514,
						buyGetType: "卖家送货",
						buy_get_type: 0,
						buy_name: "沈凯婷",
						c_ctime: "65180-93027",
						c_name: "杭州有意思测试有限公司杭州有意思测试有限公司",
						cid: 65180,
						coupon_guid: "",
						coupon_id: 0,
						coupon_price: 0,
						ctime: "2021-12-23 15:30:26",
						dinli_day: "2021-12-23 15:31:38",
						final_price: 0,
						final_time: "2021-12-23 15:32:34",
						from_type: "wx",
						id: 1004178,
						login: "sktsyh",
						pay_price: 5000,
						pay_price_piao: 0,
						pay_status: 5,
						pay_tool: 2,
						pay_type: 2,
						post_ip: "",
						post_time: "2021-12-23 15:33:34",
						poster_id: "sktsyh",
						product_list: [
							{
								coupon_price: 0,
								ctime: "2021-12-23 15:30:26",
								id: 9943,
								login: "sktsyh",
								model: "",
								number: 1,
								order_id: 1004178,
								p_name: "分散大红P-4G 200% 分散大红P-4G 200%",
								pay_price: 5000,
								pic1: "../../static/img/p1.jpg",
								pid: 15,
								post_ip: "",
								post_time: "2021-12-23 15:31:38",
								poster_id: "sktsyh",
								remark: "",
								sell_login: "ceshi1123",
								single_price: 5000,
								state: 1,
							},
							{
								coupon_price: 0,
								ctime: "2021-12-23 15:30:26",
								id: 9944,
								login: "sktsyh",
								model: "",
								number: 1,
								order_id: 1004178,
								p_name: "分散大红P-4G 200% 分散大红P-4G 200% 分散大红P-4G 200%",
								pay_price: 5000,
								pic1: "../../static/img/p2.jpg",
								pid: 15,
								post_ip: "",
								post_time: "2021-12-23 15:31:38",
								poster_id: "sktsyh",
								remark: "",
								sell_login: "ceshi1123",
								single_price: 5000,
								state: 1,
							},
							{
								coupon_price: 0,
								ctime: "2021-12-23 15:30:26",
								id: 222,
								login: "sktsyh",
								model: "",
								number: 1,
								order_id: 1004178,
								p_name: "分散大红P-4G 200% 分散大红P-4G 200% 分散大红P-4G 200%",
								pay_price: 5000,
								pic1: "../../static/img/p2.jpg",
								pid: 15,
								post_ip: "",
								post_time: "2021-12-23 15:31:38",
								poster_id: "sktsyh",
								remark: "",
								sell_login: "ceshi1123",
								single_price: 5000,
								state: 1,
							}
						],
						product_names: "分散大红P-4G 200%|",
						product_price: 5000,
						remark: null,
						self_time: "",
						sell_login: "ceshi1123",
						sinopay_id: "",
						state: 2,
						talk_price: 1,
						toPayState: "支付成功",
						toPayType: "货到付款",
						toState: "订单完成",
						toTools: "账期（赊账）",
						toTranState: "已收货",
						tran_day: "2021-12-23 15:32:34",
						tran_id: "sf1402442493483",
						tran_price: 0,
						tran_remark: "",
						tran_start_day: "2021-12-23 15:31:52",
						tran_state: 2,
						yourself_state: 1,
					},
					{
						Order_info: "",
						address: "浙江省杭州市西湖区莫干山路187易盛大厦12楼",
						address_id: 514,
						buyGetType: "卖家送货",
						buy_get_type: 0,
						buy_name: "沈凯婷",
						c_ctime: "65180-93027",
						c_name: "杭州有意思测试有限公司",
						cid: 65180,
						coupon_guid: "",
						coupon_id: 0,
						coupon_price: 0,
						ctime: "2021-12-23 15:30:26",
						dinli_day: "2021-12-23 15:31:38",
						final_price: 0,
						final_time: "2021-12-23 15:32:34",
						from_type: "wx",
						id: 1004179,
						login: "sktsyh",
						pay_price: 5000,
						pay_price_piao: 0,
						pay_status: 5,
						pay_tool: 2,
						pay_type: 2,
						post_ip: "",
						post_time: "2021-12-23 15:33:34",
						poster_id: "sktsyh",
						product_list: [
							{
								coupon_price: 0,
								ctime: "2021-12-23 15:30:26",
								id: 1,
								login: "sktsyh",
								model: "",
								number: 1,
								order_id: 1004178,
								p_name: "分散大红P-4G 200% 分散大红P-4G 200%",
								pay_price: 5000,
								pic1: "../../static/img/p1.jpg",
								pid: 15,
								post_ip: "",
								post_time: "2021-12-23 15:31:38",
								poster_id: "sktsyh",
								remark: "",
								sell_login: "ceshi1123",
								single_price: 5000,
								state: 1,
							},
							{
								coupon_price: 0,
								ctime: "2021-12-23 15:30:26",
								id: 2,
								login: "sktsyh",
								model: "",
								number: 1,
								order_id: 1004178,
								p_name: "分散大红P-4G 200% 分散大红P-4G 200% 分散大红P-4G 200%",
								pay_price: 5000,
								pic1: "../../static/img/p2.jpg",
								pid: 15,
								post_ip: "",
								post_time: "2021-12-23 15:31:38",
								poster_id: "sktsyh",
								remark: "",
								sell_login: "ceshi1123",
								single_price: 5000,
								state: 1,
							}
						],
						product_names: "分散大红P-4G 200%|",
						product_price: 5000,
						remark: null,
						self_time: "",
						sell_login: "ceshi1123",
						sinopay_id: "",
						state: 2,
						talk_price: 1,
						toPayState: "支付成功",
						toPayType: "货到付款",
						toState: "订单完成",
						toTools: "账期（赊账）",
						toTranState: "已收货",
						tran_day: "2021-12-23 15:32:34",
						tran_id: "sf1402442493483",
						tran_price: 0,
						tran_remark: "",
						tran_start_day: "2021-12-23 15:31:52",
						tran_state: 2,
						yourself_state: 1,
					},
					{
						Order_info: "",
						address: "浙江省杭州市西湖区莫干山路187易盛大厦12楼",
						address_id: 514,
						buyGetType: "卖家送货",
						buy_get_type: 0,
						buy_name: "沈凯婷",
						c_ctime: "65180-93027",
						c_name: "杭州有意思测试有限公司",
						cid: 65180,
						coupon_guid: "",
						coupon_id: 0,
						coupon_price: 0,
						ctime: "2021-12-23 15:30:26",
						dinli_day: "2021-12-23 15:31:38",
						final_price: 0,
						final_time: "2021-12-23 15:32:34",
						from_type: "wx",
						id: 1004180,
						login: "sktsyh",
						pay_price: 5000,
						pay_price_piao: 0,
						pay_status: 5,
						pay_tool: 2,
						pay_type: 2,
						post_ip: "",
						post_time: "2021-12-23 15:33:34",
						poster_id: "sktsyh",
						product_list: [
							{
								coupon_price: 0,
								ctime: "2021-12-23 15:30:26",
								id: 3,
								login: "sktsyh",
								model: "",
								number: 1,
								order_id: 1004178,
								p_name: "分散大红P-4G 200% 分散大红P-4G 200%",
								pay_price: 5000,
								pic1: "../../static/img/p1.jpg",
								pid: 15,
								post_ip: "",
								post_time: "2021-12-23 15:31:38",
								poster_id: "sktsyh",
								remark: "",
								sell_login: "ceshi1123",
								single_price: 5000,
								state: 1,
							},
							{
								coupon_price: 0,
								ctime: "2021-12-23 15:30:26",
								id: 4,
								login: "sktsyh",
								model: "",
								number: 1,
								order_id: 1004178,
								p_name: "分散大红P-4G 200% 分散大红P-4G 200% 分散大红P-4G 200%",
								pay_price: 5000,
								pic1: "../../static/img/p2.jpg",
								pid: 15,
								post_ip: "",
								post_time: "2021-12-23 15:31:38",
								poster_id: "sktsyh",
								remark: "",
								sell_login: "ceshi1123",
								single_price: 5000,
								state: 1,
							}
						],
						product_names: "分散大红P-4G 200%|",
						product_price: 5000,
						remark: null,
						self_time: "",
						sell_login: "ceshi1123",
						sinopay_id: "",
						state: 2,
						talk_price: 1,
						toPayState: "支付成功",
						toPayType: "货到付款",
						toState: "订单完成",
						toTools: "账期（赊账）",
						toTranState: "已收货",
						tran_day: "2021-12-23 15:32:34",
						tran_id: "sf1402442493483",
						tran_price: 0,
						tran_remark: "",
						tran_start_day: "2021-12-23 15:31:52",
						tran_state: 2,
						yourself_state: 1,
					}
				]
			}
		}, 
		computed: {
			
		},
		methods: {

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
				// background-color: #fff;
				min-height: 90vh;
				.content-header {
					background-color: #fff;
					padding: 20px;
					.item-top {
						margin-bottom: 20px;
						.item {
							background-color: #fdfdfd;
							padding: 10px;
							font-size: 12px;
							color: #666;
							border: 0.5px solid #e7e7e7;
							&:first-child {
								// border-left: 0;
								border-radius: 0 3px 3px 0;
							}
							&:last-child {
								// border-right: 0;
								border-radius: 3px 0 0 3px;
							}
						}
					}
					.item-center {
						border-radius: 100px 0 0 100px;
						background-color: #f8f8f8;
						padding: 20px;
						.i-c-avatar {
							width: 90px;
							height: 90px;
							border: 4px solid #fff;
							border-radius: 50%;
							margin-left: 60px;
							box-shadow: 0 0 5px rgba(0,0,0,.1);
							.el-image {
								width: 100%;
								height: 100%;
								border-radius: 50%;
							}
						}
						.i-c-data {
							flex: 1;
							padding: 0 20px;
							.item-d {
								flex-direction: column;
								.i-d-num {
									font-size: 28px;
									margin-bottom: 5px;
								}
								.i-d-title {
									font-size: 14px;
									color: #777;
								}
							}
						}
						.i-c-btns {
							padding-left: 50px;
							.item-btn {
								
							}
						}
					}
				}
				.content-order {
					background-color: #fff;
					.el-card {
						margin-bottom: 20px;
					}
				}
			}
		}
	}
</style>
