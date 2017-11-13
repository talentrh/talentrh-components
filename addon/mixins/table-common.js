import Ember from 'ember';
import Table from 'ember-light-table';
import { task } from 'ember-concurrency';

export default Ember.Mixin.create({
  store: Ember.inject.service(),

  skip: 0,
  limit: 10,
  dir: 'ASC',
  sort: null,

  isLoading: Ember.computed.oneWay('fetchRecords.isRunning'),
  canLoadMore: true,
  enableSync: true,

  model: null,
  meta: null,
  columns: null,
  table: null,

  init() {
    this._super(...arguments);
    this.set('model',[]);
    this.set('sort', this.get('sortBy'));

    // if(!this.get('modelName')) {
    //   this.set('modelName', 'user');
    // }
    this.initColumns();

    let table = new Table(this.get('columns'), this.get('model'), { enableSync: this.get('enableSync') });
    let sortColumn = table.get('allColumns').findBy('valuePath', this.get('sort'));

    // Setup initial sort column
    if (sortColumn) {
      sortColumn.set('sorted', true);
    }

    this.set('table', table);
  },

  initColumns() {
    console.log('modelName -> ', this.get('modelName'));
    var Model = this.get('store').createRecord(this.get('modelName'))
    var attrs = Ember.A([]);

    Model.eachAttribute(function(name, meta) {
       console.log(name, meta.options.attrName);
       var label = meta.options.attrName ? meta.options.attrName: name;
       attrs.push({label: label, valuePath: name});
     });

    console.log(attrs);
    this.set('columns', attrs);
  },

  fetchRecords: task(function*() {
    let properties = this.getProperties(['skip', 'limit', 'sort']);

    let records = yield this.get('store').query(this.get('modelName'), properties);
    this.get('model').pushObjects(records.toArray());
    this.set('meta', records.get('meta'));

    let canLoadMore = records.toArray().length === properties.limit? true: false;
    this.set('canLoadMore', canLoadMore);

  }).restartable(),

  actions: {
    onScrolledToBottom() {
      if (this.get('canLoadMore')) {
        // this.incrementProperty('skip');
        this.get('fetchRecords').perform();
        var newSkip = this.get('skip') + this.get('limit');
        this.set('skip', newSkip);
      }
    },

    onColumnClick(column) {
      let dir = column.ascending ? 'ASC' : 'DESC';
      if (column.sorted) {
        this.setProperties({
          dir: dir,
          sort: column.get('valuePath') + ' ' + dir,
          canLoadMore: true,
          skip: 0
        });
        this.get('model').clear();
      }
    }
  }
});
