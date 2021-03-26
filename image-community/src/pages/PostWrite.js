import React, { useState } from 'react';
import { Text, Button, Grid, Image, Input } from '../elements';
import Upload from '../shared/Upload';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';

function PostWrite(props) {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const preview = useSelector((state) => state.image.preview);
  const { history } = props;
  const [contents, setContents] = useState('');
  const changeContent = (e) => {
    setContents(e.target.value);
  };
  const addPost = () => {
    dispatch(postActions.addPostFB(contents));
  };
  if (!is_login) {
    return (
      <Grid margin='100px 0px' padding='16px' center>
        <Text size='32px' bold>
          앗! 잠깐!
        </Text>
        <Text size='16px'>로그인 후에만 글을 쓸 수 있어요!</Text>
        <Button
          _onClick={() => {
            history.replace('/');
          }}
        >
          로그인 하러가기
        </Button>
      </Grid>
    );
  }
  return (
    <>
      <Grid padding='16px'>
        <Text margin='0px' size='36px' bold>
          게시글 작성
        </Text>
        <Upload />
      </Grid>
      <Grid>
        <Grid padding='16px'>
          <Text margin='0px' size='24px' bold>
            미리보기
          </Text>
        </Grid>
        <Image
          shape='rectangle'
          src={preview ? preview : 'http://via.placeholder.com/400x300'}
        />
      </Grid>
      <Grid padding='16px'>
        <Input
          _onChange={changeContent}
          label='게시글 내용'
          placeholder='게시글 작성'
          multiLine
        />
      </Grid>
      <Grid padding='16px'>
        <Button text='게시글 작성' _onClick={addPost}></Button>
      </Grid>
    </>
  );
}

export default PostWrite;