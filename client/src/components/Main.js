import QuestionnaireCompile from "./Questionnaire/QuestionnaireCompile/QuestionnaireCompile";
import Questionnaires from "./Questionnaire/Questionnaires";
import QuestionnaireManage from "./Questionnaire/QuestionnaireManage";
import QuestionnaireResult from "./Questionnaire/QuestionnaireResult/QuestionnaireResult";
import QuestionnaireCreate from "./Questionnaire/QuestionnaireCreate/QuestionnaireCreate";
import API from "./../API.js";
import { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";

export const Main = ({ ...props }) => {
  const { user, login, isLogged } = props;
  const [refreshUser, setRefreshUser] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [questionnaires, setQuestionnaires] = useState([]);
  const [myQuestionnaires, setMyQuestionnaires] = useState([]);
  const [loadingQuestionnaire, setLoadingQuestionnaire] = useState(true);
  const [loadingMyQuestionnaire, setLoadingMyQuestionnaire] = useState(true);
  const [error, setError] = useState();
  const [userIsAdmin, setUserIsAdmin] = useState(isLogged);
  const [errorAdmin, setErrorAdmin] = useState();

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
    console.log(refresh);
    if (refresh) {
      getQuestionnaires();
      setRefresh(false);
    }
  }, [refresh]);

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
    console.log("3");
    if (refreshUser && userIsAdmin) {
      getMyQuestionnaires();
      setRefreshUser(false);
      setRefresh(true);
    }
  }, [refreshUser, userIsAdmin]);

  useEffect(() => {
    if(isLogged){
      setRefreshUser(true);
    }
    setUserIsAdmin(isLogged);
  }, [isLogged]);

  return (
    <div className="container-fluid" style={{ height: "100%" }}>
      <Switch>
        <Route path="/login">
          {user ? <Redirect to="/" /> : <Login login={login} setLoadingMyQuestionnaire={setLoadingMyQuestionnaire}/>}
        </Route>
        <Route path="/compile/:id">
          <QuestionnaireCompile questionnaires={questionnaires} setRefresh={setRefresh} isLogged={isLogged} setRefreshUser={setRefreshUser}/>
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
  );
};

export default Main;
