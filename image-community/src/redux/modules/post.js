import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { firestore, storage } from '../../shared/firebase';
import moment from 'moment';
import { actionCreators as imageActions } from './image';

const SET_POST = 'SET_POST';
const ADD_POST = 'ADD_POST';
const EDIT_POST = 'EDIT_POST';
const LOADING = 'LOADING';

const setPost = createAction(SET_POST, (post_list, paging) => ({
  post_list,
  paging,
}));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post,
}));
const loadgin = createAction(LOADING, (is_loading) => ({ is_loading }));

const initialState = {
  list: [],
  paging: { start: null, next: null, size: 3 },
  is_loading: false,
};

const initialPost = {
  // id: 0,
  // user_info: {
  //   user_name: 'ujin',
  //   user_profile: 'https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg',
  // },
  image_url: 'https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg',
  contents: '',
  comment_cnt: 0,
  insert_dt: moment().format('YYYY-MM-DD hh:mm:ss'),
};

const editPostFB = (post_id = null, post = {}) => {
  return function (dispatch, getState, { history }) {
    if (!post_id) {
      console.log('게시물 정보가 없어요');
      return;
    }
    const _image = getState().image.preview;
    const _post_idx = getState().post.list.findIndex((p) => p.id === post_id);
    const _post = getState().post.list[_post_idx];

    const postDB = firestore.collection('post');
    if (_image === _post.image_url) {
      postDB
        .doc(post_id)
        .update(post)
        .then((doc) => {
          dispatch(editPost(post_id, { ...post }));
          history.replace('/');
        });
      return;
    } else {
      const user_id = getState().user.user.uid;
      const _upload = storage
        .ref(`images/${user_id}_${new Date().getTime()}`)
        .putString(_image, 'data_url');

      _upload.then((snapshot) => {
        snapshot.ref
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            dispatch(imageActions.uploadImage(url));
            return url;
          })
          .then((url) => {
            postDB
              .doc(post_id)
              .update({ ...post, image_url: url })
              .then((doc) => {
                dispatch(editPost(post_id, { ...post, image_url: url }));
                history.replace('/');
              });
          })
          .catch((e) => {
            window.alert('앗! 이미지 업로드에 문제가 있어요!');
            console.log('앗! 이미지 업로드에 문제가 있어요!', e);
          });
      });
    }
  };
};

const addPostFB = (contents = '') => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection('post');
    const _user = getState().user.user;
    const user_info = {
      user_name: _user.user_name,
      user_id: _user.uid,
      user_profile: _user.user_profile,
    };
    const _post = {
      ...initialPost,
      contents: contents,
      insert_dt: moment().format('YYYY-MM-DD hh:mm:ss'),
    };

    const _image = getState().image.preview;

    const _upload = storage
      .ref(`images/${user_info.user_id}_${new Date().getTime()}`)
      .putString(_image, 'data_url');

    _upload.then((snapshot) => {
      snapshot.ref
        .getDownloadURL()
        .then((url) => {
          console.log(url);
          dispatch(imageActions.uploadImage(url));
          return url;
        })
        .then((url) => {
          postDB
            .add({ ...user_info, ..._post, image_url: url })
            .then((doc) => {
              let post = {
                user_info,
                ..._post,
                id: doc.id,
                image_url: url,
              };
              dispatch(addPost(post));
              history.replace('/');
              dispatch(imageActions.setPreview(null));
            })
            .catch((e) => {
              window.alert('앗! 포스트 작성에 문제가 있어요!');
              console.log('post 작성에 실패했어요!', e);
            });
        })
        .catch((e) => {
          window.alert('앗! 이미지 업로드에 문제가 있어요!');
          console.log('앗! 이미지 업로드에 문제가 있어요!', e);
        });
    });
  };
};

const getPostFB = (start = null, size = 3) => {
  return function (dispatch, getState, { history }) {
    let _paging = getState().post.paging;
    if (_paging.start && !_paging.next) {
      return;
    }

    dispatch(loadgin(true));
    const postDB = firestore.collection('post');

    let query = postDB.orderBy('insert_dt', 'desc');

    if (start) {
      query = query.startAt(start);
    }

    query
      .limit(size + 1)
      .get()
      .then((docs) => {
        let post_list = [];
        let paging = {
          start: docs.docs[0],
          next:
            docs.docs.length === size + 1
              ? docs.docs[docs.docs.length - 1]
              : null,
          size: size,
        };
        docs.forEach((doc) => {
          let _post = doc.data();

          let post = Object.keys(_post).reduce(
            (acc, cur) => {
              if (cur.indexOf('user_') !== -1) {
                return {
                  ...acc,
                  user_info: { ...acc.user_info, [cur]: _post[cur] },
                };
              }
              return { ...acc, [cur]: _post[cur] };
            },
            { id: doc.id, user_info: {} },
          );
          post_list.push(post);
        });
        post_list.pop();
        dispatch(setPost(post_list, paging));
      });

    // postDB.get().then((docs) => {
    //   let post_list = [];
    //   docs.forEach((doc) => {
    //     let _post = doc.data();

    //     let post = Object.keys(_post).reduce(
    //       (acc, cur) => {
    //         if (cur.indexOf('user_') !== -1) {
    //           return {
    //             ...acc,
    //             user_info: { ...acc.user_info, [cur]: _post[cur] },
    //           };
    //         }
    //         return { ...acc, [cur]: _post[cur] };
    //       },
    //       { id: doc.id, user_info: {} },
    //     );

    // 방법 2 개인적으로 직관적이여서 이게 더 좋음
    // let _post = {
    //   id: doc.id,
    //   ...doc.data(),
    // };

    // let post = {
    //   id: doc.id,
    //   user_info: {
    //     user_name: _post.user_name,
    //     user_profile: _post.user_profile,
    //     user_id: _post.user_id,
    //   },
    //   image_url: _post.image_url,
    //   contents: _post.contents,
    //   comment_cnt: _post.comment_cnt,
    //   insert_dt: _post.insert_dt,
    // };

    //     post_list.push(post);
    //   });
    //   dispatch(setPost(post_list));
    // });
  };
};

export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.post_list);
        draft.paging = action.payload.paging;
        draft.is_loading = false;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
        draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState,
);

const actionCreators = {
  setPost,
  addPost,
  editPost,
  editPostFB,
  getPostFB,
  addPostFB,
};

export { actionCreators };
