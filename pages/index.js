import React from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import withMaterial from '../hocs/withMaterial'
import AppLayout from '../components/AppLayout'
import Paper from 'material-ui/Paper';
import Layout from '../components/Layout'

const style={padding:'10px'}
const index = (props) => (
  <AppLayout>
  <Paper style={style}>Welcome to this state-of-the-art Enterprise grade Web App!
    <br/>
    {props.userAgent}
    <RaisedButton label="Start" primary  style={{ margin: 12 }} />
  </Paper>
  </AppLayout>
)

export default withMaterial(index);
