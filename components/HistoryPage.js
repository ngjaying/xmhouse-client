import React from 'react';
import AppLayout from '../components/AppLayout';
import Layout from '../components/Layout';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { observer, inject } from 'mobx-react';
import * as actions from '../actions';

@inject('historyStore') @observer
export default class HistoryPage extends React.Component {

  componentDidMount() {
    if (this.props.historyStore.histories.length == 0) {
      if (this.props.type == 'reduction') {
        actions.fetchReduction();
      } else if (this.props.type == 'increase') {
        actions.fetchIncrease();
      } else if (this.props.type == 'highesetPrice') {
        actions.fetchHighestPrice();
      } else if (this.props.type == 'lowestPrice') {
        actions.fetchLowestPrice();
      } else if (this.props.type == 'highestUnitPrice') {
        actions.fetchHighestUnitPrice();
      } else if (this.props.type == 'lowestUnitPrice') {
        actions.fetchLowestUnitPrice();
      } else {
        console.log('error link');
      }
    }
  }

  render() {
    return (
      <AppLayout title="房子列表">
        {this.props.historyStore.histories.map((show) => (
          <Card>
            {/*<CardHeader
          title="URL Avatar"
          subtitle="Subtitle"
        />    */}
            <CardTitle title={show.plotname} subtitle={show.district} />
            <CardText>
              <div>降价<b>{show.deltaprice}</b></div>
              <p>{show.block}</p>
              <p>总价：{show.price}万&nbsp;&nbsp;单价：{show.unitprice}万</p>
            </CardText>
            <CardActions>
              <RaisedButton label="查看" href={`https://xm.lianjia.com/ershoufang/${show.houseid}.html`} />
            </CardActions>
          </Card>
        ))}
      </AppLayout>);
  }
}