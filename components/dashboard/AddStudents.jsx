import { Box, Button, FormControl, Grid, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";

import { CrediContract } from "../../utils/load";

import styles from "../../styles/dashboard/dashboard.module.css";
import { saveStudentsUnderProfessor, saveStudentsUnderSchool } from "../../redux/reducer/user.reducer";
import { useDispatch } from "react-redux";

const AddStudents = ({ action }) => {
    const dispatch = useDispatch();

    const [account, setAccount] = useState();

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            if (action == "Professor") {
                await CrediContract.methods
                    .AddStudentUnderProfessor(account)
                    .send({ from: localStorage.getItem("ACCOUNT") });

                var res = await CrediContract.methods.GetStudentsUnderProfessor(localStorage.getItem("ACCOUNT")).call();
                dispatch(saveStudentsUnderProfessor(res));
            } else if (action == "School") {
                await CrediContract.methods.AddStudentInSchool(account).send({ from: localStorage.getItem("ACCOUNT") });

                var res = await CrediContract.methods.GetStudentsInSchool(localStorage.getItem("ACCOUNT")).call();
                dispatch(saveStudentsUnderSchool(res));
            }

            toast.success("Students added successfully.");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong.");
        }
    };

    return (
        <Paper sx={{ display: "flex", px: 2, mt: 4 }}>
            <form noValidate autoComplete="off" onSubmit={onSubmit} className={styles.form}>
                <Grid container spacing={2} columnSpacing={4}>
                    <Grid item md={9}>
                        <FormControl fullWidth className={styles.inputbox}>
                            <TextField
                                className={styles.input}
                                name="account"
                                label="Account"
                                type="text"
                                variant="standard"
                                value={account}
                                error={account === ""}
                                onChange={(e) => setAccount(e.target.value)}
                                required
                                fullWidth
                            />
                        </FormControl>
                    </Grid>
                    <Grid item md={3}>
                        <Box className={styles.inputbox}>
                            <Button className={styles.submitButton} type="submit" variant="outlined">
                                Add a Student
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};

export default AddStudents;
