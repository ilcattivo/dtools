const validate = (input, formdata) => {
  const { value, validation } = input;

  let isValid = true;
  let validationMsg = '';

  if (validation.email) {
    const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailReg.test(value)) {
      isValid = false;
      validationMsg = 'Некорректно введен email';
    }
  }

  if (validation.confirm) {
    const isEqual = value === formdata[validation.confirm].value;
    if (!isEqual) {
      isValid = false;
      validationMsg = 'Пароли должны совпадать';
    }
  }

  if (validation.required) {
    // checking for an empty string or an empty array
    if (
      (typeof value === 'string' && value.trim().length === 0) ||
      (Array.isArray(value) && value.length === 0)
    ) {
      isValid = false;
      validationMsg = 'Это поле обязательно';
    }
  }

  return [isValid, validationMsg];
};

const validateForm = (formFields) => {
  let formError = false;

  for (let fieldName in formFields) {
    const [isValid, validationMsg] = validate(
      formFields[fieldName],
      formFields
    );
    if (!isValid) formError = true;
    formFields[fieldName].error = validationMsg;
  }
  return formError ? formFields : null;
};

/**
 *
 * @param {Object} formFields
 * @param {String} fieldName
 * @param {String} key
 * @param {String | Array} value
 *
 * @return {Object} returns new form data
 */

const getUpdatedForm = (formFields, fieldName, key, value) => {
  return {
    ...formFields,
    [fieldName]: {
      ...formFields[fieldName],
      [key]: value,
    },
  };
};

const getCleanForm = (formFields) => {
  const newFormFields = { ...formFields };

  for (let field in newFormFields) {
    let value = newFormFields[field].value;

    if (typeof value === 'string') {
      newFormFields[field].value = '';
    } else if (Array.isArray(value)) {
      newFormFields[field].value = [];
    }

    newFormFields[field].error = '';
  }

  return newFormFields;
};

const generateFormData = (formFields) => {
  const data = {};

  for (let fieldName in formFields) {
    data[fieldName] = formFields[fieldName].value;
  }

  return data;
};

export {
  validate,
  validateForm,
  getUpdatedForm,
  getCleanForm,
  generateFormData,
};
