import Stack from "@mui/material/Stack";
import { Box, Button, Divider, Link, Typography } from "@mui/material";
import Image from "next/image";
import white_nsc_logo from "../public/images/white_vertical_nsc_logo.png";


const styles = {
    root: {
        display: "flex",
        flexDirection: "column",
        marginTop: "auto",
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
};

export default function Footer() {

    return (
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
                                North Seattle College
                                <br />
                                9600 College Way North
                                <br />
                                Seattle, WA 98103
                                <br />
                                206.934.3600
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
                        divider={<Divider orientation="vertical" flexItem sx={{ backgroundColor: "white" }} />}>
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
    )
}
