import HeaderItem from './item.jsx';
import UserDrawer from './../UserDrawer';
import AddCircle from 'material-ui/svg-icons/content/add-circle';

export default class HeaderMenu extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      linkTo: null
    }
  }

  handleOpenDrawer = (ref) => {
    this.refs[ref].open();
  };

  setToolBar = (title, linkTo) => {
    this.setState({
      title: title,
      linkTo: linkTo,
    });
  };

  renderButtonCreate() {
    return (
      <cm.RaisedButton
        icon={<AddCircle />}
        className="btn-header-menu big-icon"
        primary={true}
        label={t('common.create')}
        transitionTo={this.state.linkTo}
      />
    )
  };

  render() {
    return (
      <div className="header-bar">
        <h4>{this.state.title}</h4>
        <ul>
          <li>
            <HeaderItem
              icon="perm_identity"
              className="pointer"
              onClick={() => this.handleOpenDrawer('userDrawer')}
            />
          </li>
          {this.state.linkTo ? <li className="btn-header-menu">{this.renderButtonCreate()}</li> : null}
        </ul>
        <UserDrawer ref="userDrawer"/>
      </div>
    )
  }
}
