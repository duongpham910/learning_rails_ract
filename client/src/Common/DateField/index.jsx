import areIntlLocalesSupported from 'intl-locales-supported';

const style = {
  fontSize: "14px"
};

let DateTimeFormat;

if (areIntlLocalesSupported(['ja', 'ja-JP'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
}

export default class DateField extends BaseComponent {
  constructor(props) {
    super(props);
  }

  handleChange = (event, date) => {
    this.props.onChange(event, date);
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

  onClearDatePickerClick = (proxy, event) => {
    this.props.onChange(event, null);
  };

  renderClearDate = () => {
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
          onClick={this.onClearDatePickerClick}
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
        <mui.DatePicker
          locale="ja"
          autoOk={true}
          name="date-picker"
          DateTimeFormat={DateTimeFormat}
          value={this.props.value ? (new Date(this.props.value)) : null}
          style={style}
          onFocus={this.handleFocus}
          onChange={this.handleChange}
          {...filteredProps}
        >
        </mui.DatePicker>
        {this.props.disabled ? null : this.renderClearDate()}
      </div>
    );
  }
}
