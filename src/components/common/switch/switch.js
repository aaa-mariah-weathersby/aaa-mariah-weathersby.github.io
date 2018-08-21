import React from 'react';
import Switch from '@material-ui/core/Switch';
import blue from '@material-ui/core/colors/blue';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
  palette: {
    primary: { 
      main: "#0099ff" 
    }, 
    secondary: {
      light: '#0099ff',
      main: '#0099ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#0099ff',
    },
  },
});

class Switches extends React.Component {
  state = {
    checked: false,
  };

  componentDidMount(){
    if (this.props.defaultcheck) {
      this.setState({ checked: true });
    }
  }
  

  handleChange = name => event => {
    
    this.setState(
      { [name]: !this.state.checked },
      () => { 
        if(this.props.onClick)
          this.props.onClick(this)
      }
    );

    if (this.props.checkOverride)
      this.setState({ [name]: this.props.checkOverride })


  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Switch
          checked={this.props.checkOverride !== null ? this.props.checkOverride : this.state.checked}
          onChange={this.handleChange('checked')}
          value={this.props.value}
          name={this.props.value}
          color={"primary"}
        />
      </MuiThemeProvider>

    );
  }
}

export default Switches;