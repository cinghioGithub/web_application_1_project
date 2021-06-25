import QuestionnaireCompileBody from "./QuestionnaireCompileBody";
import QuestionnaireCompileResult from "./QuestionnaireCompileResult";
import Spinner from "../../Various/Spinner";
import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import API from "../../../API.js";

export const QuestionnaireCompile = ({ ...props }) => {
  const { questionnaires, setRefresh, setQuestionnaires } = props;
  const [loadQuestionnaire, setLoadQuestionnaire] = useState(true);
  const [loadQuestion, setLoadQuestion] = useState(true);
  const [loadResult, setLoadResult] = useState(false);
  const [error, setError] = useState();
  const [username, setUsername] = useState();
  const [questionnaire, setQuestionnaire] = useState();
  const [question, setQuestion] = useState();
  const [answers, setAnswers] = useState([]);
  const [cursor, setCursor] = useState(1);
  const [forward, setForward] = useState(false);

  const id = useRouteMatch().params.id;

  const handleSetAnswer = (id, answer) => {
    setAnswers((answers) => {
      let newAnswers = [...answers];
      newAnswers[id] = answer;
      return newAnswers;
    });
  };

  useEffect(() => {
    if (questionnaire) {
      const tmpQuestion = questionnaire.questions.find(
        (question) => question.id === cursor
      );
      setQuestion(tmpQuestion);
      setLoadQuestion(false);
    }
  }, [cursor, loadQuestion, questionnaire]);

  useEffect(() => {
    //download questionnaire
    async function getQuestionnaire(){
      try {
        const result = await API.getQuestionnaireById(id);
        setQuestionnaire(result);
        setLoadQuestionnaire(false);
      } catch (err) {
        setError(err.error);
        setLoadQuestionnaire(false);
      }
    }
    if(!questionnaire && id){
      getQuestionnaire();
    }
    else{
      if (id) {
        const tmpQuestionnaire = questionnaires.find((questionnaire) => questionnaire.id === parseInt(id));
        setQuestionnaire(tmpQuestionnaire);
        setLoadQuestionnaire(false);
      } else {
        //TODO SURVEY NOT FOUND
      }
    }
  }, [id]);

  useEffect(() => {
    async function postCompile(compile) {
      try {
        await API.insertAnswer(parseInt(id), compile);
        setLoadResult(false);
        setRefresh(true);
      } catch (err) {
        setError(err.error);
        setLoadResult(false);
      }
    }
    if (forward) {
      setLoadQuestion(false);
      setLoadResult(true);
      const compile = {
        username: username,
        answers: [...answers].map((answer, index) =>
          Object.assign({}, { id: index + 1, ...answer })
        ),
      };
      console.log(compile);
      postCompile(compile);

      //let obj = results.find((result) => result.id === questionnaire.id);
      /* if (obj) {
        obj.compiles.push(compiles);
        questionnaire.compiled++;
      } else {
        results.push(
          Object.assign({}, { id: questionnaire.id, compiles: [{ ...compiles }] })
        );
        questionnaire.compiled = 1;
      } */
    }
  }, [forward]);

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Compile</h1>
      </div>
      {loadQuestionnaire ? (
        <Spinner />
      ) : error ? (<QuestionnaireCompileResult title={"Error!"} error={error} loading={loadResult} />) : forward ? (
        <QuestionnaireCompileResult title={questionnaire.title} error={error} loading={loadResult} />
      ) : (
        <QuestionnaireCompileBody
          title={questionnaire.title}
          username={username}
          setUsername={setUsername}
          loading={loadQuestion}
          setLoading={setLoadQuestion}
          current={cursor}
          setCursor={setCursor}
          pages={questionnaire.questions.length}
          questions={questionnaire.questions}
          question={question}
          answers={answers}
          handleSetAnswer={handleSetAnswer}
          setForward={setForward}
        />
      )}
    </>
  );
};

export default QuestionnaireCompile;
