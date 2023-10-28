import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/Landing/Landing.tsx';
import Signup from './components/Signup/Signup.tsx';
import Login from './components/Login/Login.tsx';
import ChatsPage from './components/chatsPage/ChatsPage.tsx';
import { useRecoilValue } from 'recoil';
import {themesState} from "./atoms/themeState.tsx";
import {darkTheme, lightTheme} from "./theme/theme.tsx";

function App() {
    const theme = useRecoilValue(themesState);

    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <Router>
                <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/chats" element={<ChatsPage />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
