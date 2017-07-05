import feathersClient from '../constants/feathersClient';
import statisticStore from '../stores/statisticStore';
import { formatDate } from '../utils/CommonUtils';

//May throw exception
export async function fetchTotalCount() {
  console.log('current date', formatDate(new Date()));
  const historyService = feathersClient.service('/househistory');
  const res = await historyService.find({
    query: {
      date: formatDate(new Date()),
      $limit: 0
    }
  });
  console.log('Get res', res);
  statisticStore.setTotalCount(res.total);
}

export async function fetchNewCount() {
  const historyService = feathersClient.service('/househistory');
  const res = await historyService.find({
    query: {
      date: formatDate(new Date()),
      isnew: 1,
      $limit: 0
    }
  });
  statisticStore.setNewCount(res.total);
}

export async function fetchIncreaseCount() {
  const historyService = feathersClient.service('/househistory');
  const res = await historyService.find({
    query: {
      date: formatDate(new Date()),
      deltaprice: { $gt: 0 },
      $limit: 0
    }
  });
  statisticStore.setIncreaseCount(res.total);
}

export async function fetchReductionCount() {
  const historyService = feathersClient.service('/househistory');
  const res = await historyService.find({
    query: {
      date: formatDate(new Date()),
      deltaprice: { $lt: 0 },
      $limit: 0
    }
  });
  statisticStore.setReductionCount(res.total);
}