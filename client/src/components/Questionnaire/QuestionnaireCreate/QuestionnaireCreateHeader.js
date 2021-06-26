import Button from "../../Button";

export const QuestionnaireCreateHeader = ({ ...props }) => {
  const { title, editTitle, addQuestion, numQuestions, submit } = props;
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
                {title} <Button
                  text={"Edit Title"}
                  type={"warning"}
                  onClick={editTitle}
                />
              </h6>
              <div className="pr-2">
                <Button
                  text={"Submit"}
                  type={"success"}
                  disabled={numQuestions===0}
                  onClick={submit}
                />
              </div>
            </div>
            {/*numQuestions>0 &&*/ <div className="card-body d-flex justify-content-start">
                <Button
                  text={"Add New Question"}
                  type={"primary"}
                  onClick={addQuestion}
                />
            </div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionnaireCreateHeader;
