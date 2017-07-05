import React from 'react';
import { List, ListItem } from 'material-ui/List';
import ActionTrackChanges from 'material-ui/svg-icons/action/track-changes';
import ActionTrendingDown from 'material-ui/svg-icons/action/trending-down';
import ActionTrendingUp from 'material-ui/svg-icons/action/trending-up';
import ImageBrightness1 from 'material-ui/svg-icons/image/brightness-1';
import ImageBrightness3 from 'material-ui/svg-icons/image/brightness-3';
import ImageBrightness4 from 'material-ui/svg-icons/image/brightness-4';
import ImageBrightness5 from 'material-ui/svg-icons/image/brightness-5';
import Subheader from 'material-ui/Subheader';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import Header from './Header';
import NoSSR from 'react-no-ssr';
import MediaQuery from 'react-responsive';
import Link from 'next/link';
import * as actions from '../actions';
let classNames = require('classnames');

const style = { margin: 4 };

class MyDrawer extends React.Component {
  state = {
    open: this.props.docked ? true : this.props.open,
    docked: this.props.docked
  };

  componentDidMount() {
    if (this.state.docked) {
      this.props.setContentState(this.state.open, this.state.docked);
    }
  }
  componentWillReceiveProps(newProps) {
    if (
      this.state.open !== newProps.open || this.state.docked !== newProps.docked
    ) {
      this.setState(
        {
          open: newProps.docked != this.state.docked && newProps.docked
            ? true
            : newProps.open,
          docked: newProps.docked
        },
        () => {
          this.props.setContentState(this.state.open, this.state.docked);
        }
      );
    }
  }
  render() {
    const isdocked = this.state.docked;
    return (
      <Drawer
        zDepth={1}
        docked={this.state.docked}
        open={this.state.open}
        onRequestChange={open => this.props.onRequestChange(open, isdocked)}
      >
        <List>
          <Link href='/index'>
            <ListItem primaryText="每日状态" leftIcon={<ActionTrackChanges />} />   
          </Link>
          <Subheader>链家数据</Subheader>
          <Link href='/historyList?type=reduction'>
            <ListItem primaryText="降价榜" leftIcon={<ActionTrendingDown />} onTouchTap={actions.fetchReduction} />
          </Link>
          <Link href='/historyList?type=increase'>
            <ListItem primaryText="涨价榜" leftIcon={<ActionTrendingUp />}  onTouchTap={actions.fetchIncrease} />
          </Link>
          <Link href='/historyList?type=highestPrice'>
            <ListItem primaryText="总价最高" leftIcon={<ImageBrightness1 />}  onTouchTap={actions.fetchHighestPrice} />
          </Link>
          <Link href='/historyList?type=lowestPrice'>
            <ListItem primaryText="总价最低" leftIcon={<ImageBrightness3 />}  onTouchTap={actions.fetchLowestPrice} />
          </Link>
          <Link href='/historyList?type=highestUnitPrice'>
            <ListItem primaryText="单价最高" leftIcon={<ImageBrightness5 />}  onTouchTap={actions.fetchHighestUnitPrice} />
          </Link>
          <Link href='/historyList?type=lowestUnitPrice'>
            <ListItem primaryText="单价最低" leftIcon={<ImageBrightness4 />}  onTouchTap={actions.fetchLowestUnitPrice} />
          </Link>
        </List>
      </Drawer>
    );
  }
}

export default class MyComponent extends React.Component {
  state = { open: false, withWidth: false };

  handleToggle = () => {
    this.setState({ open: !this.state.open });
  };

  handleClose = () => {
    this.setState({ open: true });
  };

  setContentState = (open, docked) => {
    if (open && docked) {
      this.setState({ withWidth: true, open: open });
    } else if (!open && docked) {
      this.setState({ withWidth: false, open: open });
    } else if (!docked) {
      this.setState({ withWidth: false });
    }
  };

  handleRequestChange = (open, docked) => {
    this.setState({ open }, () => {
      this.setContentState(open, docked);
    });
  };

  render() {
    return (
      <div>
        <Header />
        <AppBar
          className={classNames('app-bar', { expanded: this.state.withWidth })}
          style={{
            height: 60,
            top: 0,
            position: 'fixed'
          }}
          onLeftIconButtonTouchTap={this.handleToggle}
          title={this.props.title}
          /*iconElementRight={
            <Avatar size={40} style={style}>
              A
            </Avatar>
          }*/
        />
        <style>
          {
            `
                .app-bar{
                -moz-transition: left 218ms cubic-bezier(0.4, 0, 0.2, 1);
                -o-transition: left 218ms cubic-bezier(0.4, 0, 0.2, 1);
                -webkit-transition: left 218ms cubic-bezier(0.4, 0, 0.2, 1);
                transition: left 218ms cubic-bezier(0.4, 0, 0.2, 1);
                left: 0;
                width: auto !important;
                right: 0 !important;
                position: fixed !important;
                }
                .app-content{
                -moz-transition: padding-left 218ms cubic-bezier(0.4, 0, 0.2, 1);
                -o-transition: padding-left 218ms cubic-bezier(0.4, 0, 0.2, 1);
                -webkit-transition: padding-left 218ms cubic-bezier(0.4, 0, 0.2, 1);
                transition: padding-left 218ms cubic-bezier(0.4, 0, 0.2, 1);
                padding-right: 10px !important;
                padding-left: 5px;
                padding-top: 68px !important;
                }
                .app-bar.expanded{
                left: 255px;
                }

                .app-content.expanded{
                padding-left: 260px;
                }

                `
          }
        </style>
        <NoSSR onSSR={null}>

          <MediaQuery maxWidth={768}>
            {matches => {
              if (matches) {
                return (
                  <MyDrawer
                    open={this.state.open}
                    docked={false}
                    setContentState={this.setContentState}
                    onRequestChange={this.handleRequestChange}
                  />
                );
              } else {
                return (
                  <MyDrawer
                    setContentState={this.setContentState}
                    open={this.state.open}
                    onRequestChange={this.handleRequestChange}
                    docked={true}
                  />
                );
              }
            }}

          </MediaQuery>
        </NoSSR>
        <div
          className={classNames('app-content', {
            expanded: this.state.withWidth
          })}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
