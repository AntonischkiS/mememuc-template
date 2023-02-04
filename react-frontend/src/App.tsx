// import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Profile from "./components/profile/Profile";
import Layout from "./components/layout/Layout";
import Login from "./components/login/Login";
import MemeEditor from "./components/editor/editor";
import * as React from "react";
import Overview from "./components/overview/Overview";
import Register from "./components/register/Register";
import NoPage from "./components/NoPage";


// function App() {
//   return (
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Layout />}>
//             <Route index element={<Profile />} />
//             <Route path="*" element={<NoPage />} />
//           </Route>
//         </Routes>
//       </BrowserRouter>
//   );
// }

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Overview />} />
                    <Route path="profile" element={<Profile />} />
                    <Route index element={<Overview />} />
                    <Route path="editor" element={<MemeEditor/>}></Route>
                </Route>
                <Route path="login" element={<Login />}  />
                <Route path ="register" element={<Register/>} />
                <Route path="*" element={<NoPage />} />
            </Routes>
        </BrowserRouter>
    );
}
export default App;
