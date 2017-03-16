import { put, call, take, takeLatest } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import * as accounts from './modules/accounts';
import firebase from 'firebase';

firebase.initializeApp(JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG));
const db = firebase.database();
const accountsReference = db.ref('accounts');

const pushRef = (ref, value) => ref.push(value);
const setRef = (ref, value) => ref.set(value);

const createFirebaseReferenceChannel = (reference) => eventChannel(emitter => {
  const callback = snapshot => emitter({ value: snapshot.val() });
  reference.on('value', callback);
  return () => reference.off('value', callback);
});

export const accountsSaga = function* () {
  const channel = yield call(createFirebaseReferenceChannel, accountsReference);
  try {
    while (true) {
      const { value } = yield take(channel);
      yield put(accounts.actions.accountsUpdated({ accounts: value }));
    }
  } finally {
    // This is executed if the channel terminates for some reason.
  }
};

export const accountCreationSaga = function* () {
  yield takeLatest(accounts.actionTypes.CREATE_ACCOUNT, function* (action) {
    let account = action.payload.account;
    try {
      const ref = yield call(pushRef, accountsReference);
      account = Object.assign({}, account, { id: ref.key });
      yield call(setRef, ref, account);
      yield put(accounts.actions.accountCreated({ account }));
    } catch (error) {
      console.error(error);
      yield put(accounts.actions.createAccountFailed({ error, account }))
    }
  });
}