import Button from "../../Button";

export const QuestionnaireCreateQuestion = ({ ...props }) => {
  const { question, moveUp, moveDown, numQuestions, remove } = props;

  return (
    <div className="col-10 offset-1 mb-4">
      <div className="card h-100">
        <div className="card-header py-3 d-flex justify-content-between">
          <div className="d-flex justify-content-center align-items-center">
            <h6 className="m-0 font-weight-bold text-primary text-lg">
              {question.title}
            </h6>
            <h6 className="m-0 font-weight-bold text-danger text-sm ml-3">
              {question.open
                ? question.required && "Required"
                : `Min: ${question.min} - Max: ${question.max}`}
            </h6>
          </div>
        </div>
        <div className="card-body">
          {question.open ? (
            <>
              <div className="form-group">
                <textarea
                  className="form-control"
                  id={question.id}
                  rows="6"
                  maxLength={200}
                  disabled={true}
                  placeholder="Insert here the answer"
                ></textarea>
              </div>
            </>
          ) : (
            <div className="option-grid">
              {question.options.map((option) => {
                return question.max === 1 ? (
                  <div
                    key={option.id}
                    className="custom-control custom-radio mb-3 ml-3"
                  >
                    <input
                      type="radio"
                      id={option.id}
                      name="customRadioInline"
                      disabled={true}
                      className="custom-control-input"
                    />
                    <label className="custom-control-label" htmlFor={option.id}>
                      {option.value}
                    </label>
                  </div>
                ) : (
                  <div
                    key={option.id}
                    className="custom-control custom-checkbox mb-3 ml-3"
                  >
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      disabled={true}
                      id={option.id}
                    />
                    <label className="custom-control-label" htmlFor={option.id}>
                      {option.value}
                    </label>
                  </div>
                );
              })}
            </div>
          )}
          <div className="pr-2 d-flex justify-content-center align-items-center">
            <Button
              text={"Delete"}
              type={"danger"}
              onClick={() => remove(question.id)}
            />
            <Button
              text={"Move Up"}
              type={"primary"}
              disabled={question.id === 1}
              onClick={() => moveUp(question.id)}
            />
            <Button
              text={"Move Down"}
              type={"primary"}
              disabled={question.id >= numQuestions}
              onClick={() => moveDown(question.id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireCreateQuestion;
