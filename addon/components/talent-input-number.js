import Ember from 'ember';

export default Ember.TextField.extend({
  classNames: ['form-control'],

  didInsertElement () {
    this.floatLabel();
    this.maxRangeValidation();
  },

  onChangeValue: Ember.observer('value', function() {
    this.floatLabel();
    this.maxRangeValidation();
  }),

  floatLabel() {
    let input = Ember.$('#' + this.get('elementId'));
    if(this.get('value')) {
      input.addClass('static').addClass('dirty');
    } else {
      input.removeClass('static').removeClass('dirty');
    }
  },

  maxRangeValidation() {
    let max = parseInt(this.get('max'));
    let min = parseInt(this.get('min'));

    let value = parseInt(this.get('value'));

    if (value > max) {
      this.set('value', max);
    }

    if ((min || min === 0) && (value < min)) {
      this.set('value', min);
    }
  }
});
