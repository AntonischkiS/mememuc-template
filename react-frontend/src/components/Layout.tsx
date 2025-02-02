import {Link, Outlet} from "react-router-dom";
import "./Layout.css";

const Layout = () => {

    // const [value, setValue] = useState(createHtml);
    // function checkPath() {
    //     const currentPathName = window.location.href;
    //     console.log(currentPathName);
    //     if (currentPathName.includes("login")){
    //         console.log("At login ")
    //         return <Login></Login>;
    //     }
    //     else {
    //         return createHtml();
    //     }
    // }
    //
    // function createHtml() {
    //      return (<>
    //         <header className={"appHeader"} id={"appHead"}>
    //             <h1 id={"profileHeader"}>
    //                 <nav id={"navLinks"}>
    //                     <Link to="/profile">Profile</Link>
    //                 </nav>
    //             </h1>
    //             <nav id={"navAuth"}>
    //                 <Link to="/login " onClick={()=> setValue(checkPath)}>Log in</Link>
    //                 <a href="Register"> Register</a>
    //             </nav>
    //         </header>
    //         <Outlet/>
    //     </>);
    // }
    //
    // return value;

    return (
        <>
            <header className={"appHeader"} id={"appHead"}>
                <h1 id={"profileHeader"}>
                    <nav id={"navLinks"}>
                        <Link to="/profile">Profile</Link>
                    </nav>
                </h1>
                <nav id={"navAuth"}>
                    <Link to="/login">Log in</Link>
                    <a href="Register"> Register</a>
                </nav>
            </header>
            <Outlet/>
        </>
    );
}

export default Layout;