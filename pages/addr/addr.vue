<template>
	<view>
		<d-header></d-header>
		<view class="main u-flex u-row-center u-p-40">
			<view class="wrapper u-flex u-col-top">
				<view class="wrap-item menu">
					<d-menu :active="menuActive"></d-menu>
				</view>
				<view class="wrap-item content">
					<view class="content-header u-flex u-row-between u-border-bottom">
						<view class="c-h-item u-flex">
							<view class="header-title">收货地址列表</view>
						</view>
					</view>
					<view class="u-p-30 u-p-l-60">
						<el-button type="primary" plain size="medium" @click="dialogFormVisible = true">新增地址</el-button>
					</view>

					<view class="content-list-wrap u-flex u-flex-wrap u-col-top">
						<view class="list-item" v-for="item in dataList" :key="item.id">
							<el-card shadow="hover" class="box-card">
								<template slot="header">
									<view class="header-w u-flex u-row-between u-col-bottom">
										<view class="h-item u-flex">
											<view class="header-name">{{item.name}}</view>
											<view class="u-m-l-30" v-if="item.auto">
												<u-tag size="mini" type="error" text="默认地址"></u-tag>
											</view>
										</view>
										<view class="h-item card-btns u-flex u-flex-between">
											<view class="h-i-btn set-default-btns" v-if="!item.auto">
												<el-button type="text" class="u-p-0">设为默认地址</el-button>
											</view>
											<view class="h-i-btn">
												<el-button type="text" class="u-p-0" @click="editAddr(item)">编辑
												</el-button>
											</view>
											<view class="h-i-btn">
												<el-popconfirm placement="bottom-end" title="确认删除该收货地址？" class="u-p-0"
													@confirm="deletAddr(item)">
													<el-button slot="reference" class="u-p-0" type="text">删除</el-button>
												</el-popconfirm>

											</view>

										</view>
									</view>

								</template>
								<view class="item card-content">
									<!-- <el-row type="flex">
										<el-col class="label" :span="5">收货人</el-col>
										<el-col :span="19">{{item.name}}</el-col>
									</el-row> -->
									<el-row type="flex">
										<el-col class="label" :span="5">所在地区</el-col>
										<el-col :span="19">{{item.regional_name}}</el-col>
									</el-row>
									<el-row type="flex">
										<el-col class="label" :span="5">详细地址</el-col>
										<el-col :span="19">{{item.address}}</el-col>
									</el-row>
									<el-row type="flex">
										<el-col class="label" :span="5">联系电话</el-col>
										<el-col :span="19">{{item.mobile}}</el-col>
									</el-row>
								</view>
							</el-card>
						</view>
					</view>
				</view>
			</view>

		</view>
		<el-dialog title="编辑收货地址" :visible.sync="dialogFormVisible" @close="resetForm('ruleForm')">
			<el-form :model="addrForm" :rules="rules" ref="ruleForm" label-width="100px">
				<el-form-item label="收货人" prop="name">
					<el-input v-model="addrForm.name"></el-input>
				</el-form-item>
				<el-form-item label="联系方式" prop="mobile">
					<el-input v-model="addrForm.mobile"></el-input>
				</el-form-item>
				<el-form-item label="所在地区" prop="regional_name">
					<el-input v-model="addrForm.regional_name"></el-input>
					<!-- <el-cascader v-model="addrForm.regional_name" :options="options" @change="handleChange"></el-cascader> -->
				</el-form-item>
				<el-form-item label="详细地址" prop="address">
					<el-input type="textarea" v-model="addrForm.address"></el-input>
				</el-form-item>
				<el-form-item label="设为默认" prop="auto">
					<el-switch v-model="addrForm.auto"></el-switch>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="handleChangeDialogShow('ruleForm')">取 消</el-button>
				<el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
			</div>
		</el-dialog>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				menuActive: '2-3',
				dialogFormVisible: false,
				options: [{
					value: 'zhinan',
					label: '指南',
					children: [{
						value: 'shejiyuanze',
						label: '设计原则',
						children: [{
							value: 'yizhi',
							label: '一致'
						}]
					}]
				}, {
					value: 'zhinan',
					label: '指南2',
					children: [{
						value: 'shejiyuanze',
						label: '设计原则2',
						children: [{
							value: 'yizhi',
							label: '一致2'
						}]
					}]
				}, ],
				addrForm: {
					name: '',
					mobile: '',
					id: '',
					regional_name: '',
					address: '',
					auto: '0',
				},
				rules: {
					name: [{
						required: true,
						message: '请输入收货人姓名',
						trigger: ['blur', 'change']
					}],
					mobile: [{
						required: true,
						message: '请输入手机号',
						trigger: ['blur', 'change']
					}],
					regional_name: [{
						required: true,
						message: '请选择地区',
						trigger: ['blur', 'change']
					}],
					address: [{
						required: true,
						message: '请输入详细地址',
						trigger: ['blur', 'change']
					}],
				},
				dataList: []
			}
		},
		onLoad() {
			this.getData()
		},
		methods: {
			async getData() {
				let res = await this.$http.get('address')
				if(res.code != 1) return;
				this.dataList = res.list.list
			},
			handleChangeDialogShow(formName) {
				this.dialogFormVisible = !this.dialogFormVisible
				if (!this.dialogFormVisible) {
					this.resetForm(formName)
				}
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$http.get('User/address_change', {params: this.addrForm})
						this.handleChangeDialogShow(formName)
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			handleChange(value) {
				console.log(value);
			},
			editAddr(data) {
				this.addrForm.id = data.id
				this.addrForm.mobile = data.mobile
				this.addrForm.name = data.name
				this.addrForm.regional_name = data.regional_name
				this.addrForm.address = data.address
				this.addrForm.auto = data.auto ? true : false
				this.handleChangeDialogShow('ruleForm')
			},
			deletAddr(data) {
				this.dataList = this.dataList.filter(ele => ele.id !== data.id)
					// let res = await this.$http.get('User/roll_back_tran_price', {params: {order_id: this.id}})
					// if(res.code != 1) return
					// this.$message({
					// 	type: 'success',
					// 	message: res.msg || '成功'
					// });
					
				// this.$notify({
				// 	title: '消息提示',
				// 	message: '删除成功',
				// 	position: 'bottom-right',
				// 	type: 'success'
				// });
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

				.content-list-wrap {
					padding: 10px 30px;

					.list-item {
						width: 49%;
						flex: 0 0 49%;
						margin-bottom: 1%;

						&:nth-of-type(2n) {
							margin-left: 2%;
						}

						.box-card {
							.set-default-btns {
								display: none;

								.el-button {
									color: $u-error !important;
								}
							}

							&:hover {
								.set-default-btns {
									display: block;
								}
							}
						}

						.header-w {
							height: 28px;

							.header-name {
								font-size: 1.2rem;
							}
						}
					}
				}

				.h-i-btn {
					padding: 0;
					margin-left: 10px;
					height: 100%;

					&:first-child {
						margin-left: 0;
					}
				}

				.card-content {
					.el-row {
						padding-bottom: 8px;
						font-size: 15px;

						.label {
							color: #888;
							font-size: 14px;
						}
					}
				}
			}
		}
	}
</style>
