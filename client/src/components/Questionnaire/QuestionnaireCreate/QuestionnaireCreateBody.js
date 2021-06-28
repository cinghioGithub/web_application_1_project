import QuestionnaireCreateHeader from "./QuestionnaireCreateHeader";
import QuestionnaireCreateQuestion from "./QuestionnaireCreateQuestion";
import Button from "../../Button";
import Spinner from "../../Spinner";

export const QuestionnaireCreateBody = ({ ...props }) => {
  const { loading, setLoading, questions, setQuestions, title, setTitle, setCreate, showAddQuestion } = props;

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

  /* manage the moveUp/moveDown of questions */
  const swap = (id_1, id_2, array) => {
    const item_1 = array[id_1 - 1];
    array[id_1 - 1] = array[id_2 - 1];
    array[id_2 - 1] = item_1;
    array = array.map((item, index) =>
      Object.assign({}, item, { id: index + 1 })
    );
    return array;
  };

  const removeQuestion = (id) => {
    setQuestions(questions => {
      let tmp = questions.filter(question => question.id !== id);
      tmp = tmp.map( val => {
        if(val.id > id)
          return Object.assign({}, val, { id: val.id-1});
        else
          return val;
      });
      return tmp;
    });
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
      <QuestionnaireCreateHeader
        title={title}
        numQuestions={questions.length}
        submit={() => setCreate(true)}
        setTitle={setTitle}
      />
      <div className="row">{loading ? <Spinner /> : questions_}</div>
      <div className="row d-flex justify-content-center align-items-center">
        <Button
          text={"Add New Question"}
          type={"primary"}
          onClick={showAddQuestion}
        />
      </div>
    </>
  );
};

export default QuestionnaireCreateBody;
