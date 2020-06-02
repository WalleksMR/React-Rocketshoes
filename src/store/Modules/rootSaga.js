import { all } from 'redux-saga/effects';
import Cart from './Cart/Saga';

export default function* rootSaga() {
  return yield all([Cart]);
}
