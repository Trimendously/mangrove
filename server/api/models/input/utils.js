const { arrayDiff } = require('../../../util/array');

const Input = require('./index');

const getInputKeys = () => {
  const keys = Object.keys(Input.schema.paths);
  keys[keys.indexOf('_id')] = 'inputId';
  keys.splice(keys.indexOf('__v'), 1);

  return keys;
};

const newInputKeys = () => {
  const keys = getInputKeys();
  keys.splice(keys.indexOf('inputId'), 1);
  keys.splice(keys.indexOf('path'), 1);

  return keys;
};

const coordsKeys = () => ['lat', 'long'];

const parseInputJson = (json) => {
  let input = null;
  try {
    input = JSON.parse(json);
  } catch (err) {
    throw new Error('Invalid JSON.');
  }

  let { coords } = input;
  if (!coords || typeof coords !== 'object') coords = {};

  const missingKeys = arrayDiff(newInputKeys(), Object.keys(input))
    .concat(
      arrayDiff(coordsKeys(), Object.keys(coords) || [])
        .map(key => `coords.${key}`),
    );
  if (missingKeys.length > 0) {
    throw new Error(`JSON missing required keys: ${missingKeys.join(', ')}.`);
  }

  const extraKeys = arrayDiff(Object.keys(input), newInputKeys())
    .concat(
      arrayDiff(Object.keys(coords) || [], coordsKeys())
        .map(key => `coords.${key}`),
    );
  if (extraKeys.length > 0) {
    throw new Error(`JSON contains invalid keys: ${extraKeys.join(', ')}.`);
  }

  return input;
};

module.exports = {
  getInputKeys,
  newInputKeys,
  coordsKeys,
  parseInputJson,
};