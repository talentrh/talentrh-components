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
  selectedRecords: Ember.A(),

  didInsertElement() {
    this.selectControl();
  },

  selectControl() {
    this.$('.talent-input-multiselect').on('click', ()=> {
      this.$('.talent-input-multiselect input').focus();
    });
    let active = -1;
    this.$(".talent-input-multiselect input").keydown(function(event) {
      console.log('>> ', event.keyCode);
  		var suggest_a = Ember.$('.talent-input-multiselect-options-container li');
  		var qnts_a = suggest_a.length;

  		if(40 === event.keyCode)//seta baixo
  			active = active>=(qnts_a-1) ? 0 : active+1;
  		else if(38 === event.keyCode)//seta cima
  			active = ( active<=0 ) ? qnts_a-1 : active-1;

  		var a = suggest_a.removeClass('active').eq( active ).addClass('active');
  	});

    this.$('.talent-input-multiselect input').on('focus', ()=> {
      this.loadRecordsToSelect();
      this.$('.talent-input-multiselect-options-container').show();
    });

    Ember.$(window).on('click', (e)=> {
      let multiSelect = this.$('.talent-input-multiselect');
      let clickedElement = Ember.$(e.target);
      let contains = this.$('.talent-input-multiselect').find(clickedElement).length;

      if (!contains) {
        this.$('.talent-input-multiselect-options-container').hide();
      }
    });
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
      .then( () => {
        this.get('model').reload();

        toastr.success('Pronto', 'Associado com sucesso');
      })
      .catch(() => {
        let message = response.errors && response.errors.length > 0 ? response.errors[0].title : 'Erro desconhecido';

        toastr.error('Ops', message);
      });
  },

  disassociateRecord(id) {
    this.get('ajax').delete('userlinks/' + this.get('model.id') + '/users/' + id)
      .then( () => {
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

  loadRecordsToSelect() {
    this.get('ajax').request(this.get('endpoint'))
    .then((recordsFound)=> {
      let simpleArrayOfContent = this.toSimpleObjectArray(this.get('content'));
      recordsFound = this.toSimpleObjectArray(recordsFound);
      recordsFound = this.excludeChosenRecords(recordsFound, simpleArrayOfContent);

      this.set('recordsToChoose', Ember.A(recordsFound));
    });
  },

  pushObject(record) {
    let content = this.get('content');
    let selectedRecords = this.get('selectedRecords');

    record = record.toJSON({ includeId:true });

    content.pushObject(record);
    selectedRecords.pushObject({ id: data.id, text: this.buildTextShow(data) });
  },

  actions: {
    openMultiSelectModal() {
      this.$('.multiSelectModal').modal('toggle');
      this.loadRecordsToSelect();
    },

    selectRecord(record) {
      let selectedRecords = this.get('selectedRecords');

      selectedRecords.pushObject(record);

      this.get('store')
      .findRecord(this.get('modelName'), record.id)
      .then((found)=> {
        this.get('content').pushObject(found);
        this.get('recordsToChoose').removeObject(record);
        this.$('.talent-input-multiselect input').focus();
        this.$('.talent-input-multiselect-options-container').hide();
        this.set('searchTerm', '');
      })
      .catch(()=> {
        selectedRecords.removeObject(record);
      });
    },

    // selectRecord(record) {
    //   this.get('store')
    //   .findRecord(this.get('modelName'), record.id)
    //   .then((found)=> {
    //     record.emberData = found;
    //
    //     this.get('chosenRecords').pushObject(record);
    //     this.get('recordsToChoose').removeObject(record);
    //   });
    // },

    deselectRecord(record) {
      let content = this.get('content');
      let selectedRecords = this.get('selectedRecords');
      let recordsToChoose = this.get('recordsToChoose');
      let found = content.findBy('id', record.id.toString());

      recordsToChoose.unshiftObject(found);
      content.removeObject(found);
      selectedRecords.removeObject(record);
    },

    searchByTerm() {
      let term = this.get('searchTerm');
      this.$('.talent-input-multiselect-options-container').show();

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
