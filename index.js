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
  },
  
  postBuild: function(results) {
    var fs = this.project.require('fs-extra');
    console.log('TalentRH-Components is copying package.json properties to dist/')
    try {
      const packageObj = fs.readJsonSync('./package.json')
      console.log('CURRENT VERSION:: ', packageObj.version) // => X.X.X

      fs.outputJsonSync(results.directory + '/package.json', {
        name: packageObj.name,
        version: packageObj.version,
        description: packageObj.description
      });

      console.log('package.json export success!')

    } catch (err) {
      console.error(err)
    }
  }
};
