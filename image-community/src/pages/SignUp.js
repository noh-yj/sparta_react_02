import React, { useState } from 'react';
import { Grid, Text, Input, Button } from '../elements';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

function SignUp(props) {
  const dispatch = useDispatch();
  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwd_check, setPwdCheck] = useState('');
  const [user_name, setUsername] = useState('');
  const sighup = () => {
    if (id === '' || pwd === '' || user_name === '') {
      return;
    }

    if (pwd !== pwd_check) {
      return;
    }

    dispatch(userActions.signupFB(id, pwd, user_name));
  };
  return (
    <>
      <Grid padding='16px'>
        <Text size='32px' bold>
          회원가입
        </Text>

        <Grid padding='16px 0px'>
          <Input
            label='아이디'
            placebolder='아이디를 입력해주세요.'
            _onChange={(e) => {
              setId(e.target.value);
            }}
          />
        </Grid>
        <Grid padding='16px 0px'>
          <Input
            label='닉네임'
            placebolder='닉네임을 입력해주세요.'
            _onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </Grid>
        <Grid padding='16px 0px'>
          <Input
            label='비밀번호'
            placebolder='비밀번호를 입력해주세요.'
            type='password'
            _onChange={(e) => {
              setPwd(e.target.value);
            }}
          />
        </Grid>
        <Grid padding='16px 0px'>
          <Input
            label='비밀번호 확인'
            placebolder='비밀번호를 다시 입력해주세요.'
            type='password'
            _onChange={(e) => {
              setPwdCheck(e.target.value);
            }}
          />
        </Grid>
        <Button text='회원가입하기' _onClick={sighup}></Button>
      </Grid>
    </>
  );
}

SignUp.defaultProps = {};

export default SignUp;
