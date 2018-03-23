import Ember from 'ember';

export default Ember.Mixin.create({
  handleResponse(status, headers, payload, requestData) {
    this.checkVersion(headers);

    return this._super(...arguments);
  },

  headers: Ember.computed(function () {
    var env = Ember.getOwner(this).resolveRegistration('config:environment');
    console.log('env', env);
    return {
      'module-prefix': env.APP.name,
      'module-version': env.APP.version.split('+')[0]
    }
  }),

  checkVersion(headers) {
    var env = Ember.getOwner(this).resolveRegistration('config:environment');
    var ember = headers['module-version'] || '0';
    var server = headers['front-end-version'] || '0';
    var shouldReload = false;

    console.log('Versions - Ember: ', ember, ' Server: ', server);
    if(ember === server) {
      return;
    }

    ember = ember.split('.').map(function(x) {
      return parseInt(x);
    });
    server = server.split('.').map(function(x) {
      return parseInt(x);
    });

    if (server[0] > ember[0]) {
      shouldReload = true;
    } else {
      if (server[1] > ember[1] && server[0] === ember[0]) {
        shouldReload = true;
      } else {
        if (server[2] > ember[2] && server[1] === ember[1]) {
          shouldReload = true;
        }
      }
    }
    if (shouldReload) {
			console.log('%%%%%%%%%% Atualiza para versão :: ', headers['front-end-version'], '%%%%%%%%%%');
      console.log('Reload in 5 misecs');
			setTimeout(function () {
        if(env.environment !== 'development') {
          location.reload(true);
        } else {
          console.log('Ambiente de desenvolvimento -> Não atualiza a página');
        }
			}, 500);
    }
  }
});
