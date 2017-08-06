import path from 'path';
import webpack from 'webpack';

const hmrQueries = ['webpack-hot-middleware/client', 'react-hot-loader/patch'];

export default {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        bundle: hmrQueries.concat('./app/client/index'),
        styles: hmrQueries.concat('./resources/assets/sass/main')
    },
    output: {
        path: path.resolve(__dirname, 'public/assets/js'),
        filename: '[name].js',
        publicPath: '/assets/'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: path.resolve(__dirname, 'node_modules')
            },
            {
                test: /\.s?css$/,
                loaders: ['style-loader', 'css-loader?sourceMap', 'resolve-url-loader', 'sass-loader?sourceMap']
            }
        ]
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
                URL: JSON.stringify('http://localhost'),
                PORT: JSON.stringify('3000')
            }
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.scss']
    }
};
