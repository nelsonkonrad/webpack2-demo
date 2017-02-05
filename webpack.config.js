const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('[name].bundle.css');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    context: __dirname + '/src',
    entry: {
        app: './app.js',
        admin: './admin.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].bundle.js',
        publicPath: '/dist/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['es2015', { modules: false }]
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                loader: extractCSS.extract(['css-loader', 'sass-loader'])
                // use: [
                //     'style-loader',                                 // outputs the css into a <style> tag in the index.html
                //     'css-loader',                                   // parses CSS into JavaScript and resolves any dependencies
                //     'sass-loader'                                   // Transforms sass into css
                // ]
            },
            {
                test: /\.(png|jpg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: { limit: 11000}                    // Convert images < 10k to base64 strings
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            filename: 'commons.js'
        }),
        new webpack.NamedModulesPlugin(),                            // See the name of modules when HMR updates some modules
        extractCSS,
        new OptimizeCssAssetsPlugin()
    ]
}