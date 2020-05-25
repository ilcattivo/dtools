import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import {
  TextField,
  MenuItem,
  withStyles,
  Select,
  Chip,
  FormControl,
  InputLabel,
  FormHelperText,
  FormGroup,
  Checkbox,
  FormLabel,
  FormControlLabel,
} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import {
  validate,
  validateForm,
  getUpdatedForm,
  generateFormData,
  getCleanForm,
} from '../../utils/form-actions';
import {
  getToolTypes,
  getOperationTypes,
  addProduct,
  resetProduct,
} from '../../actions/product-actions';

import Header from '../../components/header';
import Button from '../../components/button';
import FileUploader from '../../utils/file-uploader';
import DashboardLayout from '../../hoc/dashboard-layout';
import { materialsList, formStyles } from '../../utils/misc';

import './style.sass';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class AddProduct extends Component {
  state = {
    fields: {
      name: {
        value: '',
        validation: {
          required: true,
        },
        error: '',
      },
      descr: {
        value: '',
        validation: {
          required: true,
        },
        error: '',
      },
      toolType: {
        value: '',
        validation: {
          required: true,
        },
        error: '',
      },
      operationType: {
        value: [],
        validation: {
          required: true,
        },
        error: '',
      },
      title: {
        value: '',
        validation: {},
        error: '',
      },
      detailedDescr: {
        value: '',
        validation: {},
        error: '',
      },
      materials: {
        value: [],
        validation: {
          required: true,
        },
        error: '',
      },
      images: {
        value: [],
        validation: {},
        error: '',
      },
    },
  };

  componentDidMount() {
    this.props.getToolTypes();
    this.props.getOperationTypes();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let { fields } = this.state;
    // returns null if all inputs are valid
    const newForm = validateForm(fields);

    if (newForm) {
      this.setState({
        fields: newForm,
      });
    } else {
      const dataToSubmit = generateFormData(fields);
      this.props.addProduct(dataToSubmit).then(() => {
        const { success, err } = this.props.productAdded;
        if (success) {
          this.resetFormFields();
          setTimeout(() => {
            this.props.resetProduct();
          }, 2000);
        }
      });
    }
  };

  resetFormFields = () => {
    const { fields } = this.state;
    const newFormFileds = getCleanForm(fields);
    this.setState({
      fields: newFormFileds,
    });
  };

  handleImages = (imageUrl) => {
    const { fields } = this.state;
    const images = [...fields.images.value];
    images.push(imageUrl);

    const newForm = getUpdatedForm(fields, 'images', 'value', images);

    this.setState({
      fields: newForm,
    });
  };

  handleImageRemove = (removedUrl) => {
    const { fields } = this.state;
    const images = fields.images.value.filter((url) => url !== removedUrl);
    const newForm = getUpdatedForm(fields, 'images', 'value', images);
    this.setState({
      fields: newForm,
    });
  };

  handleChange = (fieldName) => (event) => {
    const { fields } = this.state;
    const value = event.target.value;

    const newForm = getUpdatedForm(fields, fieldName, 'value', value);

    if (fieldName === 'toolType') {
      newForm.operationType.value = [];
    }

    this.setState({
      fields: newForm,
    });
  };

  handleCheckbox = (material) => (event) => {
    const { fields } = this.state;
    const isChecked = event.target.checked;
    let materials = [...fields.materials.value];

    if (isChecked) {
      materials.push(material);
    } else {
      materials = materials.filter((el) => el !== material);
    }

    const newForm = getUpdatedForm(fields, 'materials', 'value', materials);

    this.setState({
      fields: newForm,
    });
  };

  handleBlur = (fieldName) => () => {
    const { fields } = this.state;

    const [, validationMsg] = validate(fields[fieldName]);

    const newForm = getUpdatedForm(fields, fieldName, 'error', validationMsg);
    this.setState({
      fields: newForm,
    });
  };

  render() {
    const { handleChange, handleCheckbox, handleBlur } = this;
    const { fields } = this.state;
    const { classes, toolTypes, operationTypes } = this.props;
    const { success, err: backendErrors } = this.props.productAdded;

    return (
      <DashboardLayout>
        <main className='add-product'>
          <Header
            title='Добавить новый товар'
            className='add-product__header'
          />
          <div className='add-product__container'>
            {success && (
              <p className='add-product__success'>
                <CheckCircleIcon
                  style={{ position: 'absolute', left: 0, top: '-2px' }}
                />
                Товар успешно добавлен
              </p>
            )}
            {backendErrors && backendErrors.code === 11000 && (
              <p className='add-product__error'>
                Уже есть товар с таким названием
              </p>
            )}
            <form
              noValidate
              autoComplete='off'
              onSubmit={this.handleSubmit}
              className={classes.root}>
              <FileUploader
                handleImages={this.handleImages}
                handleRemove={this.handleImageRemove}
              />
              <TextField
                id='name'
                label='Название товара'
                variant='outlined'
                value={fields['name'].value}
                error={Boolean(fields['name'].error)}
                helperText={fields['name'].error}
                onBlur={handleBlur('name')}
                onChange={handleChange('name')}
              />
              <br />
              <TextField
                id='descr'
                label='Краткое описание'
                variant='outlined'
                multiline
                rows={2}
                value={fields['descr'].value}
                error={Boolean(fields['descr'].error)}
                helperText={fields['descr'].error}
                onBlur={handleBlur('descr')}
                onChange={handleChange('descr')}
              />
              <br />
              <TextField
                id='toolType'
                select
                label='Тип инструмента'
                variant='outlined'
                value={fields['toolType'].value}
                onChange={handleChange('toolType')}
                onBlur={handleBlur('toolType')}
                error={Boolean(fields['toolType'].error)}
                helperText={fields['toolType'].error}>
                {toolTypes.map((toolType) => (
                  <MenuItem key={toolType._id} value={toolType._id}>
                    {toolType.name}
                  </MenuItem>
                ))}
              </TextField>
              <br />
              <FormControl className={classes.formControl}>
                <InputLabel id='demo-mutiple-chip-label'>Операции</InputLabel>
                <Select
                  labelId='demo-mutiple-chip-label'
                  id='operationTypes'
                  multiple
                  disabled={fields.toolType.value ? false : true}
                  value={fields['operationType'].value}
                  onChange={handleChange('operationType')}
                  onBlur={handleBlur('operationType')}
                  error={Boolean(fields['operationType'].error)}
                  renderValue={(selected) => (
                    <div className={classes.chips}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={
                            operationTypes.find((el) => el._id === value).name
                          }
                          className={classes.chip}
                        />
                      ))}
                    </div>
                  )}
                  MenuProps={MenuProps}>
                  {operationTypes
                    .filter((el) => el.toolTypeId === fields.toolType.value)
                    .map(({ _id, name }) => (
                      <MenuItem key={_id} value={_id}>
                        {name}
                      </MenuItem>
                    ))}
                </Select>
                {fields['operationType'].error && (
                  <FormHelperText>
                    {fields['operationType'].error}
                  </FormHelperText>
                )}
              </FormControl>
              <TextField
                id='title'
                label='Заголовок на странице'
                variant='outlined'
                value={fields['title'].value}
                error={Boolean(fields['title'].error)}
                helperText={fields['title'].error}
                onBlur={handleBlur('title')}
                onChange={handleChange('title')}
              />
              <br />
              <TextField
                id='detailedDescr'
                label='Детальное описание'
                variant='outlined'
                multiline
                rows={4}
                value={fields['detailedDescr'].value}
                error={Boolean(fields['detailedDescr'].error)}
                helperText={fields['detailedDescr'].error}
                onBlur={handleBlur('detailedDescr')}
                onChange={handleChange('detailedDescr')}
              />
              <br />
              <FormControl
                error={Boolean(fields['materials'].error)}
                className={classes.formControl}
                onBlur={handleBlur('materials')}>
                <FormLabel component='legend'>
                  Обрабатываемые материалы
                </FormLabel>
                <FormGroup>
                  {materialsList.map(({ abbr, label }) => (
                    <FormControlLabel
                      key={abbr}
                      control={
                        <Checkbox
                          checked={fields.materials.value.find(
                            (el) => el.abbr === abbr
                          )}
                          onChange={handleCheckbox(abbr)}
                          name={abbr}
                        />
                      }
                      label={label}
                    />
                  ))}
                </FormGroup>
                {fields.materials.error && (
                  <FormHelperText>Выберите как минимум 1</FormHelperText>
                )}
              </FormControl>
              <Button className={classes.button}>Добавить</Button>
            </form>
          </div>
        </main>
      </DashboardLayout>
    );
  }
}

const mapStateToProps = (state) => ({
  toolTypes: state.productsReducer.toolTypes,
  operationTypes: state.productsReducer.operationTypes,
  productAdded: state.productsReducer.productAdded,
});

const mapDispatchToProps = {
  getToolTypes,
  getOperationTypes,
  addProduct,
  resetProduct,
};

export default compose(
  withStyles(formStyles),
  connect(mapStateToProps, mapDispatchToProps)
)(AddProduct);
