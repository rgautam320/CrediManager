import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    account: typeof window !== "undefined" ? window.localStorage.getItem("ACCOUNT") : null,
    user: null,
    users: [],
    students: [],
    schools: [],
    professors: [],
    companies: [],
    admins: [],
    studentsUnderProfessor: [],
    studentsUnderSchool: [],
    professorsUnderSchool: [],
    adminDashboard: null,
};

export const userReducer = createSlice({
    name: "user",
    initialState,
    reducers: {
        saveAccount: (state, action) => {
            state.account = action.payload;
        },
        saveUser: (state, action) => {
            state.user = action.payload;
        },
        saveUsers: (state, action) => {
            let users = [];
            action.payload.forEach((res) => {
                users.push({
                    id: res.Id,
                    address: res.UserAddress,
                    firstName: res.FirstName,
                    lastName: res.LastName,
                    username: res.Username,
                    email: res.Email,
                    role: res.Designation,
                    isSet: res.IsSet,
                });
            });
            state.users = users;
        },
        saveStudents: (state, action) => {
            let users = [];
            action.payload.forEach((res) => {
                users.push({
                    id: res.Id,
                    address: res.UserAddress,
                    firstName: res.FirstName,
                    lastName: res.LastName,
                    username: res.Username,
                    email: res.Email,
                    role: res.Designation,
                    isSet: res.IsSet,
                });
            });
            state.students = users;
        },
        saveSchools: (state, action) => {
            let users = [];
            action.payload.forEach((res) => {
                users.push({
                    id: res.Id,
                    address: res.UserAddress,
                    firstName: res.FirstName,
                    lastName: res.LastName,
                    username: res.Username,
                    email: res.Email,
                    role: res.Designation,
                    isSet: res.IsSet,
                });
            });
            state.schools = users;
        },
        saveProfessors: (state, action) => {
            let users = [];
            action.payload.forEach((res) => {
                users.push({
                    id: res.Id,
                    address: res.UserAddress,
                    firstName: res.FirstName,
                    lastName: res.LastName,
                    username: res.Username,
                    email: res.Email,
                    role: res.Designation,
                    isSet: res.IsSet,
                });
            });
            state.professors = users;
        },
        saveCompanies: (state, action) => {
            let users = [];
            action.payload.forEach((res) => {
                users.push({
                    id: res.Id,
                    address: res.UserAddress,
                    firstName: res.FirstName,
                    lastName: res.LastName,
                    username: res.Username,
                    email: res.Email,
                    role: res.Designation,
                    isSet: res.IsSet,
                });
            });
            state.companies = users;
        },
        saveAdmins: (state, action) => {
            let users = [];
            action.payload.forEach((res) => {
                users.push({
                    id: res.Id,
                    address: res.UserAddress,
                    firstName: res.FirstName,
                    lastName: res.LastName,
                    username: res.Username,
                    email: res.Email,
                    role: res.Designation,
                    isSet: res.IsSet,
                });
            });
            state.admins = users;
        },
        saveStudentsUnderProfessor: (state, action) => {
            let users = [];
            action.payload.forEach((res) => {
                users.push({
                    id: res.Id,
                    address: res.UserAddress,
                    firstName: res.FirstName,
                    lastName: res.LastName,
                    username: res.Username,
                    email: res.Email,
                    role: res.Designation,
                    isSet: res.IsSet,
                });
            });
            state.studentsUnderProfessor = users;
        },
        saveStudentsUnderSchool: (state, action) => {
            let users = [];
            action.payload.forEach((res) => {
                users.push({
                    id: res.Id,
                    address: res.UserAddress,
                    firstName: res.FirstName,
                    lastName: res.LastName,
                    username: res.Username,
                    email: res.Email,
                    role: res.Designation,
                    isSet: res.IsSet,
                });
            });
            state.studentsUnderSchool = users;
        },
        saveProfessorsUnderSchool: (state, action) => {
            let users = [];
            action.payload.forEach((res) => {
                users.push({
                    id: res.Id,
                    address: res.UserAddress,
                    firstName: res.FirstName,
                    lastName: res.LastName,
                    username: res.Username,
                    email: res.Email,
                    role: res.Designation,
                    isSet: res.IsSet,
                });
            });
            state.professorsUnderSchool = users;
        },
        saveAdminDashboard: (state, action) => {
            state.adminDashboard = action.payload;
        },
        clearUser: (state, action) => {
            state.user = null;
            state.account = null;
            state.contract = null;
        },
    },
});

export const {
    saveContract,
    saveAccount,
    saveUser,
    clearUser,
    saveUsers,
    saveStudents,
    saveSchools,
    saveProfessors,
    saveCompanies,
    saveAdmins,
    saveStudentsUnderProfessor,
    saveStudentsUnderSchool,
    saveProfessorsUnderSchool,
    saveAdminDashboard,
} = userReducer.actions;

export default userReducer.reducer;
