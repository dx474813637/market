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
							<navigator url="/pages/bankcard/bankcard" class="u-m-r-20 d-theme-color">
								<i class="custom-icon-left-circle custom-icon u-font-36"></i>
							</navigator>
							<view class="header-title">绑定提现/支付银行卡详情</view>
						</view>
					</view>
					<view class="content-sinopay">
						<el-row type="flex" align="middle">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">资金账号</view>
							</el-col>
							<el-col>
								<view class="sinopay-info">{{user_fundaccno}}</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">手机号码</view>
							</el-col>
							<el-col>
								<view class="sinopay-info">{{list.Card_bind.mobile}}</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">银行卡号</view>
							</el-col>
							<el-col>
								<view class="sinopay-info">{{list.Card_bind.bank_accno}}</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">户名</view>
							</el-col>
							<el-col>
								<view class="sinopay-info">{{list.Card_bind.bank_accname}}</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">开户行名称</view>
							</el-col>
							<el-col>
								<view class="sinopay-info">{{list.Card_bind.bank_name}}</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">证件号码</view>
							</el-col>
							<el-col>
								<view class="sinopay-info">{{list.Card_bind.card_id}}</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">状态</view>
							</el-col>
							<el-col>
								<view class="sinopay-info">
									<template v-if="list.Card_bind.state == 0">
										<el-button type="primary" plain @click="handleDetail" size="mini">待绑定</el-button>
									</template>
									<template v-else-if="list.Card_bind.state == 1">
										已绑定
									</template>
									<template v-else-if="list.Card_bind.state == 2">
										已失败
									</template>
									<template v-else-if="list.Card_bind.state == 3">
										已解绑
									</template>
								</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">绑定时间</view>
							</el-col>
							<el-col>
								<view class="sinopay-info">{{list.Card_bind.ctime}}</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">操作</view>
							</el-col>
							<el-col>
								<view class="sinopay-info">
									<el-button plain type="primary" size="mini" @click="handleExit">解绑</el-button>
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
				menuActive: '3-3',
				bind_id: '',
				user_fundaccno: '',
				list: {
					Card_bind: {},
					sinopay: {},
					sinopay_account: {}
				}
			}
		}, 
		async onLoad(opt) {
			if(opt && opt.hasOwnProperty('user_fundaccno') && opt.hasOwnProperty('bind_id')) {
				this.bind_id = opt.bind_id;
				this.user_fundaccno = opt.user_fundaccno;
				uni.showLoading()
				await this.getData()
			}
		},
		computed: {
			
		},
		methods: {
			async getData() {
				let res = await this.$http.get('bankcard_detail2', {
					params: {
						user_fundaccno: this.user_fundaccno,
						bind_id: this.bind_id
					}
				})
				if(res.code != 1) return;
				this.list = res.list
				this.user_fundaccno = res.user_fundaccno
				this.bind_id = res.bind_id
			},
			handleDetail() {
				
			},
			handleExit() {
				this.$confirm('解绑该银行卡, 是否继续?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(async () => {
				  let res = await this.$http.get('User/unbind', {
					  params: {
						  user_fundaccno: this.user_fundaccno,
						  bind_id: this.bind_id
					  }
				  })
				  if(res.code != 1) return;
				  this.$message({
					message: '解绑成功',
					type: 'success'
				  });
				  uni.redirectTo({
				  	url: "/pages/bankcard/bankcard"
				  })
				}).catch(() => {
				           
				});
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
