export default (dispatch, action, tree) => {
  const runner = dispatch(action, tree)
  let step = { done: false }

  while (!step.done) {
    step = runner.next()
    if (!step.done) step.value(action, tree)
  }
}
