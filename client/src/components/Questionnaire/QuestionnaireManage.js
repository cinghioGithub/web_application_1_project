import QuestionnaireBox from "./QuestionnaireBox";
import { useState, useEffect } from "react";
import Spinner from "../Spinner";
import API from "../../API.js";
import { Alert } from "react-bootstrap";

export const QuestionnaireManage = ({ ...props }) => {
  const { user, loading, setRefreshUser, myQuestionnaires, error, setError } = props;
  const [loadDelete, setLoadDelete] = useState();
  const [deleted, setDeleted] = useState(false);

  const deleteQuestionnaire = async (id) => {
    setLoadDelete(id);
    try {
      await API.deleteQuestionnaire(id);
      setLoadDelete();
    } catch (err) {
      setError(err.error);
    }
    setDeleted(true);
  };

  useEffect(() => {
    if(deleted){
      setRefreshUser(true);
      setDeleted(false);
    }
  }, [deleted, setRefreshUser]);  //setRefreshUser added to suppress warning

  const cards = myQuestionnaires.error ? {error: myQuestionnaires.error} : myQuestionnaires
    .filter((questionnaire) => user.id === questionnaire.admin)
    .map((questionnaire, index) => (
      <QuestionnaireBox
        remove={deleteQuestionnaire}
        loadingID={loadDelete}
        key={index}
        compiled={questionnaire.compiled}
        questionnaire={questionnaire}
        isAdmin={user.id === questionnaire.admin}
      />
    ));

    if(cards.error) setError(cards.error);

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
