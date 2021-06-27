import Button from "../../Button";
import Spinner from "../../Spinner";

const QuestionnaireCreateResult = ({ ...props }) => {
  const { title, loading, error } = props;
  return (
    <div className="row">
      <div className="col-10 offset-1 mb-1">
        <div className="card mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-center h2 text-primary">
              {title}
            </h6>
          </div>
          <div className="card-body row d-flex flex-column justify-content-between">
            {loading ? (
              <Spinner />
            ) : error ? (
              <>
                <h1 className="font-weight-bold text-center h1 text-warning">
                  Ouch! we have some problems :(
                </h1>
                <div className="m-3 d-flex justify-content-center text-lg align-items-center">
                  <p>{error}</p>
                </div>
              </>
            ) : (
              <>
                <h1 className="font-weight-bold text-center h1 text-success">
                  Well Done!
                </h1>
                <div className="m-3 d-flex justify-content-center text-lg align-items-center">
                  <p>Your Questionnaire was succesfull Created!</p>
                </div>
              </>
            )}
            <div className="d-flex justify-content-center align-items-center">
              <Button text={"Go Manage"} type={"success"} url={"/manage"} disabled={loading}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireCreateResult;
