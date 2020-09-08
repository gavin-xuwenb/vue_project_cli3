// const path = require('path');
const webpack = require('webpack')
// function resolve(dir) {
//   return path.join(__dirname, dir)
// }
module.exports = {
    // chainWebpack: (config)=>{
    //     config.resolve.alias
    //         .set('@', resolve('src'))
    //         .set('assets',resolve('src/assets'))
    //         .set('components',resolve('src/components'))
    // },
	//下面直接用@，是应为默认配置了 '@':'src',
	//DOM里面的引用需要加~assets
	configureWebpack:{
		resolve:{
			alias:{
				'assets':'@/assets',
				'components':'@/components',
				'views':'@/views'
			}
		},
		plugins: [
			new webpack.ProvidePlugin({
						$:"jquery",
						jQuery:"jquery",
						"windows.jQuery":"jquery"
				})
		]
	}
}