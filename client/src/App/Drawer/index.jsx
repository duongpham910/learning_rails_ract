export default class Drawer extends BaseComponent {
  constructor(props) {
    super(props);
  }

  handleTouchMenu = (e, menuItem) => {
    Helper.transitionTo(menuItem.props.value);
  };

  renderMenuItem(item, transitionTo, icon, isCustomIcon) {
    let isActive;
    isActive = (this.props.currentPath + '/').search(item + '/') !== -1;
    let menuItemIcon = isCustomIcon ?
      <i className={icon + (isActive ? '-active' : '')}/> :
      <i className="material-icons">{icon}</i>;
    if (!App.auth.authorized_pages[item]) {
      return null;
    }
    return (
      <mui.MenuItem
        title={t(`app.drawer.${item}`)}
        className={'drawer-item ' + (isActive ? 'active-item' : 'normal-item')}
        innerDivStyle={this.props.collapsed ? {} : {paddingLeft: "50px"}}
        primaryText={t(`app.drawer.${item}`)}
        leftIcon={menuItemIcon}
        value={transitionTo}
      />
    );
  }

  render() {
    let drawerClass = this.props.collapsed ? 'drawer-close' : 'drawer-open';
    let width = this.props.collapsed ? 56 : 195;
    return (
      <mui.Drawer open={true} width={width} className="app-drawer">
        <div className={drawerClass}>
          <div className="logo-wrapper pointer">
            <div className="logo" onClick={() => Helper.transitionTo("/")}>
              <img src="/images/logo.png" width="127" height="40"/>
            </div>
          </div>
          <mui.Menu
            onItemTouchTap={this.handleTouchMenu}
            className="default-cursor"
          >
            {this.renderMenuItem('top', '/', 'home')}
            {this.renderMenuItem('receptions', '/receptions', 'bookmark')}
            {this.renderMenuItem('master', '/master', 'work')}
            {this.renderMenuItem('output_data', '/output_data', 'archive')}
            {this.renderMenuItem('references', '/references', 'history')}
            {this.renderMenuItem('import_data', '/import_data', 'unarchive')}
          </mui.Menu>
          <div className="drawer-toggle" onClick={this.props.onToggle}/>
        </div>
      </mui.Drawer>
    );
  }
}
