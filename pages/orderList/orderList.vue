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
									<el-option label="待支付" value="1"></el-option>
									<el-option label="待交收" value="2"></el-option>
									<el-option label="已完成" value="3"></el-option>
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
						<el-table v-loading="loading" ref="orderTable" :default-expand-all="false" :data="tableData" style="width: 100%" border :header-cell-style="{
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
							<el-table-column label="下单时间" prop="ctime" width="180px" align="right">
								<!-- <template slot-scope="scope">
									<view>{{scope.row.ctime.split(' ')[0]}}</view>
									<view>{{scope.row.ctime.split(' ')[1]}}</view>
								</template> -->
							</el-table-column>
							<el-table-column label="订立价" width="150px" align="right">
								<template slot-scope="scope">
									<view class="">{{scope.row.pay_price | toFixed2}} 元</view>
								</template>
							</el-table-column>
							<el-table-column label="订单状态" prop="toState" width="120px" align="right">
							</el-table-column>
							<el-table-column label="支付类型" prop="toPayType" width="100px" align="right">
								<template slot-scope="scope">
									<view>{{scope.row.toTools}}</view>
									<view>{{scope.row.toPayType}}</view>
								</template>
							</el-table-column>
							<!-- <el-table-column label="支付状态" prop="toPayState" width="100px">
							</el-table-column> -->
							<el-table-column label="操作" width="90px" align="right">
								<template slot-scope="scope">
									<navigator :url="`/pages/orderDetail/orderDetail?id=${scope.row.id}`">
										<el-button type="text" >{{scope.row.toPayState}}</el-button>
									</navigator>
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
				pageSize: 10,
				resNum: 0,
				form: {
					orderid: '',
					wpname: '',
					goodsname: '',
					status: '0',
					date: '',
				},
				allListOpen: true,
				currentPage: 1,
				type: '0',
				tableData: [],
				loading: false
			}
		},
		async onLoad(opt) {
			if(opt && opt.hasOwnProperty('type')) {
				this.type = opt.type;
				this.form.status = opt.form.status
			}
			await this.getData()
			
		},
		computed: {
			params() {
				let obj = {
					type: this.type,
					p: this.currentPage
				}
				return obj
			}
		},
		methods: {
			async getData() {
				this.loading = true;
				let data = await this.$http.get('order.html', {
					params: this.params
				})
				this.tableData = data.list.list_order;
				this.resNum = data.list.pw_rec_total;
				this.pageSize = data.list.page_record;
				this.currentPage = data.list.pw_curr_page;
				this.loading = false;
				this.$nextTick(() => {
					this.handleAllList(this.allListOpen)
				})
			},
			handleAllList(flag) {
				let f 
				if((flag === true || flag === false)) {
					f = flag
				}else {
					this.allListOpen = !this.allListOpen
					f = this.allListOpen
				}
				
				this.tableData.forEach(row => {
					this.$refs.orderTable.toggleRowExpansion(row, f)
				})
				
			},
			async onSubmit() {
				this.currentPage = 1;
				this.type = this.form.status
				await this.getData()
			},
			async handleCurrentChange(val) {
				this.currentPage = val
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
