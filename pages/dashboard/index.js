import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import { toast } from "react-toastify";
import { Box, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { CrediContract } from "../../utils/load";

import Layout from "../../containers/Layout";
import Chart from "../../components/dashboard/Chart";
import Register from "../../components/dashboard/Register";
import Profile from "../../components/dashboard/Profile";

import { saveAdminDashboard } from "../../redux/reducer/user.reducer";
import AddStudents from "../../components/dashboard/AddStudents";
import ProfessorStudents from "../../components/dashboard/ProfessorStudents";
import SchoolStudents from "../../components/dashboard/SchoolStudents";
import AddProfessors from "../../components/dashboard/AddProfessors";
import SchoolProfessors from "../../components/dashboard/SchoolProfessors";
import CertificateCard from "../../components/Certificates/CertificateCard";

const Dashboard = () => {
    const dispatch = useDispatch();

    const [certificates, setCertificates] = useState(null);

    const { account, user, adminDashboard } = useSelector((_) => _.user);

    const chartData = {
        labels: ["Admin", "School", "Professor", "Company", "User"],
        datasets: [
            {
                backgroundColor: ["red", "blue", "yellow", "orange", "green"],
                hoverBackgroundColor: ["red", "blue", "yellow", "orange", "green"],
                data: [
                    adminDashboard?.admin,
                    adminDashboard?.school,
                    adminDashboard?.professor,
                    adminDashboard?.company,
                    adminDashboard?.student,
                ],
            },
        ],
    };

    const [data, setData] = useState({
        account: undefined,
        firstName: undefined,
        lastName: undefined,
        username: undefined,
        email: undefined,
        role: "",
    });

    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (data.firstName && data.lastName && data.username && data.email) {
            try {
                if (data?.role === "Admin") {
                    await CrediContract.methods
                        .CreateAdmin(data.account, data.firstName, data.lastName, data.username, data.email, "Admin")
                        .send({ from: localStorage.getItem("ACCOUNT") });
                } else {
                    await CrediContract.methods
                        .CreateUser(data.account, data.firstName, data.lastName, data.username, data.email, data.role)
                        .send({ from: localStorage.getItem("ACCOUNT") });
                }

                toast.success(`${data?.role} registered successfully.`);
                loadDashboardAdmin();
            } catch (error) {
                toast.error("Something went wrong.");
                console.log(error);
            }
        }
    };

    const loadDashboardAdmin = useCallback(async () => {
        try {
            var res = await CrediContract.methods.GetDashboardAdmin(localStorage.getItem("ACCOUNT")).call();
            var adminDashboard = {
                admin: res.Admin,
                school: res.School,
                company: res.Company,
                professor: res.Professor,
                student: res.Student,
            };
            dispatch(saveAdminDashboard(adminDashboard));
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }, [dispatch]);

    const fetchDocuments = useCallback(async (acc) => {
        var res = await CrediContract.methods.GetStudentCertificates(acc).call();
        let resCertificates = [];
        res.forEach((ele) => {
            resCertificates.push({
                certificateName: ele.CertificateName,
                uploadedBy: ele.UploadedBy,
                uploadedFor: ele.UploadedFor,
                uploadedByName: ele.UploadedByName,
                description: ele.Description,
                certificateLink: ele.CertificateLink,
                UploadedTime: ele.UploadedTime,
            });
        });
        setCertificates(resCertificates);
    }, []);

    useEffect(() => {
        if (user?.role === "Admin") {
            loadDashboardAdmin();
        }
        if (user?.role == "Student") {
            fetchDocuments(user?.address);
        }
    }, [user?.role, loadDashboardAdmin, user?.address, fetchDocuments]);

    return (
        <>
            <Head>
                <title>CrediManager | Dashboard</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Layout>
                <Box>
                    <Box>
                        {user?.role == "Admin" && (
                            <>
                                <Typography variant="h3" className="title">
                                    Dashboard
                                </Typography>
                                <Grid container columnSpacing={1} mt={4} mb={5}>
                                    <Grid item md={6} sm={12}>
                                        <Register data={data} onChange={onChange} onSubmit={onSubmit} />
                                    </Grid>
                                    <Grid item md={6} sm={12}>
                                        <Chart chartData={chartData} />
                                    </Grid>
                                </Grid>
                            </>
                        )}
                    </Box>
                    <Box mb={4}>
                        <Typography variant="h3" className="title">
                            Your Profile
                        </Typography>
                        <Profile account={account} user={user} />
                    </Box>

                    {user?.role == "Professor" && (
                        <>
                            <hr />
                            <Box mt={4}>
                                <Typography variant="h4" className="title">
                                    Students
                                </Typography>
                                <AddStudents action="Professor" />
                                <ProfessorStudents />
                            </Box>
                        </>
                    )}
                    {user?.role == "School" && (
                        <>
                            <Box my={4}>
                                <Typography variant="h4" className="title">
                                    Professors
                                </Typography>
                                <AddProfessors />
                                <SchoolProfessors />
                            </Box>
                            <hr />
                            <Box mt={4}>
                                <Typography variant="h4" className="title">
                                    Students
                                </Typography>
                                <AddStudents action="School" />
                                <SchoolStudents />
                            </Box>
                        </>
                    )}
                    {user?.role == "Student" && certificates && (
                        <>
                            <hr />
                            <Box my={4}>
                                <Typography variant="h3" className="title" mb={4}>
                                    Your Certificates
                                </Typography>

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
                                </Grid>
                            </Box>
                        </>
                    )}
                </Box>
            </Layout>
        </>
    );
};

export default Dashboard;