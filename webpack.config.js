
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  //  mode: 'production',
   mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              use: {
                loader: "babel-loader"
              }
            }
          ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    })],
    devServer: {
        historyApiFallback: true
    },
    externals: {
       
        config: JSON.stringify({
            apiUrl: 'https://apiisarr.azurewebsites.net',
           
        })
    }
}

