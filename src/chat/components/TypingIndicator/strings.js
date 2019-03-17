export const TYPING_MESSAGE_SINGLE = user => `${user} is typing`;
export const TYPING_MESSAGE_DOUBLE = users => `${users.join(' and ')} are typyng`;
export const TYPING_MESSAGE_MANY = users => `${users[0]}, ${users[1]} and others are typing`;
