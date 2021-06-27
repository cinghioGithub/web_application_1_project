import Button from "../../Button";

export const QuestionnaireCompileHeader = ({ ...props }) => {
  const { title } = props;
  return (
    <div className="row">
      <div className="col-10 offset-1 mb-1">
        <div className="card mb-4">
          <div className="card-body py-3 d-flex align-item-center">
          <div className="align-self-start col-2">
              <Button text={"Back"} type={"danger"} url={"/"} />
            </div>
            <h6 className="align-self-center col-8 m-0 font-weight-bold text-center h2 text-primary">
              {title}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireCompileHeader;
