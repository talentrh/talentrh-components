/* eslint-env node */
module.exports = {
  // description: ''
  normalizeEntityName: function() {}, // Isso precisa ficar aqui, assim mesmo.

  afterInstall(options) {
    // Perform extra work here.
    return this.addPackagesToProject([{
      name: 'sweetalert2',
      target: '6.10.1'
    }, {
      name: 'select2',
      target: '4.0.3'
    }]);
  }
};