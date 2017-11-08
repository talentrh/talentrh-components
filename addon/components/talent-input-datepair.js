import Ember from 'ember';
import layout from '../templates/components/talent-input-datepair';

export default Ember.Component.extend({
  layout,
  didInsertElement() {
    this.buildPickers();
  },

  buildPickers() {
    let id = ('#' + this.get('id')) || "#datepair";

    let configs = [
      {
        type: 'date',
        picker: { format: 'DD/MM/YYYY', locale: 'pt-br' },
        mask: '99/99/9999'
      },
      {
        type: 'time',
        picker: { format: 'HH:mm', locale: 'pt-br' },
        mask: '99:99'
      },
      {
        type: 'datetime',
        picker: { format: 'DD/MM/YYYY HH:mm', locale: 'pt-br' },
        mask: '99/99/9999 99:99'
      }
    ];

    configs.forEach((config)=> {
      let selector = id + ' .' + config.type;
      Ember.$(selector).datetimepicker(config.picker)
      .on('changeDate', (event)=> {
        this.fixDateTime(event, config.type, config.picker.format);
      })
      .on('blur', (event)=> {
        this.fixDateTime(event, config.type, config.picker.format);
      });

      Ember.$(selector).inputmask({ mask: config.mask, showMaskOnHover: false });
    });
  },

  fixDateTime(event, inputType, format) {
    let isSelectedStart = $(event.target).hasClass('start');
    let otherSubType = isSelectedStart ? 'end' : 'start';
    let otherTypeClass = '.' + otherSubType;

    let selectedElement = $(event.target);
    let otherElement = $('.' + inputType + otherTypeClass);

    let selectedMoment = moment($(event.target).val(), format);
    let otherMoment = moment(otherElement.val(), format);

    if (
      (selectedMoment.isAfter(otherMoment) && isSelectedStart) ||
      (selectedMoment.isBefore(otherMoment) && !isSelectedStart)
    ) {
      let inputProperty = Ember.String.camelize(otherSubType + ' ' + inputType);
      this.set(inputProperty, selectedElement.val());
    }
  },

  willDestroyElement() {
    let id = this.get('id') || "#datepair";

    $(id + ' .time').datetimepicker('remove');
    $(id + ' .date').datetimepicker('remove');
    $(id + ' .datetime').datetimepicker('remove');
  }
});
