import _, { filter } from 'lodash';

const OPERATORS = {
  '==': 'EQUAL',
};

const FIELD_TYPE = {
  string: 'stringValue',
  interger: 'integerValue',
  double: 'doubleValue',
  boolean: 'booleanValue',
};

const getTypeOfField = field => {
  const fieldType = typeof field;
  if (fieldType === 'number') {
    return Number.isInteger(field) ? FIELD_TYPE.interger : FIELD_TYPE.double;
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

export const createQuery = (options, collectionId) => {
  const query = {
    structuredQuery: {
      from: [{ collectionId }],
      where: options,
    },
  };
  return query;
};
