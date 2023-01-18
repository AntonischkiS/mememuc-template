import "./Login.css"
import React from "react";
import {useNavigate} from "react-router-dom";

interface UserData {
    name: String,
    password: String;
    error: { status: Boolean, message: String };
    success: Boolean;
}

const Login = () => {
//TODO find out how to remove header of layout
    const navigate = useNavigate();

    const [userData, setData] = React.useState<UserData>({
        name: "", password: "", error: {status: false, message: ""}, success: false
    });

    function validateLogin() {
        if (userData.name === "" || userData.password === "") {
            setData({
                ...userData, error: {status: true, message: "User name or Password can't be empty"},
            })
            return;
        }
        fetch("http://localhost:3001/users", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: userData.name,
                password: userData.password
            })
        }).then(res => {
        try {
            //TODO validate user name and password in backend
            // fetch()
            if (userData.name === "Adam" || userData.password === "1") {
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
            setData({
                ...userData,
                error: {status: true, message: error}
            })
        }})
    }

    function handleLoginClick() {
        validateLogin() //Needs proper credentials to login
        if (userData.success) {

            console.log(userData) //Only for debug, remove for production
            navigate("/profile")
        }
    }

    return (
        <div className={"login"}>
            <h1>
                Log In
            </h1>
            <ul>
                <li><label>
                    Username:</label>
                    <input id="user" name="user" type={"text"} onChange={(event) => setData({
                        ...userData,
                        name: event.target.value,
                    })}></input>
                </li>
                <li><label>
                    Password: </label>
                    <input id="pw" name="pw" type={"password"} onChange={(event) => setData({
                        ...userData,
                        password: event.target.value
                    })}></input>
                </li>
                <li>
                    {userData.error.status && (<div className={"error"}>{
                        userData.error.message}
                    </div>)}
                </li>
                <li>
                    <button onClick={handleLoginClick}> Login</button>
                </li>
            </ul>
        </div>);
}

export default Login;