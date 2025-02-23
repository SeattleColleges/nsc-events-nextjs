<<<<<<< HEAD
import Grid2 from "@mui/material/Grid2";
import { Breadcrumbs, Button, Link, Typography } from "@mui/material";
=======
import Stack from "@mui/material/Stack";
import { Box, Button, Divider, Link, Typography } from "@mui/material";
>>>>>>> main
import Image from "next/image";
import white_nsc_logo from "../public/images/white_vertical_nsc_logo.png";


const styles = {
    root: {
        display: "flex",
<<<<<<< HEAD
        marginTop: "100%",
        backgroundColor: 'primary.main',
        padding: "2rem",
        justifyContent: "space-between"
    },
    div: {
        display: "flex",
        justifyContent: "space-between",
        gap: 2,
        padding: "2rem"
    },
    links: {
        display: "flex",
        flexDirection: "column"
    },
    image: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "4rem"
    }
    
=======
        flexDirection: "column",
        marginTop: "100vh",
        justifyContent: "space-between"
    },
    mainDiv: {
        display: "flex",
        backgroundColor: 'primary.main',
        padding: 3,
        justifyContent: "space-between"
    },
    div: {
        justifyContent: "flex-start",
        gap: 2,
        padding: 3
    }
>>>>>>> main
  };

export default function Footer(){

    return(
<<<<<<< HEAD
        <Grid2 container sx={styles.root}>
            <Grid2 size={{ xs: 12, sm: 10, md: 8 }}>
                <Grid2 container sx={styles.div}>
                    <Typography variant="h5"  color="white">
                        Find out what North Seattle College can offer you.
                    </Typography>
                    <Button variant="contained" color="secondary" href="https://northseattle.edu/enroll-now">
                        Get Started
                    </Button>
                    <Button variant="contained" color="secondary" href="https://go.seattlecolleges.edu/form/inquirynorth" target="_blank" rel="noopener">
                        Request Info
                    </Button>
                </Grid2>
                <Grid2 container color="white" sx={styles.div}>
                    <Grid2>
                        <Typography variant="h6">
=======
        <Stack sx={styles.root}>
            <Stack direction="row" sx={styles.mainDiv}>
                <Stack>
                    <Stack direction="row" color="white" sx={styles.div}>
                        <Typography variant="h5">
                            Find out what North Seattle College can offer you.
                        </Typography>
                        <Button variant="contained" color="secondary" href="https://northseattle.edu/enroll-now">
                            Get Started
                        </Button>
                        <Button variant="contained" color="secondary" href="https://go.seattlecolleges.edu/form/inquirynorth" target="_blank" rel="noopener">
                            Request Info
                        </Button>
                    </Stack>
                    <Stack direction="row" color="white" sx={styles.div}>
                        <Box>
                            <Typography variant="h6">
>>>>>>> main
                            North Seattle College
                            <br/>
                            9600 College Way North
                            <br/>
                            Seattle, WA 98103
                            <br/>
                            206.934.3600
<<<<<<< HEAD
                        </Typography>
                    </Grid2>
                    <Grid2 sx={styles.links}>
                        <Link href="https://northseattle.edu/about/contact-us" underline="hover" color="inherit" variant="h6">
                            Contact Us
                        </Link>
                        <Link href="https://northseattle.edu/about/visit-us" underline="hover" color="inherit" variant="h6">
                            Visit Us
                        </Link>
                    </Grid2>
                    <Grid2 sx={styles.links}>
                        <Link href="https://www.seattlecolleges.edu/" underline="hover" color="inherit">
                            Seattle Colleges
                        </Link>
                        <Link href="https://northseattle.edu/" underline="hover" color="inherit">
                            North Seattle
                        </Link>
                        <Link href="https://southseattle.edu/" underline="hover" color="inherit">
                            South Seattle
                        </Link>
                        <Link href="http://www.seattlecentral.edu/" underline="hover" color="inherit">
                            Central Seattle
                        </Link>
                    </Grid2>
                </Grid2>
                <Grid2 sx={styles.div}>
                    <Breadcrumbs aria-label="breadcrumb" separator="|">
                        <Link href="https://northseattle.edu/disability-services"
                            color="white" underline="hover" variant="button">
                            Accessibility
                        </Link>
                        <Link href="https://northseattle.edu/about/policies-and-procedures/disclaimer"
                            color="white" underline="hover" variant="button">
                            Disclaimer
                        </Link>
                        <Link href="https://www.seattlecolleges.edu/about/privacy-notice"
                            color="white" underline="hover" variant="button">
                            Privacy
                        </Link>
                        <Link href="https://www.seattlecolleges.edu/administration/human-resources/public-records-requests" 
                            color="white" underline="hover" variant="button">
                            Public Records
                        </Link>
                        <Link href="https://seattlecolleges.formstack.com/forms/north_website_feedback" 
                            color="white" underline="hover" variant="button">
                            Website Feedback
                        </Link>
                    </Breadcrumbs>
                </Grid2>
            </Grid2>
            <Grid2 size={{ xs: 0, sm: 2, md: 4 }} sx={styles.image}>
                <Image src={white_nsc_logo} alt="north seattle college logo"/>
            </Grid2>
        </Grid2>
=======
                            </Typography>
                        </Box>
                        <Stack paddingLeft={10}>
                            <Link href="https://northseattle.edu/about/contact-us" underline="hover" color="inherit" variant="h6">
                                Contact Us
                            </Link>
                            <Link href="https://northseattle.edu/about/visit-us" underline="hover" color="inherit" variant="h6">
                                Visit Us
                            </Link>
                        </Stack>
                        <Stack paddingLeft={10}>
                            <Link href="https://www.seattlecolleges.edu/" underline="hover" color="inherit">
                                Seattle Colleges
                            </Link>
                            <Link href="https://northseattle.edu/" underline="hover" color="inherit">
                                North Seattle
                            </Link>
                            <Link href="https://southseattle.edu/" underline="hover" color="inherit">
                                South Seattle
                            </Link>
                            <Link href="http://www.seattlecentral.edu/" underline="hover" color="inherit">
                                Central Seattle
                            </Link>
                        </Stack>
                    </Stack>
                    <Stack direction="row" color="white" sx={styles.div}
                        divider={<Divider orientation="vertical" flexItem sx={{ backgroundColor: "white" }}/>}>
                        <Link href="https://northseattle.edu/disability-services"
                            color="inherit" underline="hover" variant="button">
                            Accessibility
                        </Link>
                        <Link href="https://northseattle.edu/about/policies-and-procedures/disclaimer"
                            color="inherit" underline="hover" variant="button">
                            Disclaimer
                        </Link>
                        <Link href="https://www.seattlecolleges.edu/about/privacy-notice"
                            color="inherit" underline="hover" variant="button">
                            Privacy
                        </Link>
                        <Link href="https://www.seattlecolleges.edu/administration/human-resources/public-records-requests" 
                            color="inherit" underline="hover" variant="button">
                            Public Records
                        </Link>
                        <Link href="https://seattlecolleges.formstack.com/forms/north_website_feedback" 
                            color="inherit" underline="hover" variant="button">
                            Website Feedback
                        </Link>
                    </Stack>
                </Stack>
                <Stack justifyContent={"center"} paddingRight={3}>
                    <Image src={white_nsc_logo} alt="north seattle college logo" height={10} width={200} />
                </Stack>
            </Stack>
        </Stack>
>>>>>>> main
    )
}
