import QuestionnaireCreateBody from "./QuestionnaireCreateBody";
import QuestionnaireCreateResult from "./QuestionnaireCreateResult";
import CreateQuestionModal from "./CreateQuestionModal";
import { useEffect, useState } from "react";
import API from "../../../API.js";

export const QuestionnaireCreate = ({ ...props }) => {
  const { user, setRefreshUser, setLoadingMyQuestionnaire } = props;
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [create, setCreate] = useState(false);
  const [created, setCreated] = useState(false);
  const [showAddQuestion, setShowAddQuestion] = useState(false);

  const handleCloseAddQuestion = () => {
    setShowAddQuestion(false);
  };

  const handleShowAddQuestion = () => {
    setShowAddQuestion(true);
  };

  const handleSetQuestion = (question) => {
    setQuestions((questions) => {
      let newQuestions = [...questions];
      newQuestions.push(question);
      return newQuestions;
    });
  };

  /* perform the post of a new questionnaire on server */
  useEffect(() => {
    const submitQuestionnaire = async () => {
      const questionnaire = {
        title: title,
        compiled: 0,
        admin: user.id,
        questions: [...questions],
      };
      
      try{
        await API.insertQuestionnaire(questionnaire);
        setLoading(false);
      }
      catch(err){
        setError(err.error);
      }
      setCreated(true);
    };
    if (create) {
      setLoading(true);
      submitQuestionnaire();
    }
  }, [create, questions, title, user.id]); //questions, title, user.id added to suppress warning

  /* manage the refresh of questionnaires list after the creation on a new one */
  useEffect(() => {
    if(created){
      setRefreshUser(true);
      setLoadingMyQuestionnaire(true);
      setCreated(false);
    }
  }, [created, setLoadingMyQuestionnaire, setRefreshUser]); //setLoadingMyQuestionnaire, setRefreshUser added to suppress warning

  return create ? (
    <QuestionnaireCreateResult loading={loading} title={title} error={error} setRefreshUser={setRefreshUser}/>
  ) : (
    <>
      <QuestionnaireCreateBody
        loading={loading}
        setLoading={setLoading}
        questions={questions}
        setQuestions={setQuestions}
        title={title}
        setTitle={setTitle}
        setCreate={setCreate}
        showAddQuestion={handleShowAddQuestion}
      />
      <CreateQuestionModal
        show={showAddQuestion}
        onHide={handleCloseAddQuestion}
        newQuestionId={questions.length + 1}
        handleSetQuestion={handleSetQuestion}
      />
    </>
  );
};

export default QuestionnaireCreate;
