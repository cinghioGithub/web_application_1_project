import Button from "../../Various/Button";
import ProgressBar from "../../Various/ProgressBar";

export const QuestionnaireCompileHeader = ({ ...props }) => {
  const { title, pointer, max } = props;
  return (
    <div className="row">
      <div className="col-10 offset-1 mb-1">
        <div className="card mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-center h2 text-primary">
              {title}
            </h6>
          </div>
          <div className="card-body row">
            <div className="col-2 d-flex justify-content-start align-items-center">
              <Button text={"Back Home"} type={"danger"} url={"/"} />
            </div>
            <div className="col-8">
              <ProgressBar title={"Progress"} value={pointer} max={max} />
            </div>
            {/* <div className="col-2 d-flex justify-content-end align-items-center">
              <Button
                text={"Submit Questionnaire"}
                type={"success"}
                disabled={pointer !== max}
                onClick={submit}
              />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireCompileHeader;
