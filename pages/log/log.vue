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
							<view class="header-title">登录明细</view>
						</view>
					</view>
					<div class="content-filter-wrap">
						<el-form :inline="true" :model="form" class="demo-form-inline" size="medium">
							<el-form-item label="日期筛选">
								<el-date-picker v-model="form.date" type="daterange" range-separator="至"
									start-placeholder="开始日期" end-placeholder="结束日期">
								</el-date-picker>
							</el-form-item>
							<el-form-item label="状态">
								<el-select v-model="form.status" placeholder="状态">
									<el-option label="全部记录" value="0"></el-option>
									<el-option label="成功纪录" value="1"></el-option>
									<el-option label="失败纪录" value="2"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="onSubmit">查询</el-button>
							</el-form-item>
						</el-form>
					</div>
					<div class="content-table-wrap">
						<el-table :data="tableData" style="width: 100%" border>
							<el-table-column prop="time" label="登录时间">
							</el-table-column>
							<el-table-column prop="ip" label="登录IP">
							</el-table-column>
							<el-table-column prop="status" label="状态">
							</el-table-column>
							<el-table-column prop="remarks" label="备注">
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
				menuActive: 'log',
				form: {
					date: '',
					status: '0'
				},
				currentPage: 2,
				tableData: [{
					time: '2021-12-24 13:38:18',
					ip: '156.23.9.12',
					status: '1',
					remarks: ''
				}, {
					time: '2021-12-24 13:38:18',
					ip: '156.23.9.12',
					status: '1',
					remarks: ''
				}, {
					time: '2021-12-24 13:38:18',
					ip: '156.0.9.12',
					status: '1',
					remarks: ''
				}, {
					time: '2021-12-24 13:38:18',
					ip: '321.23.9.2',
					status: '1',
					remarks: ''
				}, {
					time: '2021-12-24 13:38:18',
					ip: '156.23.9.12',
					status: '1',
					remarks: ''
				}, {
					time: '2021-12-24 13:38:18',
					ip: '156.23.1.12',
					status: '1',
					remarks: ''
				}, {
					time: '2021-12-24 13:38:18',
					ip: '100.23.9.12',
					status: '2',
					remarks: '账户密码错误'
				}, {
					time: '2021-12-23 15:38:18',
					ip: '156.23.9.12',
					status: '1',
					remarks: ''
				}, {
					time: '2021-12-23 13:38:18',
					ip: '216.23.9.12',
					status: '1',
					remarks: ''
				}, {
					time: '2021-12-22 13:38:18',
					ip: '156.23.9.12',
					status: '2',
					remarks: ''
				}, ],

			}
		},
		onLoad() {

		},
		methods: {
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
				}

				.content-table-wrap {
					padding: 0 30px 10px;
				}
				.content-page-wrap {
					padding: 10px 30px 30px;
				}
			}
		}
	}
</style>
