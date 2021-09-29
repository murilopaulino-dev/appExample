import api from '../axios';
import _ from 'lodash';

const arrayMapper = array => {
  const newArray = [];
  _.forEach(array, value => {
    newArray.push(getProp(value));
  });
  return newArray;
};

const getProp = field => {
  if (field.mapValue) {
    return docMapper(field.mapValue.fields);
  }
  if (field.arrayValue) {
    return arrayMapper(field.arrayValue.values);
  }
  if (!field.mapValue) {
    return Object.values(field)[0];
  }
};

const docMapper = doc => {
  const newDoc = {};
  _.forEach(doc, (fieldValue, fieldKey) => {
    newDoc[fieldKey] = getProp(fieldValue);
  });
  return newDoc;
};

export const get = async (url, options) => {
  const response = await api.get(url);
  if (response.status !== 200) {
    return {
      status: response.status,
    };
  }
  return response.data.documents.map(doc => docMapper(doc.fields));
};
