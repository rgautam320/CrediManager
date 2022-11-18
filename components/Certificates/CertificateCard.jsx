import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
    Box,
    CardActionArea,
    CardMedia,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { useState } from "react";

const CertificateCard = ({ certificateName, description, file, uploadedByName, isPreview }) => {
    const [open, setOpen] = useState(false);
    return (
        <Grid item md={4}>
            <Card>
                <CardActionArea>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            width="auto"
                            sx={{ maxHeight: "280px" }}
                            image={file}
                            onClick={() => {
                                !isPreview && setOpen(!open);
                            }}
                        />
                    </Box>
                    <ViewCertificate
                        open={open}
                        setOpen={setOpen}
                        name={certificateName}
                        file={file}
                        uploadedByName={uploadedByName}
                    />
                    {!isPreview && (
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {certificateName?.substring(0, 25)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {description}
                            </Typography>
                        </CardContent>
                    )}
                </CardActionArea>
            </Card>
        </Grid>
    );
};

const ViewCertificate = ({ name, file, open, setOpen, uploadedByName }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));

    return (
        <>
            <Dialog open={open} fullScreen={fullScreen} onClose={() => setOpen(!open)}>
                <DialogTitle>
                    <Typography variant="h4" className="title" sx={{ paddingBottom: 2 }}>
                        {name}
                    </Typography>
                    <hr />
                </DialogTitle>
                <DialogContent>
                    <CardMedia component="img" alt="green iguana" width="auto" height="auto" image={file} />
                    <Typography sx={{ mt: 1 }}>Uploaded By: {uploadedByName ? uploadedByName : "None"}</Typography>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default CertificateCard;
