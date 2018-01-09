import Ember from 'ember';
import layout from '../templates/components/talent-input-datetime';

export default Ember.Component.extend({
  layout,
  classNames: 'talent-input-datetime',

  didInsertElement() {
    this.loadInput();
  },

  loadInput() {
    let that = this;
    let options = this.buildOptions();

    this.$('input').datetimepicker(options);
    this.addMask();
    this.formatInitialValue();

    this.$('input')
    .on('dp.show', function() {
      that.$(this).parent().find('td a[data-action="today"]').html("<span><b>Hoje</b></span>");
    });
  },

  buildOptions() {
    let optionMap = [
      { key: 'format' },
      { key: 'locale', default: 'pt-br' },
      { key: 'showTodayButton', default: true },
      { key: 'useCurrent', default: false }
    ];

    let options = {};

    optionMap.forEach((obj)=> {
      let value = this.get(obj.key);

      if (value) {
        options[obj.key] = value;
      } else {
        if (obj.default) {
          options[obj.key] = obj.default;
        }
      }
    });

    return options;
  },

  actions: {
    clearPicker() {
      this.set('valueSelected', '');
      this.set('value', null);
    }
  },

  formatInitialValue: function() {
    let value = this.get('value');
    let formatToDate = this.get('formatToDate');
    if (!value) {
      this.set('valueSelected', null);
    } else {
      if (formatToDate) {
        let format = this.get('format');
        this.set('valueSelected', moment(value).format(format));
      } else {
        this.set('valueSelected', value);
      }
    }

  }.observes('value'),

  addMask() {
    var mask = this.get('mask');
    if (mask) {
      this.$('input').inputmask({ mask: mask, showMaskOnHover: false });
    }
  },

  onSelectValue: Ember.observer('valueSelected', function() {
    let formatToDate = this.get('formatToDate');
    let valueSelected = this.get('valueSelected');
    let format = this.get('format');

    if (!valueSelected || !moment(valueSelected, format, true).isValid()) {return;}

    if (formatToDate) {
      this.set('value', moment(valueSelected, format).toDate());
    } else {
      this.set('value', valueSelected);
    }
  })
});
