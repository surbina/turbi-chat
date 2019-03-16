import React from 'react';
import MessageList from './Presentational';

const messages = [{
  key: '1',
  message: 'Some random text',
  author: 'Carla',
  authorTimestamp: '123',
}, {
  key: '2',
  message: 'Some random text',
  author: 'Carla',
  authorTimestamp: '123',
}, {
  key: '3',
  message: 'Some random text',
  author: 'Seba',
  authorTimestamp: '456',
}];

export default () => <MessageList messages={messages} />;
