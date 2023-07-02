import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';



const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
  }

  return (
    <div>
      <Form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} 
            value={email}  />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} 
            value={password} />
      </Form.Group>

      <Button variant="primary" disabled={isLoading} type="submit">
        Submit
      </Button>

          {error && <div className="error">{error}</div>}
      </Form>
    </div>
  )
}

export default Login