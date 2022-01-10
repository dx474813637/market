<template>
	<view>
		<d-header></d-header>
		<view class="main u-flex u-row-center u-p-40">
			<view class="wrapper u-flex u-col-top">
				<view class="wrap-item menu">
					<d-menu :active="menuActive"></d-menu>
				</view>
				<view class="wrap-item content">
					<view class="content-header u-flex u-row-between u-border-bottom u-m-b-30">
						<view class="c-h-item u-flex">
							<navigator open-type="navigateBack" class="u-m-r-20 d-theme-color">
								<i class="custom-icon-left-circle custom-icon u-font-36"></i>
							</navigator>
							<view class="header-title">绑定提现银行卡列表</view>
						</view>
						<view class="c-h-item u-flex">
							<navigator url="/pages/bankcard_bind/bankcard_bind">绑定提现银行账户</navigator>
						</view>
					</view>
					
					<view class="content-list-wrap u-flex u-flex-wrap">
						<navigator url="/pages/bankcard_detail/bankcard_detail" class="list-item" v-for="item in dataList" :key="item.id">
							<d-bank-card cardNum="" bankName="中国工商银行"></d-bank-card>
						</navigator>
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
				dialogFormVisible: false,
				btnIndex: 0,
				currentPage: 1,
				btnlist: ['全部', '未使用', '已使用', '已过期'],
				dataList: []
			}
		},
		onLoad() {

		},
		methods: {
			handlechangeBtnsIndex(index) {
				this.btnIndex = index
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
	.el-cascader {
		width: 100%;
	}

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
				.content-btn-wrap {
					width: 400px;
					padding: 10px 30px;
					cursor: default;
					.u-subsection--button {
						height: 40px;
					}
				}
				
				.content-page-wrap {
					padding: 10px 30px 30px;
				}
				.content-list-wrap {
					padding: 10px 30px;
					.list-item {
						width: 30%;
						flex: 0 0 30%;
						margin-right: 5%;
						margin-bottom: 3%;
						&:nth-of-type(3n) {
							margin-right: 0;
						}
					
						.box-card {
							
						}
					
						.header-w {
							flex-direction: column;
							.h-item {
								.price-num {
									font-size: 25px;
									font-weight: bold;
								}
							}
						}
					}
				}

				
			}
		}
	}
</style>
