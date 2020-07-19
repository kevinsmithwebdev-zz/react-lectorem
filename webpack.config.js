const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/Lectorem.jsx',
  output: {
    path: path.resolve('lib'),
    filename: 'Lectorem.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
