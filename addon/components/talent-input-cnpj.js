import Ember from 'ember';
import layout from '../templates/components/talent-input-cnpj';
import validador from 'npm:cpf_cnpj';

export default Ember.Component.extend({
  layout,
  classNames: 'talent-input-validation talent-input-cnpj',

  didInsertElement() {
    this.$('input').inputmask({ mask: '99.999.999/9999-99', autoUnmask: true });
    this.validate();
  },

  onChangeValue: Ember.observer('value', function() {
    this.validate();
  }),

  validate() {
    let value = this.get('value');
    if (!value) { return; }
    value = value.replace(/[^0-9]/g, '');

    if (value.length < 14) { return this.setEffect(false); }

    if (validador.CNPJ.isValid(value)) {
      this.setEffect(true);
    } else {
      this.setEffect(false);
    }
  },

  setEffect(isValid) {
    let onUpdateStatus = this.get('onUpdateStatus');
    let buttonComplete = this.get('buttonComplete');

    if (isValid) {
      Ember.$(this.element).removeClass('talent-input-validation-error');
      Ember.$(this.element).addClass('talent-input-validation-success');

      if (buttonComplete) {
        this.set('showButtonComplete', true);
      }
    }
    else {
      Ember.$(this.element).removeClass('talent-input-validation-success');
      Ember.$(this.element).addClass('talent-input-validation-error');

      this.set('showButtonComplete', false);
    }

    if (onUpdateStatus) {
      this.sendAction('onUpdateStatus', 'cnpjValid', isValid);
    }
  },

  actions: {
    findCompleteData() {
      let value = this.get('value');
      if (!value) { return; }

      value = value.replace(/[^0-9]/g, '');
      this.set('searching', true);

      Ember.$.ajax({
        url: 'https://www.receitaws.com.br/v1/cnpj/' + value,
        method: 'GET',
        jsonp: "callback",
        dataType: "jsonp",
        timeout: 5000
      }).then((data) => {
        this.set('searching', false);

        if (!data || data.status === "ERROR") {
          swal('Ops', 'Não foi possível completar automaticamente.', 'info');
          return;
        }

        this.set('name', data.nome);
        this.set('address', data.logradouro);
        this.set('district', data.bairro);
        this.set('zipcode', data.cep);
        this.set('number', data.numero);
        this.set('phone', data.telefone);
      }).catch(() => {
        this.set('searching', false);
        swal('Ops', 'Não foi possível completar automaticamente.', 'info');
      });
    }
  }
});
