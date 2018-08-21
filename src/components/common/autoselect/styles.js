import purple from '@material-ui/core/colors/purple';


const ITEM_HEIGHT = 48;

const styles = theme => ({
    root: {
      flexGrow: 1,
      // height: 250,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        paddingBottom: '.25em',
       
        // minWidth: '350px',
        // width: '48%',
        // marginRight: '1.5%',
      
      },
      margin: {
        margin: theme.spacing.unit,
      },
      cssLabel: {
        '&$cssFocused': {
          color: purple[500],
        },
      },
      cssFocused: {},
      cssUnderline: {
        '&:after': {
          borderBottomColor: purple[500],
        },
      },
      bootstrapRoot: {
        padding: '0  0 .35em 0',
        'label + &': {
          marginTop: theme.spacing.unit * 3,
        },
      },
      '.Select.auto-select-input': {
        borderRadius: 4,
        backgroundColor: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 12px',
        width: 'calc(100% - 24px)',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
          borderColor: '#80bdff',
          boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
      },
      bootstrapFormLabel: {
        fontSize: 18,
      },
    chip: {
      margin: theme.spacing.unit / 4,
    },
    // We had to use a lot of global selectors in order to style react-select.
    // We are waiting on https://github.com/JedWatson/react-select/issues/1679
    // to provide a much better implementation.
    // Also, we had to reset the default style injected by the library.
    '@global': {
      '.Select-control': {
        display: 'flex',
        alignItems: 'center',
        border: 0,
        height: 'auto',
        background: 'transparent',
        '&:hover': {
          boxShadow: 'none',
        },
      },
      '.Select-multi-value-wrapper': {
        flexGrow: 1,
        display: 'flex',
        flexWrap: 'wrap',
      },
      '.Select--multi .Select-input': {
        margin: 0,
      },
      '.Select.has-value.is-clearable.Select--single > .Select-control .Select-value': {
        padding: 0,
      },
      '.Select-noresults': {
        padding: theme.spacing.unit * 2,
      },
      '.Select-input': {
        display: 'inline-flex !important',
        padding: 0,
        height: 'auto',
      },
      '.Select-input input': {
        background: 'transparent',
        border: 0,
        padding: 0,
        cursor: 'default',
        display: 'inline-block',
        fontFamily: 'inherit',
        fontSize: 'inherit',
        margin: 0,
        outline: 0,
      },
      '.Select-placeholder, .Select--single .Select-value': {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.typography.pxToRem(16),
        padding: 0,
      },
      '.Select-placeholder': {
        opacity: 0.42,
        color: theme.palette.common.black,
      },
      '.Select-menu-outer': {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[2],
        position: 'absolute',
        left: 0,
        top: `calc(100% + ${theme.spacing.unit}px)`,
        width: '100%',
        zIndex: 2,
        maxHeight: ITEM_HEIGHT * 4.5,
      },
      '.Select.is-focused:not(.is-open) > .Select-control': {
        boxShadow: 'none',
      },
      '.Select-menu': {
        maxHeight: ITEM_HEIGHT * 4.5,
        overflowY: 'auto',
      },
      '.Select-menu div': {
        boxSizing: 'content-box',
      },
      '.Select-arrow-zone, .Select-clear-zone': {
        color: theme.palette.action.active,
        cursor: 'pointer',
        height: 21,
        width: 21,
        zIndex: 1,
      },
      // Only for screen readers. We can't use display none.
      '.Select-aria-only': {
        position: 'absolute',
        overflow: 'hidden',
        clip: 'rect(0 0 0 0)',
        height: 1,
        width: 1,
        margin: -1,
      },
    },
  });

   export default styles;