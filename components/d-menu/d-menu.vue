<template>
	<view class="meun-wrapper">
		<view class="menu-item-box" v-for="(item, index) in menuList" :key="index">
			<view class="menu-item menu-title">
				<view >{{item.label}}</view>
			</view>
			<view class="menu-item-list" v-for="(ele, i) in item.children" :key="i">
				<navigator 
					:url="ele.url" 
					class="menu-item menu-a" 
					v-if="ele.type == 'link-navigator'"
					:class="{
						active: ele.active == active
					}"
				>
					<view >{{ele.label}}</view>
				</navigator>
				<a 
					href="ele.url" 
					class="menu-item menu-a" 
					v-if="ele.type == 'link-a'"
				>
					<view>{{ele.label}}</view>
				</a>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		name:"d-menu",
		props: {
			active: {
				type: String,
				default: ""
			}
		},
		data() {
			return {
				
			};
		},
		computed: {
			...mapState(['menuList'])
		}
	}
</script>

<style lang="scss" scoped>
	.meun-wrapper {
		background-color: #fff;
		padding: 10px 0;
		.menu-item-box {
			
			padding-top: 10px;
			border-top: 1rpx solid #f8f8f8;
			margin-top: 10px;
			&:first-child {
				margin-top: 0;
				border-top: 0;
				padding-top: 0;
			}
		}
		.menu-item {
			display: block;
			padding: 0 25px;
			position: relative;
			height: 38px;
			line-height: 38px;
			margin-bottom: 2px;
			&.menu-title {
				font-weight: bold;
			}
			&.menu-a {
				display: block;
				font-size: 14px;
				&:hover {
					color: $theme-color;
				}
				&:after {
					content: "";
					position: absolute;
					left: 0;
					top: 50%;
					transform: translateY(-50%);
					height: 100%;
					width: 3px;
					background-color: $theme-color;
					display: none;
					z-index: 20;
					
				}
				&.active {
					background-color: $theme-bg-color;
					color: $theme-color;
					&:after {
						display: block;
					}
					
				}
			} 
		}
	}
</style>
