import React from 'react';
import Loader from 'react-loader-spinner';
import { Spin } from 'antd';
import styled from 'styled-components';


const CustomIndicator = (props) =>
    <Loader
        {...props}
    />

const StyledSpin = styled(Spin)`
    .ant-spin-text {
        top: 75% !important;
        right: 0; 
        width: 91% !important; //?
    }
`;

const Spinner = (props) =>
    <StyledSpin
        spinning={props.isLoading}
        size={props.size}
        indicator={<CustomIndicator {...props} />}
        tip={props.message && props.message !== '' ? props.message : 'Loading...'}
    >
        {props.children}
    </StyledSpin>

export default Spinner;