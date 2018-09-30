const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
			filename: process.env.WEBPACK_MODE !== 'production' ? '[name].css' : '[name].[hash].css',
			chunkFilename: '[id].css'
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
				test: /\.s?css$/,
				use: [
					process.env.WEBPACK_MODE !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: { importLoaders: 1 }
					},
          			'postcss-loader',
					'sass-loader'
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