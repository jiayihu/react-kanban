function makeError(type, data) {
  throw new Error(JSON.stringify(data));
}

export default {
  makeError,
};
