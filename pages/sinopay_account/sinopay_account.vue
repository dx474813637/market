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
							<!-- <navigator open-type="navigateBack" class="u-m-r-20 d-theme-color">
								<i class="custom-icon-left-circle custom-icon u-font-36"></i>
							</navigator> -->
							<view class="header-title">{{title}}</view>
						</view>
					</view>
					<view class="content-sinopay">
						<el-row type="flex" align="middle">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">资金账户名</view>
							</el-col>
							<el-col>
								<view class="sinopay-info">{{info.info.name}}</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">{{title}}</view>
							</el-col>
							<el-col>
								<view class="sinopay-info">{{info.info.user_fundaccno}} - {{info.info.state | sinopayAccStatus}}</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">手机</view>
							</el-col>
							<el-col>
								<view class="sinopay-info">{{info.info.mobile}}</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">可用余额</view>
							</el-col>
							<el-col>
								<view class="sinopay-info u-flex">
									<view>{{info.info.bal}}</view>
									<!-- <navigator url="/pages/recharge/recharge" class="u-m-l-40">
										<el-button type="primary" size="mini">提现</el-button>
									</navigator> -->
									<navigator :url="`/pages/recharge/recharge?user_fundaccno=${info.info.user_fundaccno}`" class="u-m-l-40">
										<el-button type="primary" size="mini">充值</el-button>
									</navigator>
									
								</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">可提余额</view>
							</el-col>
							<el-col>
								<view class="sinopay-info">{{info.info.bal_refund}}</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">冻结金额</view>
							</el-col>
							<el-col>
								<view class="sinopay-info">{{info.info.bal_freeze}}</view>
							</el-col>
						</el-row>
						<!-- <el-row type="flex" align="middle">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">同名账户</view>
							</el-col>
							<el-col>
								<view class="sinopay-info">
									<el-button type="text" class="u-p-0" @click="handleGoRelationAcc">{{info.info.relation_id}}</el-button>
								</view>
							</el-col>
						</el-row> -->
						<!-- <el-row type="flex" align="middle">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">提现列表</view>
							</el-col>
							<el-col>
								<view class="sinopay-info">
									<navigator url="/pages/withdrawal_list/withdrawal_list">
										<el-button type="primary" plain size="mini">查看</el-button>
									</navigator>
								</view>
							</el-col>
						</el-row> -->
						<el-row type="flex" align="middle">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">充值列表</view>
							</el-col>
							<el-col>
								<view class="sinopay-info">
									<navigator url="/pages/recharge_list/recharge_list">
										<el-button type="primary" plain size="mini">查看</el-button>
									</navigator>
								</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle" v-if="list.bind_info.state != 2">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">认证并绑卡</view>
							</el-col>
							<el-col>
								<view class="sinopay-info">
									<navigator :url="`/pages/bankcard_bind/bankcard_bind?user_fundaccno=${list[type == 2? 'user_fundaccno_s' : 'user_fundaccno_b']}`">
										<el-button type="primary" plain size="mini">请绑卡认证</el-button>
									</navigator>
								</view>
							</el-col>
						</el-row>
						<el-row type="flex" align="middle">
							<el-col :span="5" class="sinopay-label-col">
								<view class="sinopay-label">创建时间</view>
							</el-col>
							<el-col>
								<view class="sinopay-info">{{info.info.ctime}}</view>
							</el-col>
						</el-row>
						
					</view>
					
					<!-- <view class="content-sinopay">
						<view class="u-flex u-row-between ahref">
							<view class="u-flex">
								<navigator url="/pages/bankcard_list/bankcard_list">绑定提现银行账户列表</navigator>
							</view>
							<view class="u-flex">
								<navigator url="">提现卡充值记录</navigator>
								<navigator url="/pages/bankcard_bind/bankcard_bind" class="u-p-l-20">绑定提现银行账户</navigator>
							</view>
						</view>
						<el-table :data="tableData" border :header-cell-style="{background: '#F5F7FA'}">
							<el-table-column prop="bank" label="开户行" width="250px">
							</el-table-column>
							<el-table-column prop="name" label="姓名">
							</el-table-column>
							<el-table-column prop="id" label="证件号码">
							</el-table-column>
							<el-table-column prop="bankid" label="银行账户号">
							</el-table-column>
							<el-table-column prop="status" label="状态">
							</el-table-column>
							</el-table-column>
							<el-table-column label="操作">
								<template slot-scope="scope">
									<navigator :url="`/pages/bankcard_detail/bankcard_detail?id=${scope.row.id}`">
										<el-button type="primary" size="mini" plain>查看</el-button>
									</navigator>
								</template>
							</el-table-column>
						</el-table>
					</view> -->
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
				type: "1", //1 付款  2 收款
				// tableData: [
				// 	{
				// 		id: '330204199401258774',
				// 		name: '宗师',
				// 		bank: '中国农业银行股份有限公司',
				// 		bankid: '955****237714',
				// 		status: '已绑定'
				// 	}
				// ],
				info: {
					info: {}
				},
				list: {
					bind_info: {}
				}
			}
		}, 
		async onLoad(opt) {
			if(opt && opt.type) {
				this.type = opt.type;
			}
			uni.showLoading({
				title: '账户数据加载中'
			})
			await this.getData()
			uni.showToast({
				title: '数据加载完成'
			})
		},
		computed: {
			title() {
				if(this.type == 2) {
					return '收款账户'
				}else {
					return '付款账户'
				}
			},
			apiUrl() {
				if(this.type == 2) {
					return 'sino_zh2.html'
				}else {
					return 'sino_zh1.html'
				}
			},
		},
		methods: {
			async getData() {
				let data = await this.$http.get(this.apiUrl)
				// console.log(data)
				this.list = data.list
				this.info = data[this.type == 2 ? 'user_fundaccno_s' : 'user_fundaccno_b']
			},
			async handleGoRelationAcc() {
				
				if(this.type == 2) {
					uni.navigateTo({
						url: '/pages/sinopay_account/sinopay_account?type=1'
					})
				}else {
					uni.navigateTo({
						url: '/pages/sinopay_account/sinopay_account?type=2'
					})
				}
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
					.ahref {
						font-size: 14px;
						line-height: 25px;
						color: $theme-color;
						padding: 10px 0;
					}
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
