const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const bundleOutputDir = './asset';
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);
    const devMode = isDevBuild ? 'development' : 'production';

    return [{
        mode: devMode,
        stats: { modules: false },
        context: __dirname,
        resolve: { extensions: ['.js', '.ts'] },
        entry: {
            babiesfirstfood: './Scripts/apps/babies-first-food/boot.ts',
        },
        module: {
            rules: [
                { test: /\.vue[\.html]?$/, include: /apps/, loader: 'vue-loader', options: { loaders: { js: 'ts-loader' } } },
                {
                    test: /\.ts$/, include: /apps/, use: [{
                        loader: 'ts-loader',
                        options: {
                            appendTsSuffixTo: [/\.vue\.html$/]
                        }
                    }]
                },
                {
                    test: /\.scss$/,
                    include: /apps/,
                    use: [
                        { loader: "style-loader" },
                        { loader: "css-loader" },
                        { loader: "sass-loader" },
                    ]
                },
                { test: /\.css$/, use: isDevBuild ? ['style-loader', 'css-loader'] : ExtractTextPlugin.extract({ use: 'css-loader?minimize' }) },
                { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' }
            ]
        },
        output: {
            path: path.join(__dirname, bundleOutputDir),
            filename: '[name].js',
            publicPath: 'dist/'
        },
        plugins: [
            new VueLoaderPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(isDevBuild ? 'development' : 'production')
                }
            }),
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./asset/vendor-manifest.json')
            })
        ].concat(isDevBuild ? [
            // Plugins that apply in development builds only
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map', // Remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(bundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
            })
        ] : [
            new ExtractTextPlugin('site.css')
        ])
    }];
};