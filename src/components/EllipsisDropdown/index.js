/* eslint-disable react/prop-types */
import React from "react";
import { Button, Dropdown, Menu } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const EllipsisDropdown = props => {
  return (
    <Dropdown overlay={props.menu} placement={props.placement} trigger={["click"]}>

      <Button shape="circle" size="large">
        <EllipsisOutlined />
      </Button>

    </Dropdown>
  );
};

EllipsisDropdown.propTypes = {
  trigger: PropTypes.string,
  placement: PropTypes.string
};

EllipsisDropdown.defaultProps = {
  trigger: "click",
  placement: "bottomRight",
  menu: <Menu />
};

export default EllipsisDropdown;
