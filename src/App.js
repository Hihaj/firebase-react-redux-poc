import React from 'react';
import NewAccountForm from './NewAccountForm';
import AccountList from './AccountList';
import { connect } from 'react-redux';

const App = (props) => {
  return (
    <div>
      <NewAccountForm />
      <AccountList />
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
};

export default connect(state => state)(App);
