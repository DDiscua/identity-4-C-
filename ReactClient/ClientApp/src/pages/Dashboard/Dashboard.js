import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Table, Divider, Descriptions, notification, Button, Modal, Input } from "antd";
import { ListUsers, userSignOut, UpdateUser } from "../../store/actions/auth";

const openNotificationWithIcon = (type, description) => {
    notification[type]({
        message: 'IKA Test',
        description: description
    });
};
export class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            currentUser: null,
            showModal: false,
            columns: [{
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                render: text => <a>{text}</a>,
            },
            {
                title: 'Username',
                dataIndex: 'userName',
                key: 'userName',
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: 'Claims',
                dataIndex: 'claims',
                key: 'claims',
                render: (record) => (
                    <>
                        {
                            record && record.map(test => {
                                return (
                                    <>
                                        <span>Type: {test.type}, <label> Value: {test.value}</label></span>
                                        <br></br>
                                    </>
                                )

                            })
                        }
                    </>
                )
            }, {
                title: 'Actions',
                key: 'actions',
                render: (record) => (<Button type="link" onClick={() => this.selectCurrentUser(record)}>Edit</Button>)
            }],
            data: [],
            loading: true
        };

    }

    addNewClaim = () => {
        let { currentUser } = this.state;
        currentUser.claims.push({ type: "", value: "" });
        const newTemp = { ...currentUser };
        this.setState({
            currentUser: newTemp
        })
    }

    removeClaim = (index) => {
        let { currentUser } = this.state;
        currentUser.claims.splice(index, 1);
        const newTemp = { ...currentUser };
        this.setState({
            currentUser: newTemp
        })
    }

    saveClaims = () => {
        const { currentUser } = this.state;
        console.log(currentUser);
        if (!this.checkEmptyValues()) {
            this.props.UpdateUser(currentUser).then((res) => {
                if (res && res.code === 200) {
                    this.setState({
                        error: false,
                        errorMessage: res.message,
                        loading: false
                    }, () => {
                        openNotificationWithIcon('success', res.message);
                        this.onOpenModal(false);
                    });
                }
            }).catch((err) => {
                this.setState({
                    error: true,
                    errorMessage: err && err.message,
                    loading: false
                }, () => {
                    openNotificationWithIcon('error', err.message);
                })
            });
        } else {
            openNotificationWithIcon('warning', 'Warning empty values are not allowed');
        }
    }

    onOpenModal = (key) => {
        this.setState({
            showModal: key
        })
    }

    checkEmptyValues = () => {
        let isEmpty = false;
        const { currentUser } = this.state;
        if (currentUser && currentUser.claims) {
            currentUser.claims.map(item => {
                if (item.value === "" || item.type === "") {
                    isEmpty = true;
                }
            })
        }

        return isEmpty;
    }

    onChangeUserClaim = (index, key, e) => {
        console.log(index, key, e.target.value);
        let { currentUser } = this.state;
        currentUser.claims[index][key] = e.target.value;
        const newTemp = { ...currentUser }
        this.setState({
            currentUser: newTemp
        })
    }

    selectCurrentUser = (record) => {
        let newRecord = record;
        if (newRecord.claims && newRecord.claims.length === 0) {
            newRecord.claims.push({
                type: "",
                value: ""
            })
        }
        this.setState({
            currentUser: newRecord
        }, () => {
            this.onOpenModal(true)
        })
    }

    componentDidMount() {
        this.getUsers();
    }


    getUsers = () => {
        this.props.ListUsers().then((res) => {
            if (res && res.code === 200) {
                this.setState({
                    error: false,
                    errorMessage: res.message,
                    data: res.payload,
                    loading: false
                }, () => {
                    openNotificationWithIcon('info', res.message);
                });
            }
        }).catch((err) => {
            this.setState({
                error: true,
                errorMessage: err && err.message,
                loading: false
            }, () => {
                openNotificationWithIcon('error', err.message);
            })
        });

    }

    reloadUsers = () => {
        this.setState({
            loading: true
        }, () => {
            this.getUsers();
        })
    }


    render() {
        const { authUser } = this.props;
        const { currentUser } = this.state;
        console.log(authUser);

        return (
            <Row type="flex" justify="center" align={"middle"}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <h1 className="gx-dark-state-blue">DASHBOARD</h1>
                    <Divider />
                    <Descriptions title="" layout="vertical" size="small" colon="" style={{ color: '#239B76' }}>
                        <Descriptions.Item label={"Name"}>{authUser && authUser.userName}</Descriptions.Item>
                        <Descriptions.Item label={"Claims"}>
                            {
                                authUser && authUser.claims.map(test => {
                                    return (
                                        <>
                                            <span>Type: {test.type}, <label> Value: {test.value}</label></span>
                                            <br></br>
                                        </>
                                    )

                                })
                            }
                        </Descriptions.Item>
                    </Descriptions>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ textAlign: "right" }}>
                    <Button type="link" onClick={() => this.reloadUsers()}>Refresh</Button>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Table
                        columns={this.state.columns}
                        dataSource={this.state.data}
                        loading={this.state.loading}
                        bordered
                        title={() => 'User List'}
                        footer={() => <span>Total: {this.state.data && this.state.data.length}</span>}
                    />,
                </Col>
                <Modal
                    title={"Edit Claims for: " + (currentUser && currentUser.userName)}
                    visible={this.state.showModal}
                    onOk={this.saveClaims}
                    onCancel={() => this.onOpenModal(false)}
                >


                    {
                        currentUser && currentUser.claims && currentUser.claims.map((item, index) => {
                            return (
                                <Row type="flex" justify="center" align={"middle"} key={"row_" + index}>
                                    <Col xs={24} sm={24} md={8} lg={7} xl={7}>
                                        {"Type"}
                                        <Input type="text" onChange={(value) => this.onChangeUserClaim(index, "type", value)} value={item.type}></Input>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={7} xl={7}>
                                        {"Value"}
                                        <Input type="text" onChange={(value) => this.onChangeUserClaim(index, "value", value)} value={item.value}></Input>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        {"Actions"}
                                        <br></br>
                                        <Button type="link" onClick={() => this.addNewClaim()}>Add</Button>
                                        <Button type="link" onClick={() => this.removeClaim(index)} style={{ color: 'red' }}>Remove</Button>
                                    </Col>

                                </Row>
                            )
                        })
                    }


                </Modal>
            </Row >
        )
    }
}

const mapStateToProps = ({ auth }) => {
    const { authUser } = auth;
    return { authUser }
};
export default connect(mapStateToProps, { ListUsers, userSignOut, UpdateUser })(Dashboard);

