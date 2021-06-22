import { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import Logo from "../../img/logo.png";
import API from "../../API";

export function Login({ ...props }) {
  const { login, setRefreshAdmin } = props;
  const [email, setEmail] = useState("admin1@test.it");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    const credentials = { username: email, password: password };
    try {
      console.log("TRYING LOGIN CLIENT");
      const user = await API.logIn(credentials);
      login(user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main>
      <Container fluid className="login text-center">
        <Form className="form-signin" onSubmit={(event) => submit(event)}>
          <img className="mb-4" src={Logo} alt="" width="144" height="144" />
          <h1 className="h3 mb-3 font-weight-normal">Welcome, sign in</h1>
          {error && <Alert variant={"danger"}>{error}</Alert>}
          <Form.Group>
            <Form.Label className="sr-only">Email address</Form.Label>
            <Form.Control
              size="lg"
              id="inputEmail"
              type="email"
              placeholder="Email address"
              autoFocus={true}
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Form.Label className="sr-only">Password</Form.Label>
            <Form.Control
              size="lg"
              id="inputPassword"
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>
          <Button
            variant="success"
            size="lg"
            className="btn-block"
            type="submit"
          >
            Sign in
          </Button>
        </Form>
        {/*<Row className="justify-content-center align-items-center mìvh-100">
            <Col lg={4} md={8} xs={10}>
              <Card>
                <Card.Header as="h1">
                  <div className="w-100 text-center">Welcome</div>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" />
                      <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
  </Row>*/}
      </Container>
    </main>
  );
}

export default Login;
