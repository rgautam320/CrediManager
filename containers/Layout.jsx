import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import {
    Box,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    Container,
    Menu,
    Tooltip,
    MenuItem,
    Avatar,
    CssBaseline,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";

import Drawer from "../components/Drawer";
import Copyright from "../components/Copyright";
import { MainListItems, SecondaryListItems } from "../components/ListItems";

import styles from "../styles/Layout.module.css";

import Signup from "../components/Signup";
import { clearUser, saveUser } from "../redux/reducer/user.reducer";
import { CrediContract } from "../utils/load";

const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: 240,
        width: `calc(100% - ${240}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Layout = ({ children }) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);

    const { user, account } = useSelector((_) => _.user);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleHome = () => {
        router.push("/");
    };

    const handleLogout = () => {
        localStorage.clear();
        dispatch(clearUser());
        router.push("/");
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const loadUser = useCallback(async () => {
        var res = await CrediContract.methods.GetUserInformation(account).call();
        const user = {
            id: res.Id,
            address: res.UserAddress,
            firstName: res.FirstName,
            lastName: res.LastName,
            username: res.Username,
            email: res.Email,
            role: res.Designation,
        };
        if (res.IsSet) {
            dispatch(saveUser(user));
        }
    }, [dispatch, account]);

    useEffect(() => {
        if (!account) {
            router.push("/");
        } else {
            loadUser(account);
        }
    }, [router, account, loadUser]);

    return (
        <Box className={styles.main}>
            {user ? (
                <>
                    <CssBaseline />
                    <AppBar position="absolute" open={open}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={toggleDrawer}
                                className={styles.menuButton}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography
                                component="h1"
                                variant="h6"
                                color="inherit"
                                className={styles.dashboardText}
                                noWrap
                            >
                                Dashboard
                            </Typography>
                            <IconButton color="inherit">
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleMenu}>
                                        <Avatar
                                            alt="Profile"
                                            src="https://www.kindpng.com/picc/m/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png"
                                        />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleHome}>Home</MenuItem>
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                </Menu>
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <Drawer variant="permanent" open={open}>
                        <Toolbar className={styles.logo}>
                            <Typography className={styles.title}>CrediManager</Typography>
                        </Toolbar>
                        <Divider />
                        <List component="nav">
                            {<MainListItems />}
                            <Divider sx={{ my: 1 }} />
                            {<SecondaryListItems />}
                            {open && (
                                <>
                                    <Divider sx={{ my: 1 }} />
                                    <Copyright sx={{ pt: 4 }} />
                                </>
                            )}
                        </List>
                    </Drawer>
                    <Box
                        component="main"
                        className={styles.content}
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900],
                        }}
                    >
                        <Toolbar />
                        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                            {children}
                        </Container>
                    </Box>
                </>
            ) : (
                <Signup />
            )}
        </Box>
    );
};

export default Layout;
