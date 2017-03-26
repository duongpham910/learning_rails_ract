export default class FixedTextField extends mui.TextField {
  handleInputChange = (event) => {
    if (this.props.onChange) this.props.onChange(event, event.target.value);
  }
}
