import Button from "../../Button";

export const QuestionnaireResultHeader = ({ ...props }) => {
  const { title, next, previous, username, pages } = props;
  return (
    <>
      <div className="row">
        <div className="col-10 offset-1 mb-1">
          <div className="card mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-center h2 text-primary">
                {title}
              </h6>
            </div>
            <div className="card-body row ">
              <div className="pl-4 col-2 d-flex justify-content-start">
                <Button text={"Previous"} type={"primary"} disabled={pages===1} onClick={previous} />
              </div>
              <h6 className="m-0 font-weight-bold text-primary text-lg col-8 d-flex justify-content-center align-items-center">
                Name: <span className="text-dark ml-1">{username}</span>
              </h6>
              <div className="pr-4 col-2 d-flex justify-content-end">
                <Button text={"Next"} type={"primary"} disabled={pages===1} onClick={next} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionnaireResultHeader;
