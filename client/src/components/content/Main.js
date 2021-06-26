import QuestionnaireCompile from "../Questionnaire/QuestionnaireCompile/QuestionnaireCompile";
import QuestionnaireResumes from "../Questionnaire/QuestionnaireResumes";
import QuestionnaireManage from "../Questionnaire/QuestionnaireManage";
import QuestionnaireResult from "../Questionnaire/QuestionnaireResult/QuestionnaireResult";
import QuestionnaireCreate from "../Questionnaire/QuestionnaireCreate/QuestionnaireCreate";
import API from "../../API.js";
import { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";

export const Main = ({ ...props }) => {
  const { user, login, isLogged } = props;
  const [refreshAdmin, setRefreshAdmin] = useState(true);
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
  }/*, [refresh]*/);

  useEffect(() => {
    async function getMyQuestionnaires() {
      try {
        const response = await API.getAdminQuestionnaires();
        setMyQuestionnaires(response);
      } catch (err) {
        setError(err.error);
        //setMyQuestionnaires(err);
      }
      setLoadingMyQuestionnaire(false);
    }
    //console.log(refreshAdmin);
    //console.log(user);
    if (refreshAdmin && userIsAdmin) {
      getMyQuestionnaires();
      setRefreshAdmin(false);
      setRefresh(true);
    }
  }/*,[refreshAdmin, userIsAdmin]*/);

  useEffect(() => {
    if(isLogged){
      setRefreshAdmin(true);
    }
    setUserIsAdmin(isLogged);
  }, [isLogged]);

  return (
    <div className="container-fluid" style={{ height: "100%" }}>
      <Switch>
        <Route path="/login">
          {user ? <Redirect to="/" /> : <Login login={login} setRefreshAdmin={setRefreshAdmin}/>}
        </Route>
        <Route path="/compile/:id">
          <QuestionnaireCompile questionnaires={questionnaires} setRefresh={setRefresh} isLogged={isLogged} setRefreshAdmin={setRefreshAdmin}/*setQuestionnaires={setQuestionnaires}*/ />
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
              setRefreshAdmin={setRefreshAdmin}
              setRefresh={setRefresh}
            />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route path="/create">
          {user ? (
            <QuestionnaireCreate
              user={user}
              setRefreshAdmin={setRefreshAdmin}
            />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route path="/">
          <QuestionnaireResumes questionnaires={questionnaires} loading={loadingQuestionnaire} error={error} />
        </Route>
      </Switch>
    </div>
  );
};

export default Main;
