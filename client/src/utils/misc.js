// SERVER ROUTES
export const PRODUCT_SERVER = '/api/product';

export const materialsList = [
  {
    abbr: 'P',
    label: 'Сталь',
    color: '#00a7ff',
  },
  {
    abbr: 'M',
    label: 'Нержавеющая сталь',
    color: '#f6fa00',
  },
  {
    abbr: 'K',
    label: 'Чугун',
    color: '#ea201c',
  },
  {
    abbr: 'N',
    label: 'Цветные металлы',
    color: '#9ed2c1',
  },
  {
    abbr: 'S',
    label: 'Жаропрочные сплавы',
    color: '#ffd09d',
  },
  {
    abbr: 'H',
    label: 'Материалы высокой твердости',
    color: '#c6d2db',
  },
];

export const formStyles = {
  root: {
    '& > *': {
      marginBottom: '15px',
    },
    '& label.Mui-focused:not(.Mui-error)': {
      color: '#343434',
    },
    '& .MuiFormControl-root': {
      width: '100%',
    },
    '& .MuiInputBase-root': {
      width: '100%',
    },
    '& .MuiOutlinedInput-root': {
      '&:hover:not(.Mui-error) fieldset': {
        borderColor: '#343434',
      },
      '&.Mui-focused:not(.Mui-error) fieldset': {
        borderColor: '#343434',
      },
    },
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  button: {
    width: '100%',
  },
};
