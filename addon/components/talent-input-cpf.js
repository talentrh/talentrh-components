import Ember from 'ember';
import layout from '../templates/components/talent-input-cpf';

export default Ember.Component.extend({
  layout,
  classNames: 'talent-input-validation talent-input-cpf',

  didInsertElement() {
		this.$('input').inputmask({ mask: '999.999.999-99', autoUnmask: true });
    this.validate();
	},

  onChangeValue: Ember.observer('value', function() {
    this.validate();
  }),

  validate() {
    let value = this.get('value');
    if (!value) return;

		return this.isValidCpf(value) ? this.setEffect(true) : this.setEffect(false);
  },

  isValidCpf : function (cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf == '') return false;
    // Elimina CPFs invalidos conhecidos
    if (cpf.length != 11 ||
      cpf == "00000000000" ||
      cpf == "11111111111" ||
      cpf == "22222222222" ||
      cpf == "33333333333" ||
      cpf == "44444444444" ||
      cpf == "55555555555" ||
      cpf == "66666666666" ||
      cpf == "77777777777" ||
      cpf == "88888888888" ||
      cpf == "99999999999")
      return false;
    // Valida 1o digito
    let add = 0;
    for (let i = 0; i < 9; i++)
      add += parseInt(cpf.charAt(i)) * (10 - i);

    let rev = 11 - (add % 11);

    if (rev == 10 || rev == 11)
      rev = 0;

    if (rev != parseInt(cpf.charAt(9)))
      return false;

    // Valida 2o digito
    add = 0;
    for (let i = 0; i < 10; i++)
      add += parseInt(cpf.charAt(i)) * (11 - i);

    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
      rev = 0;

    if (rev != parseInt(cpf.charAt(10)))
      return false;

    return true;
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
