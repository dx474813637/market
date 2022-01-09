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
							<view class="header-title">优惠券管理</view>
						</view>
						<view class="c-h-item u-flex">
							<el-link type="primary">领取更多优惠劵</el-link>
						</view>
					</view>
					<!-- <view class="content-btn-wrap">
						<u-subsection activeColor="#ed5656" fontSize="14" :list="btnlist" mode="button" :current="btnIndex" @change="handlechangeBtnsIndex"></u-subsection>
					</view> -->
					
					<view class="content-list-wrap u-flex u-flex-wrap">
						<view class="list-item" v-for="item in dataList" :key="item.id">
							<d-coupon-card :list="item"></d-coupon-card>
						</view>
					</view>
					<!-- <div class="content-page-wrap">
						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
							:current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100"
							layout="total, sizes, prev, pager, next, jumper" :total="400">
						</el-pagination>
					</div> -->
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				menuActive: '2-4',
				dialogFormVisible: false,
				btnIndex: 0,
				currentPage: 1,
				btnlist: ['全部', '未使用', '已使用', '已过期'],
				dataList: []
			}
		},
		async onLoad() {
			uni.showLoading()
			this.getData()
		},
		methods: {
			async getData() {
				let res = await this.$http.get('User/coupon')
				if(res.code != 1) return;
				this.dataList = res.list.list
			},
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
						width: 19%;
						flex: 0 0 19%;
						margin-right: 1%;
						margin-bottom: 1%;
						
					
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
