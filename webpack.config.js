var webpack = require('webpack');
module.exports = {
  entry: [
    'webpack/hot/only-dev-server',
    './client/src/index.js'
  ],
  output: {
    path: './client/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './client/dist'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};

//NOTE:
// 'webpack-dev-server/client?http://localhost:8080'
// this originally was placed inside of entry, but
// i wasn't able to connect my server with that entry point.
// It led me to rabbit hole, so i took it out for now, but feel free to put it back in if it's important! I dont know anything so yeah...ahahah

