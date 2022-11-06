import React from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

const Profile = ({ account, user }) => {
    return (
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
                        <TableCell align="left">{user?.firstName}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row" sx={{ fontWeight: "bold" }}>
                            Last Name
                        </TableCell>
                        <TableCell align="left">{user?.lastName}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row" sx={{ fontWeight: "bold" }}>
                            Username
                        </TableCell>
                        <TableCell align="left">{user?.username}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row" sx={{ fontWeight: "bold" }}>
                            Email
                        </TableCell>
                        <TableCell align="left">{user?.email}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row" sx={{ fontWeight: "bold" }}>
                            Designation
                        </TableCell>
                        <TableCell align="left">{user?.role}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Profile;
