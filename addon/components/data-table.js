/*global console, confirm*/
import Ember from 'ember';
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
    if(this.get('columns.length') !== this.get('columnNames.length')) {
      console.warn('DATA-TABLE: A quantidade de parâmetros de "column" e "columnNames" é diferente e pode gerar erros de visualisação');
    }
    this.resetQueryParams();
    this.loadData();
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
    this.set('page', 1);
    this.set('filters', {
      limit: this.get('showRows'),
      skip: 0
    });
  },

  fakeRowsCounter: Ember.computed('showRows', function() {
    let counter = [];

    for (let i = 1; i <= this.get('showRows'); i++) {
      counter.push(i);
    }

    return counter;
  }),

  buildQuery(search) {
    var query = { or: [] };
    this.get('columns').map(function (column) {
      var obj = {};
      obj[column] = {contains: search};
      query.or.push(obj);
    });
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
            text: "Este registro será permanentemente removido do Nela e não será possível recupera-lo!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, remover!",
            cancelButtonText: "Cancelar!",
            closeOnConfirm: false,
            closeOnCancel: false
          },
          function(isConfirm) {
            if (isConfirm) {
              model.destroyRecord().then(() => {
                  swal("Removido com sucesso!", "", "success");
                })
                .catch((error) => {
                  swal("Ops", "Não foi possível remover este registro", "error");
                });
            }
          });
      } else {
        if(confirm("Tem certeza que deseja excluir o registro?")) {
          model.destroyRecord();
        }
      }
    }
	}
});
