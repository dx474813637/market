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
						<el-table :data="tableData" style="width: 100%" border v-loading="loading">
							<el-table-column prop="c_name" label="卖家">
							</el-table-column>
							<el-table-column prop="pay_price" label="订单金额/元" align="center">
							</el-table-column>
							<el-table-column prop="final_price" label="实际支付/元" align="center">
							</el-table-column>
							<el-table-column prop="dinli_day" label="支付时间" align="center">
							</el-table-column>
							<el-table-column label="操作" align="center">
								<template slot-scope="scope">
									<view class="u-flex u-row-center">
										<navigator :url="`/pages/billDetail/billDetail?id=${scope.row.id}`">
											<el-button type="text" size="mini">查看详情</el-button>
										</navigator>
									</view>
								</template>
							</el-table-column>
						</el-table>
					</div>
					<div class="content-page-wrap">
						<el-pagination @current-change="handleCurrentChange"
							:current-page="currentPage" :page-size="pageSize"
							layout="total, prev, pager, next, jumper" :total="total">
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
				tableData: [],
				pageSize: 20,
				total: 0,
				loading: false,
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
				let res = await this.$http.get('bill2', {
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
