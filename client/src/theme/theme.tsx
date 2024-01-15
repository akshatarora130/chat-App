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
        backgroundUserNewChat: string;
        selectedBgUserNewChat: string;
        colorNewChat: string;
        chatsColor: string;
        emojiIcon: string;
        addIcon: string;
        sendIcon: string;
        senderMessage: string,
        receiverMessage: string;
        messageText: string;
        selectedUserBg: string;
        mainPageBg: string;
        buttonColor: string;
        buttonBg: string;
        textHome: string;
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
        backgroundUserNewChat: "#f0f2f5",
        selectedBgUserNewChat: "#d9fdd2",
        colorNewChat: "#000000",
        chatsColor: "#000000",
        emojiIcon: "#000000",
        addIcon: "#000000",
        sendIcon: "#000000",
        senderMessage: "#d9fdd2",
        receiverMessage: "#ffffff",
        messageText: "#000000",
        selectedUserBg: "#d9fdd2",
        mainPageBg: "#f0ebe3",
        buttonColor: "#000000",
        buttonBg: "#ffffff",
        textHome: "#000000"
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
        backgroundUserNewChat: "#1f2c33",
        selectedBgUserNewChat: "#015d4b",
        colorNewChat: "#ffffff",
        chatsColor: "#ffffff",
        emojiIcon: "#ffffff",
        addIcon: "#ffffff",
        sendIcon: "#ffffff",
        senderMessage: "#015d4b",
        receiverMessage: "#1f2c33",
        messageText: "#ffffff",
        selectedUserBg: "#015d4b",
        mainPageBg: "#1f2c33",
        buttonColor: "#000000",
        buttonBg: "#ffffff",
        textHome: "#ffffff"
    }
};

export const lightTheme = createTheme({
    palette: lightPalette,
});

export const darkTheme = createTheme({
    palette: darkPalette,
});
