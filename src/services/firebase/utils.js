import _ from 'lodash';
import { FIRESTORE_URL } from '../../constants';

const OPERATORS = {
  '==': 'EQUAL',
};

const FIELD_TYPE = {
  string: 'stringValue',
  interger: 'integerValue',
  double: 'doubleValue',
  boolean: 'booleanValue',
  object: 'mapValue',
  array: 'arrayValue',
};

const getTypeOfField = field => {
  const fieldType = typeof field;
  if (fieldType === 'number') {
    return Number.isInteger(field) ? FIELD_TYPE.interger : FIELD_TYPE.double;
  }
  if (fieldType === 'object' && Array.isArray(field)) {
    return FIELD_TYPE.array;
  }
  return FIELD_TYPE[fieldType];
};

const mountFilterObj = filter => {
  const firstField = filter[0];
  const operator = OPERATORS[filter[1]];
  const secondField = filter[2];
  const secondFieldType = getTypeOfField(secondField);
  if (!firstField || !operator || !secondFieldType) return null;
  return {
    fieldFilter: {
      field: {
        fieldPath: firstField,
      },
      op: operator,
      value: {
        [secondFieldType]: secondField,
      },
    },
  };
};

const getFieldSaveValue = (propValue, fieldType) => {
  if (fieldType === FIELD_TYPE.object) {
    return mountSaveDoc(propValue);
  }
  if (fieldType === FIELD_TYPE.array) {
    return mountSaveArray(propValue);
  }
  return propValue;
};

const mountSaveArray = array => {
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    const fieldValue = array[i];
    const fieldType = getTypeOfField(fieldValue);
    newArray.push(getFieldSaveValue(fieldValue, fieldType));
  }
  return newArray;
};

const mountSaveDoc = doc => {
  const field = {};
  _.forEach(doc, (fieldValue, fieldKey) => {
    const fieldType = getTypeOfField(fieldValue);
    field[fieldKey] = {
      [fieldType]: getFieldSaveValue(fieldValue, fieldType),
    };
  });
  return field;
};

export const createFilter = filterArray => {
  const isMultiFilter = filterArray.length > 1;
  if (!isMultiFilter) {
    return mountFilterObj(filterArray[0]);
  }
  const newFilterObj = {
    compositeFilter: {
      op: 'AND',
      filters: filterArray.map(mountFilterObj),
    },
  };
  return newFilterObj;
};

export const createQuery = (options, collectionId) => ({
  structuredQuery: {
    from: [{ collectionId }],
    where: options,
  },
});

export const createSaveDoc = (doc, endPoint) => ({
  writes: [
    {
      update: {
        name: `${FIRESTORE_URL}${endPoint}/${doc.id}`,
        fields: mountSaveDoc(doc),
      },
    },
  ],
});

const arrayMapper = array => {
  const newArray = [];
  _.forEach(array, value => {
    newArray.push(getFieldMapper(value));
  });
  return newArray;
};

const getFieldMapper = field => {
  if (field.mapValue) {
    return docMapper(field.mapValue.fields);
  }
  if (field.arrayValue) {
    return arrayMapper(field.arrayValue.values);
  }
  return Object.values(field)[0];
};

export const docMapper = doc => {
  const newDoc = {};
  _.forEach(doc, (fieldValue, fieldKey) => {
    newDoc[fieldKey] = getFieldMapper(fieldValue);
  });
  return newDoc;
};

export const createDeleteDoc = (docId, endPoint) => {
  return {
    writes: [
      {
        delete: `${FIRESTORE_URL}${endPoint}/${docId}`,
      },
    ],
  };
};
