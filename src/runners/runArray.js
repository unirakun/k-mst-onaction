export default (dispatch, action, tree) => {
  dispatch.forEach(runner => runner(action, tree))
}
