import Button from "../../Button";
import { useState } from 'react'

export const QuestionnaireCompileName = ({ ...props }) => {
  const { setUsername, submit} = props;
  const [user, setUser] = useState("");

  const handleOnChange = (event) => {
    setUser(event.target.value);
    setUsername(event.target.value);
  };

  return (
    <div className="row">
      <div className="col-10 offset-1 mb-1">
        <div className="card mb-4 py-3 ">
          <div className="d-flex justify-content-between align-items-center">
            <div className="form-group row w-100 d-flex align-items-center mb-0">
              <label
                htmlFor="username"
                className="col-2 offset-2 d-flex justify-content-center align-items-center mb-0 text-lg text-primary"
              >
               Name
              </label>
              <input
                type="text"
                className="form-control form-control-lg col-4"
                id="username"
                value={user}
                onChange={(event) => handleOnChange(event)}
                placeholder="Insert here your Name"
              />
              <div className="col-2 d-flex justify-content-center align-items-center">
                <Button
                  text={"Submit"}
                  type={"success"}
                  disabled={!user}
                  onClick={submit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireCompileName;
