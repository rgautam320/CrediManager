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
    companyRequests: [],
    studentRequests: [],
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
        saveCompanyRequests: (state, action) => {
            let requests = [];
            action.payload.forEach((ele) => {
                if (ele?.RequestedBy !== "0x0000000000000000000000000000000000000000") {
                    requests.push({
                        requestId: ele.RequestId,
                        isApproved: ele.IsApproved,
                        requestedTo: ele.RequestedTo,
                        requestedBy: ele.RequestedBy,
                    });
                }
            });
            state.companyRequests = requests;
        },
        saveStudentRequests: (state, action) => {
            let requests = [];
            action.payload.forEach((ele) => {
                if (ele?.RequestedTo !== "0x0000000000000000000000000000000000000000") {
                    requests.push({
                        requestId: ele.RequestId,
                        isApproved: ele.IsApproved,
                        requestedTo: ele.RequestedTo,
                        requestedBy: ele.RequestedBy,
                    });
                }
            });
            state.studentRequests = requests;
        },
        clearUser: (state, action) => {
            state.account = null;
            state.user = null;
            state.users = [];
            state.students = [];
            state.schools = [];
            state.professors = [];
            state.companies = [];
            state.admins = [];
            state.studentsUnderProfessor = [];
            state.studentsUnderSchool = [];
            state.professorsUnderSchool = [];
            state.adminDashboard = null;
            state.companyRequests = [];
            state.studentRequests = [];
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
    saveCompanyRequests,
    saveStudentRequests,
} = userReducer.actions;

export default userReducer.reducer;
