import React, { useEffect, useState } from 'react';
import { Grid, Text, Image } from '../elements';
import Card from '../components/Card';
import { realtime } from '../shared/firebase';
import { useSelector } from 'react-redux';

function Notifiation(props) {
  const user = useSelector((state) => state.user.user);
  const [noti, setNoti] = useState([]);

  useEffect(() => {
    if (!user) {
      return;
    }
    const notiDB = realtime.ref(`noti/${user.uid}/list`);
    const _noti = notiDB.orderByChild('insert_dt');

    _noti.once('value', (snapshot) => {
      if (snapshot.exists()) {
        let _data = snapshot.val();

        let _noti_list = Object.keys(_data)
          .reverse()
          .map((val) => {
            return _data[val];
          });
        console.log(_noti_list);
        setNoti(_noti_list);
      }
    });
  }, [user]);

  return (
    <>
      <Grid padding='16px' bg='#eff6ff'>
        {noti.map((val, idx) => {
          return <Card key={`noti_${idx}`} {...val} />;
        })}
      </Grid>
    </>
  );
}

export default Notifiation;
