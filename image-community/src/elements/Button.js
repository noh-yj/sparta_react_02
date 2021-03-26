import React from 'react';
import styled from 'styled-components';

function Button(props) {
  const { text, _onClick, is_float } = props;

  if (is_float) {
    return (
      <>
        <FLoatButton onClick={_onClick}>{text}</FLoatButton>
      </>
    );
  }

  return (
    <>
      <ElButton onClick={_onClick}>{text}</ElButton>
    </>
  );
}

Button.defaultProps = {
  text: 'text',
  _onClick: () => {},
  is_float: false,
};

const ElButton = styled.button`
  width: 100%;
  background-color: #212121;
  color: #fff;
  padding: 12px 0px;
  box-sizing: border-box;
  border: none;
`;
const FLoatButton = styled.button`
  width: 50px;
  height: 50px;
  background-color: #212121;
  color: #fff;
  box-sizing: border-box;
  font-size: 36px;
  font-weight: 800;
  position: fixed;
  bottom: 50px;
  right: 16px;
  text-align: center;
  vertical-align: middle;
  border: none;
  border-radius: 50px;
`;
export default Button;
