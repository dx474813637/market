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
							<view class="header-title">充值订单列表</view>
						</view>
					</view>
					<view class="content-table-wrap">
						<el-table :data="tableData" style="width: 100%" border v-loading="loading">
							<el-table-column prop="id" label="ID" width="100" >
							</el-table-column>
							<el-table-column prop="user_fundaccno" label="充值账户" >
							</el-table-column>
							<el-table-column prop="amount" label="金额/元" align="right" >
							</el-table-column>
							<el-table-column prop="status_name" label="状态" align="center" >
							</el-table-column>
							<el-table-column prop="ctime" label="充值时间" align="center" >
							</el-table-column>
							<el-table-column label="操作" align="center">
								<template slot-scope="scope">
									<view class="u-flex u-row-center">
										<navigator :url="`/pages/recharge_detail/recharge_detail?id=${scope.row.quick_id}`">
											<el-button type="text" size="mini">查看详情</el-button>
										</navigator>
									</view>
								</template>
							</el-table-column>
						</el-table>
					</view>
					<view class="content-page-wrap">
						<el-pagination @current-change="handleCurrentChange"
							:current-page="currentPage" :page-size="pageSize"
							layout="total, prev, pager, next, jumper" :total="total">
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
				menuActive: '3-1',
				currentPage: 1,
				tableData: [],
				loading: false,
				pageSize: 20,
				total: 0,
			}
		},
		async onLoad() {
			await this.getData()
		},
		computed: {

		},
		methods: {
			async getData() {
				this.loading = true
				let res = await this.$http.get('recharge_list', {
					params: {
						p: this.currentPage
					}
				})
				this.loading = false
				if(res.code != 1) return;
				this.tableData = res.list.list;
				this.pageSize = res.list.page_record;
				this.total = res.list.pw_rec_total
			},
			async handleCurrentChange(p) {
				this.currentPage = p;
				this.getData()
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
