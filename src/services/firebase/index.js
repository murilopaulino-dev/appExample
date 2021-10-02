import {
  createDeleteDoc,
  createQuery,
  createSaveDoc,
  docMapper,
} from './utils';

const QUERY_END_POINT = ':runQuery';

const COMMIT_DOC_END_POINT = ':commit';

class Firebase {
  constructor(api) {
    this.api = api;
  }

  async get(endPoint) {
    const response = await this.api.get(endPoint);
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
  }

  async post(endPoint, data) {
    const response = await this.api.post(endPoint, data);
    return response.data;
  }

  async save(endPoint, data) {
    const saveDocOptions = createSaveDoc(data, endPoint);
    return this.api.post(COMMIT_DOC_END_POINT, saveDocOptions);
  }

  async query(endPoint, filter, sort) {
    const queryOptions = createQuery(endPoint, filter, sort);
    const response = await this.api.post(QUERY_END_POINT, queryOptions);
    const documents = [];
    response.data.forEach(doc => {
      if (doc.document) {
        documents.push(docMapper(doc.document.fields));
      }
    });
    return documents;
  }

  async deleteDoc(endPoint, docId) {
    const deleteDocOption = createDeleteDoc(docId, endPoint);
    return this.api.post(COMMIT_DOC_END_POINT, deleteDocOption);
  }
}

export default Firebase;
