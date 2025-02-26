import React, { useState } from 'react';
import { Container, Row, Col, Input, Button, Form, FormGroup, Label } from 'reactstrap';
import useAuthCustom from '../../hooks/useAuthCustom';
import { FaArrowRightToBracket } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

import './login.css'
const Login = () => {
    const { state, login, loading } = useAuthCustom();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const Navigate = useNavigate();
    console.log(state);
    const handleLogin = () => {
        const status = login(email, password);
        if (status) {
            Navigate("/product");
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <Row className="w-100 justify-content-center">
                <Col md={6} sm={12} className="p-4 bg-white">
                    <h2 className="mb-4 registerText">Login</h2>
                    <Form>
                        <FormGroup>
                            <div className='containerInput'>
                                <Label for="email">Email</Label>
                                <Input type="email" className='inputText' id="email" placeholder="Enter your email"
                                    value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <div className='containerInput'>
                                <Label for="password">Password</Label>
                                <Input type="password" className='inputText' id="password" placeholder="Enter your password"
                                    value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </FormGroup>

                        <Button className='buttonInput' color="primary" block onClick={handleLogin} disabled={loading}>
                            <FaArrowRightToBracket />
                            &nbsp;
                            {loading ? "Loading..." : "Login"}
                        </Button>
                        <p className='loginText text-center'>Henüz kayıt olmadın mı? <a href='/register'>Kayıt ol ! </a></p>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
