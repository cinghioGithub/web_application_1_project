import { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import Logo from "./../img/logo.png";
import API from "../API";

export function Login({ ...props }) {
  const { login, setLoadingMyQuestionnaire} = props;
  const [email, setEmail] = useState("admin1@test.it");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    const credentials = { username: email, password: password };
    try {
      const user = await API.logIn(credentials);
      setLoadingMyQuestionnaire(true);
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
            onClick={() => setLoading(true)}
            disabled={loading}
          > {loading && <Spinner animation="border" size="sm" />}Sign in
          </Button>
        </Form>
      </Container>
    </main>
  );
}

export default Login;
