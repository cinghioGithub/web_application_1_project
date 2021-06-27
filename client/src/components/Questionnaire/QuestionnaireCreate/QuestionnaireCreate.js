import QuestionnaireCreateBody from "./QuestionnaireCreateBody";
import QuestionnaireCreateResult from "./QuestionnaireCreateResult";
import CreateQuestionModal from "./CreateQuestionModal";
import { useEffect, useState } from "react";
//import EditTitle from "./EditTitle";
import API from "../../../API.js";

export const QuestionnaireCreate = ({ ...props }) => {
  const { user, setRefreshUser/*, setRefresh*/, setLoadingMyQuestionnaire } = props;
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(false);
  const [error, setError] = useState("");
  const [create, setCreate] = useState(false);
  const [created, setCreated] = useState(false);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  //const [showEditTitle, setShowEditTitle] = useState(false);

  const handleCloseAddQuestion = () => {
    setShowAddQuestion(false);
  };

  const handleShowAddQuestion = () => {
    setShowAddQuestion(true);
  };

  /*const handleCloseEditTitle = () => {
    setShowEditTitle(false);
  };

  const handleShowEditTitle = () => {
    setShowEditTitle(true);
  };*/

  const handleSetQuestion = (question) => {
    setQuestions((questions) => {
      let newQuestions = [...questions];
      newQuestions.push(question);
      return newQuestions;
    });
  };

  useEffect(() => {
    const submitQuestionnaire = async () => {
      //const ids = questionnaires.map((questionnaire) => questionnaire.id);
      const questionnaire = {
        //id: Math.max(...ids) + 1,
        title: title,
        compiled: 0,
        admin: user.id,
        questions: [...questions],
      };
      console.log(questionnaire);
      try{
        const response = await API.insertQuestionnaire(questionnaire);
        setLoading(false);
        //setRefresh(true);
      }
      catch(err){
        setError(err.error);
      }
      setCreated(true);
      //setRefreshUser(true);
      //questionnaires.push(questionnaire);
    };
    if (create) {
      setLoading(true);
      submitQuestionnaire();
      //setLoading(false);
    }
  }, [create, questions, title, user.id]); //questions, title, user.id added to suppress warning

  useEffect(() => {
    if(created){
      setRefreshUser(true);
      setLoadingMyQuestionnaire(true);
      setCreated(false);
    }
  }, [created, setLoadingMyQuestionnaire, setRefreshUser]); //setLoadingMyQuestionnaire, setRefreshUser added to suppress warning

  return create ? (
    <QuestionnaireCreateResult loading={loading} title={title} error={error} />
  ) : (
    <>
      <QuestionnaireCreateBody
        loading={loading}
        setLoading={setLoading}
        questions={questions}
        setQuestions={setQuestions}
        title={title}
        setTitle={setTitle}
        start={start}
        setStart={setStart}
        setCreate={setCreate}
        showAddQuestion={handleShowAddQuestion}
        /*showEditTitle={handleShowEditTitle}*/
      />
      <CreateQuestionModal
        show={showAddQuestion}
        onHide={handleCloseAddQuestion}
        newQuestionId={questions.length + 1}
        handleSetQuestion={handleSetQuestion}
      />
      {/*<EditTitle
        show={showEditTitle}
        onHide={handleCloseEditTitle}
        title={title}
        setTitle={setTitle}
      />*/}
    </>
  );
};

export default QuestionnaireCreate;
