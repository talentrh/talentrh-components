/* jshint node: true */
'use strict';

module.exports = {
  name: 'talentrh-components',
  // isDevelopingAddon() {
  //   return true;
  // },
  included: function(app) {
    app.import('vendor/style.css');

    /*--- import select2 ---*/
    app.import('bower_components/select2/dist/css/select2.css');
    app.import('bower_components/select2/dist/js/select2.js');
    /*--- import select2 ---*/

    /*--- import sweetalert ---*/
    app.import('bower_components/sweetalert2/dist/sweetalert2.min.js');
    app.import('bower_components/sweetalert2/dist/sweetalert2.css');
    /*--- import sweetalert ---*/
  }
};
