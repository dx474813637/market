<script>
	
	export default {
		onLaunch: async function() {
			this.$store.dispatch('checkUserInfo')
		},
		onShow: function() {
			
		},
		onHide: function() {
			
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
	@import "./static/icon/iconfont.css";
	
	body {
		user-select: text;
		background-color: #f8f8f8;
	}
	::-webkit-scrollbar {
		background-color: #f8f8f8;
		width: 8px;
		height: 8px;
	}
	::-webkit-scrollbar-button {
		background-color: $theme-bg-color;
	}
	::-webkit-scrollbar-thumb {
		background-color: $theme-bg-color;
	}
	.d-theme-color {
		color: $theme-color!important;
	}
	.d-theme-bg {
		background-color: $theme-color!important;
	}
	.d-danger-color {
		color: $u-error !important;
	}
	.el-popconfirm__main {
		margin-top: 10px;
		margin-bottom: 10px;
	}
	.wrapper {
		width: 80%;
		min-width: 1200px;
	}
</style>
