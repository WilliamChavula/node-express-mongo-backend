import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import bikeImage from '../assets/images/thomas-jarrand-unsplash.jpg';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        marginTop: theme.spacing(5),
    },
    title: {
        padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
            2
        )}px`,
        color: theme.palette.openTitle,
    },
    media: {
        minHeight: 400,
    },
}));

const Home = () => {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <Typography variant="h6" className={classes.title}>
                Home
            </Typography>
            <CardMedia
                className={classes.media}
                image={bikeImage}
                title="Thomas Jarrand Bike"
            />
            <CardContent>
                <Typography variant="body2" component="p">
                    Welcome to the MERN skeleton home page.
                </Typography>
            </CardContent>
        </Card>
    );
};

export default Home;
