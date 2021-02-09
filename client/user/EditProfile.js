import { makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { read, update } from './api-user';
import auth from '../auth/auth-helper';
import { Redirect } from 'react-router';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing(5),
        paddingBottom: theme.spacing(2),
    },
    title: {
        margin: theme.spacing(2),
        color: theme.palette.protectedTitle,
    },
    error: {
        verticalAlign: 'middle',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 300,
    },
    submit: {
        margin: 'auto',
        marginBottom: theme.spacing(2),
    },
}));

const EditProfile = ({ match }) => {
    const classes = useStyles();
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        userId: '',
        error: '',
        redirectToProfile: false,
    });

    const jwt = auth.isAuthenticated();

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        read(
            {
                userId: match.params.userId,
            },
            { t: jwt.token },
            signal
        ).then(data => {
            if (data && data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, name: data.name, email: data.email });
            }
        });
        return () => {
            abortController.abort();
        };
    }, [match.params.userId]);

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleSubmit = e => {
        e.preventDefault();

        const user = {
            name: values.name || undefined,
            email: values.email || undefined,
            password: values.password || undefined,
        };
        update({ userId: match.params.userId }, { t: jwt.token }, user).then(
            data => {
                if (data && data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    setValues({
                        ...values,
                        userId: data._id,
                        redirectToProfile: true,
                    });
                }
            }
        );
    };

    if (values.redirectToProfile) {
        return <Redirect to={'/user/' + values.userId} />;
    }
    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h6" className={classes.title}>
                        Sign Up
                    </Typography>
                    <TextField
                        id="name"
                        label="Name"
                        className={classes.textField}
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <br />
                    <TextField
                        id="email"
                        label="Email"
                        type="email"
                        className={classes.textField}
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <br />
                    <TextField
                        id="password"
                        type="password"
                        label="Password"
                        className={classes.textField}
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <br />
                    {values.error && (
                        <Typography component="p" color="error">
                            <Icon color="error" className={classes.error}>
                                error
                            </Icon>
                            {values.error}
                        </Typography>
                    )}
                </CardContent>
                <CardActions>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={handleSubmit}
                        className={classes.submit}>
                        Submit
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
};

export default EditProfile;
