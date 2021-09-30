import api from '../axios';
import _ from 'lodash';
import { createFilter, createQuery } from './utils';

const QUERY_END_POINT = ':runQuery';

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

export const get = async (endPoint, filter, sort) => {
  const response = await api.get(endPoint);
  if (response.status !== 200) {
    return {
      status: response.status,
    };
  }
  return response.data.documents.map(doc => docMapper(doc.fields));
};

export const post = async (endPoint, data) => {
  const response = await api.post(endPoint, data);
  console.log('response', response);
  // console.log('response', response);
  // if (response.status !== 200) {
  //   return {
  //     status: response.status,
  //   };
  // }
  // return response.data.documents.map(doc => docMapper(doc.fields));
};

export const query = async (endPoint, filter, sort) => {
  let options = createFilter(filter);
  let postQuery;
  if (options) postQuery = createQuery(options, endPoint);
  return post(QUERY_END_POINT, postQuery);
};
