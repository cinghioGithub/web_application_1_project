export const ProgressBar = ({ ...props }) => {
  const { value, max, title } = props;
  const perc = (value / max) * 100;

  return (
    <>
        <h4 className="small font-weight-bold">
          {title} <span className="float-right">{Math.round(perc)}%</span>
        </h4>
        <div className="progress mb-2">
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: `${perc}%` }}
            aria-valuemax="100"
          ></div>
        </div>
    </>
  );
};

export default ProgressBar;
