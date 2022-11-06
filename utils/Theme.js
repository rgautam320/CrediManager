import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    components: {
        MuiButton: {
            defaultProps: {
                disabled: false,
            },
            styleOverrides: {
                root: {},
                containedPrimary: {
                    color: "white",
                    borderRadius: 100,
                },
                containedSecondary: {
                    color: "white",
                    borderRadius: 100,
                    backgroundColor: "#ec5404",
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: "#ec5404",
                },
            },
        },
    },
});

export default theme;
