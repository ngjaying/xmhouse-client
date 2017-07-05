import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import withMaterial from '../hocs/withMaterial';
import AppLayout from '../components/AppLayout';
import Layout from '../components/Layout';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import * as stores from '../stores';
import * as actions from '../actions';
import { Provider, observer, inject } from 'mobx-react';

@inject('statisticStore') @observer
class IndexPage extends React.Component {

  componentDidMount() {
    Promise.all([
      actions.fetchTotalCount(),
      actions.fetchIncreaseCount(),
      actions.fetchNewCount(),
      actions.fetchReductionCount(),
    ]);    
  }

  render() {
    return (
      <AppLayout title="厦门房事">        
        <Card>          
          <CardTitle title='今日更新' />
          <CardText>
            <div>在售<b>{this.props.statisticStore.totalCount}</b>套</div>
            <div>新上<b>{this.props.statisticStore.newCount}</b>套</div>
            <div>涨价<b>{this.props.statisticStore.increaseCount}</b>套</div>
            <div>降价<b>{this.props.statisticStore.reductionCount}</b>套</div>
          </CardText>          
        </Card>
      </AppLayout>);
  }
}

class Index extends React.Component {
  static getInitialProps({ req }) {

  }

  render() {
    return (
      <Provider {...stores}>
        <IndexPage />
      </Provider>
    )
  }
}

export default withMaterial(Index);
