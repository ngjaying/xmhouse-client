import feathersClient from '../constants/feathersClient';
import historyStore from '../stores/historyStore';

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
    historyStore.set(res.data);
}