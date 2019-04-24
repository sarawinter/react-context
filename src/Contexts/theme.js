
export const themes = {
    light: {
        headerColor: 'lightblue',
        backgroundColor: 'white',
        textColor: 'black',
        btnClass: 'light'
    },
    dark: {
        headerColor: 'red',
        backgroundColor: 'black',
        textColor: 'white',
        btnClass: 'dark'
    }
};

export const ThemeContext = React.createContext(
    themes.light // default value
);

// https://reactjs.org/docs/context.html