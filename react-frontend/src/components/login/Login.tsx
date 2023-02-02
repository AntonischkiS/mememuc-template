import "./Login.css"
import React from "react";
import {/*redirect,*/ useNavigate} from "react-router-dom";
import PropTypes from 'prop-types';


interface UserData {
    username: String,
    // email: String,
    password: String;
    error: { status: Boolean, message: String };
    success: Boolean;
}


// @ts-ignore, can ignore here because Login should only be called from App
const Login = ({setToken}) => {

    const [userData, setData] = React.useState<UserData>({
        username: "",/*email:"",*/ password: "", error: {status: false, message: ""}, success: false
    });
    const navigate = useNavigate();

    async function validateLogin() {
        if (userData.username === "" || userData.password === "") { //Don't allow empty name or password
            setData({
                ...userData, error: {status: true, message: "User name or Password can't be empty"},
            })
            return;
        }
        fetch("http://localhost:3001/users/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username: userData.username,
                password: userData.password
            })
        })
            .then(res => res.json())
            .then(({username, password}) => {
                try {
                    //TODO add encryption
                    if (userData.username === username && userData.password === password) {
                        setData({
                            ...userData, success: true
                        })
                    } else {
                        setData({
                            ...userData,
                            error: {status: true, message: "Invalid Credentials!"},
                        })
                    }
                } catch (error: any) {
                    console.log("Error: ", error);
                    setData({
                        ...userData,
                        error: {status: true, message: error}
                    })
                }
            }).catch((error: any) => console.log("Error: ", error))
    }

    async function handleLoginClick() {
        await validateLogin() //Needs proper credentials to login
        if (userData.success) {
            console.log("Login success")
            const token = {name: userData.username}; //TODO: add further data as needed, e.g. mail
            setToken(token);
            // redirect("/profile");
            navigate("/profile");
        }
    }

    return (
        <div className={"login"}>
            <h1>
                Log In
            </h1>
            <ul>
                <li><label>
                    Enter Username:</label>
                    <input id="user" name="user" type={"text"} onChange={(event) => setData({
                        ...userData,
                        username: event.target.value,
                    })} required/>
                </li>
                <li><label>
                    Enter Password: </label>
                    <input id="pw" name="pw" type={"password"} onChange={(event) => setData({
                        ...userData,
                        password: event.target.value
                    })} required/>
                </li>
                <li>
                    {userData.error.status && (
                        <div className={"error"}>{
                            userData.error.message}
                        </div>)}
                </li>
                <li>
                    <button onClick={handleLoginClick}> Login</button>
                </li>
            </ul>
        </div>);
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Login;