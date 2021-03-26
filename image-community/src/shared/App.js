import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configureStore';
import { Grid, Button } from '../elements';
import PostList from '../pages/PostList';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Header from '../components/Header';
import Permit from './Permit';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

import { apiKey } from './firebase';

function App() {
  const dispatch = useDispatch();

  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  useEffect(() => {
    if (is_session) {
      dispatch(userActions.loginCheckFB());
    }
  }, []);
  return (
    <>
      <Grid>
        <Header />
        <ConnectedRouter history={history}>
          <Route path='/' exact component={PostList} />
          <Route path='/login' exact component={Login} />
          <Route path='/signup' exact component={SignUp} />
        </ConnectedRouter>
      </Grid>
      <Permit>
        <Button is_float text='+'></Button>
        
      </Permit>
    </>
  );
}

export default App;
