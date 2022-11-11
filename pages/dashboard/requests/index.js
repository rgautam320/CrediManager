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
import { Approval, CheckCircle, CheckCircleOutline, RemoveRedEye } from "@mui/icons-material";

import Layout from "../../../containers/Layout";
import { CrediContract } from "../../../utils/load";
import { saveCompanies, saveCompanyRequests, saveStudentRequests } from "../../../redux/reducer/user.reducer";
import { toast } from "react-toastify";

const Requests = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { companyRequests, studentRequests, user } = useSelector((_) => _.user);

    const fetchCompanies = useCallback(async () => {
        var res = await CrediContract.methods.GetUsersByRole("Company").call();
        dispatch(saveCompanies(res));
    }, [dispatch]);

    const onView = (account) => {
        router.push(`/dashboard/users/${account}`);
    };

    const approveRequest = async (add, id) => {
        try {
            await CrediContract.methods.ApproveRequest(add, id).send({ from: user?.address });

            toast.success("Request Approved Successfully");

            if (user?.role === "Company") {
                var res = await CrediContract.methods.GetRequestsByCompany(user?.address).call();
                dispatch(saveCompanyRequests(res));
            } else if (user?.role === "Student") {
                var res = await CrediContract.methods.GetRequestsByStudent(user?.address).call();
                dispatch(saveStudentRequests(res));
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    };

    const fetchRequests = useCallback(
        async (acc, role) => {
            if (role === "Company") {
                var res = await CrediContract.methods.GetRequestsByCompany(acc).call();
                dispatch(saveCompanyRequests(res));
            } else if (role === "Student") {
                var res = await CrediContract.methods.GetRequestsByStudent(acc).call();
                dispatch(saveStudentRequests(res));
            }
        },
        [dispatch]
    );

    useEffect(() => {
        fetchCompanies();
        if (user?.role === "Company" || user?.role === "Student") {
            fetchRequests(user?.address, user?.role);
        }
    }, [fetchCompanies, user, fetchRequests]);

    return (
        <>
            <Head>
                <title>CrediManager | Requests</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Layout>
                <Typography variant="h3" className="title">
                    Requests
                </Typography>
                <TableContainer component={Paper} sx={{ mt: 4 }}>
                    <Table>
                        {user?.role === "Company" && (
                            <>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: "bold" }}>S.N</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }} align="center">
                                            Is Approved
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }} align="center">
                                            View
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {companyRequests?.map((req, ind) => (
                                        <TableRow key={req}>
                                            <TableCell component="th" scope="row">
                                                {ind + 1}
                                            </TableCell>
                                            <TableCell align="center">
                                                {req.isApproved === false ? "False" : "True"}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button onClick={() => onView(req?.requestedTo)}>
                                                    <RemoveRedEye />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {companyRequests?.length == 0 && (
                                        <>
                                            <TableCell />
                                            <Box sx={{ p: 2 }}>
                                                <Typography textAlign="left">No Requests Found.</Typography>
                                            </Box>
                                        </>
                                    )}
                                </TableBody>
                            </>
                        )}
                        {user?.role === "Student" && (
                            <>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: "bold" }}>S.N</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }} align="center">
                                            Is Approved
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }} align="center">
                                            Company
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }} align="center">
                                            Action
                                        </TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {studentRequests?.map((req, ind) => (
                                        <TableRow key={req}>
                                            <TableCell component="th" scope="row">
                                                {ind + 1}
                                            </TableCell>
                                            <TableCell align="center">
                                                {req.isApproved === false ? "False" : "True"}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button onClick={() => onView(req?.requestedTo)}>
                                                    <RemoveRedEye />
                                                </Button>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button>
                                                    {req.isApproved === false ? (
                                                        <Approval
                                                            onClick={() =>
                                                                approveRequest(req.requestedBy, req.requestId)
                                                            }
                                                        />
                                                    ) : (
                                                        <CheckCircle />
                                                    )}
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {studentRequests?.length == 0 && (
                                        <>
                                            <TableCell />
                                            <Box sx={{ p: 2 }}>
                                                <Typography textAlign="left">No Requests Found.</Typography>
                                            </Box>
                                        </>
                                    )}
                                </TableBody>
                            </>
                        )}
                    </Table>
                </TableContainer>
            </Layout>
        </>
    );
};

export default Requests;
