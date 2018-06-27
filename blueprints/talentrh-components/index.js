/* eslint-env node */
module.exports = {
  // description: ''
  normalizeEntityName: function() {}, // Isso precisa ficar aqui, assim mesmo.

  afterInstall(options) {
    // Perform extra work here.
    return this.addPackagesToProject([{
      name: 'sweetalert2',
      target: '7.19.0'
    }, {
      name: 'select2',
      target: '4.0.3'
    }, {
      name: 'bootstrap4-datetimepicker',
      target: '5.2.3'
    }, {
      name: 'ember-click-outside',
      target: '0.1.11'
    }]);
  }
};
