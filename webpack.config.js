const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	context: path.resolve(__dirname, 'src'),
	entry: {
		main: './index.js'
	},
	output: {
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, 'dist'),
		assetModuleFilename: 'assets/[name].[hash][ext]'
	},
	module: {
		rules: [
			{
				test: /\.html$/i,
				loader: "html-loader",
			},
			{
				test: /\.css$/i,
				use: [
					"style-loader", 
					"css-loader",
					"postcss-loader",
				]
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
				"style-loader",
				"css-loader",
				"sass-loader",
				]			
			},
			{
				test: /\.(png|svg|jpg|jpeg|webm|gif)$/,
				type: 'asset/resource'
			},
			{
				test: /\.(ttf|otf|eot|woff|woff2)$/,
				use: [
					'file-loader'
				],
				type: 'javascript/auto'
			}
		]
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: './index.html'
		}),
		new CleanWebpackPlugin()
	],
	resolve: {
		alias: {
			'@root': path.resolve(__dirname),
			'@assets': path.resolve(__dirname, 'src/assets/')
		}
	},
	devtool: 'eval-source-map',
	devServer: {
		hot: true,
		static: {
			directory: path.join(__dirname, 'src'),
			publicPath: '/serve-public-path-url',
		  },
		compress: true,
		port: 9000,
	},
	optimization: {
		splitChunks: {
			chunks: 'all'
		}
	}
};