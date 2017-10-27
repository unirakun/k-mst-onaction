const GeneratorFunction = (function* foo() { }).constructor // eslint-disable-line no-empty-function

export default fn => fn instanceof GeneratorFunction
