import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Spinner from "./components/Spinner";
//import Footer from "./components/content/Footer";
import { useEffect, useState } from "react";
import API from "./API.js";
import { BrowserRouter as Router } from "react-router-dom";
//import "./vendor/fontawesome-free/css/all.min.css";

function App() {
  const [sessionCheck, setSessionCheck] = useState(true);
  const [user, setUser] = useState();
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  const login = async (user) => {
    setIsLogged(true);
    setUser(user);
  };

  const logout = async () => {
    await API.logOut();
    setIsLogged(false);
    setUser();
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        console.log("GET SESSION CURRENT useEffect [TRY]");
        const user = await API.checkSession();
        setUser(user);
        setIsLogged(true);
        setSessionCheck(false);
        setLoading(false);
      } catch (err) {
        /* user not authenticated */
        console.log("GET SESSION CURRENT useEffect [CATCH]", err);

        setSessionCheck(false);
        setLoading(false);
      }
    };
    if (sessionCheck) {
      checkSession();
    }
    console.log("GET SESSION CURRENT useEffect [END]");
  }, [sessionCheck]);

  return loading ? (
    <Spinner />
  ) : (
    <Router>
      <div id="wrapper">
        <div
          id="content-wrapper"
          style={{ minHeight: "100vh" }}
          className="d-flex flex-column"
        >
          <div id="content">
            <Navbar user={user} logout={logout} />
            <Main user={user} login={login} isLogged={isLogged}/>
          </div>
        </div>
        {user && <Sidebar />}
      </div>
    </Router>
  );
}

export default App;
