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
							<view class="header-title">提现订单列表</view>
						</view>
						<view class="c-h-item u-flex">
							<navigator url="/pages/recharge_list/recharge_list" class="u-m-r-20 u-font-26 d-theme-color">
								<text class="u-p-r-10">充值记录</text>
								<i class="custom-icon-right-circle custom-icon u-font-30"></i>
							</navigator>
						</view>
					</view>
					<view class="content-table-wrap">
						<el-table :data="tableData" style="width: 100%" border>
							<el-table-column prop="id" label="ID" width="100">
							</el-table-column>
							<el-table-column prop="a" label="提现现金账户">
							</el-table-column>
							<el-table-column prop="id2" label="提现订单号" >
							</el-table-column>
							<el-table-column prop="p1" label="提现金额" >
							</el-table-column>
							<el-table-column prop="bankid" label="银行卡号" >
							</el-table-column>
							<el-table-column prop="time" label="申请时间" >
							</el-table-column>
							<el-table-column label="提现状态" width="200">
								<template slot-scope="scope">
									<template v-if="scope.row.status == 1">
										提现成功
									</template>
									<template v-else-if="scope.row.status == 2">
										<view class="u-flex">
											<text class="u-p-r-20">等待提现</text>
											<el-button type="primary" plain size="mini">点击提现</el-button>
										</view>
									</template>
									<template v-else>
										提现已取消
									</template>
								</template>
							</el-table-column>
							<el-table-column label="操作" align="right" width="100">
								<template slot-scope="scope">
									<view class="u-flex u-row-right">
										<navigator url="/pages/withdrawal_detail/withdrawal_detail">
											<el-button type="primary" size="mini">查看</el-button>
										</navigator>
									</view>
								</template>
							</el-table-column>
						</el-table>
					</view>
					<view class="content-page-wrap">
						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
							:current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100"
							layout="total, sizes, prev, pager, next, jumper" :total="400">
						</el-pagination>
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
				menuActive: '3-3',
				currentPage: 1,
				tableData: [
					{
						id: 123,
						id2: 123,
						a: '1100000190',
						bankid: '955****4237714',
						p1: 1234,
						status: '1',
						time: '2021-11-17 09:36:48'
					},
					{
						id: 123,
						id2: 123,
						a: '1100000190',
						bankid: '955****4237714',
						p1: 1234,
						status: '2',
						time: '2021-11-17 09:36:48'
					},
					{
						id: 123,
						id2: 123,
						a: '1100000190',
						bankid: '955****4237714',
						p1: 1234,
						status: '3',
						time: '2021-11-17 09:36:48'
					},
					{
						id: 123,
						id2: 123,
						a: '1100000190',
						bankid: '955****4237714',
						p1: 1234,
						status: '1',
						time: '2021-11-17 09:36:48'
					},
					{
						id: 123,
						id2: 123,
						a: '1100000190',
						bankid: '955****4237714',
						p1: 1234,
						status: '2',
						time: '2021-11-17 09:36:48'
					},
					{
						id: 123,
						id2: 123,
						a: '1100000190',
						bankid: '955****4237714',
						p1: 1234,
						status: '3',
						time: '2021-11-17 09:36:48'
					},
					{
						id: 123,
						id2: 123,
						a: '1100000190',
						bankid: '955****4237714',
						p1: 1234,
						status: '1',
						time: '2021-11-17 09:36:48'
					},
					{
						id: 123,
						id2: 123,
						a: '1100000190',
						bankid: '955****4237714',
						p1: 1234,
						status: '2',
						time: '2021-11-17 09:36:48'
					},
					{
						id: 123,
						id2: 123,
						a: '1100000190',
						bankid: '955****4237714',
						p1: 1234,
						status: '3',
						time: '2021-11-17 09:36:48'
					},
				]
			}
		},
		computed: {

		},
		methods: {}
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
