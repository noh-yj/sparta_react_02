import React from 'react';
import { Grid, Text, Button } from '../elements';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';
import { history } from '../redux/configureStore';
import { apiKey } from '../shared/firebase';

function Header(props) {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.user);
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  if (is_login && is_session) {
    return (
      <>
        <Grid padding='4px 16px'>
          <Grid is_flex>
            <Grid>
              <Text margin='0px' size='24px' bold>
                항해
              </Text>
            </Grid>
            <Grid is_flex>
              <Button text='내정보'></Button>
              <Button text='알림'></Button>
              <Button
                text='로그아웃'
                _onClick={() => {
                  dispatch(userActions.logoutFB());
                }}
              ></Button>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }

  return (
    <>
      <Grid padding='4px 16px'>
        <Grid is_flex>
          <Grid>
            <Text margin='0px' size='24px' bold>
              항해
            </Text>
          </Grid>
          <Grid is_flex>
            <Button
              text='로그인'
              _onClick={() => {
                history.push('/login');
              }}
            ></Button>
            <Button
              text='회원가입'
              _onClick={() => {
                history.push('/signup');
              }}
            ></Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

Header.defaultProps = {};

export default Header;
