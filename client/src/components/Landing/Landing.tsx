import Appbar from "../Appbar.tsx";
import {Button, Typography, useTheme} from "@mui/material";
import {useRecoilValue} from "recoil";
import lightModeBg from "../../Assets/Images/lightModeLoginBg.jpg";
import darkModeBg from "../../Assets/Images/darkModeLogin.jpg";
import {themesState} from "../../atoms/themeState.tsx";
import {useNavigate} from "react-router-dom";

const Landing = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const themeState = useRecoilValue(themesState);

    return(
        <>
            <Appbar/>
            <div style={{
                margin: 0,
                padding: 0,
                width: "100vw",
                height: "769px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                // @ts-ignore
                backgroundColor: theme.palette.customColors.loginPaper,
                backgroundImage: `url(${themeState === 'light' ? lightModeBg: darkModeBg})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
            }}>
                <div style={{
                    // @ts-ignore
                    backgroundColor: theme.palette.customColors.mainPageBg,
                    width: "80vw",
                    height: "80vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "30px",
                    gap: "60px",
                }}>
                    <div style={{
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        <Typography style={{
                            // @ts-ignore
                            color: theme.palette.customColors.textHome,
                            fontSize: "40px",
                            fontWeight: "bold",
                            marginTop: "-200px",
                            marginLeft: "-200px"
                        }}>Do it all with</Typography>
                        <Typography style={{
                            // @ts-ignore
                            color: theme.palette.customColors.textHome,
                            fontSize: "50px",
                            marginTop: "-20px",
                            fontWeight: "bold",
                            marginLeft: "-200px"
                        }}>TALK-TALK</Typography>
                        <Typography style={{
                            // @ts-ignore
                            color: theme.palette.customColors.textHome,
                            fontSize: "20px",
                            marginTop: "20px",
                            marginLeft: "-200px"
                        }}>With talk-talk, you get the platform </Typography>
                        <Typography style={{
                            // @ts-ignore
                            color: theme.palette.customColors.textHome,
                            fontSize: "20px",
                            marginLeft: "-200px"
                        }}>you need to reach new people, </Typography>
                        <Typography style={{
                            // @ts-ignore
                            color: theme.palette.customColors.textHome,
                            fontSize: "20px",
                            marginLeft: "-200px"
                        }}>and be a CHAT CHERP.</Typography>
                        <div style={{
                            display: "flex",
                            gap: "30px",
                            marginTop: "50px",
                            marginLeft: "-200px"
                        }}>
                            <Button style={{
                                padding: "10px 20px",
                                border: "none",
                                borderRadius: "40px",
                                cursor: "pointer",
                                transition: "background-color 0.3s, color 0.3s",
                                // @ts-ignore
                                backgroundColor: theme.palette.customColors.buttonBg,
                                // @ts-ignore
                                color: theme.palette.customColors.buttonColor,
                            }}
                                    onClick={() => {
                                        navigate("/signup")
                                    }}
                            >Signup</Button>
                            <Button style={{
                                padding: "10px 20px",
                                border: "none",
                                borderRadius: "40px",
                                cursor: "pointer",
                                transition: "background-color 0.3s, color 0.3s",
                                // @ts-ignore
                                backgroundColor: theme.palette.customColors.buttonBg,
                                // @ts-ignore
                                color: theme.palette.customColors.buttonColor,
                            }} onClick={() => {
                                navigate("/login")
                            }}
                            >Login</Button>
                        </div>
                    </div>
                    <div>
                        <img src="https://i.ibb.co/dkKp8WX/aku.webp" alt="aku" style={{
                            width: "780px",
                            height: "780px",
                            marginRight: "-250px",
                            marginTop: "-100px",
                        }}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Landing;