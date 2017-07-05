import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import withMaterial from '../hocs/withMaterial';
import AppLayout from '../components/AppLayout';
import Layout from '../components/Layout';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import * as stores from '../stores';
import * as actions from '../actions';
import { Provider, observer, inject } from 'mobx-react';

@inject('historyStore') @observer
class ReductionPage extends React.Component {

  componentDidMount() {
    actions.fetchReduction();
  }

  render() {
    return (
      <AppLayout title="厦门房事">
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

class Index extends React.Component {
  static getInitialProps({ req }) {

  }

  render() {
    return (
      <Provider {...stores}>
        <ReductionPage />
      </Provider>
    )
  }
}

export default withMaterial(Index);
