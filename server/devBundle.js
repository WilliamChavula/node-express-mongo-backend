import config from '../config/config';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.client';

/*
During development, when we run the server, the Express app should also load the
Webpack middleware that's relevant to the frontend with respect to the configuration
that's been set for the client-side code, so that the frontend and backend development
workflow is integrated.

When the Express app runs
in development mode, adding this code will import the middleware, along with
the client-side Webpack configuration. Then, it will initiate Webpack to compile and
bundle the client-side code and also enable hot reloading.

The bundled code will be placed in the dist folder. This code will be needed to
render the views.
*/

const compile = app => {
    if (config.env === 'development') {
        const compiler = webpack(webpackConfig);
        const middleware = webpackMiddleware(compiler, {
            publicPath: webpackConfig.output.publicPath,
        });
        app.use(middleware);
        app.use(webpackHotMiddleware(compiler));
    }
};

export default { compile };
