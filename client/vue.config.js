module.exports = {
	publicPath: '/dist/',

	devServer: {
		proxy: {
			'^/api/*': {
				target: `http://developer-nine.tk`
			}
		}
	},
	outputDir: '../www/dist'
}