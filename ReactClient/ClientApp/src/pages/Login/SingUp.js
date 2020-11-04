import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from '../../components/Spinner/Spinner';
import { Button, Form, Input, Row, Col, Divider, notification } from 'antd';
import { Register } from '../../store/actions/auth';
import './index.css'
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

export class SignUp extends Component {

    constructor() {
        super();
        this.state = {
            error: false,
            errorMessage: ''
        }

    }

    GotToLogin = () => {
        this.props.history.push('/');
    }

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    handleSubmit = e => {
        this.setState({
            error: false
        })
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.Register(values).then((res) => {
                    if (res && res.code === 200) {
                        this.setState({
                            error: false,
                            errorMessage: res.message
                        }, () => {
                            openNotificationWithIcon('success', res.message);
                            this.GotToLogin();
                        });
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
                                <h2 style={{ textAlign: 'center' }}>Sign Up</h2>
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
                                                    <FormItem label={'Email'}>
                                                        {
                                                            getFieldDecorator('email', {
                                                                initialValue: '',
                                                                rules: [{
                                                                    required: true, message: 'Email is required'
                                                                }, {
                                                                    type: 'email',
                                                                    message: 'Enter a valid E-email'
                                                                }],
                                                            })(<Input placeholder='Enter your Email' />)
                                                        }
                                                    </FormItem>
                                                </Col>
                                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                    <FormItem label={'Phone Number'}>
                                                        {
                                                            getFieldDecorator('phoneNumber', {
                                                                initialValue: '',
                                                                rules: [{
                                                                    required: true, message: 'Email is required'
                                                                }, {
                                                                    type: 'string',
                                                                    message: 'Enter a valid number'
                                                                }],
                                                            })(<Input placeholder='Enter your Phone number' type="number" />)
                                                        }
                                                    </FormItem>
                                                </Col>
                                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                    <FormItem label={'Password'}>
                                                        {
                                                            getFieldDecorator('password', {
                                                                initialValue: '',
                                                                rules: [{ required: true, message: 'Password is required' },
                                                                {
                                                                    validator: this.validateToNextPassword,
                                                                },
                                                                ],
                                                            })(
                                                                <Input type='password' placeholder='Enter a password' />
                                                            )
                                                        }

                                                    </FormItem>
                                                </Col>
                                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                    <FormItem label={'Confirm Password'}>
                                                        {
                                                            getFieldDecorator('confirmPassword', {
                                                                initialValue: '',
                                                                rules: [{ required: true, message: 'Confirm password is required' },
                                                                {
                                                                    validator: this.compareToFirstPassword,
                                                                },
                                                                ],
                                                            })(
                                                                <Input type='password' placeholder='Confirm the password' />
                                                            )
                                                        }

                                                    </FormItem>
                                                </Col>
                                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                    <FormItem>
                                                        <Button type='primary' disabled={hasErrors(getFieldsError())} className='gx-mb-0' htmlType='submit'>
                                                            Sign Up
                                    </Button>
                                                    </FormItem>
                                                </Col>
                                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                    <FormItem>
                                                        <Button type='primary' type="link" className='gx-mb-0' onClick={() => this.GotToLogin()}>
                                                            Login
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

const WrappedNormalSignUpForm = Form.create()(SignUp);

const mapStateToProps = ({ auth }) => {
    const { authUser } = auth;
    return { authUser }
};
export default connect(mapStateToProps, { Register })(WrappedNormalSignUpForm);

