import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    useTheme,
} from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useRecoilState } from 'recoil';
import { themesState } from "../atoms/themeState.tsx";

function Appbar() {
    const theme = useTheme()
    const [themeState, setThemeState] = useRecoilState(themesState);

    const toggleTheme = () => {
        setThemeState(themeState === 'light' ? 'dark' : 'light');
    };


    return (
        <>
            <AppBar position="static" sx={{
                // @ts-ignore
                backgroundColor: theme.palette.customColors.appBar,
            }}>
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        TALK-TALK
                    </Typography>
                    <IconButton onClick={toggleTheme} sx={{

                    }}>
                        {themeState === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
                    </IconButton>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Appbar;
