import { observable, action } from 'mobx';

class StatisticStore {
    @observable totalCount;
    @observable newCount;
    @observable increaseCount;
    @observable reductionCount;

    constructor(){
      this.totalCount = 0;
      this.newCount = 0;
      this.increaseCount = 0;
      this.reductionCount = 0;
    }
    
    @action setTotalCount = (count) => {
      this.totalCount = count;
    }

    @action setNewCount = (count) => {
      this.newCount = count;
    }

    @action setIncreaseCount = (count) => {
      this.increaseCount = count;
    }

    @action setReductionCount = (count) => {
      this.reductionCount = count;
    }

}

const statisticStore = new StatisticStore();

export default statisticStore;
export { StatisticStore };