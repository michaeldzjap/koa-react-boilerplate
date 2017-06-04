const path = require('path');
const webpack = require('webpack');

const hmrQueries = ['webpack-hot-middleware/client', 'react-hot-loader/patch'];

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        bundle: hmrQueries.concat('./app/client/index'),
        styles: hmrQueries.concat('./resources/assets/sass/main')
    },
    output: {
        path: path.join(__dirname, 'public/assets/js'),
        filename: '[name].js',
        publicPath: '/assets/'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['react-hot-loader/webpack', 'babel-loader'],
                include: path.join(__dirname, 'app')
            },
            {
                test: /\.s?css$/,
                loaders: ['style-loader', 'css-loader?sourceMap', 'resolve-url-loader', 'sass-loader?sourceMap']
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
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
