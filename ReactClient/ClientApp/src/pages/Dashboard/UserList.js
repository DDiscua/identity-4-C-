import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Table, Divider } from "antd";



export class UserList extends Component {

    constructor() {
        super();
        this.state = {
            columns:[

            ]
        };

    }

    


    render() {
        const { authUser } = this.props;
        return (
            <Row type="flex" justify="center" align={"middle"}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <h1 className="gx-dark-state-blue">Users</h1>
                    <Divider />
                </Col>
            </Row>
        )
    }
}

const mapStateToProps = ({ auth }) => {
    const { authUser } = auth;
    return { authUser }
};
export default connect(mapStateToProps)(UserList);

