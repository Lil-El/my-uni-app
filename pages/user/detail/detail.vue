<template>
	<view>
		<template v-for="item in userInfo">
			<list-item :key="item[0]" arrow="right">
				<text>{{ Labels[item[0]] }}</text>
				<template v-slot:tail>
					<text>{{ item[1] }}</text>
				</template>
			</list-item>
		</template>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		const Labels = {
			name: '姓名',
			age: '年龄',
			address: '地址',
			phone: '联系方式',
			role: '用户角色',
			sex: '性别'
		};
		return {
			Labels,
			userInfo: {}
		};
	},
	computed: {
		...mapState(['user'])
	},
	mounted() {
		this.userInfo = Object.entries({ ...this.user });
	}
};
</script>

<style lang="scss"></style>
