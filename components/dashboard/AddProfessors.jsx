import { Box, Button, FormControl, Grid, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";

import { CrediContract } from "../../utils/load";

import styles from "../../styles/dashboard/dashboard.module.css";
import { saveProfessorsUnderSchool } from "../../redux/reducer/user.reducer";
import { useDispatch } from "react-redux";

const AddProfessors = () => {
    const dispatch = useDispatch();

    const [account, setAccount] = useState();

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await CrediContract.methods.AddProfessorInSchool(account).send({ from: localStorage.getItem("ACCOUNT") });

            var res = await CrediContract.methods.GetProfessorsInSchool(localStorage.getItem("ACCOUNT")).call();
            dispatch(saveProfessorsUnderSchool(res));

            toast.success("Professors added successfully.");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong.");
        }
    };

    return (
        <Paper sx={{ display: "flex", px: 2, mt: 4 }}>
            <form noValidate autoComplete="off" onSubmit={onSubmit} className={styles.form}>
                <Grid container spacingX={2} columnSpacing={4}>
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
                                Add a Professor
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};

export default AddProfessors;
