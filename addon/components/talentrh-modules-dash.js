import Component from '@ember/component';
import { getOwner } from '@ember/application';
import layout from '../templates/components/talentrh-modules-dash';

export default Component.extend({
  layout,
  classNames: 'control-icon more has-items dropdown-modules',

  modulesDefinition: [
    {
      configKey: 'agenda',
      title: 'Agenda',
    },
    {
      configKey: 'avd',
      title: 'AVD',
    },
    {
      configKey: 'conta',
      title: 'Configurações de Conta',
    },
    {
      configKey: 'nela',
      title: 'Nela',
    },
    {
      configKey: 'projetos',
      title: 'Projetos',
    },
    {
      configKey: 'pesquisa',
      title: 'Pesquisa',
    }
  ],

  didInsertElement() {
    this.loadModules();
  },

  loadModules() {
    const Env = getOwner(this).resolveRegistration('config:environment');
    let modulesDefinition = this.get('modulesDefinition');
    let talentModules = [];

    modulesDefinition.forEach((obj)=> {
      let talentModule = obj;
      talentModule.link = Env.appUrl[obj.configKey];
      talentModule.icon = '/images/icons/' + talentModule.configKey + '.png';
      talentModules.push(talentModule);
    });

    if (talentModules.length % 2 !== 0) {
      talentModules.push({
        blankBlock: true
      });
    }

    this.set('talentModules', talentModules);
  }
});
