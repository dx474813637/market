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
					<view class="content-btn-wrap">
						<u-subsection activeColor="#ed5656" fontSize="14" :list="btnlist" mode="button" :current="btnIndex" @change="handlechangeBtnsIndex"></u-subsection>
					</view>
					
					<view class="content-list-wrap u-flex u-flex-wrap">
						<view class="list-item" v-for="item in dataList" :key="item.id">
							<d-coupon-card :list="item"></d-coupon-card>
						</view>
					</view>
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
				menuActive: '2-4',
				dialogFormVisible: false,
				btnIndex: 0,
				currentPage: 1,
				btnlist: ['全部', '未使用', '已使用', '已过期'],
				dataList: [
					{
						api: 10000,
						cate: 1,
						cdate: "2021-11-17 10:23:46",
						cid: 78,
						commission: 0,
						coupon: 0.1,
						date: "2021-11-17",
						description: "",
						dtime: "2021-11-17 10:23:46",
						end: 1643587200,
						guid: "0C2B5D05-0E6E-8609-CBBB-6D955CC9BDF2",
						id: 238,
						img: "",
						intro: "",
						login: "sktsyh",
						news_api: 10000,
						news_end: "2022-01-31 08:00:00",
						news_id: 78,
						news_login: "ceshi1123",
						news_start: "2021-11-17 08:00:00",
						news_state: 0,
						number: 100,
						start: 1637107200,
						state: 0,
						term: 1,
						title: "双十一活动",
						uptime: "2021-11-18 14:05:31",
					},
					{
						api: 10000,
						cate: 1,
						cdate: "2021-11-17 10:23:46",
						cid: 78,
						commission: 0,
						coupon: 0.1,
						date: "2021-11-17",
						description: "",
						dtime: "2021-11-17 10:23:46",
						end: 1643587200,
						guid: "0C2B5D05-0E6E-8609-CBBB-6D955CC9BDF2",
						id: 238,
						img: "",
						intro: "",
						login: "sktsyh",
						news_api: 10000,
						news_end: "2022-01-31 08:00:00",
						news_id: 78,
						news_login: "ceshi1123",
						news_start: "2021-11-17 08:00:00",
						news_state: 0,
						number: 100,
						start: 1637107200,
						state: 0,
						term: 1,
						title: "双十一活动双十一活动双十一活动双十一活动",
						uptime: "2021-11-18 14:05:31",
					},
					{
						api: 10000,
						cate: 1,
						cdate: "2021-11-17 10:23:46",
						cid: 78,
						commission: 0,
						coupon: 0.1,
						date: "2021-11-17",
						description: "",
						dtime: "2021-11-17 10:23:46",
						end: 1643587200,
						guid: "0C2B5D05-0E6E-8609-CBBB-6D955CC9BDF2",
						id: 238,
						img: "",
						intro: "",
						login: "sktsyh",
						news_api: 10000,
						news_end: "2022-01-31 08:00:00",
						news_id: 78,
						news_login: "ceshi1123",
						news_start: "2021-11-17 08:00:00",
						news_state: 0,
						number: 100,
						start: 1637107200,
						state: 0,
						term: 1,
						title: "双十一活动双十一活动双十一活动双十一活动",
						uptime: "2021-11-18 14:05:31",
					},
					{
						api: 10000,
						cate: 1,
						cdate: "2021-11-17 10:23:46",
						cid: 78,
						commission: 0,
						coupon: 0.1,
						date: "2021-11-17",
						description: "",
						dtime: "2021-11-17 10:23:46",
						end: 1643587200,
						guid: "0C2B5D05-0E6E-8609-CBBB-6D955CC9BDF2",
						id: 238,
						img: "",
						intro: "",
						login: "sktsyh",
						news_api: 10000,
						news_end: "2022-01-31 08:00:00",
						news_id: 78,
						news_login: "ceshi1123",
						news_start: "2021-11-17 08:00:00",
						news_state: 0,
						number: 100,
						start: 1637107200,
						state: 0,
						term: 1,
						title: "双十一活动双十一活动双十一活动双十一活动",
						uptime: "2021-11-18 14:05:31",
					},
					{
						api: 10000,
						cate: 1,
						cdate: "2021-11-17 10:23:46",
						cid: 78,
						commission: 0,
						coupon: 0.1,
						date: "2021-11-17",
						description: "",
						dtime: "2021-11-17 10:23:46",
						end: 1643587200,
						guid: "0C2B5D05-0E6E-8609-CBBB-6D955CC9BDF2",
						id: 238,
						img: "",
						intro: "",
						login: "sktsyh",
						news_api: 10000,
						news_end: "2022-01-31 08:00:00",
						news_id: 78,
						news_login: "ceshi1123",
						news_start: "2021-11-17 08:00:00",
						news_state: 0,
						number: 100,
						start: 1637107200,
						state: 0,
						term: 1,
						title: "双十一活动双十一活动双十一活动双十一活动",
						uptime: "2021-11-18 14:05:31",
					},
					{
						api: 10000,
						cate: 1,
						cdate: "2021-11-17 10:23:46",
						cid: 78,
						commission: 0,
						coupon: 0.1,
						date: "2021-11-17",
						description: "",
						dtime: "2021-11-17 10:23:46",
						end: 1643587200,
						guid: "0C2B5D05-0E6E-8609-CBBB-6D955CC9BDF2",
						id: 238,
						img: "",
						intro: "",
						login: "sktsyh",
						news_api: 10000,
						news_end: "2022-01-31 08:00:00",
						news_id: 78,
						news_login: "ceshi1123",
						news_start: "2021-11-17 08:00:00",
						news_state: 0,
						number: 100,
						start: 1637107200,
						state: 0,
						term: 1,
						title: "双十一活动双十一活动双十一活动双十一活动",
						uptime: "2021-11-18 14:05:31",
					},
					{
						api: 10000,
						cate: 1,
						cdate: "2021-11-17 10:23:46",
						cid: 78,
						commission: 0,
						coupon: 0.1,
						date: "2021-11-17",
						description: "",
						dtime: "2021-11-17 10:23:46",
						end: 1643587200,
						guid: "0C2B5D05-0E6E-8609-CBBB-6D955CC9BDF2",
						id: 238,
						img: "",
						intro: "",
						login: "sktsyh",
						news_api: 10000,
						news_end: "2022-01-31 08:00:00",
						news_id: 78,
						news_login: "ceshi1123",
						news_start: "2021-11-17 08:00:00",
						news_state: 0,
						number: 100,
						start: 1637107200,
						state: 0,
						term: 1,
						title: "双十一活动双十一活动双十一活动双十一活动",
						uptime: "2021-11-18 14:05:31",
					},
				]
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
