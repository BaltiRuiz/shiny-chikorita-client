const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    devServer: {
        port: 3000,
        static: path.join(__dirname, "public"),
    },
    devtool: 'inline-source-map',
    context: path.join(__dirname, "src"),
    entry: {
        client: "./index.tsx"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "/",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader",
                },
            },
            {
                test: /\.css$/,
                include: path.resolve(__dirname, "src"),
                use: ["style-loader", "css-loader"],
            },
        ]
    },
    plugins: [
        new HTMLWebpackPlugin(
            { template: "../public/index.html" },
        ),
    ],
}
