import {
    Button,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import CrediBackdrop from "../../../components/Backdrop";
import CertificateCard from "../../../components/Certificates/CertificateCard";
import UploadCertificate from "../../../components/Certificates/UploadCertificate";

import Layout from "../../../containers/Layout";
import { setLoading } from "../../../redux/reducer/user.reducer";
import { CrediContract } from "../../../utils/load";

const Account = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const { studentsUnderSchool, studentsUnderProfessor, user } = useSelector((_) => _.user);

    const [open, setOpen] = useState(false);
    const [certificates, setCertificates] = useState([]);
    const [fetchedUser, setFetchedUser] = useState();
    const [valid, setValid] = useState(false);

    const { account } = router.query;

    const fetchUser = useCallback(async (acc) => {
        var res = await CrediContract.methods.GetUserInformation(acc).call();
        if (res.IsSet) {
            setFetchedUser({
                id: res.Id,
                address: res.UserAddress,
                firstName: res.FirstName,
                lastName: res.LastName,
                username: res.Username,
                email: res.Email,
                role: res.Designation,
            });
        }
    }, []);

    const fetchDocuments = useCallback(
        async (acc, role) => {
            if (!open) {
                var res = [];
                if (role === "Student") {
                    res = await CrediContract.methods.GetCertificatesByStudent(acc).call();
                } else if (role === "Company") {
                    res = await CrediContract.methods.GetCertificatesCompany(acc, user?.address).call();
                    if (res.length > 0) {
                        setValid(true);
                    }
                } else if (role === "School" || role === "Professor") {
                    res = await CrediContract.methods.GetCertificatesSchoolProfessor(acc, user?.address).call();
                }
                let resCertificates = [];
                res.forEach((ele) => {
                    resCertificates.push({
                        certificateName: ele.CertificateName,
                        uploadedBy: ele.UploadedBy,
                        uploadedByName: ele.UploadedByName,
                        uploadedFor: ele.UploadedFor,
                        description: ele.Description,
                        certificateLink: ele.CertificateLink,
                        UploadedTime: ele.UploadedTime,
                    });
                });
                setCertificates(resCertificates);
            }
        },
        [open, user?.address]
    );

    const requestCertificate = async () => {
        try {
            dispatch(setLoading(true));
            await CrediContract.methods.CreateRequest(account).send({ from: user?.address });
            dispatch(setLoading(false));

            toast.success("Request for Certificate Successfully");
        } catch (error) {
            toast.error("Something went wrong.");
            console.log(error);
        }
    };

    const checkStudent = useCallback(
        (acc) => {
            studentsUnderSchool.forEach((ele) => {
                if (ele?.address == acc) {
                    setValid(true);
                    return;
                }
            });
            studentsUnderProfessor.forEach((ele) => {
                if (ele?.address == acc) {
                    setValid(true);
                    return;
                }
            });
            if (acc == user?.address && user?.role == "Student") {
                setValid(true);
                return;
            }
        },
        [studentsUnderSchool, studentsUnderProfessor, user?.address, user?.role]
    );

    const handleToggle = () => {
        setOpen(!open);
    };

    useEffect(() => {
        if (account) {
            fetchUser(account);
        }
        if (account) {
            fetchDocuments(account, user?.role);
        }
        checkStudent(account);
    }, [fetchUser, account, user?.role, checkStudent, fetchDocuments]);

    return (
        <>
            <Head>
                <title>CrediManager | Professors</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <CrediBackdrop />
            <Layout>
                <Box my={4}>
                    <Typography variant="h3" className="title">
                        User Information
                    </Typography>

                    {user?.role === "Company" && !valid && (
                        <Box my={2}>
                            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                <Button onClick={requestCertificate} variant="contained" color="primary">
                                    Request for Certificate
                                </Button>
                            </Box>
                        </Box>
                    )}

                    <TableContainer component={Paper} sx={{ mt: 4 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: "bold" }}>Field</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }} align="left">
                                        Value
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: "bold" }}>
                                        User Address
                                    </TableCell>
                                    <TableCell align="left">{account}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: "bold" }}>
                                        First Name
                                    </TableCell>
                                    <TableCell align="left">{fetchedUser?.firstName}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: "bold" }}>
                                        Last Name
                                    </TableCell>
                                    <TableCell align="left">{fetchedUser?.lastName}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: "bold" }}>
                                        Username
                                    </TableCell>
                                    <TableCell align="left">{fetchedUser?.username}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: "bold" }}>
                                        Email
                                    </TableCell>
                                    <TableCell align="left">{fetchedUser?.email}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: "bold" }}>
                                        Designation
                                    </TableCell>
                                    <TableCell align="left">{fetchedUser?.role}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                <Box>
                    {valid && (
                        <>
                            <hr />
                            <Box my={4}>
                                <Typography variant="h3" className="title" sx={{ mb: 4 }}>
                                    Certificates
                                </Typography>
                                {(user?.role == "School" || user?.role == "Professor") && (
                                    <Box mb={4} sx={{ display: "flex", justifyContent: "flex-start" }}>
                                        <Button onClick={handleToggle} variant="contained" color="primary">
                                            Upload Certificate
                                        </Button>
                                    </Box>
                                )}

                                <UploadCertificate
                                    user={user}
                                    account={account}
                                    open={open}
                                    handleToggle={handleToggle}
                                />
                                <Grid container spacing={2}>
                                    {certificates?.map((val, ind) => (
                                        <CertificateCard
                                            key={ind}
                                            isPreview={false}
                                            certificateName={val?.certificateName}
                                            description={val?.description}
                                            file={val?.certificateLink}
                                            uploadedByName={val?.uploadedByName}
                                        />
                                    ))}
                                    {certificates?.length === 0 && (
                                        <Box sx={{ mt: 2, width: "100%" }}>
                                            <Typography align="center">No Certificates Available</Typography>
                                        </Box>
                                    )}
                                </Grid>
                            </Box>
                        </>
                    )}
                </Box>
            </Layout>
        </>
    );
};

export default Account;
