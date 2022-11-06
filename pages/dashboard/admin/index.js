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
import { saveAdmins } from "../../../redux/reducer/user.reducer";

const Admin = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { admins } = useSelector((_) => _.user);

    const fetchAdmins = useCallback(async () => {
        var res = await CrediContract.methods.GetUsersByRole("Admin").call();
        dispatch(saveAdmins(res));
    }, [dispatch]);

    const onView = (account) => {
        router.push(`/dashboard/users/${account}`);
    };

    useEffect(() => {
        fetchAdmins();
    }, [fetchAdmins]);

    return (
        <>
            <Head>
                <title>CrediManager | Admins</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Layout>
                <Typography variant="h3" className="title">
                    Admins
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
                            {admins?.map((user, ind) => (
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
                            {admins?.length == 0 && (
                                <>
                                    <TableCell />
                                    <Box sx={{ p: 2 }}>
                                        <Typography textAlign="left">No Admins Found.</Typography>
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

export default Admin;
