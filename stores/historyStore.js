import { observable, action } from 'mobx';

class HistoryStore {
  @observable histories;

  constructor() {
    this.histories = [];
  }

  @action reset = () => {
    this.histories = [];
  }

  @action set = (newHistories) => {
    this.histories = [];
    this.merge(newHistories);
  }

  @action merge = (newHistories) => {
    newHistories.forEach(function (element) {
      this.histories.push(element);
    }, this);
  }

}

const historyStore = new HistoryStore();

export default historyStore;
export { HistoryStore };