import {
    Button,
    Container,
    Grid,
    InputAdornment,
    InputLabel,
    Link,
    Paper,
    TextField,
    Typography,
    useTheme
} from "@mui/material";
import Appbar from "../Appbar.tsx";
import {AccountCircle, Lock, Email} from "@mui/icons-material";
import {useState} from "react";
import lightModeBg from "../../Assets/Images/lightModeLoginBg.jpg";
import darkModeBg from "../../Assets/Images/darkModeLogin.jpg";
import {useRecoilState, useRecoilValue} from "recoil";
import {themesState} from "../../atoms/themeState.tsx";
import {backendURL} from "../../info/backendURL.tsx";
import {useNavigate} from "react-router-dom";
import {loggedInUser} from "../../atoms/loggedInUser.tsx";

const Signup = () => {
    const theme = useTheme();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profilePic, setProfilePic] = useState("");
    // @ts-ignore
    const [userInfo, setUserInfo] = useRecoilState(loggedInUser);
    const themeState = useRecoilValue(themesState);
    const navigate = useNavigate();

    const handleSignup = async() => {
        if(!name || !email || !password){
            return alert("Fill all the required fields");
        }
        await fetch(`${backendURL}user/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: name, email: email, password: password, profilePic: profilePic }),
        })
            .then(async (response) => {
                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem("token", data.token);
                    navigate("/chats");
                } else {
                    const errorData = await response.json();
                    console.error("Signup failed with error:", errorData.message);
                    alert("Signup failed");
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
                    height: "600px",
                    // @ts-ignore
                    backgroundColor: theme.palette.customColors.loginContainer,
                    border: "5px",
                    borderRadius: "30px",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    marginTop: "50px"
                }}>
                    <Typography variant="h5" sx={{
                        marginTop: "15px",
                    }}>
                        SIGN UP
                    </Typography>
                    <br/>
                    <br/>
                    <TextField
                        placeholder="Name"
                        variant="outlined"
                        size="small"
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
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
                    <br/>
                    <div style={{
                        display: "flex",
                    }}>
                        <InputLabel> Profile Picture:</InputLabel>
                        <input
                            placeholder="Profile Pic"
                            type="file"
                            accept="image/*"
                            // @ts-ignore
                            onChange={(e) => setProfilePic(e.target.files[0])}
                            style={{
                                marginLeft: "10px"
                            }}
                        />
                    </div>
                    <br/>
                    {profilePic && (
                        <img
                            src={profilePic}
                            alt="Selected Profile Pic"
                            style={{ maxWidth: '100px', maxHeight: '100px' , borderRadius: "50%"}}
                        />
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleSignup}
                    >
                        Sign up
                    </Button>
                    <Grid container>
                        <Grid item xs>

                        </Grid>
                        <Grid item>
                            <Link href="/login" variant="body2" sx={{
                                // @ts-ignore
                                color: theme.palette.customColors.linkSignup,
                            }}>
                                {"Already have a Account? Log In"}
                            </Link>
                        </Grid>
                    </Grid>
                </Container>
            </Paper>
        </>
    )
}

export default Signup;