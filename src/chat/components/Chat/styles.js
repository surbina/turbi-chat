export default theme => ({
  root: {
    display: 'flex',
  },
  content: {
    marginTop: 64,
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    paddingBottom: 0,
  },
  loadingIndicatorWrapper: {
    flex: 1,
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
