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
							<view class="header-title">买家现金支付订单列表</view>
						</view>
					</view>
					<div class="content-table-wrap">
						<el-table :data="tableData" style="width: 100%" border>
							<el-table-column prop="name" label="卖家">
							</el-table-column>
							<el-table-column prop="p1" label="订单金额/元" width="100">
							</el-table-column>
							<el-table-column prop="p2" label="实际支付/元" width="100">
							</el-table-column>
							<el-table-column prop="time" label="下单时间">
							</el-table-column>
							<el-table-column prop="type" label="支付工具" width="100">
							</el-table-column>
							<el-table-column prop="status" label="支付状态" width="100">
							</el-table-column>
							<el-table-column label="操作" align="right">
								<template slot-scope="scope">
									<view class="u-flex u-row-right">
										<navigator :url="`/pages/orderDetail/orderDetail?id=${scope.row.orderid}`">
											<el-button type="text" size="mini">查看订单</el-button>
										</navigator>
										<text class="u-p-10">-</text>
										<navigator :url="`/pages/orderDetail/orderDetail?id=${scope.row.orderid}`">
											<el-button type="text" size="mini">查看电子回单</el-button>
										</navigator>
									</view>
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
				menuActive: '3-4',
				currentPage: 1,
				tableData: [
					{
						name: '杭州有意思测试有限公司',
						p1: 123,
						p2: 231,
						time: '2021-12-22 14:44:26',
						type: '现金',
						status: '支付成功'
					},
					{
						name: '杭州有意思测试有限公司',
						p1: 123,
						p2: 231,
						time: '2021-12-22 14:44:26',
						type: '现金',
						status: '支付成功'
					},
					{
						name: '杭州有意思测试有限公司',
						p1: 123,
						p2: 231,
						time: '2021-12-22 14:44:26',
						type: '现金',
						status: '支付成功'
					},
					{
						name: '杭州有意思测试有限公司',
						p1: 123,
						p2: 231,
						time: '2021-12-22 14:44:26',
						type: '现金',
						status: '支付成功'
					},
					{
						name: '杭州有意思测试有限公司',
						p1: 123,
						p2: 231,
						time: '2021-12-22 14:44:26',
						type: '现金',
						status: '支付成功'
					},
					{
						name: '杭州有意思测试有限公司',
						p1: 123,
						p2: 231,
						time: '2021-12-22 14:44:26',
						type: '现金',
						status: '支付成功'
					},
					{
						name: '杭州有意思测试有限公司',
						p1: 123,
						p2: 231,
						time: '2021-12-22 14:44:26',
						type: '现金',
						status: '支付成功'
					},
					{
						name: '杭州有意思测试有限公司',
						p1: 123,
						p2: 231,
						time: '2021-12-22 14:44:26',
						type: '现金',
						status: '支付成功'
					},
					{
						name: '杭州有意思测试有限公司',
						p1: 123,
						p2: 231,
						time: '2021-12-22 14:44:26',
						type: '现金',
						status: '支付成功'
					},
					{
						name: '杭州有意思测试有限公司',
						p1: 123,
						p2: 231,
						time: '2021-12-22 14:44:26',
						type: '现金',
						status: '支付成功'
					},
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
				.content-table-wrap {
					padding: 20px 30px 10px;
				}
				.content-page-wrap {
					padding: 10px 30px 30px;
				}
			}
		}
	}
</style>
