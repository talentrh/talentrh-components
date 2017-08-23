import Ember from 'ember';

export default Ember.TextField.extend({
  classNames: ['form-control'],

  didInsertElement () {
    let elementId = '#' + this.get('elementId');
    if(this.get('value')) {
      $(elementId).addClass('static').addClass('dirty');
    } else {
      $(elementId).addClass('static').removeClass('dirty');
    }
  }
});
