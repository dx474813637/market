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
							<view class="header-title">赊账管理</view>
						</view>
						<view class="c-h-item u-flex">
							<navigator url="/pages/orderList/orderList">
								<el-button type="text">现金订单列表</el-button>
							</navigator>
						</view>
					</view>
					<div class="content-filter-wrap">
						<el-form :inline="true" :model="form" class="demo-form-inline" size="medium"
							label-width="4.5rem" label-position="left">
							
							<el-form-item label="支付状态">
								<el-select v-model="form.pay_status">
									<el-option label="全部" value="99"></el-option>
									<el-option label="未还款" value="0"></el-option>
									<el-option label="已还款" value="5"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="逾期状态">
								<el-select v-model="form.over_status">
									<el-option label="全部" value="99"></el-option>
									<el-option label="未逾期" value="0"></el-option>
									<el-option label="已逾期" value="1"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="onSubmit">查询</el-button>
							</el-form-item>
						</el-form>
					</div>
					<div class="content-table-wrap">
						<el-table v-loading="loading" ref="creditTable"  :data="tableData" style="width: 100%" border :header-cell-style="{
							background: '#f8f8f8',
							border: '0',
							fontWeight: 'normal',
							color: '#777'
						}">
							<el-table-column label="id" prop="id" width="65px"></el-table-column>
							<el-table-column label="卖家" prop="c_name"></el-table-column>
							<el-table-column label="赊账金额" width="130px" align="right">
								<template slot-scope="scope">
									<view class="">{{scope.row.final_price | toFixed2}} 元</view>
								</template>
							</el-table-column>
							<el-table-column label="创建时间" prop="ctime" align="right" width="180px"></el-table-column>
							<el-table-column label="赊账到期日" width="110px" prop="end_day" align="right"></el-table-column>
							<el-table-column label="支付状态" width="90px" align="right">
									<template slot-scope="scope">
										<view class="">{{scope.row.pay_status_name}}</view>
									</template>
							</el-table-column>
							<el-table-column label="逾期状态" width="90px" align="right">
									<template slot-scope="scope">
										<view class="">{{scope.row.over_status_name}}</view>
									</template>
							</el-table-column>
							<el-table-column label="操作" width="145px" align="right">
								<template slot-scope="scope">
									<view class="u-flex u-row-right">
										<navigator :url="`/pages/orderDetail/orderDetail?id=${scope.row.order_id}`">
											<el-button type="text" >订单详情</el-button>
										</navigator>
										<navigator class="u-m-l-10" :url="`/pages/creditDetail/creditDetail?id=${scope.row.id}`">
											<el-button type="text" >赊账详情</el-button>
										</navigator>
									</view>
									
								</template>
							</el-table-column>
						</el-table>
					</div>
					<div class="content-page-wrap">
						<el-pagination @current-change="handleCurrentChange"
							:current-page="currentPage" :page-size="pageSize"
							layout="total, prev, pager, next, jumper" :total="resNum">
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
				pageSize: 15,
				resNum: 0,
				form: {
					pay_status: '99',
					over_status: '99',
				},
				type: {
					pay_status: '99',
					over_status: '99',
				},
				
				allListOpen: true,
				currentPage: 1,
				tableData: [],
				loading: false
			}
		},
		async onLoad(opt) {
			await this.getData()
			
		},
		computed: {
			params() {
				let obj = {
					pay_status: this.type.pay_status,
					over_status: this.type.over_status,
					p: this.currentPage,
					
				}
				return obj
			}
		},
		methods: {
			async getData() {
				this.loading = true;
				let data = await this.$http.get('credit', {
					params: this.params
				})
				this.tableData = data.list.list;
				this.resNum = data.list.pw_rec_total;
				this.pageSize = data.list.page_record;
				this.currentPage = data.list.pw_curr_page;
				this.loading = false;
			},
			async onSubmit() {
				this.currentPage = 1;
				this.type = this.form
				await this.getData()
			},
			async handleCurrentChange(val) {
				this.currentPage = val
				this.form = this.type
				await this.getData()
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
					.el-table {
						min-height: 50vh;
					}
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
