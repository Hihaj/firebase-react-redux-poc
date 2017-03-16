import React from 'react';
import { connect } from 'react-redux';

const AccountList = ({ loading, all }) => {
  if (loading) {
    return (<p>Loading accounts...</p>);
  }
  const accountIds = Object.keys(all);
  if (accountIds.length === 0) {
    return (<p>There are no accounts.</p>);
  }
  return (
    <ul>
      {accountIds.map(id => {
        const account = all[id];
        return (
          <li key={id}>{account.name}</li>
        );
      })}
    </ul>
  );
};

export default connect(state => state.accounts)(AccountList);