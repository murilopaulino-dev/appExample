import api from '../axios';
import { createFilter, createQuery, createSaveDoc, docMapper } from './utils';

const QUERY_END_POINT = ':runQuery';

const SAVE_DOC_END_POINT = ':commit';

export const get = async (endPoint, filter, sort) => {
  const response = await api.get(endPoint);
  if (response.status !== 200) {
    return {
      status: response.status,
    };
  }
  return response.data.documents.map(doc => docMapper(doc.fields));
};

export const save = async (endPoint, data) => {
  const saveDoc = createSaveDoc(data, endPoint);
  const response = await api.post(SAVE_DOC_END_POINT, saveDoc);
  return response;
};

export const query = async (endPoint, filter, sort) => {
  const options = createFilter(filter);
  let postQuery;
  if (options) postQuery = createQuery(options, endPoint);
  const response = await api.post(QUERY_END_POINT, postQuery);
  const documents = [];
  response.data.forEach(doc => {
    console.log('doc', doc);
    if (doc.document) {
      documents.push(docMapper(doc.document.fields));
    }
  });
  return documents;
};
