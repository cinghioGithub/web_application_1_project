import { Button } from "../Various/Button";

export const QuestionnaireCard = ({ ...props }) => {
  const { questionnaire, isAdmin, remove, loadingID } = props;
  
  /*className={`card border-bottom-${
          isAdmin ? "success" : "primary"
        } h-100 py-0`}*/
  
  return (
    <div className="col-xl-4 col-md-6 mb-4">
      <div
        className={`card h-100 py-0`}
      >
        <div className="card-body d-flex flex-lg-column justify-content-between">
          <div className="row no-gutters d-flex align-items-center justify-content-center mb-3">
            <div
              className={`h4 mb-0 font-weight-bold text-${
                isAdmin ? "dark" : "dark"
              } text-uppercase d-flex align-items-center`}
            >
              {questionnaire.title}
            </div>
          </div>
          <div
            className={`row no-gutters d-flex align-items-center ${
              isAdmin ? "justify-content-between" : "justify-content-center"
            }`}
          >
            {isAdmin && (
              <>
                <div className="mr-2">
                  <div
                    className={`text-xs font-weight-bold text-${
                      isAdmin ? "success" : "primary"
                    } text-uppercase mb-1 text-center`}
                  >
                    Compiled
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800 text-center">
                    {questionnaire.compiled}
                  </div>
                </div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">
                  <Button type={"danger"} text={"Delete"} onClick={() => remove(questionnaire.id)} loading={loadingID === questionnaire.id} />
                </div>
              </>
            )}
            <div className="h5 mb-0 font-weight-bold text-gray-800">
              <Button
                type={"primary"}
                text={isAdmin ? "Results" : "Compile"}
                url={`${isAdmin ? "/results/" : "/compile/"}${questionnaire.id}`}
                disabled={isAdmin && !questionnaire.compiled}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireCard;
