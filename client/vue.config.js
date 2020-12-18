const isAllowDevTools = process.env.NODE_ENV === 'development';
console.log(isAllowDevTools);

module.exports = {
	configureWebpack: {
		devtool: 'cheap-module-source-map'
		// devtool: 'source-map'
	},
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