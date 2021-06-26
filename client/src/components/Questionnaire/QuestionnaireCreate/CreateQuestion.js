import {
  Modal,
  Form,
  Col,
  Alert,
  Spinner,
  Button as ButtonBootstrap,
} from "react-bootstrap";
import Button from "../../Button";
import { useState } from "react";

export function CreateQuestion({ ...props }) {
  const { onHide, show, newQuestionId, handleSetQuestion } = props;
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  /* Form inputs Handler */
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(true);
  const [required, setRequired] = useState(false);
  const [options, setOptions] = useState([]);
  const [optionTitle, setOptionTitle] = useState("");
  const [optionMin, setOptionMin] = useState(0);
  const [optionMax, setOptionMax] = useState(1);
  const [invalidMax, setInvalidMax] = useState(false);

  const removeOption = (id) => {
    let tmpOptions = [...options]
      .filter((option) => option.id !== id)
      .map((option) => {
        if (option.id > id) {
          return { id: option.id - 1, value: option.value };
        } else {
          return option;
        }
      });
    setOptions(tmpOptions);
  };
  const handleOpen = () => {
    setOpen((open) => (open = !open));
  };
  const handleRequired = () => {
    setRequired((required) => (required = !required));
  };

  const hide = () => {
    onHide();
    setTimeout(() => {
      resetQuestion();
    }, 1000);
  };

  const addOption = () => {
    let tmpOptions = [...options];
    tmpOptions.push({ id: options.length + 1, value: optionTitle });
    setOptions(tmpOptions);
    setOptionTitle("");
    setInvalidMax(false);
  };

  const checkMaxValidity = () => {
    if (options.length < optionMax) {
      setInvalidMax(true);
      return false;
    } else {
      setInvalidMax(false);
      return true;
    }
  };

  const checkMinValidity = () => {
    if (optionMin > optionMax) {
      return false;
    } else {
      return true;
    }
  };

  const displayOptions = [...options].map((option, index) => (
    <Form.Row key={index} className="d-flex justify-content-between px-2">
      <Form.Group className="d-flex align-items-center">
        <Form.Check
          custom
          disabled
          type="checkbox"
          id={`formOption${option.id}`}
          label={option.value}
        />
      </Form.Group>
      <Form.Group className="d-flex align-items-center">
        <Button
          text={"Delete"}
          type={"danger"}
          onClick={() => removeOption(option.id)}
        />
      </Form.Group>
    </Form.Row>
  ));

  const submitQuestion = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    setError();
    if ((!checkMaxValidity() || !checkMinValidity()) && !open) return;
    if (form.checkValidity() === true) {
      setLoading(true);
      let newQuestion;
      if (open) {
        newQuestion = {
          id: newQuestionId,
          open: open,
          title: title,
          required: required,
        };
      } else {
        newQuestion = {
          id: newQuestionId,
          open: open,
          title: title,
          min: parseInt(optionMin),
          max: parseInt(optionMax),
          options: options,
        };
      }
      handleSetQuestion(newQuestion);
      setLoading(false);
      hide();
    } else {
      setValidated(true);
    }
  };

  const resetQuestion = () => {
    setTitle("");
    setOpen(true);
    setRequired(false);
    setOptions([]);
    setOptionTitle("");
    setOptionMin(0);
    setOptionMax(1);
    setError();
    setValidated(false);
    setInvalidMax(false);
  };

  return (
    <Modal
      onHide={hide}
      show={show}
      size="md"
      aria-labelledby="add-question"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="add-quesion" className="text-primary bold">
          Add Question
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          noValidate
          validated={validated}
          onSubmit={(event) => submitQuestion(event)}
        >
          <Form.Group>
            <Form.Label>
              Title <span className="text-danger">*Required</span>
            </Form.Label>
            <Form.Control
              required
              type="text"
              value={title}
              placeholder="Question Title"
              onChange={(event) => setTitle(event.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please fill with a valid Title.
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Insert here your Question Title
            </Form.Text>
          </Form.Group>
          {open ? (
            <Form.Row>
              <Form.Group
                as={Col}
                md="6"
                className="d-flex align-items-center justify-content-center">
                <Form.Check
                  custom
                  type="checkbox"
                  id="formOpen"
                  label="Open Question"
                  onChange={handleOpen}
                  checked={open}/>
              </Form.Group>
              <Form.Group
                as={Col}
                md="6"
                className="d-flex align-items-center justify-content-center">
                <Form.Check
                  custom
                  type="checkbox"
                  id="formRequired"
                  label="Mandatory"
                  onChange={handleRequired}
                  checked={required}/>
              </Form.Group>
            </Form.Row>
          ) : (
            <>
              <Form.Row>
                <Form.Group
                  as={Col}
                  md="4"
                  className="d-flex align-items-center justify-content-center">
                  <Form.Check
                    custom
                    type="checkbox"
                    id="formOpen"
                    label="Open Question"
                    onChange={handleOpen}
                    checked={open}/>
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="4"
                  className="d-flex align-items-center justify-content-center">
                  <Form.Label className="mr-2 mb-0">Min</Form.Label>
                  <Form.Control
                    className="mr-2"
                    required
                    min={0}
                    max={10}
                    isInvalid={optionMin > optionMax}
                    type="number"
                    value={optionMin}
                    onChange={(event) => setOptionMin(event.target.value)}/>
                  <Form.Control.Feedback tooltip type="invalid">
                    Min can't be greater than Max
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="4"
                  className="d-flex align-items-center justify-content-center">
                  <Form.Label className="mr-2 mb-0">Max</Form.Label>
                  <Form.Control
                    required
                    min={1}
                    max={10}
                    isInvalid={invalidMax}
                    type="number"
                    value={optionMax}
                    onChange={(event) => setOptionMax(event.target.value)}/>
                  <Form.Control.Feedback tooltip type="invalid">
                    Max is greater than options available
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              {options.length !== 0 && (
                <>
                  <hr className="mt-0" />
                  {displayOptions}
                </>
              )}
              {!(options.length === 10) && (
                <>
                  <hr className="mt-0" />
                  <Form.Row className="d-flex align-items-center justify-content-between px-2">
                    <Form.Group className="d-flex align-items-center flex-grow-1 mr-3">
                      <Form.Control
                        type="text"
                        value={optionTitle}
                        onChange={(event) => setOptionTitle(event.target.value)}
                        placeholder="Option here"/>
                    </Form.Group>
                    <Form.Group className="d-flex align-items-center">
                      <Button
                        text={"Add Option"}
                        type={"warning"}
                        onClick={addOption}
                        disabled={!optionTitle}/>
                    </Form.Group>
                  </Form.Row>
                </>
              )}
            </>
          )}
          <Form.Row
            className={"d-flex justify-content-center align-items-center"}
          >
            {error && <Alert variant={"warning"}>{error}</Alert>}
          </Form.Row>
          <Modal.Footer>
            <Form.Group>
              <ButtonBootstrap
                className="d-flex align-items-center"
                variant="danger"
                type="button"
                onClick={() => resetQuestion()}
                disabled={loading}>
                Reset
              </ButtonBootstrap>
            </Form.Group>
            <Form.Group>
              <ButtonBootstrap
                className="d-flex align-items-center"
                variant="success"
                type="submit"
                disabled={loading || !title || (!open && options.length === 0)}>
                {loading && <Spinner animation="border" size="sm" />}
                Save Question
              </ButtonBootstrap>
            </Form.Group>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CreateQuestion;
