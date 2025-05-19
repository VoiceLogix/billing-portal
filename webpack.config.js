const path = require('path');

module.exports = {
  mode: 'production',               // or 'development'
  entry: './src/index.jsx',         // your single entry point
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'widget.bundle.js',   // your output bundle
    library: {
      name: 'NavWidget',            // optional UMD/var export
      type: 'umd',
      export: 'default',
    },
    // allow this bundle to run automatically when loaded
    globalObject: 'this',
  },
  resolve: {
    extensions: ['.js', '.jsx'],    // so you can import .jsx without extension
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',        // transpile both JS and JSX
      },
    ],
  },
  // no devServer/html-plugin here—Webpack only emits the bundle
};
