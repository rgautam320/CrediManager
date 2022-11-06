import { ThemeProvider } from "@mui/material";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { store } from "../redux/store";
import { Provider } from "react-redux";

import theme from "../utils/Theme";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <Component {...pageProps} />
                <ToastContainer />
            </Provider>
        </ThemeProvider>
    );
}

export default MyApp;
