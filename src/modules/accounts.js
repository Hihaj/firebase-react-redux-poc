export const actionTypes = {
  ACCOUNTS_UPDATED: 'accounts-updated',
  CREATE_ACCOUNT: 'create-account',
  CREATE_ACCOUNT_FAILED: 'create-account-failed',
  ACCOUNT_CREATED: 'account-created',
};

export const actions = {
  accountsUpdated: ({ accounts }) => ({
    type: actionTypes.ACCOUNTS_UPDATED,
    payload: { accounts }
  }),
  createAccount: (account) => ({
    type: actionTypes.CREATE_ACCOUNT,
    payload: { account }
  }),
  createAccountFailed: ({ error, account }) => ({
    type: actionTypes.CREATE_ACCOUNT_FAILED,
    payload: { error, account }
  }),
  accountCreated: ({ account }) => ({
    type: actionTypes.ACCOUNT_CREATED,
    payload: { account }
  }),
};

const initialState = {
  loading: true,
  create: {
    pending: false,
    error: null,
  },
  all: {},
};
export const reducer = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.ACCOUNTS_UPDATED: return Object.assign({}, state, {
      loading: false,
      all: payload.accounts
    });
    case actionTypes.CREATE_ACCOUNT: return Object.assign({}, state, {
      create: Object.assign({}, state.create, {
        pending: true,
        error: null
      })
    });
    case actionTypes.CREATE_ACCOUNT_FAILED: return Object.assign({}, state, {
      create: Object.assign({}, state.create, {
        pending: false,
        error: payload.error
      })
    });
    case actionTypes.ACCOUNT_CREATED: return Object.assign({}, state, {
      create: Object.assign({}, state.create, {
        pending: false,
        error: null
      })
    });
    default: return state;
  }
};