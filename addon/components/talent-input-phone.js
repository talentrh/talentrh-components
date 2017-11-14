import Ember from 'ember';
import layout from '../templates/components/talent-input-phone';

export default Ember.Component.extend({
  layout,
  format: ['(99) 9999-9999', '(99) 99999-9999'],

  didInsertElement() {
    this.addMask();
    this.formatInitialValue();
  },

  addMask() {
    let format = this.get('format');
    this.$('input').inputmask({
      mask: format,
      showMaskOnHover: false
    });
  },

  formatInitialValue: function () {
    /*global Inputmask*/
    let value = this.get('value');
    let formatToNumber = this.get('formatToNumber');

    if (!value) {
      this.set('valueSelected', null);
    } else {
      if (formatToNumber) {
        let format = this.get('format');
        this.set('valueSelected', Inputmask.format(value, {
          alias: format
        }));
      } else {
        this.set('valueSelected', value);
      }
    }
  }.observes('value'),

  onSelectValue: Ember.observer('valueSelected', function () {
    let formatToNumber = this.get('formatToNumber');
    let valueSelected = this.get('valueSelected');
    let format = this.get('format');

    if (!valueSelected) {return};

    if (formatToNumber) {
      this.set('value', Inputmask.unmask(valueSelected, {
        alias: format
      }));
    } else {
      this.set('value', valueSelected);
    }
  })
});
