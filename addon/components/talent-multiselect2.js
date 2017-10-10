import Ember from 'ember';
import layout from '../templates/components/talent-multiselect2';
import _ from 'lodash';

export default Ember.Component.extend({
  layout,
  classNames: 'talent-input-validation talent-input-multiselect2',
  session: Ember.inject.service(),
  store: Ember.inject.service(),
  ajax: Ember.inject.service(),
  chosenRecords: Ember.A(),

  didInsertElement() {
    let that = this;
    let $select = this.buildSelect();
    $select.on("select2:select", (e)=> {
      if (this.get('persistOnSelecting')) {
        that.persistUser(e.params.data.id);
      } else {
        that.addRecord(e.params.data.id);
      }
    });

    $select.on("select2:unselect", (e)=> {
      if (this.get('persistOnSelecting')) {
        that.disassociateRecord(e.params.data.id);
      } else {
        that.removeRecord(e.params.data.id);
      }
    });

    if (this.get('persistOnSelecting')) {
      this.loadItemsSelectedOfServer();
    } else {
      this.loadItemsSelected();
    }
  },

  loadItemsSelected() {
    let typeUser = this.get('content');
    let selectedLink = this.get('endpointSelecteds');
    if (!selectedLink) { return; }

    this.get('ajax').request(selectedLink)
    .then((usersSelected)=> {
      let selecteds = usersSelected[this.get('modelName')];
      if (!selecteds) return;

      selecteds = _.map(selecteds, (item)=> {
        return { id: item.id, text: this.buildTextShow(item) };
      });

      this.set('selecteds', Ember.A(selecteds));
      this.buildSelect();
    });
  },

  buildSelect: function() {
    let config = Ember.getOwner(this).resolveRegistration('config:environment');
    let tokenProperty = (this.get('tokenProperty') || 'token');

    return this.$('select')
    .select2({
      ajax: {
        headers: {
          "Authorization": "Bearer " + this.get('session.session.content.authenticated.' + tokenProperty),
          "Content-Type": "application/json",
        },
        delay: 300,
        url: config.apiBaseUrl + this.get('endpoint'),
        processResults: (data)=> {
          let content = this.get('content');
          _.remove(data, function(item) {
            let found = content.find(function(findItem) {
              return item.id == findItem.id;
            });
            return found ? true:false;
          });

          return {
            results: $.map(data, (obj)=> {
              obj.text = this.buildTextShow(obj);
              return obj;
            })
          };
        }
    }});
  },

  addRecord(id) {
    this.get('store')
    .findRecord(this.get('modelName'), id)
    .then((found)=> {
      let content = this.get('content');
      content.pushObject(found);
    });
  },

  removeRecord(id) {
    let content = this.get('content');

    let found = content.findBy('id', id);
    content.removeObject(found);
  },

  loadItemsSelectedOfServer: function() {
    let selectedLink = this.get('endpointSelecteds');

    this.get('ajax').request(selectedLink)
      .then((usersSelected) => {
        let selecteds = usersSelected[this.get('modelName')];
        if (!selecteds) {return;}

        selecteds = _.map(selecteds, (item) => {
          return {
            id: item.id,
            text: this.buildTextShow(item)
          };
        });

        this.set('selecteds', Ember.A(selecteds));
        this.buildSelect();
      });
  },

  persistUser(id) {
    this.get('ajax').post('userlinks/' + this.get('model.id') + '/users/' + id)
      .then( (response) => {
        this.get('model').reload();

        toastr.success('Pronto', 'Associado com sucesso');
      })
      .catch((response) => {
        let message = response.errors && response.errors.length > 0 ? response.errors[0].title : 'Erro desconhecido';

        toastr.error('Ops', message);
      });
  },

  disassociateRecord(id) {
    this.get('ajax').delete('userlinks/' + this.get('model.id') + '/users/' + id)
      .then( (response) => {
        this.get('model').reload();
        toastr.success('Pronto', 'Removido com sucesso');
      });
  },

  buildTextShow(obj) {
    let showProperties = this.get('showProperties');
    let splited = showProperties.split('|');
    let textShow = '';

    if (!obj || !showProperties) {return;}
    splited.forEach((item) => {
      textShow += ' ' + (obj[item] || item);
    });

    return textShow;
  },

  toSimpleObjectArray(dataArray) {
    return _.map(dataArray, (item)=> {
      let data;
      if (item.toJSON) {
        data = item.toJSON({ includeId: true })
        data.emberData = item;
      } else {
        data = item;
      }

      let newObj = { id: data.id, text: this.buildTextShow(data), emberData: data.emberData };
      return newObj;
    });
  },

  excludeChosenRecords(dataArray, chosenRecords) {
    return _.filter(dataArray, (item)=> {
      return !_.find(chosenRecords, (obj)=> {
        return parseInt(item.id) === parseInt(obj.id);
      });
    });
  },

  actions: {
    openMultiSelectModal() {
      this.$('.multiSelectModal').modal('toggle');
      this.get('ajax').request(this.get('endpoint'))
      .then((recordsFound)=> {
        let simpleArrayOfContent = this.toSimpleObjectArray(this.get('content'));
        recordsFound = this.toSimpleObjectArray(recordsFound);
        recordsFound = this.excludeChosenRecords(recordsFound, simpleArrayOfContent);

        this.set('recordsToChoose', Ember.A(recordsFound));
        this.set('chosenRecords', Ember.A(simpleArrayOfContent));
      });
    },

    selectRecord(record) {
      this.get('store')
      .findRecord(this.get('modelName'), record.id)
      .then((found)=> {
        record.emberData = found;

        this.get('chosenRecords').pushObject(record);
        this.get('recordsToChoose').removeObject(record);
      });
    },

    deselectRecord(record) {
      this.get('recordsToChoose').unshiftObject(record);
      this.get('chosenRecords').removeObject(record);
    },

    searchByTerm() {
      let term = this.get('searchTerm');

      this.get('ajax').request(this.get('endpoint') + '?term=' + term)
      .then((records)=> {
        let ignoreRecords = this.get('chosenRecords').toArray();
        ignoreRecords.pushObjects(this.get('content').toArray());

        records = _.map(records, (item)=> {
          let wasChose = _.find(ignoreRecords, (obj)=> {
            return parseInt(item.id) === parseInt(obj.id);
          });

          if (wasChose) { return; }
          return { id: item.id, text: this.buildTextShow(item) };
        });

        this.set('recordsToChoose', Ember.A(_.compact(records)));
      });
    },

    confirmSelectedRecords() {
      let chosenRecords = this.get('chosenRecords');

      this.set('selecteds', chosenRecords);
      this.set('content', Ember.A(_.map(chosenRecords, 'emberData')));
      // this.$('select').empty();
      this.$('select').val([]);
      this.$('select').select2('destroy');
      this.buildSelect();
      this.$('.multiSelectModal').modal('toggle');
    }
  }
});
