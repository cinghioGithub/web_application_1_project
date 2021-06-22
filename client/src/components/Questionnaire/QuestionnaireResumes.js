import QuestionnaireCard from "./QuestionnaireCard";
import { Alert } from "react-bootstrap";

export const QuestionnaireResumes = ({ ...props }) => {
  const { questionnaires, error, loading } = props;
  
  const cards = questionnaires.map((questionnaire, index) => (
    <QuestionnaireCard key={index} questionnaire={questionnaire} />
  ));

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Home</h1>
      </div>
      <div className="row">
        {loading ? (
          ""
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
