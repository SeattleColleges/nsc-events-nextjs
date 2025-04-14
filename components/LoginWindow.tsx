"use client";

import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Container, Paper, Box, TextField, Button, Typography, Link as MuiLink, useMediaQuery } from "@mui/material";
import { textFieldStyle } from "@/components/InputFields";
import { useTheme } from "@mui/material";
import Link from "next/link";

const URL = process.env.NSC_EVENTS_PUBLIC_API_URL;
if (URL?.includes('localhost')) {
    console.log('Dev API Address: ', URL)
}

const LoginWindow = () => {
    const { palette } = useTheme();

    const darkImagePath = '/images/white_nsc_logo.png';
    const lightImagePath = '/images/blue_nsc_logo.png';
    const googlePlayImage = '/images/google_play.png'
    const imagePath = palette.mode === "dark" ? darkImagePath : lightImagePath;


    const [error, setError] = useState("");
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
    });

    const router = useRouter();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isLaptop = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const isXLScreen = useMediaQuery(theme.breakpoints.between('lg', 'xl'));

    const { email, password } = userInfo;

    const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
        const { name, value } = target;

        setUserInfo({ ...userInfo, [name]: value });
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        const res = await fetch(`${URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        if (!res.ok) {
            alert("Invalid email or password");
            throw new Error(await res.text());
        }
        const { token } = await res.json();
        const userRole = JSON.parse(atob(token.split(".")[1])).role;
        localStorage.setItem("token", token);
        window.dispatchEvent(new CustomEvent('auth-change'));
        if (userRole === "admin") {
            router.push("/admin");
        } else if (userRole === "creator") {
            router.push("/creator");
        } else {
            router.push("/");
        }
    };

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
                justifyContent: 'center',
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: 2,
                    pt: 1
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: 2,
                        width: '100%',
                        height: 60,
                        alignItems: 'center',
                        backgroundColor: palette.primary.dark,
                        color: palette.primary.contrastText,
                        boxShadow: 4
                    }}
                >
                    <Typography component="h1" variant="h4" sx={{ fontFamily: 'font-serif' }}>
                        Login
                    </Typography>
                </Box>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%', pb: 1, paddingInline: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography sx={{ alignSelf: 'flex-start', fontFamily: "font-serif" }}>Email</Typography>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={userInfo.email}
                        onChange={handleChange}
                        InputProps={{ style: textFieldStyle.input }}
                        InputLabelProps={{ style: textFieldStyle.label }}
                    />
                    <Typography sx={{ alignSelf: 'flex-start', fontFamily: "font-serif" }}>Password</Typography>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={userInfo.password}
                        onChange={handleChange}
                        InputProps={{ style: textFieldStyle.input }}
                        InputLabelProps={{ style: textFieldStyle.label }}
                    />
                    <Button
                        style={{ textTransform: 'none' }}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, color: "black", backgroundColor: palette.secondary.light, fontFamily: "font-serif" }}
                    >
                        Login
                    </Button>
                    {error && (
                        <Typography color="error" textAlign="center">
                            {error}
                        </Typography>
                    )}
                    <Box textAlign="center">
                        <MuiLink href="/auth/forgot-password" variant="body2">
                            Forgot password?
                        </MuiLink>
                    </Box>
                    <Box textAlign="center" sx={{ mt: 2 }}>
                        <Typography variant="body2">
                            Don&apos;t have an account?&nbsp;
                            <MuiLink href="/auth/sign-up" variant="body2">
                                {"Sign Up"}
                            </MuiLink>
                        </Typography>
                    </Box>
                    {/* download mobile app link */}
                    <Box style={{ marginBottom: "1em" }}>
                        <Link href="">
                            <Button variant="contained" color="secondary">
                                {/* Use direct reference for google play image */}
                                <Image
                                    src={googlePlayImage}
                                    alt="google_play"
                                    width={40}
                                    height={40}
                                    style={{ marginRight: "8px" }}
                                />
                                Download App
                            </Button>
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default LoginWindow;
