import React, { useState } from 'react';
import { Container, Row, Col, Input, Button, Form, FormGroup, Label } from 'reactstrap';
import useAuthCustom from '../hooks/useAuthCustom';

const Login = () => {
    const { state, login, loading } = useAuthCustom();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    console.log(state);
    const handleLogin = () => {
        login(email, password);
    };

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <Row className="w-100 justify-content-center">
                <Col md={6} sm={12} className="p-4 bg-white">
                    <h2 className="mb-4 text-center">Login</h2>
                    <Form>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" id="email" placeholder="Enter your email"
                                value={email} onChange={(e) => setEmail(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" id="password" placeholder="Enter your password"
                                value={password} onChange={(e) => setPassword(e.target.value)} />
                        </FormGroup>
                        <Button color="primary" block onClick={handleLogin} disabled={loading}>
                            {loading ? "Loading..." : "Login"}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
