const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.tsx',
    mode: 'development',
    output: {
        filename: 'build.[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    devServer: {
        contentBase: './dist',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Todo',
            template: path.join(__dirname, 'public', 'index.html')
        }),
    ],
    module: {
        rules: [
            {
                test: /\.sass$/i,
                use: ['style-loader', 'css-modules-typescript-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|gif|svg)$/i,
                type: 'asset',
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
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
                test: /\.js|.jsx$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react']
                    }
                }
            },
            {
                test: /\.ts|.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(ts|tsx)$/,
                enforce: 'pre',
                use: [
                    {
                        options: {
                            eslintPath: require.resolve('eslint'),

                        },
                        loader: require.resolve('eslint-loader'),
                    },
                ],
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['*', '.tsx', '.ts', '.js', '.jsx'],
    },
};