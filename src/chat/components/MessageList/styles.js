export default () => ({
  listWrapper: {
    // Total viewport height - typing indicator - message form - header - bottom gutter
    height: 'calc(100vh - 165px)',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column-reverse',
  },
});
