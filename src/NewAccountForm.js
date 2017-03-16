import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from './modules/accounts';

class NewAccountForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.createAccount({ name: this.state.name });

  }

  componentWillReceiveProps(nextProps) {
    if (this.props.pending && !nextProps.pending && !nextProps.error) {
      this.setState({ name: '' });
    }
  }

  render() {
    const { pending, error } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="name" style={{ display: 'block' }}>New account</label>
        <input id="name"
               type="text" 
               value={this.state.name}
               onChange={(e) => this.setState({ name: e.target.value })} 
               required={true} 
               placeholder="Name" 
               disabled={pending} />
        {error && (
          <span style={{ color: 'red' }}><strong>Error:</strong> {error.message}</span>
        )}
      </form>
    );
  }
}

export default connect(
  state => state.accounts.create, 
  dispatch => ({ 
    createAccount: (account) => dispatch(actions.createAccount(account))
  })
)(NewAccountForm);