export default () => ({
  listWrapper: {
    // Total viewport height - typing indicator - message form - header - bottom gutter
    height: 'calc(100vh - 184px)',
    overflow: 'auto',
    display: 'flex',
    'flex-direction': 'column-reverse',
  },
});
