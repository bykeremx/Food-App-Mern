import React from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import useAuthCustom from '../../hooks/useAuthCustom';
import './register.css';
const Register = () => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const { state, login, loading, register } = useAuthCustom();
    const handleRegister = () => {
        // Registration logic here
        register(name, email, password);
    };

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <Row className="w-100 justify-content-center">
                <Col md={6} sm={12} className="p-4 bg-white">
                    <h2 className="mb-4" style={{fontWeight:'bold'}}>Register</h2>
                    <Form>
                        <FormGroup>
                            <div className='containerInput'>
                                <Label for="name">Name</Label>
                                <Input type="text"  className='inputText' id="name" placeholder="Enter your name"
                                    value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                        </FormGroup>
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
                                <Input type="password" className='inputText'  id="password" placeholder="Enter your password"
                                    value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </FormGroup>
                        {/* <FormGroup>
                            <Label for="confirmPassword">Confirm Password</Label>
                            <Input type="password" id="confirmPassword" placeholder="Confirm your password"
                                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </FormGroup> */}
                        <Button className='buttonInput' color="primary" block onClick={handleRegister} disabled={loading}>
                            {loading ? "Loading..." : "Register"}
                        </Button>
                        <p className="mt-3 loginText">Zaten üye misin? <a href="/login">Giriş yap ! </a></p>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
