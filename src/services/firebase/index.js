import api from '../axios';
import {
  createDeleteDoc,
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
  if (response.data.documents?.length) {
    return response.data.documents.map(doc => docMapper(doc.fields));
  }
  if (response.data.fields) {
    return docMapper(response.data.fields);
  }
  return response.data;
};

export const save = (endPoint, data) => {
  const saveDocOptions = createSaveDoc(data, endPoint);
  return api.post(COMMIT_DOC_END_POINT, saveDocOptions);
};

export const query = async (endPoint, filter, sort) => {
  const queryOptions = createQuery(endPoint, filter, sort);
  const response = await api.post(QUERY_END_POINT, queryOptions);
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
