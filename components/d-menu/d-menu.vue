<template>
	<view class="meun-wrapper">
		<el-menu 
			:default-active="menuActive" 
			class="el-menu-vertical-demo" 
			@open="handleOpen" 
			@close="handleClose"
			:collapse="isCollapse"
			@select="handleSelect"
		>
			<template  v-for="item in menuList" >
				<el-submenu  v-if="item.children && item.children.length > 0" :index="item.index" :key="item.index">
					<template slot="title">
						<i class="custom-icon" :class="item.icon" v-if="item.icon" ></i>
						<span class="menu-title" slot="title">{{item.label}}</span>
					</template>
					<el-menu-item v-for="ele in item.children" :index="ele.index" :key="ele.index">
						<i class="custom-icon" :class="ele.icon" v-if="ele.icon" ></i>
						<span slot="title">{{ele.label}}</span>
					</el-menu-item>
				</el-submenu>
				<el-menu-item v-else :index="item.index" :key="item.index">
					<i class="custom-icon" :class="item.icon" v-if="item.icon" ></i>
					<span slot="title">{{item.label}}</span>
				</el-menu-item>
			</template>
		</el-menu>
	</view>
</template>

<script>
	import {
		mapState, mapMutations
	} from 'vuex'
	export default {
		name: "d-menu",
		props: {
			active: {
				type: String,
				default: "1-1"
			},
		},
		created() {
			this.updatemenuActive(this.active)
			
		},
		data() {
			return {
				isCollapse: false,
			};
		},
		methods: {
			...mapMutations(['updatemenuActive']),
			handleOpen(key, keyPath) {
				// console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				// console.log(key, keyPath);
			},
			handleSelect(key, keyPath) {
				let arr = key.split('-')
				let item = this.menuList;
				arr.forEach((ele, index) => {
					if(index != 0) {
						item = item.children
					}
					item = item[ele - 1]
				})
				this.updatemenuActive(key)
				if(item.type == 'link-navigator') {
					uni.navigateTo({
						url: item.url
					})
				}else if( item.type == 'link-a') {
					location.href = item.url
				}
			},
		},
		computed: {
			...mapState(['menuList', 'menuActive'])
		}
	}
</script>

<style lang="scss" scoped>
	.menu-title {
		font-weight: bold;
		font-size: 15px;
	}
	.el-menu-item.is-active {
		background-color: $theme-bg-color;
		position: relative;
		&:after {
			content: '';
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
			height: 100%;
			width: 3px;
			background-color: $theme-color;
		}
	}
	.el-menu {
		border: 0;
	}
	.el-menu i.custom-icon {
		margin-right: 5px;
		font-size: 18px;
		color: $theme-color;
	}
	.meun-wrapper {
		background-color: #fff;
		padding: 10px 0;
		overflow: hidden;

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
