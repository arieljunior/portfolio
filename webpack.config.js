const path = require('path');
const webpack = require('webpack')

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        path: __dirname+'/public',
        filename: "./bundle.js"
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 9090
      },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "env",
                            "react"
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {}  
                  }
                ]
              }
        ]
    }
}