const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

function resolve(relatedPath) {
    return path.join(__dirname, relatedPath);
}

const webpackConfigBase = {
    entry: {
        client: resolve('../app/index.jsx'),
    },
    output: {
        path: resolve('../dist'),
        filename: 'scripts/[name].[hash:4].js',
        chunkFilename: 'chunks/[name].[hash:4].js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            components: path.join(__dirname, '/../app/components'),
            actions: path.join(__dirname, '/../app/actions'),
            fetch: path.join(__dirname, '/../app/fetch'),
            reducers: path.join(__dirname, '/../app/reducers'),
            util: path.join(__dirname, '/../app/util')
        },
    },
    resolveLoader: {
        moduleExtensions: ['-loader']
    },
    module: {
        rules: [{
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            loader: 'babel'
        },
        {
            test: /\.css/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style',
                use: [{
                    loader: 'css',
                    options: {
                        sourceMap: true
                    }
                }]
            }),
        },
        {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style',
                use: [{
                    loader: 'css',
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: 'less',
                    options: {
                        sourceMap: true
                    }
                }
                ]
            }),
        },
        {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url',
            options: {
                limit: 8192,
                name: 'img/[name].[hash:4].[ext]'
            }
        },
        {
            test: /\.(woff|eot|ttf|svg|gif)$/,
            loader: 'url',
            options: {
                limit: 8192,
                name: 'font/[name].[hash:4].[ext]'
            }
        },
        ],
    },
    plugins: [
        // 提取css
        new ExtractTextPlugin('styles/style.[hash:4].css'),
        // 将打包后的资源注入到html文件内    
        new HtmlWebpackPlugin({
            template: resolve('../app/index.html'),
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common', // 入口文件名
            filename: 'scripts/[name].[hash:4].bundle.js', // 打包后的文件名
            minChunks: function (module, count) {
                return module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(resolve('../node_modules')) === 0;
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            async: 'async-common',
            minChunks: 3,
        }),
    ]
};

module.exports = webpackConfigBase;