import { Modal, Form, Button as ButtonBootstrap } from "react-bootstrap";
import { useState, useEffect } from "react";

export function EditTitle({ ...props }) {
  const { onHide, show, title, setTitle } = props;
  const [validated, setValidated] = useState(false);

  /* Form inputs Handler */
  const [editTitle, setEditTitle] = useState("");

  const submit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === true) {
      setTitle(editTitle);
      onHide();
    } else {
      setValidated(true);
    }
  };

  useEffect(() => {
    setEditTitle(title);
  }, [title]);

  return (
    <Modal
      onHide={onHide}
      show={show}
      size="md"
      aria-labelledby="add-question"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="add-quesion" className="text-primary">Edit Questionnaire Title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          noValidate
          validated={validated}
          onSubmit={(event) => submit(event)}
        >
          <Form.Group>
            <Form.Label>
              Title <span className="text-danger">*Required</span>
            </Form.Label>
            <Form.Control
              required
              type="text"
              value={editTitle}
              placeholder="Question Title"
              onChange={(event) => setEditTitle(event.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please fill with a valid Title.
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Insert here your Questionnaire Title
            </Form.Text>
          </Form.Group>
          <Modal.Footer>
            <Form.Group>
              <ButtonBootstrap
                className="d-flex align-items-center"
                variant="success"
                type="submit"
                disabled={!editTitle}
              >
                Save
              </ButtonBootstrap>
            </Form.Group>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditTitle;
