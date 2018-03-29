/*global console, confirm, alert*/
import Ember from 'ember';
import _ from 'lodash';
import layout from '../templates/components/data-table';

export default Ember.Component.extend({
  layout,
  isLoadingData: true,
  store: Ember.inject.service(),
  columns: [],
  columnNames: [],
  showRows: 5,
  page: 1,
  showActions: true,
  showDeleteButton: true,

  didInsertElement() {
    if(typeof this.get('columnNames') === 'string' ) {
      this.set('columnNames', this.get('columnNames').split(','));
    }
    if(typeof this.get('columns') === 'string' ) {
      this.set('columns', this.get('columns').split(','));
    }
    if(typeof this.get('concatColumns') === 'string' ) {
      this.buildConcatColumns();
    }
    if(typeof this.get('computedProperties') === 'string' ) {
      this.buildComputedProperties();
    }
    if(this.get('columns.length') !== this.get('columnNames.length')) {
      console.warn('DATA-TABLE: A quantidade de parâmetros de "column" e "columnNames" é diferente e pode gerar erros de visualisação');
    }
    this.resetQueryParams();
    this.loadData();
  },

  buildConcatColumns() {
    let concatColumns = [];
    let splited = this.get('concatColumns').split(',');

    splited.forEach((row)=> {
      let computedProps = row.split('|');
      concatColumns.push({ fields: computedProps  });
    });

    this.set('concatColumns', concatColumns);
  },

  buildComputedProperties() {
    let computedProperties = [];
    let splited = this.get('computedProperties').split(',');

    splited.forEach((row)=> {
      let objectRow = {};
      let rowSplited = row.split('=');
      let computedProps = _.last(rowSplited).split('|');
      let relationshipProperty = _.first(rowSplited).split('.');

      if (relationshipProperty.length > 1) {
        computedProps = _.map(computedProps, (o)=> {
          return _.first(relationshipProperty) + '.' + o;
        });
      }

      objectRow.key = _.first(rowSplited);
      objectRow.properties = computedProps;
      computedProperties.push(objectRow);
    });

    this.set('computedProperties', computedProperties);
  },

  loadData() {
    this.set('isLoadingData', true);
    this.get('store')
      .query(this.get('modelName'), this.get('filters'))
      .then((model) => {
        this.set('model', model);
        this.set('isLoadingData', false);
      });
  },

  resetQueryParams() {
    let fixedFilter = this.get('fixedFilter') || {};
    let filter = {
      limit: this.get('showRows'),
      skip: 0
    };

    this.set('filters', _.assign(filter, fixedFilter));
    this.set('page', 1);
  },

  fakeRowsCounter: Ember.computed('showRows', function() {
    let counter = [];

    for (let i = 1; i <= this.get('showRows'); i++) {
      counter.push(i);
    }

    return counter;
  }),

  buildQuery(search) {
    let columns = this.get('columns');
    let computedProperties = this.get('computedProperties');
    let concatColumns = this.get('concatColumns');
    let query = { or: [] };

    let computedProperty;
    columns.map(function (column) {
      computedProperty = _.find(computedProperties, { key: column });
      var obj;

      if (computedProperty) {
        computedProperty.properties.forEach((property)=> {
          obj = {};
          obj[property] = {contains: search};
          query.or.push(obj);
        });
      } else {
        obj = {};
        obj[column] = {contains: search};
        query.or.push(obj);
      }
    });

    if (concatColumns) {
      concatColumns.map(function (column) {
        let obj = {};
        obj.concat = {
          fields: column.fields,
          separator: ' ',
          contains: search
        };
        query.or.push(obj);
      });
    }

    return query;
  },

	actions: {
		changePage(page) {
      this.set('page', page);
			this.set('filters.skip', (page-1) * this.get("showRows"));
			this.loadData();
		},
    searchOnKeyUp: function(searchTerms) {
      this.resetQueryParams();

			if (searchTerms === '') {
				this.loadData();
			} else {
				clearTimeout(this.get('searchDelay'));
				this.set('searchDelay', setTimeout(() => {
					this.set('filters.where', JSON.stringify(this.buildQuery(searchTerms)));
					this.loadData();
				}, 300));
			}
		},
    delete(model) {
      if(swal) {
        swal({
            title: "Tem certeza que deseja remover este registro?",
            text: "Este registro será permanentemente removido e não será possível recupera-lo!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, remover!",
            cancelButtonText: "Cancelar!",
            closeOnConfirm: false,
            closeOnCancel: true
          },
          function(isConfirm) {
            if (isConfirm) {
              model.destroyRecord().then(() => {
                  swal("Removido com sucesso!", "", "success");
                })
                .catch((/*error*/) => {
                  swal("Ops", "Não foi possível remover este registro", "error");
                });
            }
          });
      } else {
        if(confirm("Tem certeza que deseja excluir o registro?")) {
          model.destroyRecord().then(() => {
              alert("Removido com sucesso!");
            })
            .catch((/*error*/) => {
              alert("Ops", "Não foi possível remover este registro");
            });
        }
      }
    }
	}
});
