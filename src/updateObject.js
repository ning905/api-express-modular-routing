function updateObject(old, newInfo) {
  Object.keys(newInfo).forEach((key) => (old[key] = newInfo[key]));

  return old;
}

module.exports = { updateObject };
