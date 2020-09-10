
//0xb84b12e953f5bcf01b05f926728e855f2d4a67a9  contract address on rinkeby
//deployed using remix 
pragma solidity ^0.5.12;

contract Contract {

       struct User {
        string name;
        string gender;
        uint age;
        string residence;
        string subject;
        string resumeHash;
    }

    address payable owner;

    User[] public students;
    User[] public tutors;

    uint numberOfStudents;
    uint numberOfTutors;
    
    constructor () public {
      owner=msg.sender;
    }


    function registerStudent(string memory _name, string memory _gender, uint _age, string memory _residence, string memory _subject, string memory _resumeHash) public {
      students.push(User(_name, _gender, _age, _residence, _subject, _resumeHash)) -1;
      numberOfStudents++;
    }

    function registerTutors(string memory _name, string memory _gender, uint _age, string memory _residence, string memory _subject, string memory _resumeHash) public {
      tutors.push(User(_name, _gender, _age, _residence, _subject, _resumeHash)) -1;
      numberOfTutors++;
    }

    function getNumOfStudents() public view returns(uint) {
        return numberOfStudents;
    }

    function getNumOfTutors() public view returns(uint) {
        return numberOfTutors;
    }

    function getStudentInfo(uint _index) public view returns (string memory, string memory, uint , string memory, string memory, string memory) {
        return (students[_index].name, students[_index].gender, students[_index].age, students[_index].residence, students[_index].subject, students[_index].resumeHash);
    }

    function getTutorInfo(uint _index) public view returns (string memory, string memory, uint , string memory, string memory, string memory) {
        return (tutors[_index].name, tutors[_index].gender, tutors[_index].age, tutors[_index].residence, tutors[_index].subject, tutors[_index].resumeHash);
    }

    function getStudentResume(string memory _hash) public payable {
      require(bytes(_hash).length==46); //ipfs hash길이 46 확인
      owner.transfer(msg.value);
 
    }

    function getTutorResume(string memory _hash) public payable {
      require(bytes(_hash).length==46); 
      owner.transfer(msg.value);
     
    }


    


}