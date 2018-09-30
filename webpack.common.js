const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: './src/index.js',
	output: {
		path: __dirname + '/dist',
		filename: '[name].bundle.js'
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			title: 'Brian Horvat',
			template: './src/index.html',
			filename: 'index.html',
			svgoConfig: {
				removeTitle: false,
				removeViewBox: true,
			}
		  }),
		new FaviconsWebpackPlugin({
			logo: './static/favicon.png',
			background: '#fafafa',
			title: 'Brian Horvat'
		}),
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[id].css"
		  })
	],
	module: {
		rules: [
			{
				test: /\.(html)$/,
				use: {
					loader: 'html-loader',
					options: {
						minimize: true,
						interpolate: true
					}
				}
			},
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
				  	loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.scss$/,
				use: [
					process.env.WEBPACK_MODE !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
					"css-loader", // translates CSS into CommonJS
					"sass-loader" // compiles Sass to CSS, using Node Sass by default
				]
			},
			{
				test: /\.svg$/,
				use: {
					loader: 'file-loader',
				  	options: {}
			  }
			},
			{
				test: /\.pdf$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[path][name].[ext]'
					}
				}
			}
		]
	}
};