const isDevEnv = process.env.NODE_ENV === 'development';
module.exports = {
	configureWebpack: {
		devtool: 'cheap-module-eval-source-map'
	},
	publicPath: '/',

	devServer: {
		proxy: {
			'^/api/*': {
				target: `http://yupitereu.cafe24.com`
			}
		}
	},
	outputDir: '../www/dist',
	assetsDir: isDevEnv ? '' : '../dist/assets',
	css: {
		loaderOptions: {
			sass: {
				prependData: `@import "@/common/style/variable.scss";
											@import "@/common/style/mixin.scss";`
			}
		}
	}
}