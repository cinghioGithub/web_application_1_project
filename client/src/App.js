import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Spinner from "./components/Spinner";
import { useEffect, useState } from "react";
import API from "./API.js";
import { BrowserRouter as Router } from "react-router-dom";
import QuestionnaireCompile from "./components/Questionnaire/QuestionnaireCompile/QuestionnaireCompile";
import Questionnaires from "./components/Questionnaire/Questionnaires";
import QuestionnaireManage from "./components/Questionnaire/QuestionnaireManage";
import QuestionnaireResult from "./components/Questionnaire/QuestionnaireResult/QuestionnaireResult";
import QuestionnaireCreate from "./components/Questionnaire/QuestionnaireCreate/QuestionnaireCreate";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/Login";

function App() {
  const [sessionCheck, setSessionCheck] = useState(true);
  const [user, setUser] = useState();
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  const [refreshUser, setRefreshUser] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [questionnaires, setQuestionnaires] = useState([]);
  const [myQuestionnaires, setMyQuestionnaires] = useState([]);
  const [loadingQuestionnaire, setLoadingQuestionnaire] = useState(true);
  const [loadingMyQuestionnaire, setLoadingMyQuestionnaire] = useState(true);
  const [error, setError] = useState();
  const [userIsAdmin, setUserIsAdmin] = useState(isLogged);
  const [errorAdmin, setErrorAdmin] = useState();

  const login = async (user) => {
    setIsLogged(true);
    setUser(user);
  };

  const logout = async () => {
    await API.logOut();
    setIsLogged(false);
    setUser();
  };

  /* perform session check after a reload of the app */
  useEffect(() => {
    const checkSession = async () => {
      try {
        const user = await API.checkSession();
        setUser(user);
        setIsLogged(true);
        setSessionCheck(false);
        setLoading(false);
      } catch (err) {
        /* user not authenticated */
        setSessionCheck(false);
        setLoading(false);
      }
    };
    if (sessionCheck) {
      checkSession();
    }
  }, [sessionCheck]);

  /* retrive all questionnaires from server */
  useEffect(() => {
    async function getQuestionnaires() {
      try {
        const result_questionnaires = await API.getQuestionnaires();
        setQuestionnaires(result_questionnaires);
        setLoadingQuestionnaire(false);
      } catch (err) {
        setError(err);
        setLoadingQuestionnaire(false);
      }
    }
    if (refresh) {
      getQuestionnaires();
      setRefresh(false);
    }
  }, [refresh]);

  /* retrive admin's questionnaires from server */
  useEffect(() => {
    async function getMyQuestionnaires() {
      try {
        const response = await API.getAdminQuestionnaires();
        setMyQuestionnaires(response);
      } catch (err) {
        setErrorAdmin(err.error);
      }
      setLoadingMyQuestionnaire(false);
    }
    if (refreshUser && userIsAdmin) {
      getMyQuestionnaires();
      setRefreshUser(false);
      setRefresh(true);
    }
  }, [refreshUser, userIsAdmin]);

    /* update questionnaires after login/logout */
  useEffect(() => {
    if(isLogged){
      setRefreshUser(true);
    }
    setUserIsAdmin(isLogged);
  }, [isLogged]);

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
            <div className="container-fluid" style={{ height: "100%" }}>
              <Switch>
                <Route path="/login">
                  {user ? <Redirect to="/" /> : <Login login={login} setLoadingMyQuestionnaire={setLoadingMyQuestionnaire} />}
                </Route>
                <Route path="/compile/:id">
                  <QuestionnaireCompile questionnaires={questionnaires} setRefresh={setRefresh} isLogged={isLogged} setRefreshUser={setRefreshUser} />
                </Route>
                <Route path="/results/:id">
                  {user ? <QuestionnaireResult user={user} /> : <Redirect to="/" />}
                </Route>
                <Route path="/manage">
                  {user ? (
                    <QuestionnaireManage
                      loading={loadingMyQuestionnaire}
                      myQuestionnaires={myQuestionnaires}
                      user={user}
                      setRefreshUser={setRefreshUser}
                      setRefresh={setRefresh}
                      error={errorAdmin}
                      setError={setErrorAdmin}
                    />
                  ) : (
                    <Redirect to="/" />
                  )}
                </Route>
                <Route path="/create">
                  {user ? (
                    <QuestionnaireCreate
                      user={user}
                      setRefreshUser={setRefreshUser}
                      setLoadingMyQuestionnaire={setLoadingMyQuestionnaire}
                    />
                  ) : (
                    <Redirect to="/" />
                  )}
                </Route>
                <Route path="/">
                  <Questionnaires questionnaires={questionnaires} loading={loadingQuestionnaire} error={error} />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
        {user && <Sidebar />}
      </div>
    </Router>
  );
}

export default App;
