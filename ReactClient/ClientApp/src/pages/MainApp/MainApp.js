import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import { connect } from "react-redux";
import { Link, Route, Switch } from "react-router-dom";
import { push } from 'connected-react-router';
import Dashboard from "../Dashboard/Dashboard";
import { userSignOut } from "../../store/actions/auth";
const { Content, Footer, Sider, Header } = Layout;
const footerText = 'IKA Test @2020';

export class MainApp extends Component {

    constructor() {
        super();
        this.state = {};

    }

    changeRoute = (route) => {
        console.log(route)
        this.props.changeRoute(route);
    }

    logout = () => {
        console.log('TO Logout');
        this.props.userSignOut();
    }

    render() {
        console.log(this.props);
        return (
            <Layout>
                <Header className="header">
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px' }}
                    >

                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Layout style={{ padding: '24px 0', background: '#fff' }}>
                        <Sider width={200} style={{ background: '#fff' }}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%' }}
                            >
                                <Menu.Item key="1" >
                                    <span >
                                        <Icon type="home" />
                                        <span>Dashboard</span>
                                    </span>
                                </Menu.Item>
                                <Menu.Item key="2">
                                    <span onClick={() => this.logout()}>
                                        <Icon type="user" />
                                        <span>Logout</span>
                                    </span>
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        <Content style={{ padding: '0 24px', minHeight: 680 }}>
                            <Dashboard></Dashboard>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    <div className="gx-layout-footer-content">
                        {footerText}
                    </div>
                </Footer>
            </Layout>
        )
    }
}

const mapStateToProps = ({ auth }) => {
    const { authUser } = auth;
    return { authUser }
};




export default connect(mapStateToProps, { userSignOut })(MainApp);

