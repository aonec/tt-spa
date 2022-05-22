import { all } from 'redux-saga/effects';

function* test() {
}

export default function* rootSaga() {
  // yield all([tweetsSaga(), tagsSaga(), tweetSaga(), userSaga(), usersSaga()]);
  yield all([test()]);
}
