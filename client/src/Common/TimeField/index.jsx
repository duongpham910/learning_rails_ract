const style = {
  fontSize: "14px"
};

export default class TimeField extends BaseComponent {
  constructor(props) {
    super(props);
  }

  handleChange = (event, time) => {
    this.props.onChange(event, time);
  };

  handleFocus = () => {
    this.setState({
      focus: true,
    });
  };

  renderLabel = (fieldName, required = false) => {
    let requiredText = required ? (<span className="required">{t('common.required')}</span>) : '';
    return (
      <label className="small-label">
        {fieldName}
        {requiredText}
      </label>
    );
  };

  onClearTimePickerClick = (proxy, event) => {
    this.props.onChange(event, null);
  };

  renderClearTime = () => {
    let buttonClearStyles = {
      position: "absolute",
      top: "28px",
      right: "15px",
      background: "transparent",
      outline: 0,
      border: 0,
      color: "#F00"
    };

    return (
      <div>
        <button
          style={buttonClearStyles}
          onClick={this.onClearTimePickerClick}
        >
          ✘
        </button>
      </div>
    );
  };

  render() {
    let props = this.props;
    let filteredProps = {};
    let extendedProps = ['fieldName', 'required', 'value'];
    Object.keys(props).map((k) => {
      if (extendedProps.indexOf(k) < 0) {
        filteredProps[k] = props[k];
      }
    });

    return (
      <div className="common-textfield">
        {this.props.fieldName ? (this.renderLabel(props.fieldName, props.required)) : null}
        <mui.TimePicker
          autoOk={true}
          format="24hr"
          name="time-picker"
          value={this.props.value ? new Date(this.props.value) : null}
          style={style}
          okLabel="确定"
          cancelLabel="取消"
          onFocus={this.handleFocus}
          onChange={this.handleChange}
          {...filteredProps}
        >
        </mui.TimePicker>
        {this.props.disabled ? null : this.renderClearTime()}
      </div>
    );
  }
}
