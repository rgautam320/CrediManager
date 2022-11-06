import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { Web3Storage } from "web3.storage";
import { toast } from "react-toastify";

import CertificateCard from "./CertificateCard";
import { CrediContract } from "../../utils/load";

const UploadCertificate = ({ user, account, open, handleToggle }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));

    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [data, setData] = useState({
        name: "Marksheet",
        description: "",
    });

    const selectFile = (e) => {
        setFile(e.target.files[0]);
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function () {
            setFilePreview(reader.result);
        };
    };

    const uploadCertificate = async () => {
        if (!data.name) {
            return toast.warning("Please provide a name");
        }
        if (!filePreview) {
            return toast.warning("Certificate is required");
        }

        try {
            toast.info("Certificate Uploading to IPFS");
            const client = new Web3Storage({
                token: process.env.NEXT_PUBLIC_WEB3TOKEN,
            });
            const cid = await client.put([file]);

            toast.success("Certificate Uploaded to IPFS");

            await CrediContract.methods
                .UploadImages(
                    user?.address,
                    account,
                    `${user?.firstName} ${user?.lastName}`,
                    data.name,
                    data.description,
                    `https://${cid}.ipfs.w3s.link/${file.name}`
                )
                .send({ from: user?.address });

            toast.success("Certificate Uploaded Successfully.");

            setData({ name: "Marksheet", description: "" });
            setFilePreview();
            handleToggle();
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return (
        <>
            <Dialog open={open} fullScreen={fullScreen} onClose={handleToggle}>
                <DialogTitle>
                    <Typography variant="h4" className="title" sx={{ paddingBottom: 2 }}>
                        Upload Certificate
                    </Typography>
                    <hr />
                </DialogTitle>
                <DialogContent>
                    <Box py={2}>
                        <FormControl fullWidth sx={{ marginBottom: 2 }}>
                            <TextField
                                label="Certificate Name"
                                type="text"
                                variant="outlined"
                                value={data.name}
                                onChange={(e) => setData({ ...data, name: e.target.value })}
                                error={data.name === ""}
                                fullWidth
                                required
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{ marginBottom: 2 }}>
                            <TextField
                                multiline
                                label="Description"
                                type="text"
                                variant="outlined"
                                value={data.description}
                                onChange={(e) => setData({ ...data, description: e.target.value })}
                                fullWidth
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{ marginBottom: 2 }}>
                            <label htmlFor="certificate" className="input-file-label">
                                {filePreview ? file.name : "Upload Certificate"}
                            </label>
                            <input
                                key={file?.name}
                                type="file"
                                name="certificate"
                                id="certificate"
                                className="input-file"
                                accept=".jpg, .png, .jpeg"
                                multiple={false}
                                onChange={(e) => selectFile(e)}
                            />
                        </FormControl>

                        {filePreview && <CertificateCard file={filePreview} isPreview={true} />}
                    </Box>
                </DialogContent>
                <DialogActions sx={{ paddingX: 3, paddingBottom: 2 }}>
                    <Button onClick={handleToggle} variant="outlined" color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={uploadCertificate} variant="outlined" color="primary">
                        Upload
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default UploadCertificate;
