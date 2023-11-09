import {
    Button,
    Container,
    Grid,
    InputAdornment,
    Link,
    Paper,
    TextField,
    Typography,
    useTheme
} from "@mui/material";
import Appbar from "../Appbar.tsx";
import {Email, Lock} from "@mui/icons-material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {backendURL} from "../../info/backendURL.tsx";
import {useRecoilState, useRecoilValue} from "recoil";
import {themesState} from "../../atoms/themeState.tsx";
import lightModeBg from "../../Assets/Images/lightModeLoginBg.jpg";
import darkModeBg from "../../Assets/Images/darkModeLogin.jpg";
import {loggedInUser} from "../../atoms/loggedInUser.tsx";

const Login = () => {
    const theme = useTheme();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // @ts-ignore
    const [userInfo, setUserInfo] = useRecoilState(loggedInUser);
    const navigate = useNavigate();
    const themeState = useRecoilValue(themesState);

    const handleLogin = async () => {
        if(!email || !password){
            return alert("Fill all the required fields !!");
        }
        await fetch(`${backendURL}user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email, password: password }),
        })
            .then(async (response) => {
                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem("token", data.token);
                    navigate("/chats");
                } else {
                    const errorData = await response.json();
                    console.error("Login failed with error:", errorData.message);
                    alert("Login failed");
                }
            })
    }

    return(
        <>
            <Appbar/>
            <Paper sx={{
                width: "100vw",
                height: "92.3vh",
                display: "flex",
                alignItems: "center",
                // @ts-ignore
                backgroundColor: theme.palette.customColors.loginPaper,
                backgroundImage: `url(${themeState === 'light' ? lightModeBg: darkModeBg})`,
                backgroundSize: "cover",
            }}>
                <Container sx={{
                    width: "450px",
                    height: "500px",
                    // @ts-ignore
                    backgroundColor: theme.palette.customColors.loginContainer,
                    border: "5px",
                    borderRadius: "30px",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column"
                }}>
                    <Typography variant="h5" sx={{
                        marginTop: "15px",
                    }}>
                        LOG IN
                    </Typography>
                    <br/>
                    <br/>
                    <TextField
                        variant="outlined"
                        placeholder="Email"
                        size="small"
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Email />
                                </InputAdornment>
                            ),
                        }}
                        sx={{

                        }}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                    />
                    <br />
                    <br />
                    <TextField
                        type="password"
                        variant="outlined"
                        placeholder="Password"
                        size="small"
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock />
                                </InputAdornment>
                            ),
                        }}
                        sx={{

                        }}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <br/>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleLogin}
                    >
                        Log In
                    </Button>
                    <Grid container>
                        <Grid item xs>

                        </Grid>
                        <Grid item>
                            <Link href="/signup" variant="body2" sx={{
                                // @ts-ignore
                                color: theme.palette.customColors.linkLogin,
                            }}>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Container>
            </Paper>
        </>
    )
}

export default Login;