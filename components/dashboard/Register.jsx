import React from "react";

import styles from "../../styles/dashboard/dashboard.module.css";

import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";

const Register = ({ data, onChange, onSubmit }) => {
    return (
        <Paper sx={{ px: 2, pt: 2, pb: 1 }}>
            <Typography className="title" variant="h4" sx={{ py: 2 }}>
                Register User
            </Typography>
            <hr />
            <form noValidate autoComplete="off" onSubmit={onSubmit} className={styles.form}>
                <FormControl fullWidth className={styles.inputbox}>
                    <TextField
                        className={styles.input}
                        name="account"
                        label="Account"
                        type="text"
                        variant="standard"
                        value={data.account}
                        error={data.account === ""}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </FormControl>
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
                        <MenuItem value="Admin">Admin</MenuItem>
                    </Select>
                </FormControl>
                <Box className={styles.inputbox}>
                    <Button className={styles.submitButton} type="submit" variant="outlined">
                        Submit
                    </Button>
                </Box>
            </form>
        </Paper>
    );
};

export default Register;
