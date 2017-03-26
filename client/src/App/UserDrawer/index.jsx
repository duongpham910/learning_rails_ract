import ChangePasswordDialog from './ChangePasswordDialog';
import Divider from 'material-ui/Divider';
import EditProfileDialog from './EditProfileDialog';

const style = {
  menuItem: {
    paddingLeft: '50px',
    height: '48px',
    width: '250px',
  },
  subTitle: {
    paddingLeft: '16px',
    fontSize: '20px',
  },
};

export default class UserDrawer extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      openChangePasswordDialog: false,
      openEditProfileDialog: false,
    }
  }

  open = () => {
    this.refs.drawer.open();
  }

  handleOpenEditProfileDialog = () => {
    this.refs.editProfileDialog.open();
  }

  handleOpenChangePasswordDialog = () => {
    this.refs.changePasswordDialog.open();
  }

  handleLogout = () => {
    $.ajax({
      url: '/users/sign_out',
      method: 'DELETE',
      success(response) {
        window.location.href = '/';
      }
    });
  }

  renderMenuItem(item, icon, onClick) {
    return (
      <mui.MenuItem
        title={t(`app.user_drawer.${item}`)}
        innerDivStyle={style.menuItem}
        primaryText={t(`app.user_drawer.${item}`)}
        leftIcon={<i className='material-icons'>{icon}</i>}
        onClick={onClick}
      />
    );
  }

  renderItemInfo(name, icon, styleItem = style.menuItem) {
    return (
      <mui.MenuItem
        className="info"
        title={name}
        innerDivStyle={styleItem}
        primaryText={name}
        leftIcon={<i className='material-icons'>{icon}</i>}
      />
    );
  }

  render() {
    let auth = App.auth;

    return (
      <cm.Drawer
        ref="drawer"
        className="user-drawer">
        <div className="title" ref="userName">
          {auth.name}
        </div>
        <mui.Menu className="default-cursor main-function">
          {this.renderMenuItem('edit_profile', 'edit', this.handleOpenEditProfileDialog)}
          {this.renderMenuItem('change_password', 'lock', this.handleOpenChangePasswordDialog)}
          {this.renderMenuItem('sign_out', 'input', this.handleLogout)}
        </mui.Menu>
        <mui.Menu>
          <Divider />
          {this.renderItemInfo(t('app.user_drawer.user_info'),
            '', style.subTitle)}
          <Divider />
          {this.renderItemInfo(t(`master.users.roles.${auth.role}`), 'record_voice_over')}
          {this.renderItemInfo(auth.email, 'email')}
        </mui.Menu>
        <ChangePasswordDialog ref="changePasswordDialog" />
        <EditProfileDialog ref="editProfileDialog" />
      </cm.Drawer>
    );
  }
}
