import QuestionnaireCreateHeader from "./QuestionnaireCreateHeader";
import QuestionnaireCreateQuestion from "./QuestionnaireCreateQuestion";
import QuestionnaireCreateAddTitle from "./QuestionnaireCreateAddTitle";
import Button from "../../Button";
import Spinner from "../../Spinner";

export const QuestionnaireCreateBody = ({ ...props }) => {
  const {
    loading,
    setLoading,
    questions,
    setQuestions,
    title,
    setTitle,
    setCreate,
    start,
    setStart,
    showAddQuestion,
    showEditTitle,
  } = props;

  const moveUp = (id) => {
    setLoading(true);
    const tmp = swap(id - 1, id, [...questions]);
    setQuestions(tmp);
    setLoading(false);
  };

  const moveDown = (id) => {
    setLoading(true);
    const tmp = swap(id, id + 1, [...questions]);
    setQuestions(tmp);
    setLoading(false);
  };

  const swap = (id_1, id_2, array) => {
    const item_1 = array[id_1 - 1];
    console.log(array);
    array[id_1 - 1] = array[id_2 - 1];
    console.log(array);
    array[id_2 - 1] = item_1;
    console.log(array);
    array = array.map((item, index) =>
      Object.assign({}, item, { id: index + 1 })
    );
    return array;
  };

  const removeQuestion = (id) => {
    setQuestions(questions => questions.filter(question => question.id !== id));
  };

  const questions_ = questions.map((question) => (
    <QuestionnaireCreateQuestion
      question={question}
      moveUp={moveUp}
      moveDown={moveDown}
      numQuestions={questions.length}
      remove={removeQuestion}
      key={question.id}
    />
  ));

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Create Questionnaire</h1>
      </div>
      {start ? (
        <>
          <QuestionnaireCreateHeader
            title={title}
            editTitle={showEditTitle}
            addQuestion={showAddQuestion}
            numQuestions={questions.length}
            submit={() => setCreate(true)}
          />
          <div className="row">{loading ? <Spinner /> : questions_}</div>
          {/*<div className="row d-flex justify-content-center align-items-center">
            <Button
              text={"Add New Question"}
              type={"primary"}
              onClick={showAddQuestion}
            />
      </div>*/}
        </>
      ) : (
        <QuestionnaireCreateAddTitle
          title={title}
          setTitle={setTitle}
          submit={setStart}
        />
      )}
    </>
  );
};

export default QuestionnaireCreateBody;
