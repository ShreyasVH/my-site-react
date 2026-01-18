import { createTheme } from '@mui/material/styles';

const themes = createTheme({
    palette: {
        primary: {
            main: '#42a5f5',
            contrastText: '#ffffff'
        },
        secondary: {
            main: '#ba68c8'
        },
        error: {
            main: '#ef5350'
        },
        warning: {
            main: '#ff9800',
            contrastText: '#ffffff'
        },
        info: {
            main: '#03a9f4',
            contrastText: '#ffffff'
        },
        success: {
            main: '#4caf50',
            contrastText: '#ffffff'
        }
    },
});

export default themes;