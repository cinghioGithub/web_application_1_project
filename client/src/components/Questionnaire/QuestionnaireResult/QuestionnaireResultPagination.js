import Button from "../../Button";
import Pagination from "react-bootstrap/Pagination";

export const QuestionnaireResultPagination = ({ ...props }) => {
  const { pages, current, next, previous, select } = props;
  let pagination = [...Array(pages)].map((page, i) => {
    return (
      <Pagination.Item
        key={i}
        active={i + 1 === current}
        onClick={() => select(i + 1)}
        disabled={pages===1}
      >
        {i + 1}
      </Pagination.Item>
    );
  });
  return (
    <div className="col-10 offset-1 mb-1">
      <div className="card mb-4 py-3 ">
        <div className="d-flex justify-content-between align-items-center">
          <div className="pl-4">
            <Button text={"Previous"} type={"primary"} disabled={pages===1} onClick={previous} />
          </div>
          <Pagination className="m-0">{pagination}</Pagination>
          <div className="pr-4">
            <Button text={"Next"} type={"primary"} disabled={pages===1} onClick={next} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireResultPagination;
