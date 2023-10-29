import {createTheme, PaletteOptions} from '@mui/material/styles';

interface CustomPalette extends PaletteOptions {
    customColors: {
        appBar: string;
        chatsBoxBackground: string;
        chatBorder: string;
        messageBoxBackground: string;
        chatsBar: string;
        messageBar: string;
        nameColor: string;
        searchBox: string;
        loginPaper: string;
        signupPaper: string;
        loginContainer: string;
        signupContainer: string;
        linkLogin: string;
        linkSignup: string;
    }
}

const lightPalette: CustomPalette = {
    mode: 'light',
    primary: {
        main: '#ffffff',
    },
    customColors:{
        appBar: "#f0f2f5",
        chatsBoxBackground: '#ffffff',
        chatBorder: "#111b21",
        messageBoxBackground: "#efeae2",
        chatsBar: "#f0f2f5",
        messageBar: "#f0f2f5",
        nameColor: "#000000",
        searchBox: "#f0f2f5",
        loginPaper: "#ffffff",
        signupPaper: "#ffffff",
        loginContainer: "#f0ebe3",
        signupContainer: "#f0ebe3",
        linkLogin: "#000000",
        linkSignup: "#000000",
    }
};

const darkPalette: CustomPalette = {
    mode: 'dark',
    primary: {
        main: '#000000',
    },
    customColors:{
        appBar: '#0b141a',
        chatsBoxBackground: '#111b21',
        chatBorder: "#ffffff",
        messageBoxBackground: "#141d23",
        chatsBar: "#1f2c33",
        messageBar: "#1f2c33",
        nameColor: "#ffffff",
        searchBox: "#1f2c33",
        loginPaper: "#000000",
        signupPaper: "#000000",
        loginContainer: "#1f2c33",
        signupContainer: "#1f2c33",
        linkLogin: "#ffffff",
        linkSignup: "#ffffff",
    }
};

export const lightTheme = createTheme({
    palette: lightPalette,
});

export const darkTheme = createTheme({
    palette: darkPalette,
});
