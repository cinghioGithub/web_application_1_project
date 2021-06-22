import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";

export const Button = ({ ...props }) => {
  const { text, type, disabled, onClick, url, loading } = props;
  return url ? (
    <Link to={url}>
      <button className={`btn btn-${type} mx-1`} disabled={disabled}>
        <span className="text">{text}</span>
      </button>
    </Link>
  ) : (
    <button
      type="button"
      className={`btn btn-${type} mx-1`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && <Spinner animation="border" size="sm" />}<span className="text">{text}</span>
    </button>
  );
};

export default Button;
