/* eslint-disable react/prop-types */
/* eslint-disable object-curly-spacing */
import React from "react";
import { PageHeader } from "antd";
import styled from "styled-components";
import { useRouter } from "next/router";


const MyPageHeader = (props) => {

  const router = useRouter();

  const onBack = () => {
    router.back();
  };
  return <StyledPageHeader {...props} {...(props.isBack ? { onBack } : {})} />;
};

const StyledPageHeader = styled(PageHeader)`
  padding-top:0px;
  /* .ant-page-header-heading-extra {
    display:flex;
    align-items: center;
  } */
  svg {
    color: dark;
  }
`;

export default MyPageHeader;