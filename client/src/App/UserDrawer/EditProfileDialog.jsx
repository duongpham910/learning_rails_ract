export default class EditProfileDialog extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = this.getDefaultState();
  }

  getDefaultState() {
    return {
      open: false,
      data: {name: App.auth.name},
      errors: {},
    }
  }

  open = () => {
    this.setState({
      open: true,
    });
  }

  close = () => {
    this.setState(this.getDefaultState());
  }

  // handleSubmitEditProfile = () => {
  //   API.User.updateProfile(this.handleEditProfileCallback, this.state.data);
  // }

  handleEditProfileCallback = (status, data) => {
    if (!status) {
      this.setState({
        errors: data || {},
      });
    } else {
      let auth = update(App.auth, {name: {$set: data.name}});
      App.updateAuth(auth);
      this.close();
      Helper.showMessage(t('common.message.updated_success'));
    }
  }

  handleChangeTextField = (fieldName, value) => {
    let data = update(this.state.data, {[fieldName]: {$set: value}});
    this.setState({
      data: data,
    });
  }

  renderTextInput(fieldName, name, options) {
    let error = this.state.errors[fieldName];
    return (
      <cm.TextField
        fieldName={name}
        name={fieldName}
        errorText={error ? error[0] : null}
        value={this.state.data[fieldName] || ''}
        onChange={(event, value) => this.handleChangeTextField(fieldName, value)}
        {...options}
      />
    )
  }

  render() {
    const editProfileFields = ['name'];

    let actionButton = (
      <cm.RaisedButton
        style={{minWidth: '110px'}}
        label={t('common.save')}
        primary={true}
        onClick={this.handleSubmitEditProfile}
      />
    );

    let content = (
      <div className="change-password-form">
        {editProfileFields.map((field) => {
          return (
            <div key={field}>
              {this.renderTextInput(field, t(`app.user_drawer.edit_profile_form.${field}`),
                {required: true, fullWidth: true, type: 'text', maxLength: 200})}
            </div>
          );
        })}
      </div>
    );

    return (
      <cm.Dialog
        title={t('app.user_drawer.edit_profile')}
        icon={<i className='material-icons'>edit</i>}
        actions={actionButton}
        onRequestClose={this.close}
        open={this.state.open}
        children={content}
      />
    );
  }
}
