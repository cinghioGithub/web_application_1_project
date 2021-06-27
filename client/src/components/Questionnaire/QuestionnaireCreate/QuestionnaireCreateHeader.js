import Button from "../../Button";

export const QuestionnaireCreateHeader = ({ ...props }) => {
  const { title, numQuestions, submit, setTitle } = props;
  return (
    <>
      <div className="row">
        <div className="col-10 offset-1 mb-1">
          <div className="card mb-4">
            <div className={`card-header py-3 d-flex justify-content-between align-items-center ${numQuestions===0 ? 'create-questionnaire-empty-header': ''}`}>
              <div className="pl-2 ">
                <Button text={"Back"} type={"danger"} url={"/"} />
              </div>
              <h6 className="m-0 font-weight-bold text-center h2 text-primary">
                {title ? title : "No Title"}
              </h6>
              <div className="pr-2">
                <Button
                  text={"Submit"}
                  type={"success"}
                  disabled={numQuestions===0 || !title}
                  onClick={submit}
                />
              </div>
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
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionnaireCreateHeader;
