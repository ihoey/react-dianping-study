const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackConfigBase = require('./webpack.base.config');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const PORT = 3010;

function resolve(relatedPath) {
    return path.join(__dirname, relatedPath);
}
const webpackConfigDev = {
    plugins: [
        // 定义环境变量为开发环境
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            IS_DEVELOPMETN: true,
        }),
        new OpenBrowserPlugin({
            url: `http://localhost:${PORT}`,
        }),
    ],
    devtool: 'source-map',
    devServer: {
        proxy: {
            // 凡是 `/api` 开头的 http 请求，都会被代理到 localhost:3000 上，由 koa 提供 mock 数据。
            // koa 代码在 ./mock 目录中，启动命令为 npm run mock
            '/api': {
                target: 'http://localhost:3000',
                secure: false
            }
        },
        contentBase: resolve('../app'),
        historyApiFallback: false,
        hot: false,
        host: '0.0.0.0',
        port: PORT,
    },
};

module.exports = merge(webpackConfigBase, webpackConfigDev);