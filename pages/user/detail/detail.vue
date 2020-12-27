<template>
	<view>
		<list-item arrow="right" editable>
			<text>姓名</text>
			<template v-slot:tail>
				<text>{{ userInfo.name }}</text>
			</template>
			<template v-slot:edit>
				<input :value="userInfo.name" @change="handleChange" />
			</template>
		</list-item>
		<list-item arrow="right">
			<text>年龄</text>
			<template v-slot:tail>
				<text>{{ userInfo.age }}</text>
			</template>
			<template v-slot:edit>
				<picker mode="time" :value="time" start="09:01" end="21:01" @change="handleChange">
					<view>{{ userInfo.age }}</view>
				</picker>
			</template>
		</list-item>
		<list-item arrow="right">
			<text>地址</text>
			<template v-slot:tail>
				<text>{{ userInfo.address }}</text>
			</template>
			<template v-slot:edit>
				<picker mode="time" :value="time" start="09:01" end="21:01" @change="handleChange">
					<view>{{ userInfo.address }}</view>
				</picker>
			</template>
		</list-item>
		<list-item arrow="right">
			<text>联系方式</text>
			<template v-slot:tail>
				<text>{{ userInfo.phone }}</text>
			</template>
			<template v-slot:edit>
				<picker mode="time" :value="time" start="09:01" end="21:01" @change="handleChange">
					<view>{{ userInfo.phone }}</view>
				</picker>
			</template>
		</list-item>
		<list-item arrow="right">
			<text>用户角色</text>
			<template v-slot:tail>
				<text>{{ userInfo.role }}</text>
			</template>
			<template v-slot:edit>
				<picker mode="time" :value="time" start="09:01" end="21:01" @change="handleChange">
					<view>{{ userInfo.role }}</view>
				</picker>
			</template>
		</list-item>
		<list-item arrow="right">
			<text>性别</text>
			<template v-slot:tail>
				<text>{{ userInfo.sex }}</text>
			</template>
			<template v-slot:edit>
				<picker mode="time" :value="time" start="09:01" end="21:01" @change="handleChange">
					<view>{{ userInfo.sex }}</view>
				</picker>
			</template>
		</list-item>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
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
				userInfo: {},
				time: '12:12',
			};
		},
		computed: {
			...mapState(['user'])
		},
		mounted() {
			this.userInfo = this.user;
		},
		methods: {
			handleChange(e) {
				this.time = e.target.value
			}
		}
	};
</script>

<style lang="scss" scoped>
	input{
		text-align: right;
	}
</style>
