import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import styles from "../styles/components/Signup.module.css";

import { Box, Typography, MenuItem, TextField, FormControl, InputLabel, Select, Button, Paper } from "@mui/material";

import { CrediContract } from "../utils/load";
import { saveUser } from "../redux/reducer/user.reducer";

const Signup = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
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

        if (data.firstName && data.lastName && data.username && data.email && data.role) {
            try {
                await CrediContract.methods
                    .CreateUser(
                        localStorage.getItem("ACCOUNT"),
                        data.firstName,
                        data.lastName,
                        data.username,
                        data.email,
                        data.role
                    )
                    .send({ from: localStorage.getItem("ACCOUNT") });

                var res = await CrediContract.methods.GetUserInformation(localStorage.getItem("ACCOUNT")).call();
                const user = {
                    firstName: res.FirstName,
                    lastName: res.LastName,
                    username: res.Username,
                    email: res.Email,
                    role: res.Designation,
                };
                if (res.IsSet) {
                    dispatch(saveUser(user));
                }
                toast.success("User registered successfully.");
            } catch (error) {
                toast.error("Something went wrong.");
                console.log(error);
            }
        }
    };

    return (
        <Box className={styles.registerBox}>
            <Paper className={styles.innerBox}>
                <Typography className="title" variant="h3">
                    Register Yourself
                </Typography>
                <hr />

                <form noValidate autoComplete="off" onSubmit={onSubmit} className={styles.form}>
                    <FormControl fullWidth className={styles.inputbox}>
                        <TextField
                            className={styles.input}
                            name="firstName"
                            label="First Name"
                            type="text"
                            variant="standard"
                            value={data.firstName}
                            error={data.firstName === ""}
                            onChange={(e) => onChange(e)}
                            required
                        />
                    </FormControl>
                    <FormControl fullWidth className={styles.inputbox}>
                        <TextField
                            className={styles.input}
                            name="lastName"
                            label="Last Name"
                            type="text"
                            variant="standard"
                            value={data.lastName}
                            error={data.lastName === ""}
                            onChange={(e) => onChange(e)}
                            required
                        />
                    </FormControl>
                    <FormControl fullWidth className={styles.inputbox}>
                        <TextField
                            className={styles.input}
                            name="username"
                            label="Username"
                            type="text"
                            variant="standard"
                            value={data.username}
                            error={data.username === ""}
                            onChange={(e) => onChange(e)}
                            required
                        />
                    </FormControl>
                    <FormControl fullWidth className={styles.inputbox}>
                        <TextField
                            className={styles.input}
                            name="email"
                            label="Email"
                            type="email"
                            variant="standard"
                            value={data.email}
                            error={data.email === ""}
                            onChange={(e) => onChange(e)}
                            required
                        />
                    </FormControl>
                    <FormControl fullWidth className={styles.inputbox}>
                        <InputLabel id="input-label">Role</InputLabel>
                        <Select
                            labelId="input-label"
                            name="role"
                            className={styles.input}
                            label="Role"
                            variant="standard"
                            value={data.role}
                            error={data.role == "none"}
                            onChange={(e) => onChange(e)}
                            required
                        >
                            <MenuItem value="none">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="Student">Student</MenuItem>
                            <MenuItem value="Professor">Professor</MenuItem>
                            <MenuItem value="School">School</MenuItem>
                            <MenuItem value="Company">Company</MenuItem>
                        </Select>
                    </FormControl>
                    <Box className={styles.inputbox}>
                        <Button className={styles.submitButton} type="submit" variant="outlined">
                            Submit
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default Signup;
