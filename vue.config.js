module.exports = {
	css: {
		loaderOptions: {
			scss: {
				prependData: `@import "~@/static/style/index.scss";`
			}
		}
	}
}
