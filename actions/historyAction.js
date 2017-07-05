import feathersClient from '../constants/feathersClient';
import historyStore from '../stores/historyStore';

export function resetHistory(){
  historyStore.reset();
}
//May throw exception
export async function fetchReduction(){
    const historyService = feathersClient.service('/househistory');
    const res = await historyService.find({
        query: {
            deltaprice : {$lt : 0},
            $limit: 10,
            $sort: {
                date: -1,
                deltaprice: 1
            }
        }
    });
    console.log('Get res', res); 
    historyStore.set(res.data);
}

export async function fetchIncrease(){
    const historyService = feathersClient.service('/househistory');
    const res = await historyService.find({
        query: {
            deltaprice : {$gt : 0},
            $limit: 10,
            $sort: {
                date: -1,
                deltaprice: -1
            }
        }
    });
    console.log('Get res', res); 
    historyStore.set(res.data);
}

export async function fetchHighestPrice(){
    const historyService = feathersClient.service('/househistory');
    const res = await historyService.find({
        query: {
            $limit: 10,
            $sort: {
                date: -1,
                price: -1
            }
        }
    });
    historyStore.set(res.data);
}

export async function fetchLowestPrice(){
    const historyService = feathersClient.service('/househistory');
    const res = await historyService.find({
        query: {
            $limit: 10,
            $sort: {
                date: -1,
                price: 1
            }
        }
    });
    historyStore.set(res.data);
}

export async function fetchHighestUnitPrice(){
    const historyService = feathersClient.service('/househistory');
    const res = await historyService.find({
        query: {
            $limit: 10,
            $sort: {
                date: -1,
                unitprice: -1
            }
        }
    });
    historyStore.set(res.data);
}

export async function fetchLowestUnitPrice(){
    const historyService = feathersClient.service('/househistory');
    const res = await historyService.find({
        query: {
            $limit: 10,
            $sort: {
                date: -1,
                unitprice: 1
            }
        }
    });
    historyStore.set(res.data);
}