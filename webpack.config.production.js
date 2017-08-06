import path from 'path';
import webpack from 'webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import AssetsPlugin from 'assets-webpack-plugin';
import PurifyCSSPlugin from 'purifycss-webpack';
import glob from 'glob-all';

export default {
    devtool: 'cheap-source-map',
    entry: {
        bundle: './app/client/index',
        vendor: ['react'],
        styles: './resources/assets/sass/main'
    },
    output: {
        path: path.join(__dirname, 'public/assets/js'),
        filename: '[name].[chunkhash].js',
        chunkFilename: '[chunkhash].js',
        publicPath: '/assets/js/'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: path.join(__dirname, 'app')
            },
            {
                test: /\.s?css$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: ['css-loader?sourceMap&minimize', 'resolve-url-loader', 'sass-loader?sourceMap']
                }),
                include: path.join(__dirname, 'resources/assets/sass')
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['public/assets'], {
            root: __dirname
        }),
        new ExtractTextPlugin('../css/[name].[chunkhash].css'),
        new PurifyCSSPlugin({
            paths: glob.sync([
                path.join(__dirname, 'app/server/html.js'),
                path.join(__dirname, 'app/shared/components/*.js'),
                path.join(__dirname, 'app/shared/views/**/*.js')
            ])
        }),
        new AssetsPlugin({
            path: __dirname,
            prettyPrint: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            compressor: {
                warnings: false
            }
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
                URL: JSON.stringify('0.0.0.0'),
                PORT: JSON.stringify('3000')
            }
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.scss']
    }
};
