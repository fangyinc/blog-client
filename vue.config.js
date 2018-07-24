const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
	devServer: {
		port: 8080
	},
	configureWebpack: config => {
		let plugins = [
			// 去掉 console的输出
			new UglifyJsPlugin({
				uglifyOptions: {
					compress: {
						warnings: false,
						drop_debugger: true,
						drop_console: true,
					},
				},
				sourceMap: false,
				parallel: true,
			}),
		]
		if (process.env.NODE_ENV !== 'development') {
			config.plugins = [...config.plugins, ...plugins]
		}
	}
}