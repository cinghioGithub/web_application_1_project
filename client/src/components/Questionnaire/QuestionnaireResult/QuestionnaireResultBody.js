import QuestionnaireResultHeader from "./QuestionnaireResultHeader";
import QuestionnaireResultPagination from "./QuestionnaireResultPagination";
import QuestionnaireResultQuestion from "./QuestionnaireResultQuestion";
import { Alert } from "react-bootstrap";
import Spinner from "../../Various/Spinner";
import { useEffect } from "react";

export const QuestionnaireResultBody = ({ ...props }) => {
  const { loading, setCursor, questionnaire, pages, current, compile, error } = props;

  const next = () => {
    //setLoading(true);
    if (current === pages) {
      setCursor(1);
    } else {
      setCursor((current) => (current = current + 1));
    }
  };

  const previous = () => {
    //setLoading(true);
    if (current === 1) {
      setCursor(pages);
    } else {
      setCursor((current) => (current = current - 1));
    }
  };

  const select = (value) => {
    //setLoading(true);
    setCursor(value);
  };


  const questions = questionnaire.questions.map((question) => (
    <QuestionnaireResultQuestion
      key={question.id}
      question={question}
      answers={compile.answers.find((answer) => answer.id === question.id)}
    />
  ));
  
  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Results</h1>
      </div>
      {
        <QuestionnaireResultHeader
          title={questionnaire.title}
          pages={pages}
          username={compile.username}
          current={current}
          next={next}
          previous={previous}
        />
      }
      <div className="row">{loading ? <Spinner /> : error ? (
            <div className="row d-flex justify-content-center align-items-center">
              <Alert variant={"danger"}>{error}</Alert>
            </div>
          ) : questions}</div>
      {
        <div className="row">
          <QuestionnaireResultPagination
            pages={pages}
            current={current}
            next={next}
            previous={previous}
            select={select}
          />
        </div>
      }
    </>
  );
};

export default QuestionnaireResultBody;
