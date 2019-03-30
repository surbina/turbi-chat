export default theme => ({
  root: {
    display: 'flex',
  },
  content: {
    'margin-top': 64,
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    'padding-bottom': 0,
  },
  loadingIndicatorWrapper: {
    flex: 1,
    height: '100vh',
    display: 'flex',
    'justify-content': 'center',
    'align-items': 'center',
  },
});
