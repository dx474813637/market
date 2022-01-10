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
							<navigator open-type="navigateBack" class="u-m-r-20 d-theme-color">
								<i class="custom-icon-left-circle custom-icon u-font-36"></i>
							</navigator>
							<view class="header-title">充值详情</view>
						</view>
					</view>
					<view class="content-sinopay">
						<el-row type="flex" align="middle">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">现金账号</view>
							</el-col>
							<el-col>
								<view class="sinopay-info">{{list.user_fundaccno}}</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">充值银行卡</view>
							</el-col>
							<el-col>
								<view class="sinopay-info">{{list.card.plantBankName}}（{{list.card.accNo}}）</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">充值金额</view>
							</el-col>
							<el-col>
								<view class="sinopay-info">{{list.amount}} 元</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">充值手续费</view>
							</el-col>
							<el-col>
								<view class="sinopay-info">{{list.fee}} 元</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">状态</view>
							</el-col>
							<el-col>
								<view class="sinopay-info">
									<template v-if="list.status == 0">
										待验证
									</template>
									<template v-else-if="list.status == 1">
										充值成功
									</template>
									<template v-else-if="list.status == 2">
										充值失败
									</template>
									<template v-else-if="list.status == 3">
										充值中
									</template>
									<template v-else-if="list.status == 4">
										已退款
									</template>
								</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">充值时间</view>
							</el-col>
							<el-col>
								<view class="sinopay-info">{{list.ctime}}</view>
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
				menuActive: '3-3',
				id: '',
				list: {}
			}
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
				let res = await this.$http.get('recharge_detail', {
					params: {
						id: this.id
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
