import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import withMaterial from '../hocs/withMaterial';
import AppLayout from '../components/AppLayout';
import Layout from '../components/Layout';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import feathers from 'feathers/client';
import rest from 'feathers-rest/client';
import fetch from 'node-fetch';

const style={padding:'10px'}
const Index = (props) => (
  <AppLayout title="厦门房事">
    {props.shows.map((show) => (
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
  </AppLayout>
)

Index.getInitialProps = async function() {
  const baseUrl = 'http://119.29.68.179/xhapi';
  const feathersClient = feathers().configure(rest(baseUrl).fetch(fetch));
  const history = feathersClient.service('/househistory');
  const res = await history.find({
    query: {
      deltaprice : {$lt : 0},
      $limit: 10,
      $sort: {
        date: -1,
        deltaprice: 1
      }
    }
  });

  console.log(`Show data fetched. Count`, res.data);

  return {
    shows: res.data
  }
}


export default withMaterial(Index);
