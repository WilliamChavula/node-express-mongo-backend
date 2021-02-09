import path from 'path';
import express from 'express';

//modules for server side rendering
import React from 'react';
import ReactDomServer from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';
import MainRouter from '../client/MainRouter';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles';
import theme from '../client/theme';

// import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import devBundle from './devBundle';

import Template from '../template';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';

const CURRENT_WORKING_DIR = process.cwd();

const app = express();
devBundle.compile(app);

/* configre express */
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));
app.use('/', authRoutes);
app.use('/', userRoutes);

app.get('*', (req, res) => {
    const sheets = new ServerStyleSheets();
    const context = {};
    const markup = ReactDomServer.renderToString(
        sheets.collect(
            <StaticRouter location={req.url} context={context}>
                <ThemeProvider theme={theme}>
                    <MainRouter />
                </ThemeProvider>
            </StaticRouter>
        )
    );
    if (context.url) {
        return res.redirect(303, context.url);
    }
    const css = sheets.toString();
    res.status(200).send(
        Template({
            markup: markup,
            css: css,
        })
    );
});

// app.get('/', (req, res) => {
//     res.status(200).send(Template());
// });

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: err.name + ': ' + err.message });
    } else if (err) {
        res.status(401).json({ error: err.name + ': ' + err.message });
        console.log(err);
    }
});

export default app;
