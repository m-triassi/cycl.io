const mix = require('laravel-mix')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */
const pluginOptions = [
    require('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer'),
]

mix.ts('resources/app.tsx', 'public/js')
    .react()
    .disableNotifications()
    .postCss('resources/app.css', 'public/css', pluginOptions)
    .setPublicPath('public')
    .alias({
        '@public': 'public',
    })
    .webpackConfig({
        watchOptions: {
            aggregateTimeout: 2000,
            poll: 2000,
            ignored: /node_modules/,
        },
        module: {
            rules: [
                {
                    test: /\.less$/i,
                    loader: 'less-loader',
                    options: {
                        lessOptions: {
                            modifyVars: {
                                'primary-color': '#619B8A',
                                'link-color': '#619B8A',
                            },
                            javascriptEnabled: true,
                        },
                    },
                },
            ],
        },
        resolve: {
            plugins: [new TsconfigPathsPlugin({})],
        },
    })
