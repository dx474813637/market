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
							<navigator url="/pages/money_center/money_center" class="u-m-r-20 d-theme-color">
								<i class="custom-icon-left-circle custom-icon u-font-36"></i>
							</navigator>
							<view class="header-title">银行账户列表</view>
						</view>
						<view class="c-h-item u-flex">
							<el-button type="text" @click="handleAddCard" v-if="btnlist[btnIndex].cate != 3">添加银行卡</el-button>
						</view>
					</view>
					<view class="content-btn-wrap">
						<u-subsection activeColor="#ed5656" fontSize="14" :list="btnlist" keyName="name" mode="button"
							:current="btnIndex" @change="handlechangeBtnsIndex"></u-subsection>
					</view>
					<template v-if="btnlist[btnIndex].cate != 3">
						<view class="content-list-wrap u-flex u-flex-wrap"
							:class="{
								'u-row-center': !cardList || cardList.length == 0
							}"
						>
							<navigator 
								:url="`/pages/bankcard_detail/bankcard_detail?user_fundaccno=${sinopay.user_fundaccno_b}&bind_id=${item.id}`" 
								class="list-item"
								v-for="item in cardList" 
								:key="item.id"
							>
								<d-bank-card :cardNum="item.bank_accno" :bankName="item.bank_name"></d-bank-card>
							</navigator>
							<template v-if="!cardList || cardList.length == 0">
								<el-empty description="无数据"></el-empty>
							</template>
						</view>
					</template>
					<template v-else>
						<view class="content-list-wrap ">
							<el-card class="box-card2" shadow="never">
								<div class="text item u-flex">
									<a class="app"
										href="https://b.pingan.com.cn/stb/dps-vue/publicPage.html#/ShareOpen?productid=Digital_BuyElectric"
										target="_blank">
										<el-image src="/static/img/yd1.png"></el-image>
									</a>

									<view class="info">
										<view class="title">手机端下载并安装“平安数字口袋APP”</view>
										<view class="sub">点击左侧图标进行下载</view>
										<view class="sub">安卓与苹果系统自动识别安装</view>
									</view>
								</div>
							</el-card>
							<el-card class="box-card2" shadow="never">
								<div slot="header" class="header u-flex">
									<div class="item u-flex">
										<i class="custom-icon-creditcard custom-icon u-font-40 d-theme-color"></i>
										<div class="item u-font-30 u-m-l-20">转账白名单流程</div>
									</div>
								</div>
								<div class="text item ">
									<div class="step-item u-flex">
										<el-image src="/static/img/bank-card-cz1.jpg"></el-image>
										<view>
											<view>以提现卡对应的手机号注册</view>
											<view>并登录，进入：商户专区</view>
										</view>
									</div>
									<div class="step-item u-flex">
										<el-image src="/static/img/bank-card-cz2.jpg"></el-image>
										<view>
											<view>进入：转账白名单维护</view>
											<view>—>待确认页</view>
										</view>
									</div>
									<div class="step-item u-flex">
										<el-image src="/static/img/bank-card-cz3.jpg"></el-image>
										<view>
											<view>对待确认记录，点击右上角的“添加”</view>
											<view>后续，白名单确认完成后，可进行转账充值</view>
										</view>
									</div>
								</div>
							</el-card>
							<el-card class="box-card2" shadow="never">
								<div slot="header" class="header u-flex">
									<div class="item u-flex">
										<i class="custom-icon-creditcard custom-icon u-font-40 d-theme-color"></i>
										<div class="item u-font-30 u-m-l-20">转账白名单 申请记录</div>
									</div>
								</div>
								<div class="text item ">
									<view class="d-theme-color u-font-30 u-m-b-30">“转账白名单”成功的银行卡，方可进行转账充值操作</view>
									<el-table :data="tableData" border style="width: 100%" :header-cell-style="{background: '#eee', color: '#333'}">
										<el-table-column prop="user_fundaccno" label="现金账户" width="180">
										</el-table-column>
										<el-table-column prop="bank_accname" label="账户名" width="180">
										</el-table-column>
										<el-table-column prop="bank_accno" label="银行卡号" width="180">
										</el-table-column>
										<el-table-column label="白名单状态">
											<template slot-scope="scope">
												<template v-if="scope.row.qingfen_state == 0">
													未添加
												</template>
												<template v-else-if="scope.row.qingfen_state == 1">
													已申请
												</template>
												<template v-else-if="scope.row.qingfen_state == 2">
													已添加
												</template>
											</template>
										</el-table-column>
									</el-table>
								</div>
							</el-card>
							<el-card class="box-card2" shadow="never">
								<div slot="header" class="header u-flex">
									<div class="item u-flex">
										<i class="custom-icon-creditcard custom-icon u-font-40 d-theme-color"></i>
										<div class="item u-font-30 u-m-l-20">转入账户</div>
										<div class="item u-font-28 u-m-l-40">[转账成功后即时入账至您的支付账户]</div>
									</div>
								</div>
								<div class="d-theme-color text item ">
									<view class=" u-font-30 u-m-b-30">个人用户，可使用手机银行，企业用户可使用网银，向以下账户发起转账：</view>
									<el-row type="flex" align="middle" :gutter="20">
										<el-col :span="5" class="order-label-col">
											<view class="order-label">户名</view>
										</el-col>
										<el-col>
											<view class="order-info u-flex">
												<view>平安银行电子商务交易资金待清算专户</view>
												<el-button @click="handleCopy('平安银行电子商务交易资金待清算专户')" type="text" size="mini" class="u-m-l-40 d-danger-color">[ 一键复制 ]</el-button>
											</view>
										</el-col>
									</el-row>
									<el-row type="flex" align="middle" :gutter="20">
										<el-col :span="5" class="order-label-col">
											<view class="order-label">账号</view>
										</el-col>
										<el-col>
											<view class="order-info u-flex">
												<view>15000103221134</view>
												<el-button @click="handleCopy('15000103221134')" type="text" size="mini" class="u-m-l-40 d-danger-color">[ 一键复制 ]</el-button>
											</view>
										</el-col>
									</el-row>
									<el-row type="flex" align="middle" :gutter="20">
										<el-col :span="5" class="order-label-col">
											<view class="order-label">开户行</view>
										</el-col>
										<el-col>
											<view class="order-info u-flex">
												<view>平安银行西湖支行</view>
												<el-button @click="handleCopy('平安银行西湖支行')" type="text" size="mini" class="u-m-l-40 d-danger-color">[ 一键复制 ]</el-button>
											</view>
										</el-col>
									</el-row>
									
								</div>
							</el-card>
						</view>
					</template>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'
	export default {
		data() {
			return {
				menuActive: '3-1',
				dialogFormVisible: false,
				btnIndex: 0,
				currentPage: 1,
				btnlist: [{
					name: '认证与提现卡',
					cate: 0
				}, {
					name: '银联充值卡',
					cate: 2
				}, {
					name: '转账充值流程',
					cate: 3
				}],
				cardList: [],
				list: [],
				tableData: []
			}
		},
		computed: {
			...mapState(['sinopay']),
		},
		async onLoad() {

			await this.getData();

		},
		methods: {
			...mapMutations(['updateSinopay']),
			...mapActions(['checkSinopay']),
			handleAddCard() {
				let cate = this.btnlist[this.btnIndex].cate
				if(cate == 0) {
					uni.navigateTo({
						url: '/pages/bankcard_bind/bankcard_bind?user_fundaccno=' + this.sinopay.user_fundaccno_b
					})
				}else if(cate == 2) {
					location.href = 'User/quick_bind'
				}
			},
			async getData() {
				uni.showLoading({
					title: '数据加载中'
				})
				await this.checkSinopay()
				let cate = this.btnlist[this.btnIndex].cate
				let data = await this.$http.get('bankcard', {
					params: {
						user_fundaccno: this.sinopay.user_fundaccno_b,
						cate,
					}
				})
				if (cate != 3) {
					this.cardList = data.list.list
				} else {
					this.list = data.list
					this.tableData = data.list.result.list_binds
				}

				this.$message({
					type: 'success',
					message: '数据加载完成!'
				});
			},
			async handlechangeBtnsIndex(index) {
				this.btnIndex = index
				await this.getData()
			},
			handleCopy(name) {
				uni.setClipboardData({
				    data: name,
				    success:  () => {
				        // this.$message({
				        // 	type: 'success',
				        // 	message: '复制成功!'
				        // });
				    }
				});
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
				&.order-label-col {
					background-color: #F5F7FA;
					border-right: 1px solid #e7e7e7;
					color: #666;
					&.title .order-label {
						color: #333;
						margin-right: 15px;
					}
				}
			}
		}

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

					.box-card2 {
						&.el-card {
							margin-bottom: 20px;
						}
						.header {
							
						}
						.step-item {
							margin-bottom: 20px;
							color: #666;
							line-height: 30px;

							.el-image {
								width: 300px;
								border-radius: 10px;
								margin-right: 40px;
							}
						}

						.header {}

						.app {
							flex: 0 0 70px;
							width: 70px;
							height: 70px;

							.el-image {
								width: 100%;
								height: 100%;
							}
						}

						.info {
							flex: 0 0 calc(100% - 70px);
							width: calc(100% - 70px);
							padding-left: 30px;

							.title {
								color: #333;
								margin-bottom: 4px;
							}

							.sub {
								color: #999;
								font-size: 14px;
							}
						}
					}

					.list-item {
						width: 30%;
						flex: 0 0 30%;
						margin-right: 5%;
						margin-bottom: 3%;

						&:nth-of-type(3n) {
							margin-right: 0;
						}

						.box-card {}

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
