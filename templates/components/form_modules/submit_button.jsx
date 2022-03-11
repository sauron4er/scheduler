import * as React from 'react';

class SubmitButton extends React.Component {
  state = {
    clicked: false
  }
  
  onClick = () => {
    this.setState({clicked: true});
    this.props.onClick();
    if (this.props.timer) {
      setTimeout(() => this.setState({clicked: false}), 10000)
    } else {
      this.setState({clicked: false})
    }

  };
  
  render() {
    const {text, className, disabled} = this.props;
    const {clicked} = this.state;

    return (
      <button className={`css_button my-2 ${className}`} onClick={() => this.onClick()} disabled={clicked || disabled}>
        {text}
      </button>
    );
  }

  static defaultProps = {
    className: '',
    text: '???',
    onClick: () => {},
    disabled: false,
    timer: true,
  };
}

export default SubmitButton;
