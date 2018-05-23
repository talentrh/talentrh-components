import Ember from 'ember';
import layout from '../templates/components/talent-input-cpf';
import Validation from 'talentrh-components/utils/validation';

export default Ember.Component.extend({
  layout,
  classNames: 'talent-input-validation talent-input-cpf',

  didInsertElement() {
    this.validate();
	},

  onChangeValue: Ember.observer('value', function() {
    this.validate();
  }),

  validate() {
    let value = this.get('value');
    if (!value) {return;}

		return Validation.isValidCpf(value) ? this.setEffect(true) : this.setEffect(false);
  },

  setEffect(isValid) {
    let onUpdateStatus = this.get('onUpdateStatus');

    if (isValid) {
      Ember.$(this.element).removeClass('talent-input-validation-error');
			Ember.$(this.element).addClass('talent-input-validation-success');
    }
    else {
      Ember.$(this.element).removeClass('talent-input-validation-success');
      Ember.$(this.element).addClass('talent-input-validation-error');
    }

    if (onUpdateStatus) {
      this.sendAction('onUpdateStatus', 'cpfValid', isValid);
    }
  }
});
