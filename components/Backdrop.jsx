import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const CrediBackdrop = () => {
    const { loading } = useSelector((state) => state.user);

    return (
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1005 }} open={loading}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default CrediBackdrop;
