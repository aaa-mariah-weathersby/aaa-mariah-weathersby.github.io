import green from '@material-ui/core/colors/green';



const styles = {
  root: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
    fontSize: '2em',
  },

  checked: {},

  size: {
    width: 40,
    height: 40,
  },

  sizeIcon: {
    fontSize: '100em',
  },
};

export default styles;