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
							<view class="header-title">现金账户列表</view>
						</view>
					</view>
					<view class="content-sinopay">
						<el-table :data="tableData" border style="width: 100%">
							<el-table-column prop="name" label="户名">
							</el-table-column>
							<el-table-column prop="id" label="用户现金账户">
							</el-table-column>
							<el-table-column prop="type" label="现金账户类型">
							</el-table-column>
							<el-table-column prop="p1" label="可用余额">
							</el-table-column>
							<el-table-column prop="p2" label="冻结金额">
							</el-table-column>
							<el-table-column prop="p3" label="可提余额">
							</el-table-column>
							<el-table-column prop="id2" label="关联同名现金账户">
							</el-table-column>
							<el-table-column prop="status" label="现金账户状态">
							</el-table-column>
							<el-table-column label="详情">
								<template slot-scope="scope">
									<navigator :url="`/pages/sinopay_account/sinopay_account?id=${scope.row.id}`">
										<el-button type="primary" size="mini" plain>详情</el-button>
									</navigator>
								</template>
							</el-table-column>
						</el-table>
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
				tableData: [
					{
						name: '沈凯婷',
						id: '1100000190',
						type: '1',
						p1: '321',
						p2: '321',
						p3: '123',
						id2: '1100000187',
						status: '1',
					},
					{
						name: '沈凯婷',
						id: '1100000187',
						type: '2',
						p1: '1',
						p2: '32',
						p3: '12',
						id2: '1100000190',
						status: '1',
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

				.content-sinopay {
					padding: 20px 30px;

					.el-row {
						border-left: 0.5px solid #e7e7e7;
						border-right: 0.5px solid #e7e7e7;
						border-top: 0.5px solid #e7e7e7;

						&:last-child {
							border-bottom: 0.5px solid #e7e7e7;
						}

						.el-col {
							padding: 5px 10px;
							line-height: 20px;
							min-height: 45px;
							display: flex;
							align-items: center;
							font-size: 14px;
							border-right: 0.5px solid #e7e7e7;

							&:last-child {
								border-right: 0;
							}

							&.sinopay-label-col {
								background-color: #F5F7FA;
								border-right: 0.5px solid #e7e7e7;
								color: #666;

								&.title .sinopay-label {
									color: #333;
									margin-right: 15px;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
