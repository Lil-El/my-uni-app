export default [{
		login: false,
		permission: '*', // ['user', 'admin']
		menu: [{
				key: 'detail',
				label: '企业信息',
				iconUrl: 'logo.png',
				navUrl: '/pages/user/detail/detail',
				login: true,
			},
			{
				key: 'update',
				label: '版本更新',
				iconUrl: 'logo.png',
				navUrl: '/pages/tabBar/office/index',
				// login、permission默认为父级的
			}
		]
	},
	{
		login: true,
		permission: '*',
		menu: [{
				key: 'forget',
				label: '修改密码',
				iconUrl: 'logo.png',
				navUrl: '/pages/user/account/forget?title=修改密码',
			},
			{
				key: 'logout',
				label: '退出登录',
				iconUrl: 'logo.png',
			}
		]
	}
]
