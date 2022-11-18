import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import Image from "next/image";
import Web3 from "web3";

import { Backdrop, Box, Typography, Container, Button } from "@mui/material";

import styles from "../styles/index.module.css";

import Hero from "../assets/hero.png";
import { saveAccount, saveUser } from "../redux/reducer/user.reducer";
import { CrediContract } from "../utils/load";
import CrediBackdrop from "../components/Backdrop";

const Index = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const { account } = useSelector((_) => _.user);

    const onDashboard = () => {
        router.push("/dashboard");
    };

    const loadUser = useCallback(
        async (acc) => {
            var res = await CrediContract.methods.GetUserInformation(acc).call();
            const user = {
                id: res.Id,
                address: res.UserAddress,
                firstName: res.FirstName,
                lastName: res.LastName,
                username: res.Username,
                email: res.Email,
                role: res.Designation,
            };
            if (res.IsSet) {
                dispatch(saveUser(user));
            }
        },
        [dispatch]
    );

    const onConnect = async () => {
        const web3 = new Web3(Web3.givenProvider || window.ethereum);

        if (!web3) {
            return toast.error("Please install MetaMask.");
        }

        const accounts = await web3.eth.requestAccounts();

        if (accounts.length > 0) {
            localStorage.setItem("ACCOUNT", accounts[0]);
            dispatch(saveAccount(accounts[0]));
            await loadUser(accounts[0]);
            onDashboard();
        }
    };

    useEffect(() => {
        if (account) {
            loadUser(account);
        }
    }, [loadUser, account]);

    return (
        <>
            <Head>
                <title>CrediManager | Home</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <CrediBackdrop />
            <Container className={styles.mainContainer}>
                <Box>
                    <Image src={Hero} alt="Hero" layout="fill" objectFit="cover" />
                </Box>
                <Backdrop
                    className={styles.backdrop}
                    sx={{
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={true}
                />
                <Box
                    className={styles.body}
                    sx={{
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                >
                    <Box className={styles.button}>
                        <Box>
                            {account ? (
                                <Button variant="contained" color="secondary" onClick={onDashboard}>
                                    Dashboard
                                </Button>
                            ) : (
                                <Button variant="contained" color="primary" onClick={onConnect}>
                                    Connect to Wallet
                                </Button>
                            )}
                        </Box>
                    </Box>
                    <Box className={styles.titleBox}>
                        <Typography variant="h1" className={styles.title}>
                            Welcome to
                            <br />
                            CrediManager
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default Index;
