import React from 'react';
import { Container, Row, Col, Input, Button, Form, FormGroup, Label } from 'reactstrap';
import useAuthCustom from '../hooks/useAuthCustom';

const Login = () => {
    const { state } = useAuthCustom();
    console.log(state.isAuthenticated);
    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <Row className="w-100 justify-content-center">
                <Col md={6} sm={12} className="p-4 bg-white">
                    <h2 className="mb-4 text-center">Login</h2>
                    <Form>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" id="email" placeholder="Enter your email" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" id="password" placeholder="Enter your password" />
                        </FormGroup>
                        <Button color="primary" block>Login</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
