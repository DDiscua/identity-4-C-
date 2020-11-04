import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from '../../components/Spinner/Spinner';
import { Button, Form, Input, Row, Col, Divider, notification } from 'antd';
import { userLogin } from '../../store/actions/auth';
import { history } from "../../store/configureStore";
import './index.css'
import { push } from "connected-react-router";
const FormItem = Form.Item;

const hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const openNotificationWithIcon = (type, description) => {
    notification[type]({
        message: 'IKA Test',
        description: description
    });
};

export class SignIn extends Component {

    constructor() {
        super();
        this.state = {
            error: false,
            errorMessage: ''
        }

    }

    GotToRegister = () => {
        this.props.history.push('/register');
    }

    handleSubmit = e => {
        this.setState({
            error: false
        })
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.userLogin(values).then((res) => {
                    if (res && res.code === 200) {
                        openNotificationWithIcon('success', res.message);
                        this.props.history.push('/dashboard/main');
                    }
                }).catch((err) => {
                    console.log(err);
                    this.setState({
                        error: true,
                        errorMessage: err && err.message
                    }, () => {
                        openNotificationWithIcon('error', err && err.message);
                    })
                });
            }
        });
    };



    render() {
        const { getFieldDecorator, getFieldsError } = this.props.form;
        console.log(this.props);
        return (
            <div className='login-container'>
                <Row type="flex" justify="center" align={"middle"}>
                    <Col xs={20} sm={20} md={8} lg={8} xl={8}>
                        <Row type="flex" justify="center" align={"middle"}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <h1 className="gx-dark-state-blue">IKA<strong>Test</strong></h1>
                                <Divider />
                                <h2 style={{ textAlign: 'center' }}>Login</h2>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ color: 'red' }} >
                                {this.state.error ? this.state.errorMessage : null}
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ color: 'red' }} >
                                <Form onSubmit={this.handleSubmit} className='' size={'large'} className="login-form">
                                    {
                                        this.props.loading
                                            ?
                                            <Row type="flex" justify="center" align="middle">
                                                <Spinner
                                                    type="MutatingDots"
                                                    color="#239B76"
                                                    height={100}
                                                    width={100}
                                                />
                                            </Row>
                                            :
                                            <Row>
                                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                    <FormItem label={'Username'}>
                                                        {
                                                            getFieldDecorator('username', {
                                                                initialValue: '',
                                                                rules: [{
                                                                    required: true, message: 'Username is required'
                                                                },],
                                                            })(<Input placeholder='Enter your username' />)
                                                        }
                                                    </FormItem>
                                                </Col>
                                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                    <FormItem label={'Password'}>
                                                        {
                                                            getFieldDecorator('password', {
                                                                initialValue: '',
                                                                rules: [{ required: true, message: 'Password is required' },
                                                                ],
                                                            })(
                                                                <Input type='password' placeholder='Enter a password' />
                                                            )
                                                        }

                                                    </FormItem>
                                                </Col>
                                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                    <FormItem>
                                                        <Button type='primary' disabled={hasErrors(getFieldsError())} className='gx-mb-0' htmlType='submit'>
                                                            Login
                                    </Button>
                                                    </FormItem>
                                                </Col>

                                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                    <FormItem>
                                                        <Button type='primary' type="link" className='gx-mb-0' onClick={() => this.GotToRegister()}>
                                                            Sign Up
                                                        </Button>
                                                    </FormItem>
                                                </Col>
                                            </Row>
                                    }
                                </Form>
                            </Col>
                        </Row>

                    </Col>
                </Row>

            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(SignIn);

const mapStateToProps = ({ auth }) => {
    const { authUser } = auth;
    return { authUser }
};
export default connect(mapStateToProps, { userLogin })(WrappedNormalLoginForm);

