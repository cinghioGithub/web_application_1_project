import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import Button from "../../Button";
import QuestionnairePagination from "./QuestionnaireCompilePagination";
import QuestionnaireCompileQuestion from "./QuestionnaireCompileQuestion";
import QuestionnaireCompileName from "./QuestionnaireCompileName";
import Spinner from "../../Spinner";

export const QuestionnaireCompileBody = ({ ...props }) => {
  const { username, setUsername, loading, setLoading, setCursor, title, pages, current, questions, question, handleSetAnswer, answers, setForward } = props;

  const [options, setOptions] = useState([]);
  const [selection, setSelection] = useState();
  const [answer, setAnswer] = useState("");

  /* states of controll */
  //const [finished, setFinished] = useState(false);
  const [error, setError] = useState();
  const [endCompile, setEndCompile] = useState(false);
  const [invalidAnswer, setInvalidAnswer] = useState(false);
  const [namePresent, setNamePresent] = useState(false);

  const handleSetOption = (id) => {
    setOptions((options) => {
      let newOptions = [...options];
      newOptions[id] = !options[id];
      return newOptions;
    });
  };

  const submit = () => {
    setForward(true);
  };

  const finish = () => {
    const result = handleCompleteAnswer();
    if (result) {
      setError();
      setInvalidAnswer(false);
      setEndCompile(true);
      //submit();
    }
  };

  const next = () => {
    const result = handleCompleteAnswer();
    if (result) {
      setError();
      setInvalidAnswer(false);
      setCursor((cursor) => (cursor = cursor + 1));
    }
  };

  const previous = () => {
    const result = handleCompleteAnswer();
    if (result) {
      setError();
      setInvalidAnswer(false);
      setCursor((cursor) => (cursor = cursor - 1));
    }
  };

  const selectPage = (value) => {
    const result = handleCompleteAnswer();
    if (result) {
      setError();
      setCursor(value);
    }
  };

  /*count the options selected */
  const countSelected = (values) => {
    const accum = values.filter((value) => value === true);
    console.log(accum.length);
    return accum.length;
  };

  /* check answers at the end of compile */
  const manageCheckAnswers = () => {
    const tempAnswers = [...answers];
    console.log(answers);
    console.log(tempAnswers);
    const errorsID = tempAnswers.map((answer, index) => {
      if (questions[index].open) {
        if (questions[index].required && !answer) {
          console.log(index + 1);
          return index + 1;
        }
      } else {
        if (questions[index].max === 1) {
          if (questions[index].min === 1 && !answer) {
            console.log(index + 1);
            return index + 1;
          }
        } else {
          if (questions[index].min > 0 && !answer) {
            console.log(index + 1);
            return index + 1;
          }
        }
      }
      return undefined;
    });
    console.log(errorsID);
    return errorsID.filter((value) => value !== undefined);
  };

  /* complete answer */
  const handleCompleteAnswer = () => {
    if (question.open) {
      if (question.required && !answer) {
        setError(
          "For this question answer is Required. Please insert a valid one"
        );
        setInvalidAnswer(true);
        return false;
      }
      setLoading(true);
      handleSetAnswer(question.id - 1, { open: true, answer: answer });
      return true;
    } else {
      if (question.max === 1) {
        if (question.min === 1 && !selection) {
          setError(
            "For this question you have to select 1 answer. Please select one"
          );
          setInvalidAnswer(true);
          return false;
        }
        setLoading(true);
        handleSetAnswer(question.id - 1, { open: false, selection: selection });
        return true;
      } else {
        if (
          countSelected(options) < question.min ||
          countSelected(options) > question.max
        ) {
          setError(
            `For this question you have to select at least ${question.min} and max ${question.max} answers`
          );
          setInvalidAnswer(true);
          return false;
        }
        setLoading(true);
        handleSetAnswer(question.id - 1, { open: false, options: options });
        return true;
      }
    }
  };

  /* load an answer already given */
  useEffect(() => {
    if (!loading) {
      if (answers[question.id - 1] && answers[question.id - 1].answer) {
        setAnswer(answers[question.id - 1].answer);
      } else {
        setAnswer("");
      }
      if (answers[question.id - 1] && answers[question.id - 1].options) {
        setOptions(answers[question.id - 1].options);
      } else {
        setOptions([]);
      }
      if (answers[question.id - 1] && answers[question.id - 1].selection) {
        setSelection(answers[question.id - 1].selection);
      } else {
        setSelection();
      }
    }
  }, [loading, answers, question.id]);   //answers, question.id added to supress warning

  /* manage end of compile */
  useEffect(() => {
    if (endCompile) {
      const errorsID = manageCheckAnswers();
      if (errorsID.length !== 0) {
        setError(
          `Some questions are Required: ${errorsID.map(
            String
          )}. Please complete questionnaire`
        );
        setEndCompile(false);
      } else {
        submit();
        setError();
        //setFinished(true);
        setNamePresent(false);
      }
    }
    /* suppress warning about missing dependency: manageCheckAnswers (function is immutable) */
    // eslint-disable-next-line
  }, [endCompile]);

  return (
    <>
      <div className="row">
        <div className="col-10 offset-1 mb-1">
          <div className="card mb-4">
            <div className="card-body py-3 d-flex align-item-center">
              <div className="align-self-start col-2">
                <Button text={"Back"} type={"danger"} url={"/"} />
              </div>
              <h6 className="align-self-center col-8 m-0 font-weight-bold text-center h2 text-primary">
                {title}
              </h6>
            </div>
          </div>
        </div>
      </div>
      {/*finished*/namePresent ? (
        <>
          {error && (
            <div className="row d-flex justify-content-center align-items-center">
              <Alert variant={"danger"}>{error}</Alert>
            </div>
          )}
          <div className="row" style={{ height: "20rem" }}>
            {loading ? (
              <Spinner />
            ) : (
              <QuestionnaireCompileQuestion
                question={question}
                answer={answer}
                setAnswer={setAnswer}
                selection={selection}
                setSelection={setSelection}
                options={options}
                handleSetOption={handleSetOption}
                valid={!invalidAnswer}
              />
            )}
          </div>
          <QuestionnairePagination
            pages={pages}
            current={current}
            next={next}
            previous={previous}
            selectPage={selectPage}
            finish={finish}
          />
        </>
      ) : (
        <QuestionnaireCompileName
          username={username}
          setUsername={setUsername}
          /*submit={submit}*/
          setNamePresent={setNamePresent}
        />
      )}
    </>
  );
};

export default QuestionnaireCompileBody;
