import "./login.css"
import React from "react";

const Login = () => {
    return (
        <body>
        <h1>
            Log In
        </h1>
        <ul>
           <li>
               <textarea id = "user" name="user" rows={1} >Username</textarea>
           </li>
            <li>
                <textarea id = "pw" name="pw" rows={1} >Password</textarea>
            </li>
            <li>
                <button> Login </button>
            </li>
        </ul>
        </body>);
}

export default Login;