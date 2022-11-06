import { RemoveRedEye } from "@mui/icons-material";
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
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CrediContract } from "../../utils/load";

import { saveProfessorsUnderSchool } from "../../redux/reducer/user.reducer";

const SchoolProfessors = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const { account, professorsUnderSchool } = useSelector((_) => _.user);

    const fetchProfessors = useCallback(async () => {
        var res = await CrediContract.methods.GetProfessorsInSchool(account).call();
        dispatch(saveProfessorsUnderSchool(res));
    }, [dispatch, account]);

    const onView = (account) => {
        router.push(`/dashboard/users/${account}`);
    };

    useEffect(() => {
        fetchProfessors();
    }, [fetchProfessors]);

    return (
        <TableContainer component={Paper} sx={{ mt: 1 }}>
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
                    {professorsUnderSchool?.map((user, ind) => (
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
                    {professorsUnderSchool?.length == 0 && (
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
    );
};

export default SchoolProfessors;
