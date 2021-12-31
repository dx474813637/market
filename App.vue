<script>
	export default {
		onLaunch: function() {
			
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
</style>
