import {Link, Outlet} from "react-router-dom";
// import exp = require("constants");

const Layout = () =>{
    return (
        <>
            <header>
                <nav>
                    <Link to="/profile">Profile</Link>
                </nav>
            </header>
            <Outlet />
        </>
    );
}

export default Layout;