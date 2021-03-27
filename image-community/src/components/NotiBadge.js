import React, { useEffect, useState } from 'react';
import { Badge } from '@material-ui/core';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import { realtime } from '../shared/firebase';
import { useSelector } from 'react-redux';

function NotiBadge(props) {
  const [is_read, setIsRead] = useState(true);
  const user_id = useSelector((state) => state.user.user.uid);
  const notiCheck = () => {
    const notiDB = realtime.ref(`noti/${user_id}`);
    notiDB.update({ read: true });
    props._onClick();
  };

  useEffect(() => {
    const notiDB = realtime.ref(`noti/${user_id}`);

    notiDB.on('value', (snapshot) => {
      console.log(snapshot.val());
      setIsRead(snapshot.val().read);
    });
    return () => notiDB.off();
  }, []);

  return (
    <>
      <Badge
        color='secondary'
        variant='dot'
        invisible={is_read}
        onClick={notiCheck}
      >
        <NotificationsActiveIcon />
      </Badge>
    </>
  );
}

NotiBadge.defaultProps = {
  _onClick: () => {},
};

export default NotiBadge;
