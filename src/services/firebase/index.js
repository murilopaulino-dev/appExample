import api from '../axios';
import {
  createDeleteDoc,
  createFilter,
  createQuery,
  createSaveDoc,
  docMapper,
} from './utils';

const QUERY_END_POINT = ':runQuery';

const COMMIT_DOC_END_POINT = ':commit';

export const get = async endPoint => {
  const response = await api.get(endPoint);
  if (response.status !== 200) {
    return {
      status: response.status,
    };
  }
  return response.data.documents.map(doc => docMapper(doc.fields));
};

export const save = (endPoint, data) => {
  const saveDocOptions = createSaveDoc(data, endPoint);
  return api.post(COMMIT_DOC_END_POINT, saveDocOptions);
};

export const query = async (endPoint, filter, sort) => {
  const options = createFilter(filter);
  let postQueryOptions;
  if (options) postQueryOptions = createQuery(options, endPoint);
  const response = await api.post(QUERY_END_POINT, postQueryOptions);
  const documents = [];
  response.data.forEach(doc => {
    if (doc.document) {
      documents.push(docMapper(doc.document.fields));
    }
  });
  return documents;
};

export const deleteDoc = (endPoint, docId) => {
  const deleteDocOption = createDeleteDoc(docId, endPoint);
  return api.post(COMMIT_DOC_END_POINT, deleteDocOption);
};
