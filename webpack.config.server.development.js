import path from 'path';
import webpack from 'webpack';
import { dependencies, devDependencies } from './package.json';

const nodeModules = Object.keys(dependencies).concat(Object.keys(devDependencies)).reduce((acc, mod) =>  {
    acc[mod] = `commonjs ${mod}`;
    return acc;
}, {});

export default {
    entry: {
        app: ['babel-polyfill', './app/server/app']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: path.resolve(__dirname, 'node_modules')
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            'node_modules',
            __dirname
        ]
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    devtool: 'cheap-module-eval-source-map',
    target: 'node',
    externals: nodeModules
};
