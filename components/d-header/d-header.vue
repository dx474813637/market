<template>
	<view class="header u-flex">
		<view class="header-wrap u-flex u-row-between">
			<view class="item item-left">
				<a href="https://www.baidu.com">
					<image class="logo" src="../../static/img/logofoot.svg" mode="heightFix"></image>
				</a>
			</view>
			<view class="item item-center">
				<el-input
				    placeholder="请输入关键词"
					v-model="kw"
				>
					<el-button class="search-btn" type="primary" slot="append" icon="el-icon-search"></el-button>
				</el-input>
			</view>
			<view class="item item-right u-flex u-row-right u-p-r-20">
				<view class="user-msg u-p-20 u-m-r-30">
					<i class="el-icon-chat-line-square"></i>
				</view>
				<view class="user-info">
					<u-image
						src="https://cdn.uviewui.com/uview/album/1.jpg"
						width="40"
						height="40"
						fade
						radius="20"
					></u-image>
					<view class="user-drop">
						<view class="drop-box">
							<view class="box-header u-border-bottom">
								<view class="name u-line-1 u-m-b-10">{{user.name}}</view>
								<view class="id u-flex u-line-1">
									<text>{{user.poster}}</text>
									<!-- <el-button type="primary" class="copy-btn" plain size="mini">复制</el-button> -->
								</view>
							</view>
							<view class="box-list">
								<navigator url="/pages/cart/cart" class="item u-flex u-row-between">
									<view class="a-left">
										<text>购物车</text>
									</view>
									<view class="a-right">
										<text class="num">{{cartNumTotal}}</text>
									</view>
									
								</navigator>
								<view class="item u-flex u-row-between u-border-top">
									<view class="a-left">
										<text>退出登录</text>
									</view>
									
								</view>
								
							</view>
						</view>
					</view>
				</view>
				
			</view>
		</view>
		
	</view>
</template>

<script>
	import {mapState, mapGetters} from 'vuex'
	export default {
		name:"d-header",
		data() {
			return {
				kw: ""
			};
		},
		computed: {
			...mapState(['cart', 'user']),
			...mapGetters(['cartNumTotal'])
		},
		onLoad() {
			
		}
	}
</script>

<style lang="scss" scoped>
	@keyframes showDropBox {
		0% {
			opacity: 0;
			transform: translateY(15px);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}
	.header {
		height: 70px;
		background-color: #fff;
		// padding: 0 20px;
		box-shadow: 0 0 10px rgba(0,0,0,.1);
		// border: 1rpx solid #f8f8f8;
		.header-wrap {
			width: 80%;
			min-width: 1200px;
			margin: 0 auto;
		}
		.item {
			flex: 1;
		}
		.item-center {
			width: 400px;
		}
		.logo {
			height: 40px;
		}
		.search-btn {
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
		}
		.user-msg {
			i {
				font-size: 26px;
				color: #999;
				cursor: pointer;
				transition: all .3s;
				
				&:hover {
					color: $theme-color;
				}
			}
		}
		.user-info {
			position: relative;
			padding-top: 10px;
			padding-bottom: 10px;
			&:hover {
				.user-drop {
					display: block;
					.drop-box {
						animation: showDropBox .5s;
					}
					
				}
			}
			.user-drop {
				position: absolute;
				top: 100%;
				right: -20px;
				width: 160px;
				display: none;
				padding-top: 10px;
				.drop-box {
					border-radius: 5px;
					background-color: #fff;
					box-shadow: 0 0 5px rgba(0,0,0,.2);
					position: relative;
					z-index: 30;
					font-size: 14px;
					overflow: hidden;
					.box-header {
						padding: 15px 20px 10px;
						background-color: $theme-color;
						color: #fff;
						.name {
							
						}
						.copy-btn {
							padding: 0.2rem 0.5rem;
							font-size: 12px;
						}
						.id {
							font-size: 12px;
							color: #ccc;
							padding-right: 5px;
						}
					}
					.box-list {
						.item {
							padding: 10px 20px;
							transition: all .3s;
							cursor: pointer;
							&:hover {
								background-color: $theme-bg-color;
								color: $theme-color;
								.a-right {
									.num {
										background-color: $theme-color;
										color: #fff;
									}
								}
							}
							.a-left {
								
							}
							.a-right {
								.num {
									transition: all .3s;
									background-color: #ed2c2c;
									color: #fff;
									min-width: 20px;
									height: 20px;
									font-size: 12px;
									display: flex;
									justify-content: center;
									align-items: center;
									border-radius: 20px;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
