'use strict';

module.exports = {
  name: 'talentrh-components',
  // isDevelopingAddon() {
  //   return true;
  // },
  included: function (app) {
    this._super.included(app);

    app.import('vendor/style.css');
    app.import('vendor/js/vanilla-masker.min.js');

    /*--- import select2 ---*/
    app.import('node_modules/select2/dist/css/select2.css');
    app.import('node_modules/select2/dist/js/select2.min.js');
    /*--- import select2 ---*/

    /*--- import sweetalert ---*/
    app.import('node_modules/sweetalert2/dist/sweetalert2.min.js');
    app.import('node_modules/sweetalert2/dist/sweetalert2.css');
    /*--- import sweetalert ---*/

    /*--- import datetimepicker ---*/
    app.import('node_modules/bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.min.css');
    app.import('node_modules/bootstrap4-datetimepicker/build/js/bootstrap-datetimepicker.min.js');
    /*--- import datetimepicker ---*/
  }
};
