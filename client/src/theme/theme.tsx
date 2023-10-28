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
    }
}

const lightPalette: CustomPalette = {
    mode: 'light',
    primary: {
        main: '#ffffff',
    },
    customColors:{
        appBar: "#ffffff",
        chatsBoxBackground: '#ffffff',
        chatBorder: "#111b21",
        messageBoxBackground: "#efeae2",
        chatsBar: "#f0f2f5",
        messageBar: "#f0f2f5",
        nameColor: "#000000",
        searchBox: "#f0f2f5",
    }
};

const darkPalette: CustomPalette = {
    mode: 'dark',
    primary: {
        main: '#000000',
    },
    customColors:{
        appBar: '#000000',
        chatsBoxBackground: '#111b21',
        chatBorder: "#ffffff",
        messageBoxBackground: "#141d23",
        chatsBar: "#1f2c33",
        messageBar: "#1f2c33",
        nameColor: "#ffffff",
        searchBox: "#1f2c33",
    }
};

export const lightTheme = createTheme({
    palette: lightPalette,
});

export const darkTheme = createTheme({
    palette: darkPalette,
});
