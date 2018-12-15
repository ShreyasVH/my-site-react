/**
 * @author shreyas.hande on 9/16/18
 *
 */

const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	entry: path.resolve(__dirname, 'src/index.js'),
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].js',
		chunkFilename: '[name]-chunk.js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '/pwa/'
						}
					},
					'css-loader'
				]
			},
			{
				test: /.jsx?$/,
				loader: 'babel-loader',
				options: {
					presets: [
						'es2015',
						'react'
					],
					plugins: [
						'transform-class-properties'
					]
				},
				exclude: /node_modules/
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: "[name].css",
			chunkFilename: "[id].css"
		}),
		new HtmlWebpackPlugin({
			template: 'src/template.html'
		}),
		new BundleAnalyzerPlugin()
	],
	optimization: {
		splitChunks: {
			chunks: 'all',
			name: true,
			maxSize: 0,
			minSize: 30000
		}
	},
	devServer: {
		port: 3000,
		// host: 'my-site-react'
		host: 'my-site-react.herokuapp.com'
	}
};