import QuestionnaireCard from "./QuestionnaireCard";
import Spinner from "../Spinner";
import { Alert } from "react-bootstrap";

export const QuestionnaireResumes = ({ ...props }) => {
  const { questionnaires, error, loading } = props;
  
  const cards = questionnaires.map((questionnaire, index) => (
    <QuestionnaireCard key={index} questionnaire={questionnaire} />
  ));

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Questionnaires To Compile</h1>
      </div>
      <div className="row">
        {loading ? (
          <Spinner/>
        ) : error ? (
          <Alert variant={"danger"}>{error}</Alert>
        ) : (
          cards
        )}
      </div>
    </>
  );
};

export default QuestionnaireResumes;
