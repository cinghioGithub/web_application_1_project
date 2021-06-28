import QuestionnaireResultBody from "./QuestionnaireResultBody";
import QuestionnaireCompileResult from "../QuestionnaireCompile/QuestionnaireCompileResult";
import Spinner from "../../Spinner";
import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import API from "../../../API";

export const QuestionnaireResult = ({ ...props }) => {
  const [loadQuestionnaire, setLoadQuestionnaire] = useState(true);
  const [compiles, setCompiles] = useState([]);
  const [questionnaire, setQuestionnaire] = useState();
  const [cursor, setCursor] = useState(1);
  const [error, setError] = useState();

  const id = useRouteMatch().params.id;

  /* retrive compiles for a specific questionnaire and the questionnaire (for questions) */
  useEffect(() => {
    async function getQuestionnaireCompiles() {
      try {
        const answers_response = await API.getAnswers(id);
        console.log(answers_response);
        setCompiles(answers_response.compiles);
      } catch (err) {
        setError(err.error);
      }
      try {
        const questionnaires_response = await API.getAdminQuestionnaires();
        const tmp = questionnaires_response.find(
          (questionnaire) => questionnaire.id === parseInt(id)
        );
        setQuestionnaire(tmp);
      } catch (err) {
        setError(err.error);
      }
      setLoadQuestionnaire(false);
    }
    if (id) {
      getQuestionnaireCompiles();
    }
  }, [id]);

  return loadQuestionnaire ? (
    <Spinner />
  ) : error ? (<QuestionnaireCompileResult title={"Error!"} error={error} loading={loadQuestionnaire} />) : (
    <QuestionnaireResultBody
      questionnaire={questionnaire}
      compile={compiles[cursor - 1]}
      loading={loadQuestionnaire}
      setLoading={setLoadQuestionnaire}
      setCursor={setCursor}
      pages={compiles.length}
      current={cursor}
      error={error}
    />
  );
};

export default QuestionnaireResult;
