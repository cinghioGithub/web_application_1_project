import QuestionnaireBox from "./QuestionnaireBox";
import Spinner from "../Spinner";
import { Alert } from "react-bootstrap";

export const Questionnaires = ({ ...props }) => {
  const { questionnaires, error, loading } = props;
  
  const cards = questionnaires.map((questionnaire, index) => (
    <QuestionnaireBox key={index} questionnaire={questionnaire} />
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
        ) : cards.length === 0 ? "No Questionnaires available" : (
          cards
        )}
      </div>
    </>
  );
};

export default Questionnaires;
