import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Table, Divider, Descriptions, notification } from "antd";
import { ListUsers, userSignOut } from "../../store/actions/auth";

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
            }],
            data: [],
            loading: true
        };

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


    render() {
        const { authUser } = this.props;
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
            </Row>
        )
    }
}

const mapStateToProps = ({ auth }) => {
    const { authUser } = auth;
    return { authUser }
};
export default connect(mapStateToProps, { ListUsers, userSignOut })(Dashboard);

