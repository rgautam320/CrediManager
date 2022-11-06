import * as React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
    People,
    DashboardCustomizeTwoTone,
    Info,
    Call,
    Help,
    Person,
    School,
    EmojiPeople,
    SupervisorAccount,
    AdminPanelSettings,
} from "@mui/icons-material";
import { Box, ListSubheader, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

export const MainListItems = () => {
    const router = useRouter();

    const { user } = useSelector((_) => _.user);

    return (
        <Box>
            <ListItemButton onClick={() => router.push("/dashboard")}>
                <ListItemIcon>
                    <DashboardCustomizeTwoTone />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>
            {user?.role == "Admin" && (
                <>
                    <ListItemButton onClick={() => router.push("/dashboard/users")}>
                        <ListItemIcon>
                            <SupervisorAccount />
                        </ListItemIcon>
                        <ListItemText primary="Users" />
                    </ListItemButton>
                    <ListItemButton onClick={() => router.push("/dashboard/admin")}>
                        <ListItemIcon>
                            <AdminPanelSettings />
                        </ListItemIcon>
                        <ListItemText primary="Admins" />
                    </ListItemButton>
                </>
            )}

            <ListItemButton onClick={() => router.push("/dashboard/students")}>
                <ListItemIcon>
                    <EmojiPeople />
                </ListItemIcon>
                <ListItemText primary="Students" />
            </ListItemButton>

            {(user?.role == "Admin" || user?.role == "School" || user?.role == "Professor") && (
                <ListItemButton onClick={() => router.push("/dashboard/professors")}>
                    <ListItemIcon>
                        <Person />
                    </ListItemIcon>
                    <ListItemText primary="Professors" />
                </ListItemButton>
            )}
            {(user?.role == "Admin" || user?.role == "Professor" || user?.role == "School") && (
                <ListItemButton onClick={() => router.push("/dashboard/schools")}>
                    <ListItemIcon>
                        <School />
                    </ListItemIcon>
                    <ListItemText primary="Schools" />
                </ListItemButton>
            )}

            <ListItemButton onClick={() => router.push("/dashboard/companies")}>
                <ListItemIcon>
                    <People />
                </ListItemIcon>
                <ListItemText primary="Companies" />
            </ListItemButton>
        </Box>
    );
};

export const SecondaryListItems = () => {
    const router = useRouter();
    return (
        <Box>
            <ListSubheader component="div" inset>
                More
            </ListSubheader>
            <ListItemButton onClick={() => router.push("/dashboard/about")}>
                <ListItemIcon>
                    <Info />
                </ListItemIcon>
                <ListItemText primary="About Us" />
            </ListItemButton>
            <ListItemButton onClick={() => router.push("/dashboard/contact")}>
                <ListItemIcon>
                    <Call />
                </ListItemIcon>
                <ListItemText primary="Contact Us" />
            </ListItemButton>
            <ListItemButton onClick={() => router.push("/dashboard/help")}>
                <ListItemIcon>
                    <Help />
                </ListItemIcon>
                <ListItemText primary="Help" />
            </ListItemButton>
        </Box>
    );
};
