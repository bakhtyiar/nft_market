const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

let isDev = process.env.NODE_ENV === 'development';
let isProd = !isDev;

const optimization = () => {
	const config = {
		splitChunks: {
			chunks: 'all'
		}
	};

	if (isProd) {
		config.minimizer = [
			new OptimizeCssAssetsPlugin(),
			new TerserPlugin(),
		]
	};

	return config;
}

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
				test: /\.s[ac]ss$/i,
				use: [
				"style-loader",
				"css-loader",
				"postcss-loader",
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
			},
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
				  loader: "babel-loader",
				  options: {
					presets: ['@babel/preset-env']
				  }
				}
			}
		]
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: './index.html'
		}),
		new CleanWebpackPlugin(),
	],
	resolve: {
		alias: {
			'@root': path.resolve(__dirname),
			'@assets': path.resolve(__dirname, 'src/assets/')
		}
	},
	devtool: isDev ? 'eval-source-map' : 'eval',
	devServer: {
		hot: true,
		static: {
			directory: path.join(__dirname, 'src'),
			publicPath: '/serve-public-path-url',
		  },
		port: 9000,
	},
	optimization: optimization(),
};