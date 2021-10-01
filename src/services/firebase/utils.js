import _ from 'lodash';
import { FIRESTORE_URL, ORDER } from '../../constants';

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
  date: 'timestampValue',
};

const SORT_DIRECTION = {
  [ORDER.ASC]: 'ASCENDING',
  [ORDER.DESC]: 'DESCENDING',
};

const getTypeOfField = fieldValue => {
  const fieldType = typeof fieldValue;
  if (fieldType === 'number') {
    return Number.isInteger(fieldValue) ? FIELD_TYPE.interger : FIELD_TYPE.double;
  }
  if (fieldType === 'object' && Array.isArray(fieldValue)) {
    return FIELD_TYPE.array;
  }
  if (typeof fieldValue?.getMonth === 'function') {
    return FIELD_TYPE.date;
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

const mountSortObj = sort => {
  return {
    field: {
      fieldPath: sort.field,
    },
    direction: SORT_DIRECTION[sort.order],
  };
};

const getFieldSaveValue = (fieldValue, fieldType) => {
  if (fieldType === FIELD_TYPE.object) {
    return mountSaveDoc(fieldValue);
  }
  if (fieldType === FIELD_TYPE.array) {
    return mountSaveArray(fieldValue);
  }
  if (fieldType === FIELD_TYPE.date) {
    return fieldValue.toISOString();
  }
  return fieldValue;
};

const mountSaveArray = array => {
  const values = [];
  for (let i = 0; i < array.length; i++) {
    const fieldValue = array[i];
    const fieldType = getTypeOfField(fieldValue);
    values.push({ [fieldType]: getFieldSaveValue(fieldValue, fieldType) });
  }
  return {
    values,
  };
};

const mountSaveDoc = doc => {
  const fields = {};
  _.forEach(doc, (fieldValue, fieldKey) => {
    const fieldType = getTypeOfField(fieldValue);
    fields[fieldKey] = {
      [fieldType]: getFieldSaveValue(fieldValue, fieldType),
    };
  });
  return { fields };
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

export const createQuery = (collectionId, filter, sort) => {
  const structuredQuery = {
    from: [{ collectionId }],
  };
  if (filter && filter.length) {
    structuredQuery.where = createFilter(filter);
  }
  if (sort) {
    structuredQuery.orderBy = mountSortObj(sort);
  }
  return { structuredQuery };
};

export const createSaveDoc = (doc, endPoint) => ({
  writes: [
    {
      update: {
        name: `${FIRESTORE_URL}${endPoint}/${doc.id}`,
        ...mountSaveDoc(doc),
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
  if (field.timestampValue) {
    return new Date(field.timestampValue);
  }
  return Object.values(field)[0];
};

export const docMapper = docFields => {
  const newDoc = {};
  _.forEach(docFields, (fieldValue, fieldKey) => {
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
