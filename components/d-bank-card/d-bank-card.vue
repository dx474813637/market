<template>
	<view class="bank-card" :style="cardStyle">
		<view class="card-top u-flex">
			<view class="icon-wrap u-flex u-row-center">
				<template v-if="logoImg">
					<el-image class="logo" fit="contain" :src="logoImg"></el-image>
				</template>
				<template v-else>
					<i class="el-icon-bank-card"></i>
				</template>
			</view>
			<view class="bank-name">{{bankName}}</view>
		</view>
		<view class="card-main">
			<view class="card-num">**** **** **** {{cardNum | kexue}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"d-bank-card",
		props: {
			cardNum: {
				type: String | Number,
				default: '****'
			},
			bankName: {
				type: String,
				default: ''
			},
			logoImg: {
				type: String,
				default: ''
			},
			cardStyle: {
				type: Object,
				default: function() {
					return {}
				}
			}
		},
		filters: {
			kexue(v) {
				let no = v.toString()
				if(no.length == 4) return no
				let len = 4 - no.length;
				for(let i = 0; len > i ; i++) {
					no = "0" + no
				}
				return no
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.bank-card {
	height: 150px;
	width: 320px;
	background-color: #f8f8f8;
	background: #8e9eab;  /* fallback for old browsers */
	background: -webkit-linear-gradient(to left, #eef2f3, #aabdcc);  /* Chrome 10-25, Safari 5.1-6 */
	background: linear-gradient(to left, #eef2f3, #aabdcc); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

	border-radius: 10px;
	border: 1px solid #eee;
	padding: 10px 20px;
	box-sizing: border-box;
	color: #000;
	&:hover {
		
	}
	.card-top {
		.icon-wrap {
			padding: 4px;
			background-color: #fff;
			background-color: rgba(255,255,255,.7);
			border-radius: 50%;
			overflow: hidden;
			font-size: 22px;
			margin-right: 5px;
			color: #000;
			width: 28px;
			height: 28px;
			.logo {
				width: 25px;
				height: 25px;
			}
		}
		.bank-name {
			font-size: 16px;
		}
	}
	.card-main {
		padding: 15px;
		.card-num {
			padding-left: 20px;
			font-size: 20px;
			color: #666;
		}
	}
}
</style>
