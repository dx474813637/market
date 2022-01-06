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
							<view class="header-title">银行账户列表</view>
						</view>
						<view class="c-h-item u-flex">
							<navigator url="/pages/bankcard_bind/bankcard_bind">
								<el-button type="text">添加银行卡</el-button>
							</navigator>
						</view>
					</view>
					<view class="content-btn-wrap">
						<u-subsection 
							activeColor="#ed5656" 
							fontSize="14" 
							:list="btnlist" 
							keyName="name"
							mode="button" 
							:current="btnIndex" 
							@change="handlechangeBtnsIndex"
						></u-subsection>
					</view>
					
					<view class="content-list-wrap u-flex u-flex-wrap">
						<navigator url="/pages/bankcard_detail/bankcard_detail" class="list-item" v-for="item in cardList" :key="item.id">
							<d-bank-card :cardNum="item.bank_accno" :bankName="item.bank_name"></d-bank-card>
						</navigator>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import {mapState, mapMutations, mapActions} from 'vuex'
	export default {
		data() {
			return {
				menuActive: '3-1',
				dialogFormVisible: false,
				btnIndex: 0,
				currentPage: 1,
				btnlist: [{name:'认证与提现卡', cate: 0}, {name:'银联充值卡', cate: 2}, {name:'转账充值流程', cate: 3}],
				cardList: []
			}
		},
		computed: {
			...mapState(['sinopay'])
		},
		async onLoad() {
			
			await this.getData();
			
		},
		methods: {
			...mapMutations(['updateSinopay']),
			...mapActions(['checkSinopay']),
			async getData() {
				uni.showLoading({
					title: '数据加载中'
				})
				await this.checkSinopay()
				let data = await this.$http.get('bankcard.html', {params: {
					user_fundaccno: this.sinopay.user_fundaccno_b,
					cate: this.btnlist[this.btnIndex].cate
				}})
				this.cardList = data.list.list
				
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
