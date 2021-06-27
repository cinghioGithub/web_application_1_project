import QuestionnaireCard from "./QuestionnaireCard";
import { useState, useEffect } from "react";
import Spinner from "../Spinner";
import API from "../../API.js";
import { Alert } from "react-bootstrap";

export const QuestionnaireManage = ({ ...props }) => {
  const { user, loading, setRefreshUser /*, setRefresh*/, myQuestionnaires, error, setError } = props;
  //const [loading, setLoading] = useState(true);
  const [loadDelete, setLoadDelete] = useState();
  const [deleted, setDeleted] = useState(false);
  //const [error, setError] = useState();

  const deleteQuestionnaire = async (id) => {
    setLoadDelete(id);
    try {
      await API.deleteQuestionnaire(id);
      setLoadDelete();
    } catch (err) {
      setError(err.error);
    }
    //setLoadDelete();
    setDeleted(true);
    //setRefreshUser(true);
    //setRefresh(true);
  };

  useEffect(() => {
    if(deleted){
      setRefreshUser(true);
      setDeleted(false);
    }
  }, [deleted]);

  const cards = myQuestionnaires.error ? {error: myQuestionnaires.error} : myQuestionnaires
    .filter((questionnaire) => user.id === questionnaire.admin)
    .map((questionnaire, index) => (
      <QuestionnaireCard
        remove={deleteQuestionnaire}
        loadingID={loadDelete}
        key={index}
        compiled={questionnaire.compiled}
        questionnaire={questionnaire}
        isAdmin={user.id === questionnaire.admin}
      />
    ));

    if(cards.error) setError(cards.error);

  /* useEffect(() => {
    async function getMyQuestionnaires() {
      try {
        const response = await API.getAdminQuestionnaires();
        setMyQuestionnaires(response);
      } catch (err) {
        setError(err.error);
        // da gestire
      }
    }
    console.log(refreshUser);
    if (refreshUser) {
      getMyQuestionnaires();
      setLoading(false);
      setRefreshUser(false);
    }
  }, [refreshUser]); */

  //console.log(loading);

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">My Questionnaires</h1>
      </div>
      {error ? <Alert variant={"danger"}>{error}</Alert> :
      (loading ? <Spinner/> : (cards.length === 0 ? <p>No questionaires</p> :<div className="row">{cards}</div>))}
    </>
  );
};

export default QuestionnaireManage;
