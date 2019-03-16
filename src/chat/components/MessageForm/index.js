import React from 'react';
import MessageForm from './Presentational';

export default () => <MessageForm onSubmit={message => console.log('SUBMIT: ', message) } />;
