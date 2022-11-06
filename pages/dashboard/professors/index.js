import React, { useEffect, useCallback } from "react";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";

import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { RemoveRedEye } from "@mui/icons-material";

import Layout from "../../../containers/Layout";
import { CrediContract } from "../../../utils/load";
import { saveProfessors } from "../../../redux/reducer/user.reducer";

const Professors = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { professors } = useSelector((_) => _.user);

    const fetchProfessors = useCallback(async () => {
        var res = await CrediContract.methods.GetUsersByRole("Professor").call();
        dispatch(saveProfessors(res));
    }, [dispatch]);

    const onView = (account) => {
        router.push(`/dashboard/users/${account}`);
    };

    useEffect(() => {
        fetchProfessors();
    }, [fetchProfessors]);

    return (
        <>
            <Head>
                <title>CrediManager | Professor</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Layout>
                <Typography variant="h3" className="title">
                    Professors
                </Typography>
                <TableContainer component={Paper} sx={{ mt: 4 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }}>S.N</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }} align="left">
                                    Username
                                </TableCell>
                                <TableCell sx={{ fontWeight: "bold" }} align="left">
                                    Email
                                </TableCell>
                                <TableCell sx={{ fontWeight: "bold" }} align="left">
                                    Name
                                </TableCell>
                                <TableCell sx={{ fontWeight: "bold" }} align="center">
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {professors?.map((user, ind) => (
                                <TableRow key={user}>
                                    <TableCell component="th" scope="row">
                                        {ind + 1}
                                    </TableCell>
                                    <TableCell align="left">{user?.username}</TableCell>
                                    <TableCell align="left">{user?.email}</TableCell>
                                    <TableCell align="left">
                                        {user?.firstName} {user?.lastName}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button onClick={() => onView(user?.address)}>
                                            <RemoveRedEye />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {professors?.length == 0 && (
                                <>
                                    <TableCell />
                                    <Box sx={{ p: 2 }}>
                                        <Typography textAlign="left">No Professors Found.</Typography>
                                    </Box>
                                </>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Layout>
        </>
    );
};

export default Professors;
