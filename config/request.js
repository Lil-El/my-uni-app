// 请求拦截
uni.$u.http.interceptors.request.use((config) => {
	config.data = config.data || {};
	config.header.Authorization = uni.getStorageSync("token") || "";
	// 蒲公英
	if(config.custom.pgyer) {
		config.baseURL = "https://www.pgyer.com/apiv2";
		config.header["content-type"] = "application/x-www-form-urlencoded";
	}
	return config;
}, config => {
	return Promise.reject(config);
})

// 响应拦截
uni.$u.http.interceptors.response.use((response) => {
	const data = response.data;
	// success
	if (response.config.custom.pgyer) { // pgy
		// 下载接口
		if(response.config.method === "DOWNLOAD") return {
			tempFilePath: response.tempFilePath,
			statusCode: response.statusCode
		}
		// 其他restapi
		if(data.code == 0) return response;
	} else if (data.code == 1 || data.code == 200) { // tincher
		return Promise.resolve(response)
	}
	// fail
	// 不传custom.toast，表示toast；
	const message = data.msg || data.message || "网络错误";
	if(response.config.custom.toast !== false) {
		uni.$u.toast(message);
	}
	return Promise.reject(message);
}, (response) => {
	uni.$u.toast("网络错误");
	return Promise.reject("网络错误")
})

export const setHttpConfig = (data = {}) => {
	uni.$u.http.setConfig((config) => {
		const ip = uni.getStorageSync("ip") || getApp().globalData.ip;
		const port = uni.getStorageSync("port") || getApp().globalData.port;
		config.baseURL = `http://${ip}:${port}/`;
		for (const key in data) {
			config[key] = data[key]
		}
		return config
	})
}
