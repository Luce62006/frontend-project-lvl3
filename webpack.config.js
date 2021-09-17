const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js',
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),

        new CopyPlugin({
            patterns: [
                { from: "./src/index.css", to: "./src/index.css" }
            ]}),
    ]
}
