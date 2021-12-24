export default [
	{
		label: '账号管理',
		type: 'title',
		children: [
			{
				label: '个人中心',
				type: 'link-navigator',
				url: '/pages/index/index',
				icon: '',
				active: 'index',
			},
			{
				label: '账号信息',
				type: 'link-navigator',
				url: '/pages/memberInfo/memberInfo',
				icon: '',
				active: 'info',
			},
			{
				label: '账号安全',
				type: 'link-navigator',
				url: '/pages/memberSafe/memberSafe',
				icon: '',
				active: 'safe',
			},
			{
				label: '登录明细',
				type: 'link-navigator',
				url: '/pages/log/log',
				icon: '',
				active: 'log',
			},
		]
	},
	{
		label: '商城中心',
		type: 'title',
		children: [
			{
				label: '订单管理',
				type: 'link-navigator',
				url: '/pages/index/index',
				icon: '',
				index: 4,
				active: 'order'
			},
			{
				label: '购物车',
				type: 'link-navigator',
				url: '/pages/memberInfo/memberInfo',
				icon: '',
				active: 'cart',
			},
			{
				label: '地址管理',
				type: 'link-navigator',
				url: '/pages/memberInfo/memberInfo',
				icon: '',
				active: 'addr',
			},
			{
				label: '优惠券',
				type: 'link-navigator',
				url: '/pages/memberInfo/memberInfo',
				icon: '',
				active: 'coupon'
			},
		]
	},
	{
		label: '资金中心',
		type: 'title',
		children: [
			{
				label: '支付平台账号',
				type: 'link-navigator',
				url: '/pages/index/index',
				icon: '',
				active: 'pay_login'
			},
			{
				label: '我的现金账户',
				type: 'link-navigator',
				url: '/pages/memberInfo/memberInfo',
				icon: '',
				active: 'cash_account'
			},
			{
				label: '现金付款明细',
				type: 'link-navigator',
				url: '/pages/memberInfo/memberInfo',
				icon: 'cash_list'
			},
		]
	}
]