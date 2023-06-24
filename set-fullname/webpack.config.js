const path = require("path")

module.exports = {
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, ''), // Specify your content base directory here
    },
    //static: path.resolve(__dirname, 'assets'),
    port: 3000, // Port number for the server
  },
  resolve: {
    extensions: [".ts", ".js"],
    modules: [
        /* assuming that one up is where your node_modules sit,
           relative to the currently executing script
        */
        path.join(__dirname, './node_modules')
      ]
  },
  entry : "./src/taskpane/taskpane.ts",
  output : {
    path: path.resolve(__dirname, "dist"),
    filename: "output.js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader'
        // use: {
        //   loader: 'ts-loader',
        //   options: {
        //     configFile: './tsconfig.json',
        //   },
        // },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  }
}
