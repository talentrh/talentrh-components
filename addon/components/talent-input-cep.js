import Ember from 'ember';
import layout from '../templates/components/talent-input-cep';

export default Ember.Component.extend({
  layout,
  classNames: 'talent-input-validation talent-input-cep',

  didInsertElement() {
    this.validate();
	},

  onChangeValue: Ember.observer('value', function() {
    this.validate();
  }),

  validate() {
    let value = this.get('value');
    if (!value) { return; }

    if (value.length < 8) { return this.setEffect(false); }

    return this.setEffect(true);
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
      this.sendAction('onUpdateStatus', 'cepValid', isValid);
    }
  },

  actions: {
    findCompleteData() {
      let value = this.get('value');
      if (!value) { return; }

      this.set('searching', true);

      Ember.$.ajax({
        url: `https://viacep.com.br/ws/${value.replace(/([.||-])/g, "")}/json/`,
        method: 'GET'
      }).then(response => {
        this.set('searching', false);

        if (response.erro) {
          swal('Ops', 'Não foi possível completar automaticamente.', 'info');
          return;
        }

        this.set('address', response.logradouro);
        this.set('district', response.bairro);
        this.set('complement', response.complemento);

        let loadCity = this.get('loadCity');
        if (loadCity) {
          this.sendAction('loadCity', response);
        }
      }).catch(()=> {
        this.set('searching', false);
        swal('Ops', 'Não foi possível completar automaticamente.', 'info');
      });
    }
  }
});
