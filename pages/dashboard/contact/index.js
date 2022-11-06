import React from "react";
import Head from "next/head";

import { Box, Typography } from "@mui/material";

import Layout from "../../../containers/Layout";

const Contact = () => {
    return (
        <>
            <Head>
                <title>CrediManager | Contact</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Layout>
                <Box>
                    <Typography variant="h3" className="title">
                        Contact
                    </Typography>
                </Box>
            </Layout>
        </>
    );
};

export default Contact;
