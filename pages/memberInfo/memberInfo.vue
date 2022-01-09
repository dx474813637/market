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
							<view class="header-title">账号信息</view>
						</view>
					</view>
					<view class="form-wrap">
						<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
							<!-- <el-form-item label="会员类型" prop="memberCate">
								<el-input v-model="ruleForm.memberCate" readonly></el-input>
							</el-form-item>
							<el-form-item label="您的账号" prop="login">
								<el-input v-model="ruleForm.login" readonly></el-input>
							</el-form-item> -->
							<el-form-item label="您的姓名" prop="name">
								<el-input v-model="ruleForm.name"></el-input>
							</el-form-item>
							<el-form-item label="手机" prop="phone">
								<el-input v-model="ruleForm.phone"></el-input>
							</el-form-item>
							<el-form-item label="邮箱" prop="email">
								<el-input v-model="ruleForm.email"></el-input>
							</el-form-item>
							<el-form-item label="公司" prop="company">
								<el-input v-model="ruleForm.company"></el-input>
							</el-form-item>
							<el-form-item label="公司地址" prop="address">
								<el-input v-model="ruleForm.address"></el-input>
							</el-form-item>
							<el-form-item label="职位" prop="position">
								<el-input v-model="ruleForm.position"></el-input>
							</el-form-item>
							<el-form-item label="电话" prop="tel">
								<el-input v-model="ruleForm.tel"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
								<!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
							</el-form-item>
						</el-form>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import { mapActions, mapState } from 'vuex'
	export default {
		data() {
			return {
				menuActive: "1-2",
				ruleForm: {
					// memberCate: '超级会员',
					// login: 'huiyuannetsun',
					name: '',
					phone: '',
					email: '',
					company: '',
					tel: '',
					position: '',
					address: '',
				},
				rules: {
					name: [{
							required: true,
							message: '请输入您的姓名',
							trigger: 'blur'
						},
					],
					phone: [
						{
							required: true,
							message: '请输入您的手机',
							trigger: 'blur'
						},
					],
				}
			}
		},
		async onLoad() {
			uni.showLoading()
			await this.getUserInfo()
			this.getData()
		},
		computed: {
			...mapState(['user'])
		},
		methods: {
			...mapActions(['getUserInfo']),
			getData() {
				// this.ruleForm.memberCate = this.user.state;
				// this.ruleForm.login = this.user.login;
				this.ruleForm.name = this.user.name;
				this.ruleForm.email = this.user.email;
				this.ruleForm.phone = this.user.phone;
				this.ruleForm.company = this.user.company;
				this.ruleForm.tel = this.user.tel;
				this.ruleForm.position = this.user.position;
				this.ruleForm.address = this.user.address;
			},
			submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						let res = await this.$http.get('User/edit_card', {
							params: this.ruleForm
						})
						if(res.code != 1) return;
						this.$message({
							type: 'success',
							message: res.msg || '成功'
						});
						await this.getUserInfo()
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
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
			}
			.form-wrap {
				padding: 30px 50px;
				width: 600px;
				.el-select {
					width: 100%;
					.el-input {
						width: 100%;
					}
				}
			}
		}
	}
</style>
