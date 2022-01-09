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
							<view class="header-title">账单详情</view>
						</view>
					</view>
					<view class="content-sinopay">
						<el-row type="flex" align="middle">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">商户</view>
							</el-col>
							<el-col>
								<view class="sinopay-info">{{list.c_name}}</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">金额</view>
							</el-col>
							<el-col>
								<view class="sinopay-info">{{list.final_price}} 元</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">当前状态</view>
							</el-col>
							<el-col>
								<view class="sinopay-info">{{list.toPayState}}</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">支付方式</view>
							</el-col>
							<el-col>
								<view class="sinopay-info">{{list.toTools}}</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">商品</view>
							</el-col>
							<el-col>
								<view class="sinopay-info">
									<text
										class="u-m-r-20"
										v-for="item in list.list_product"
										:key="item.id"
									>{{item.p_name}}</text>
								</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">支付时间</view>
							</el-col>
							<el-col>
								<view class="sinopay-info">{{list.dinli_day}}</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">支付单号</view>
							</el-col>
							<el-col>
								<view class="sinopay-info">{{list.sinopay_id}}</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">订单号</view>
							</el-col>
							<el-col>
								<view class="sinopay-info">
									<navigator :url="`/pages/orderDetail/orderDetail?id=${list.id}`" class="d-theme-color">{{list.id}}</navigator>
								</view>
							</el-col>
						</el-row>
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
				menuActive: '3-4',
				id: '',
				list: {}
			}
		}, 
		computed: {
			
		},
		async onLoad(opt) {
			if(opt && opt.hasOwnProperty('id')) {
				this.id = opt.id
				uni.showLoading()
				await this.getData()
			}
		},
		methods: {
			async getData() {
				let res = await this.$http.get('bill_detail', {
					params: {
						order_id: this.id
					}
				})
				if(res.code != 1) return ;
				this.list = res.list
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
				.content-sinopay {
					padding: 20px 30px;
					.el-row {
						border-left: 1px solid #e7e7e7;
						border-right: 1px solid #e7e7e7;
						border-top: 1px solid #e7e7e7;
						&:last-child {
							border-bottom: 1px solid #e7e7e7;
						}
						.el-col {
							padding: 5px 10px;
							line-height: 20px;
							min-height: 45px;
							display: flex;
							align-items: center;
							font-size: 14px;
							border-right: 1px solid #e7e7e7;
							&:last-child {
								border-right: 0;
							}
							&.sinopay-label-col {
								background-color: #F5F7FA;
								border-right: 1px solid #e7e7e7;
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
