const isDevEnv = process.env.NODE_ENV === 'development';
module.exports = {
	configureWebpack: {
		devtool: 'cheap-module-source-map'
	},
	publicPath: '/',

	devServer: {
		proxy: {
			'^/api/*': {
				target: `http://developer-nine.tk`
			}
		}
	},
	outputDir: '../www/dist',
	assetsDir: isDevEnv ? '' : '../dist/assets'
}