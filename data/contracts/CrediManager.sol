// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CrediManager
{
    address[] UserList;
    
    uint8 UserCount;
    uint8 RequestCount;

    struct User 
    {
        uint256 Id;
        address UserAddress;
        string FirstName;
        string LastName;
        string Username;
        string Email;
        string Designation;
        bool IsSet; // This boolean is used to differentiate between unset and zero struct values
    }

    struct Certificate
    {
        address UploadedFor;
        string CertificateName;
        string Description;
        address UploadedBy;
        string UploadedByName;
        string CertificateLink;
        uint256 UploadedTime;
    }

    struct DashboardAdmin 
    {
        uint256 Admin;
        uint256 School;
        uint256 Professor;
        uint256 Company;
        uint256 Student;
    }

    struct Request 
    {
        uint8 RequestId;
        address RequestedBy;
        address RequestedTo;
        bool IsApproved; 
    }

    mapping(address => Certificate[]) private Certificates;
    mapping(uint8 => Request) private Requests;

    mapping(address => User) private Users;
    mapping(string => address[]) private Designations;

    mapping(address => address[]) private SchoolStudents;
    mapping(address => address[]) private SchoolProfessors;
    mapping(address => address[]) private ProfessorStudents;

    constructor(address _address, string memory _firstname, string memory _lastname, string memory _username, string memory _email, string memory _designation) 
    payable 
    {
        // Creating User
        UserCount++;
        Users[_address] = User({
            Id: UserCount,
            UserAddress: _address,
            FirstName: _firstname,
            LastName: _lastname,
            Username: _username,
            Email: _email,
            Designation: _designation,
            IsSet: true
        });

        UserList.push(_address);
        Designations[_designation].push(_address);
    }

    // Events
    event AddUser(address _userAddress);
    event AddStudent(address _userAddress);
    event AddProfessor(address _userAddress);
    event Uploaded(address _userAddress);
    event RequestCreated(address _companyAddress);
    event RequestApproved(address _studentAddress);

    // Private Functions Modifier
    function _NotUser(address _userAddress) private view 
    {
        require(Users[_userAddress].IsSet == false, "User already created.");
    }
    function _CheckRole(address _userAddress, string memory _designation) private view 
    {
        bool res = false;
        for (uint256 index = 0; index < Designations[_designation].length; index++) 
        {
            if (Designations[_designation][index] == _userAddress) {
                res = true;
            }
        }
        require(res == true, "You can't perform this action.");
    }
    function _CheckSchoolProfessor(address _userAddress) private view
    {
        bool result = false;
        for (uint256 index = 0; index < Designations["School"].length; index++) 
        {
            if (Designations["School"][index] == _userAddress) {
                result = true;
            }
        }
        for (uint256 index = 0; index < Designations["Professor"].length; index++) 
        {
            if (Designations["Professor"][index] == _userAddress) {
                result = true;
            }
        }
        require(result == true, "You can't perform this action.");
    }

    // Modifiers
    modifier NotUser(address _userAddress) 
    {
        _NotUser(_userAddress);
        _;
    }
    modifier CheckRole(address _userAddress, string memory _designation) 
    {
        _CheckRole(_userAddress, _designation);
        _;
    }
    modifier CheckSchoolOrProfessor(address _userAddress)
    {
        _CheckSchoolProfessor(_userAddress);
        _;
    }

    // Private Helper Functions
    function CompareStrings(string memory a, string memory b) private pure returns (bool) 
    {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }

    // Functions
    function CreateUser(address _userAddress, string memory _firstname, string memory _lastname, string memory _username, string memory _email, string memory _designation)
    public payable
    NotUser(_userAddress) 
    {
        UserCount++;
        Users[_userAddress] = User({
            Id: UserCount,
            UserAddress: _userAddress,
            FirstName: _firstname,
            LastName: _lastname,
            Username: _username,
            Email: _email,
            Designation: _designation,
            IsSet: true
        });

        UserList.push(_userAddress);
        Designations[_designation].push(_userAddress);

        emit AddUser(_userAddress);
    }

    function GetUserInformation(address _userAddress)
    public view
    returns (User memory)
    {
        return Users[_userAddress];
    }

    function GetAllUsers() public view 
    CheckRole(msg.sender, "Admin")
    returns(User[] memory)
    {
        User[] memory users = new User[](UserCount);
        for(uint8 i = 0; i < UserCount; i++)
        {
            users[i] = Users[UserList[i]];
        }
        return users;
    }

    function GetUsersByRole(string memory _designation) 
    public view 
    returns (User[] memory)
    {
        uint count = Designations[_designation].length;
        User[] memory users = new User[](count);

        for(uint i = 0; i < count; i++)
        {
            users[i] = Users[Designations[_designation][i]];
        }
        return users;
    }

    function AddStudentInSchool(address _studentAddress) 
    public payable 
    CheckRole(msg.sender, "School")
    CheckRole(_studentAddress, "Student")
    {
        bool isAlready = false;
        for (uint256 i = 0; i < SchoolStudents[msg.sender].length; i++) 
        {
            if(SchoolStudents[msg.sender][i] == _studentAddress)
            {
                isAlready = true;
            }
        }
        if(isAlready == false)
        {
            SchoolStudents[msg.sender].push(_studentAddress);
        }

        emit AddStudent(_studentAddress);
    }

    function AddProfessorInSchool(address _professorAddress) 
    public payable
    CheckRole(msg.sender, "School")
    CheckRole(_professorAddress, "Professor")
    {
        bool isAlready = false;
        for (uint256 i = 0; i < SchoolProfessors[msg.sender].length; i++) 
        {
            if(SchoolProfessors[msg.sender][i] == _professorAddress)
            {
                isAlready = true;
            }
        }
        if(isAlready == false)
        {
            SchoolProfessors[msg.sender].push(_professorAddress);
        }

        emit AddProfessor(_professorAddress);
    }

    function AddStudentUnderProfessor(address _studentAddress) 
    public payable 
    CheckRole(msg.sender, "Professor")
    CheckRole(_studentAddress, "Student")
    {
        bool isAlready = false;
        for (uint256 i = 0; i < ProfessorStudents[msg.sender].length; i++) 
        {
            if(ProfessorStudents[msg.sender][i] == _studentAddress)
            {
                isAlready = true;
            }
        }
        if(isAlready == false) 
        {
            ProfessorStudents[msg.sender].push(_studentAddress);
        }

        emit AddStudent(_studentAddress);
    }

    function GetStudentsUnderProfessor(address _professorAddress)
    public view 
    CheckRole(_professorAddress, "Professor")
    returns (User[] memory)
    {
        uint count = ProfessorStudents[_professorAddress].length;
        User[] memory users = new User[](count);

        for(uint i = 0; i < count; i++)
        {
            users[i] = Users[ProfessorStudents[_professorAddress][i]];
        }
        return users;
    }

    function GetStudentsInSchool(address _schooolAddress)
    public view 
    CheckRole(_schooolAddress, "School")
    returns (User[] memory)
    {
        uint count = SchoolStudents[_schooolAddress].length;
        User[] memory users = new User[](count);

        for(uint i = 0; i < count; i++)
        {
            users[i] = Users[SchoolStudents[_schooolAddress][i]];
        }
        return users;
    } 

    function GetProfessorsInSchool(address _schooolAddress)
    public view 
    CheckRole(_schooolAddress, "School")
    returns (User[] memory)
    {
        uint count = SchoolProfessors[_schooolAddress].length;
        User[] memory users = new User[](count);

        for(uint i = 0; i < count; i++)
        {
            users[i] = Users[SchoolProfessors[_schooolAddress][i]];
        }
        return users;
    } 

    function GetDashboardAdmin (address _userAddress)
    public view 
    CheckRole(_userAddress, "Admin")
    returns (DashboardAdmin memory)
    {
        return DashboardAdmin ({
            Admin: Designations["Admin"].length,
            School: Designations["School"].length,
            Company: Designations["Company"].length,
            Professor: Designations["Professor"].length,
            Student: Designations["Student"].length
        });
    }

    function UploadImages (address _uploaderAddress, address _receiverAddress, string memory uploadedByName, string memory certificateName, string memory description, string memory certificateLink)
    public payable 
    CheckSchoolOrProfessor(_uploaderAddress)
    CheckRole(_receiverAddress, "Student")
    {
        Certificates[_receiverAddress].push(Certificate ({
            UploadedBy: _uploaderAddress,
            UploadedFor: _receiverAddress,
            UploadedByName: uploadedByName,
            CertificateName: certificateName,
            Description: description,
            CertificateLink: certificateLink,
            UploadedTime: block.timestamp
        }));

        emit Uploaded(_uploaderAddress);
    }

    function GetCertificatesByStudent (address _studentAddress)
    public view 
    CheckRole(_studentAddress, "Student")
    returns (Certificate[] memory certificates)
    {
        return Certificates[_studentAddress];
    }
    
    function GetCertificatesSchoolProfessor (address _studentAddress, address _userAddress)
    public view 
    CheckRole(_studentAddress, "Student")
    CheckSchoolOrProfessor(_userAddress)
    returns (Certificate[] memory certificates)
    {
        return Certificates[_studentAddress];
    }
     
    function GetCertificatesCompany (address _studentAddress, address _companyAddress)
    public view 
    CheckRole(_studentAddress, "Student")
    CheckRole(_companyAddress, "Company")
    returns (Certificate[] memory certificates)
    {
        for(uint8 i = 0; i < RequestCount; i++)
        {
            if(Requests[i].RequestedBy == _companyAddress && Requests[i].RequestedTo == _studentAddress && Requests[i].IsApproved == true)
            {
                return Certificates[_studentAddress];
            }
        }
    }

    function CreateRequest(address _studentAddress)
    public payable 
    CheckRole(_studentAddress, "Student")
    CheckRole(msg.sender, "Company")
    {
        Requests[RequestCount] = Request ({
            RequestId: RequestCount,
            RequestedBy: msg.sender,
            RequestedTo: _studentAddress,
            IsApproved: false
        });
        RequestCount++;
        emit RequestCreated(msg.sender);
    }

    function ApproveRequest(address _companyAddress, uint8 requestCount)
    public payable 
    CheckRole(msg.sender, "Student")
    CheckRole(_companyAddress, "Company")
    {        
        if(Requests[requestCount].RequestedTo == msg.sender && Requests[requestCount].RequestedBy == _companyAddress)
        {
            Requests[requestCount].IsApproved = true;
        }
        emit RequestApproved(msg.sender);
    }

    function GetRequestsByCompany(address _companyAddress)
    public view 
    CheckRole(_companyAddress, "Company")
    returns (Request[] memory)
    {
        uint8 j = 0;
        Request[] memory requests = new Request[](RequestCount);
        for(uint8 i = 0; i < RequestCount; i++)
        {
            if(Requests[i].RequestedBy == _companyAddress)
            {
                requests[j] = Requests[i];
                j++;
            }
        }
        return requests;
    }

    function GetRequestsByStudent(address _studentAddress)
    public view 
    CheckRole(_studentAddress, "Student")
    returns (Request[] memory)
    {
        uint8 j = 0;
        Request[] memory requests = new Request[](RequestCount);
        for(uint8 i = 0; i < RequestCount; i++)
        {
            if(Requests[i].RequestedTo == _studentAddress)
            {
                requests[j] = Requests[i];
                j++;
            }
        }
        return requests;
    }
}