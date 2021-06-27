export const QuestionnaireCompileQuestion = ({ ...props }) => {
  const {
    question,
    answer,
    setAnswer,
    selection,
    setSelection,
    options,
    handleSetOption,
    valid
  } = props;

  return (
    <div className="col-10 offset-1 mb-4">
      <div className="card h-100">
        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-start">
          <h6 className="m-0 font-weight-bold text-primary text-lg">
            {question.title}
          </h6>
          <h6 className="m-0 font-weight-bold text-danger text-sm ml-3">
            {question.open
              ? question.required && "Required"
              : `Min: ${question.min} - Max: ${question.max}`}
          </h6>
        </div>
        <div className="card-body">
          {question.open ? (
            <>
              <div className="form-group">
                <textarea
                  className={`form-control ${valid ? '' : 'is-invalid'}`}
                  id={question.id}
                  rows="6"
                  value={answer}
                  maxLength={200}
                  onChange={(event) => setAnswer(event.target.value)}
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
                      checked={selection === option.id}
                      onChange={() => setSelection(option.id)}
                      className={`custom-control-input ${valid ? '' : 'is-invalid'}`}
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
                      className={`custom-control-input ${valid ? '' : 'is-invalid'}`}
                      checked={options[option.id - 1] === true}
                      onChange={() => handleSetOption(option.id - 1)}
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
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireCompileQuestion;
