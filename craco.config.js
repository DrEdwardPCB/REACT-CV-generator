const webpack = require("webpack");

module.exports = {
    webpack: {
        configure: {
            resolve: {
                fallback: {
                    process: require.resolve("process/browser"),
                    zlib: require.resolve("browserify-zlib"),
                    stream: require.resolve("stream-browserify"),
                    util: require.resolve("util"),
                    buffer: require.resolve("buffer"),
                    asset: require.resolve("assert"),
                },
            },
            plugins: [
                new webpack.ProvidePlugin({
                    Buffer: ["buffer", "Buffer"],
                    process: "process/browser",
                }),
            ],
        },
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader", "postcss-loader"],
                },
                {
                    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: "[name].[ext]",
                                outputPath: "fonts/",
                            },
                        },
                    ],
                },
            ],
        },
    },
};
