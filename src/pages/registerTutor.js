import React, { Component } from "react";
import '../css/style.css';
import { Button, Form } from 'react-bootstrap';
import web3 from '../web3';
import ipfs from '../ipfs';
import storehash from '../storehash';

class registerTutor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            age: "",
            residence: "",
            subject: "",
            gender: "",
            ipfsHash: "waiting..",
            buffer: "waiting.."
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    captureFile = (event) => {
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        let reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => this.convertToBuffer(reader)
    };

    convertToBuffer = async (reader) => {
        //file is converted to a buffer to prepare for uploading to IPFS
        const buffer = await Buffer.from(reader.result);
        //set this buffer -using es6 syntax
        this.setState({ buffer });
    };




    handleSubmit = async (e) => {
        e.preventDefault();
        const account = sessionStorage.getItem('account');

        if (account != null) {
            const ipfsHash=await ipfs.add(this.state.buffer);
            this.setState({ ipfsHash: ipfsHash[0].hash });
            
            const transactionHash=await storehash.methods.registerTutors(this.state.name, this.state.gender, this.state.age, this.state.residence, this.state.subject, this.state.ipfsHash).send({
                from: account
            });
            alert("선생님이 등록되었습니다!");
            window.location.href = '/registerTutor';

        } else {
            alert("로그인 먼저하세요!")
            window.location.href = '/TutorLogin';
        }

    } //onClick




    render() {
        return (
            <div>
                <div>
                    <nav className="navbar navbar-default">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                    data-target="#bs-example-navbar-collapse-1">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                                <a className="navbar-brand" href="/FindStudent">학생 찾기</a>
                            </div>

                            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                <ul className="nav navbar-nav">
                                    <li><a href="/registerTutor">선생님 등록하기</a></li>

                                </ul>

                                <ul className="nav navbar-nav navbar-right">
                                <li><a><strong>{sessionStorage.getItem('account')}</strong>님 반갑습니다!</a></li>
                                <li><a href="/logout">로그아웃</a></li>
                                </ul>

                            </div>
                        </div>
                    </nav>

                </div>

                <div className="section">
                    <div className="header">
                        <h2>선생님 정보를 등록합니다</h2>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" className="newitem-form" name="name" placeholder="선생님의 이름을 입력하세요" onChange={this.handleChange} /> <br></br>
                        <select className="newitem-form" name="gender" onChange={this.handleChange}>
                            <option value="">성별</option>
                            <option value="male">male</option>
                            <option value="female">female</option>
                        </select><br></br>
                        <input type="text" className="newitem-form" name="age" placeholder="선생님의 나이를 입력하세요" onChange={this.handleChange} /> <br></br>
                        <input type="text" className="newitem-form" name="residence" placeholder="선생님의 거주지를 입력하세요" onChange={this.handleChange} /> <br></br>
                        <select className="newitem-form" name="subject" onChange={this.handleChange}>
                            <option value="">과목</option>
                            <option value="korean">korean</option>
                            <option value="math">math</option>
                            <option value="english">english</option>
                        </select>
                        <br></br>
                        <input
                            className="newitem-form"
                            type="file"
                            onChange={this.captureFile}
                            name="이력서 업로드"
                        />
                        <input className="btn btn-warning newitem-btn" type="submit" id="register" />

                    </form>
                </div>


            </div>
        )

    }

}

export default registerTutor;
