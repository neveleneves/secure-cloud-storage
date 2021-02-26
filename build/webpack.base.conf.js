const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')


const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: 'assets/'
}

const PAGES_DIR = `${PATHS.src}/html`
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.html'));

module.exports = {
    externals: {
        paths: PATHS,
    },
    entry: {
        app: PATHS.src
    },
    output: {
        filename: `${PATHS.assets}js/[name].[hash].js`,
        path: PATHS.dist,
        publicPath: '/'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendors',
                    chunks: 'all', 
                    test: /node_modules/,
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [
            {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]'
            }
        },{
            test: /\.(png|jpeg|jpg|gif|svg)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]'
            }
        }, 
        {
            test: /\.(jsx|js)$/,
            loader: 'babel-loader',
            exclude: '/node_modules/'
        },
        {
            test: /\.css$/,
            use: [
                //'style-loader',
                MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: {sourceMap: true}
                },
                {
                    loader: "postcss-loader",
                    options: {sourceMap: true}
                }
            ]
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].[hash].css`
        }),
        ...PAGES.map(page => new HtmlWebpackPlugin({
            hash: false,
            template: `${PAGES_DIR}/${page}`,
            filename: `./${page}`
        })),
        new CopyWebpackPlugin({
            patterns: [
                {from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img`},
                {from: `${PATHS.src}/${PATHS.assets}fonts`, to: `${PATHS.assets}fonts`},
                {from: `${PATHS.src}/static`, to: ''}
            ]
        }),
        new webpack.ProvidePlugin({
            $: "jquery/dist/jquery.min.js",
            jQuery: "jquery/dist/jquery.min.js",
            "window.jQuery": "jquery/dist/jquery.min.js"
        })
    ],
}