import Ember from 'ember';
import layout from '../templates/components/ember-pagination';

export default Ember.Component.extend({
  layout,
  didInsertElement: function() {
    // if(this.get('total') == 0) return;
    this.renderPagination();
  },

  remakePagination: Ember.observer('total', function() {
    this.resetPagesSelected();
    this.renderPagination();
  }),

  renderPagination: function() {
    var total = this.get('total') > 0 ? this.get('total'): 1,
        perPage = this.get('perPage'),
        limit = this.get('limit');

    var pages = total/perPage;
    var arrayPages = Ember.A();

    for (var i = 0; i < pages; i++) {
      arrayPages.push({ pageNumber: i+1, selected: false });
    }

    this.set('arrayPagesFull', arrayPages);
    this.set('arrayPages', Ember.A(arrayPages.slice(0, limit)));
    Ember.set(this.get('arrayPages.firstObject'), 'selected', true);
    this.updatePrevNext();
  },

  updatePrevNext: function() {
    var min = this.get('arrayPages.firstObject'),
      max = this.get('arrayPages.lastObject'),
      arrayPagesFull = this.get('arrayPagesFull');
    this.set('havePrev', (min.pageNumber > 1 ? true:false));
    this.set('haveNext', (max.pageNumber < arrayPagesFull.length ? true:false));
  },

  resetPagesSelected: function(/*element*/) {
    var arrayPages = this.get('arrayPages');
    arrayPages.forEach(function(page) {
      Ember.set(page, 'selected', false);
    });
  },

  selectNextPrevPage: function(direction) {
    var arrayPages = this.get('arrayPages');
    var page = direction === 'next' ? arrayPages.get('firstObject') : arrayPages.get('lastObject');
    this.send('loadNewPage', page);
  },

  actions: {
    loadNewPage: function(page) {
      this.sendAction('loadAction', page.pageNumber);
      this.resetPagesSelected();
      var pages = this.get('arrayPages');
      Ember.set(pages.objectAt(page.pageNumber-1), 'selected', true);
    },

    next: function() {
      var skip = this.get('arrayPages.lastObject.pageNumber');
      var arrayPagesFull = this.get('arrayPagesFull');

      if (skip < arrayPagesFull.length) {
        this.set('haveNext', true);
        this.set('arrayPages', Ember.A(arrayPagesFull.slice(skip, skip + this.get('limit'))));
      }
      this.updatePrevNext();
      this.selectNextPrevPage('next');
    },

    prev: function() {
      var skip = this.get('arrayPages.firstObject.pageNumber');
      skip--;
      var arrayPagesFull = this.get('arrayPagesFull');
      if (skip !== 0) {
        this.set('havePrev', true);
        this.set('arrayPages', Ember.A(arrayPagesFull.slice(skip - this.get('limit'), skip)));
      }
      this.updatePrevNext();
      this.selectNextPrevPage('prev');
    }
  }
});
