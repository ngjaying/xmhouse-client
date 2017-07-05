import withMaterial from '../hocs/withMaterial';
import * as stores from '../stores';
import { Provider } from 'mobx-react';
import HistoryPage from '../components/HistoryPage';

class HistoryList extends React.Component {  

  render() {
    return (
      <Provider {...stores}>
        <HistoryPage type={this.props.url.query.type}/>
      </Provider>
    )
  }
}

export default withMaterial(HistoryList);
