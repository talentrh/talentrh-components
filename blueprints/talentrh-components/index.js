/* eslint-env node */
module.exports = {
  // description: ''

  afterInstall(options) {
    // Perform extra work here.
    return this.addBowerPackageToProject('select2', '4.0.3');
  },
  included: function (app) {
    this._super.included(app);

    app.import('vendor/style.css');

    /*--- import select2 ---*/
    app.import(app.bowerDirectory + '/select2/dist/css/select2.css');
    app.import(app.bowerDirectory + '/select2/dist/js/select2.js');
    /*--- import select2 ---*/

    /*--- import sweetalert ---*/
    app.import(app.bowerDirectory + '/sweetalert2/dist/sweetalert2.min.js');
    app.import(app.bowerDirectory + '/sweetalert2/dist/sweetalert2.css');
    /*--- import sweetalert ---*/
  }
};
