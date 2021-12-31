<template>
	<view class="coupon-wrapper">
		<view class="coupon-header u-flex">
			<view class="c-h-item u-flex u-col-bottom" v-if="list.cate == 1">
				<view class="u-p-b-10 u-p-r-10">¥</view>
				<view class="price-num">{{list.coupon}}</view>
			</view>
			<view class="c-h-item">
				<view class="coupon-mk">满{{list.term}}元可用</view>
			</view>
			<view class="c-h-item date">
				{{list.news_start.split(' ')[0]}}
				<text class="u-p-10">~</text>
				{{list.news_end.split(' ')[0]}}
			</view>
		</view>
		<view class="coupon-content">
			<el-row class="title-row">
				<el-col class="u-line-2">
					<text class="coupon-label">
						<template v-if="list.cate == 1">
							满减券
						</template>
					</text>
					<text :title="list.title">{{list.title}}</text>
				</el-col>
			</el-row>
			<el-row class="u-m-t-30">
				<el-col class="u-flex u-row-center">
					<el-link type="danger" class="use-link">参加活动商品<i class="el-icon-question el-icon--right"></i></el-link>
				</el-col>
			</el-row>
		</view>
	</view>
</template>

<script>
	export default {
		name:"d-coupon-card",
		props: {
			list: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.coupon-wrapper {
		width: 100%;
		border-radius: 5px;
		overflow: hidden;
		transition: all .3s;
		.coupon-header {
			flex-direction: column;
			padding: 20px 0;
			background-color: #f75656;
			color: #fff;
			.c-h-item {
				.coupon-mk {
					font-size: 14px;
					border: 0.5px solid #ff8282;
					padding: 3px 15px;
					border-radius: 3px;
					margin-top: 8px;
					color: #ffe2e2;
				}
				&.date {
					font-size: 12px;
					margin-top: 16px;
					color: #ffc4c4;
				}
				.price-num {
					font-weight: bold;
					font-size: 30px;
				}
			}
		}
		.coupon-content {
			padding: 15px 20px;
			background-color: #ffe2e2;
			color: #ef6d6d;
			font-size: 14px;
			.title-row {
				height: 40px;
			}
			.coupon-label {
				background-color: #f75656;
				color: #fff;
				line-height: 20px;
				border-radius: 3px;
				padding: 1px 5px;
				display: inline-block;
				margin-right: 5px;
				font-size: 12px;
			}
			.use-link {
				font-size: 12px;
			}
		}
	}
</style>
