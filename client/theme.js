import { createMuiTheme } from '@material-ui/core/styles';
import { indigo } from '@material-ui/core/colors';

const theme = createMuiTheme({
    typography: { useNextVatiants: true },
    palette: {
        primary: {
            light: '#6573c3',
            main: '#3f51b5',
            dark: '#2c387e',
            contrastText: '#fff',
        },
        secondary: {
            light: '#c272be',
            main: '#B34FAE',
            dark: '#7d3779',
            contrastText: '#fff',
        },
        openTitle: '#121858',
        protectedTitle: '#F65D91',
        type: 'light',
    },
});

export default theme;
