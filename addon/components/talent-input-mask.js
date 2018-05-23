import TextField from "@ember/component/text-field"
import { get, set, observer } from '@ember/object';
import { isObject } from 'lodash';
import Masker from 'talentrh-components/utils/talent-masker';

export default TextField.extend({
  classNames: ['form-control'],

  defaultMasks: {
    date     : '99/99/9999',
    cep      : '99.999-999',
    cpf      : '999.999.999-99',
    datetime : '99/99/9999 99:99',
    cnpj     : '99.999.999/9999-99',
    phone    : {
      mask: ['(99) 9999-99999', '(99) 99999-9999'],
      method: 'phoneMask'
    },
    phoneWithoutDDD   : {
      mask: ['9999-99999', '99999-9999'],
      method: 'phoneWithoutDDDMask'
    }
  },

  didInsertElement() {
    this.initValue(get(this, 'unmasked'));
    this.loadInputMask();
  },

  onChangeUnmasked: observer('unmasked', function(o) {
    this.initValue(o.unmasked);
  }),

  initValue(unmasked) {
    // Quando o input iniciar com valor, atualiza a propriedade VALUE
    let value = get(this, 'value');
    let valueUnmasked = value ? value.replace(/\D+/g, '') : value;

    if (unmasked && unmasked !== valueUnmasked) {
      set(this, 'value', unmasked);

      Ember.run.later(()=> {
        this.loadInputMask();
      });
    }
  },

  keyUp() {
    // Ao digitar no input, atualiza propriedade UNMASKED
    let value = get(this, 'value');
    set(this, 'unmasked', value.replace(/\D+/g, ''));
  },

  /* Métodos que aplicam máscara no input */
  loadInputMask() {
    let mask = get(this, 'mask');
    let typeMask = get(this, 'typeMask');
    let inputElement = document.querySelector(`#${this.elementId}`);

    if (mask) {
      Masker.applyMask(inputElement, mask);
    } else if (typeMask) {
      this.defaultMask(inputElement, typeMask);
    } else {
      console.error('É necessário informar uma máscara (mask) ou um tipo padrão (typeMask)!');
    }
  },

  defaultMask(inputElement, typeMask) {
    let defaultMasks = get(this, 'defaultMasks');
    let maskConfig = defaultMasks[typeMask];

    if (!maskConfig) {
      console.error('O tipo de máscara informado não existe!');
      return;
    }

    if (isObject(maskConfig)) {
      Masker[maskConfig.method](inputElement, maskConfig.mask);
    } else {
      Masker.applyMask(inputElement, maskConfig);
    }
  }
  /* Métodos que aplicam mascara no INPUT */
});
