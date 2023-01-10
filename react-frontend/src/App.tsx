// import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Profile from "./components/profile";
import NoPage from "./components/NoPage";
import Layout from  "./components/Layout";
import Login from  "./components/login";
import * as React from "react";


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
                    <Route index element={<NoPage />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="login" element={<Login />}  />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
export default App;
