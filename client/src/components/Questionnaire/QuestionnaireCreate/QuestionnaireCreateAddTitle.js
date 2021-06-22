import Button from "../../Various/Button";

export const QuestionnaireCreateAddTitle = ({ ...props }) => {
  const { title, setTitle, submit } = props;
  return (
    <div className="row">
      <div className="col-10 offset-1 mb-1">
        <div className="card mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-center h2 text-primary">
              Add Questionnaire Title
            </h6>
          </div>
          <div className="card-body d-flex justify-content-between align-items-center">
            <div className="form-group row w-100 d-flex align-items-center mb-0">
              <label
                htmlFor="title"
                className="col-2 offset-2 d-flex justify-content-center align-items-center mb-0 text-lg text-primary"
              >
                Title
              </label>
              <input
                type="text"
                className="form-control form-control-lg col-4"
                id="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Insert here Questionnaire Title"
              />
              <div className="col-2 d-flex justify-content-center align-items-center">
                <Button
                  text={"Start"}
                  type={"primary"}
                  onClick={() => submit(true)}
                  disabled={!title}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireCreateAddTitle;
