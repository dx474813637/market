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
							<view class="header-title">订单管理</view>
						</view>
					</view>
					<div class="content-filter-wrap">
						<el-form :inline="true" :model="form" class="demo-form-inline" size="medium"
							label-width="4.5rem" label-position="left">
							<el-form-item label="订单号">
								<el-input v-model="form.orderid" clearable></el-input>
							</el-form-item>
							<el-form-item label="旺铺名称">
								<el-input v-model="form.wpname" clearable></el-input>
							</el-form-item>
							<el-form-item label="产品名称">
								<el-input v-model="form.goodsname" clearable></el-input>
							</el-form-item>
							<el-form-item label="订单状态">
								<el-select v-model="form.status">
									<el-option label="全部" value="0"></el-option>
									<el-option label="等待议价" value="1"></el-option>
									<el-option label="订单已订立" value="2"></el-option>
									<el-option label="订单已完成" value="3"></el-option>
									<el-option label="订单已取消" value="4"></el-option>
									<el-option label="等待确认" value="5"></el-option>
									<el-option label="等待确认收货地址" value="6"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="日期筛选">
								<el-date-picker v-model="form.date" type="daterange" range-separator="至"
									start-placeholder="开始日期" end-placeholder="结束日期">
								</el-date-picker>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="onSubmit">查询</el-button>
							</el-form-item>
						</el-form>
					</div>
					<div class="content-table-wrap">
						<el-table ref="orderTable" :default-expand-all="false" :data="tableData" style="width: 100%" border :header-cell-style="{
							background: '#f8f8f8',
							border: '0',
							fontWeight: 'normal',
							color: '#777'
						}">
							<el-table-column type="expand">
								 <template slot="header" slot-scope="scope">
									 <view class="all-open" @click="handleAllList" title="展开所有订单清单">
										<i :class="{
											'el-icon-document-remove': allListOpen,
											'el-icon-document-add': !allListOpen
										}"></i>
									 </view>
									 
								</template>
								<template slot-scope="props">
									<view class="expand-box u-m-l-14 u-p-l-80 u-p-r-20 u-p-b-40 u-flex u-flex-wrap">
										<el-row type="flex" align="top"  class="table-row-prodList" v-for="item in props.row.product_list" :key="item.id">
											<el-col :span="4" class="img-w u-flex u-row-center">
												<el-image class="prod-img" fit="cover" :src="item.pic1"></el-image>
											</el-col>
											<el-col :span="12">
												<view class="prod-title u-line-2">{{item.p_name}}</view>
											</el-col>
											<el-col :span="5">
												<view class="prod-price">¥ {{item.single_price}}</view>
											</el-col>
											<el-col :span="3">
												<view class="prod-num">× {{item.number}}</view>
											</el-col>
										</el-row>
									</view>
									
								</template>
							</el-table-column>
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
							<el-table-column label="操作" width="90px">
								<template slot-scope="scope">
									<navigator :url="`/pages/orderDetail/orderDetail?id=${scope.row.id}`">
										<el-button type="text" >订单详情</el-button>
									</navigator>
								</template>
							</el-table-column>
						</el-table>
					</div>
					<div class="content-page-wrap">
						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
							:current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100"
							layout="total, sizes, prev, pager, next, jumper" :total="400">
						</el-pagination>
					</div>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				menuActive: '2-1',
				form: {
					orderid: '',
					wpname: '',
					goodsname: '',
					status: '0',
					date: '',
				},
				allListOpen: false,
				currentPage: 1,
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
		onLoad() {

		},
		methods: {
			handleAllList() {
				this.allListOpen = !this.allListOpen
				this.tableData.forEach(row => {
					this.$refs.orderTable.toggleRowExpansion(row, this.allListOpen)
				})
				
			},
			onSubmit() {
				console.log('submit!');
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			}
		}
	}
</script>

<style scoped lang="scss">
	.table-row-prodList {
		width: 49%;
		flex: 0 0 49%;
		margin-left: 2%;
		margin-bottom: 1%;
		background-color: lighten($theme-color, 41%);
		border-radius: 5px;
		&:nth-of-type(2n-1) {
			margin-left: 0;
		}
		.el-col {
			padding: 10px;
			max-height: 100px;
			
		}
		.img-w {
			
		}
		.prod-img {
			height: 60px;
			width: 60px;
			border-radius: 4px;
		}
		.prod-title {
			
		}
		.prod-price {
			color: red;
		}
		.prod-num {
			color: #666;
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

				.content-filter-wrap {
					padding: 20px 30px 0;

					.el-form-item {}
				}

				.content-table-wrap {
					padding: 0 30px 10px;
					.all-open {
						font-size: 16px;
						cursor: pointer;
					}
					.expand-box {
						// background-color: #fdfdfd;
					}
				}

				.content-page-wrap {
					padding: 10px 30px 30px;
				}
			}
		}
	}
</style>
