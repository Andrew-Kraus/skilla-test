import { all } from 'redux-saga/effects';
import { callsSaga } from './callsSaga';

export function* rootSaga() {
  yield all([callsSaga()]);
}