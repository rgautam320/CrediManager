// import Data from "./build/CrediManager.json";

/* Local */
// export const ABI = Data.abi;
// export const CONTRACT_ADDRESS = Data.networks[5777].address;

/* Remix */
export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
export const ABI = [
    {
        inputs: [
            {
                internalType: "address",
                name: "_address",
                type: "address",
            },
            {
                internalType: "string",
                name: "_firstname",
                type: "string",
            },
            {
                internalType: "string",
                name: "_lastname",
                type: "string",
            },
            {
                internalType: "string",
                name: "_username",
                type: "string",
            },
            {
                internalType: "string",
                name: "_email",
                type: "string",
            },
            {
                internalType: "string",
                name: "_designation",
                type: "string",
            },
        ],
        stateMutability: "payable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "_userAddress",
                type: "address",
            },
        ],
        name: "AddProfessor",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "_userAddress",
                type: "address",
            },
        ],
        name: "AddStudent",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "_userAddress",
                type: "address",
            },
        ],
        name: "AddUser",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "_studentAddress",
                type: "address",
            },
        ],
        name: "RequestApproved",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "_companyAddress",
                type: "address",
            },
        ],
        name: "RequestCreated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "_userAddress",
                type: "address",
            },
        ],
        name: "Uploaded",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_professorAddress",
                type: "address",
            },
        ],
        name: "AddProfessorInSchool",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_studentAddress",
                type: "address",
            },
        ],
        name: "AddStudentInSchool",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_studentAddress",
                type: "address",
            },
        ],
        name: "AddStudentUnderProfessor",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_companyAddress",
                type: "address",
            },
            {
                internalType: "uint8",
                name: "requestCount",
                type: "uint8",
            },
        ],
        name: "ApproveRequest",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_studentAddress",
                type: "address",
            },
        ],
        name: "CreateRequest",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_userAddress",
                type: "address",
            },
            {
                internalType: "string",
                name: "_firstname",
                type: "string",
            },
            {
                internalType: "string",
                name: "_lastname",
                type: "string",
            },
            {
                internalType: "string",
                name: "_username",
                type: "string",
            },
            {
                internalType: "string",
                name: "_email",
                type: "string",
            },
            {
                internalType: "string",
                name: "_designation",
                type: "string",
            },
        ],
        name: "CreateUser",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [],
        name: "GetAllUsers",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "Id",
                        type: "uint256",
                    },
                    {
                        internalType: "address",
                        name: "UserAddress",
                        type: "address",
                    },
                    {
                        internalType: "string",
                        name: "FirstName",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "LastName",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "Username",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "Email",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "Designation",
                        type: "string",
                    },
                    {
                        internalType: "bool",
                        name: "IsSet",
                        type: "bool",
                    },
                ],
                internalType: "struct CrediManager.User[]",
                name: "",
                type: "tuple[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_studentAddress",
                type: "address",
            },
        ],
        name: "GetCertificatesByStudent",
        outputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "UploadedFor",
                        type: "address",
                    },
                    {
                        internalType: "string",
                        name: "CertificateName",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "Description",
                        type: "string",
                    },
                    {
                        internalType: "address",
                        name: "UploadedBy",
                        type: "address",
                    },
                    {
                        internalType: "string",
                        name: "UploadedByName",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "CertificateLink",
                        type: "string",
                    },
                    {
                        internalType: "uint256",
                        name: "UploadedTime",
                        type: "uint256",
                    },
                ],
                internalType: "struct CrediManager.Certificate[]",
                name: "certificates",
                type: "tuple[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_studentAddress",
                type: "address",
            },
            {
                internalType: "address",
                name: "_companyAddress",
                type: "address",
            },
        ],
        name: "GetCertificatesCompany",
        outputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "UploadedFor",
                        type: "address",
                    },
                    {
                        internalType: "string",
                        name: "CertificateName",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "Description",
                        type: "string",
                    },
                    {
                        internalType: "address",
                        name: "UploadedBy",
                        type: "address",
                    },
                    {
                        internalType: "string",
                        name: "UploadedByName",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "CertificateLink",
                        type: "string",
                    },
                    {
                        internalType: "uint256",
                        name: "UploadedTime",
                        type: "uint256",
                    },
                ],
                internalType: "struct CrediManager.Certificate[]",
                name: "certificates",
                type: "tuple[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_studentAddress",
                type: "address",
            },
            {
                internalType: "address",
                name: "_userAddress",
                type: "address",
            },
        ],
        name: "GetCertificatesSchoolProfessor",
        outputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "UploadedFor",
                        type: "address",
                    },
                    {
                        internalType: "string",
                        name: "CertificateName",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "Description",
                        type: "string",
                    },
                    {
                        internalType: "address",
                        name: "UploadedBy",
                        type: "address",
                    },
                    {
                        internalType: "string",
                        name: "UploadedByName",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "CertificateLink",
                        type: "string",
                    },
                    {
                        internalType: "uint256",
                        name: "UploadedTime",
                        type: "uint256",
                    },
                ],
                internalType: "struct CrediManager.Certificate[]",
                name: "certificates",
                type: "tuple[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_userAddress",
                type: "address",
            },
        ],
        name: "GetDashboardAdmin",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "Admin",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "School",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "Professor",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "Company",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "Student",
                        type: "uint256",
                    },
                ],
                internalType: "struct CrediManager.DashboardAdmin",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_schooolAddress",
                type: "address",
            },
        ],
        name: "GetProfessorsInSchool",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "Id",
                        type: "uint256",
                    },
                    {
                        internalType: "address",
                        name: "UserAddress",
                        type: "address",
                    },
                    {
                        internalType: "string",
                        name: "FirstName",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "LastName",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "Username",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "Email",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "Designation",
                        type: "string",
                    },
                    {
                        internalType: "bool",
                        name: "IsSet",
                        type: "bool",
                    },
                ],
                internalType: "struct CrediManager.User[]",
                name: "",
                type: "tuple[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_companyAddress",
                type: "address",
            },
        ],
        name: "GetRequestsByCompany",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint8",
                        name: "RequestId",
                        type: "uint8",
                    },
                    {
                        internalType: "address",
                        name: "RequestedBy",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "RequestedTo",
                        type: "address",
                    },
                    {
                        internalType: "bool",
                        name: "IsApproved",
                        type: "bool",
                    },
                ],
                internalType: "struct CrediManager.Request[]",
                name: "",
                type: "tuple[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_studentAddress",
                type: "address",
            },
        ],
        name: "GetRequestsByStudent",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint8",
                        name: "RequestId",
                        type: "uint8",
                    },
                    {
                        internalType: "address",
                        name: "RequestedBy",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "RequestedTo",
                        type: "address",
                    },
                    {
                        internalType: "bool",
                        name: "IsApproved",
                        type: "bool",
                    },
                ],
                internalType: "struct CrediManager.Request[]",
                name: "",
                type: "tuple[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_schooolAddress",
                type: "address",
            },
        ],
        name: "GetStudentsInSchool",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "Id",
                        type: "uint256",
                    },
                    {
                        internalType: "address",
                        name: "UserAddress",
                        type: "address",
                    },
                    {
                        internalType: "string",
                        name: "FirstName",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "LastName",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "Username",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "Email",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "Designation",
                        type: "string",
                    },
                    {
                        internalType: "bool",
                        name: "IsSet",
                        type: "bool",
                    },
                ],
                internalType: "struct CrediManager.User[]",
                name: "",
                type: "tuple[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_professorAddress",
                type: "address",
            },
        ],
        name: "GetStudentsUnderProfessor",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "Id",
                        type: "uint256",
                    },
                    {
                        internalType: "address",
                        name: "UserAddress",
                        type: "address",
                    },
                    {
                        internalType: "string",
                        name: "FirstName",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "LastName",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "Username",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "Email",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "Designation",
                        type: "string",
                    },
                    {
                        internalType: "bool",
                        name: "IsSet",
                        type: "bool",
                    },
                ],
                internalType: "struct CrediManager.User[]",
                name: "",
                type: "tuple[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_userAddress",
                type: "address",
            },
        ],
        name: "GetUserInformation",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "Id",
                        type: "uint256",
                    },
                    {
                        internalType: "address",
                        name: "UserAddress",
                        type: "address",
                    },
                    {
                        internalType: "string",
                        name: "FirstName",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "LastName",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "Username",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "Email",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "Designation",
                        type: "string",
                    },
                    {
                        internalType: "bool",
                        name: "IsSet",
                        type: "bool",
                    },
                ],
                internalType: "struct CrediManager.User",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "_designation",
                type: "string",
            },
        ],
        name: "GetUsersByRole",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "Id",
                        type: "uint256",
                    },
                    {
                        internalType: "address",
                        name: "UserAddress",
                        type: "address",
                    },
                    {
                        internalType: "string",
                        name: "FirstName",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "LastName",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "Username",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "Email",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "Designation",
                        type: "string",
                    },
                    {
                        internalType: "bool",
                        name: "IsSet",
                        type: "bool",
                    },
                ],
                internalType: "struct CrediManager.User[]",
                name: "",
                type: "tuple[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_uploaderAddress",
                type: "address",
            },
            {
                internalType: "address",
                name: "_receiverAddress",
                type: "address",
            },
            {
                internalType: "string",
                name: "uploadedByName",
                type: "string",
            },
            {
                internalType: "string",
                name: "certificateName",
                type: "string",
            },
            {
                internalType: "string",
                name: "description",
                type: "string",
            },
            {
                internalType: "string",
                name: "certificateLink",
                type: "string",
            },
        ],
        name: "UploadImages",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
];
