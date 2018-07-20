import Component from '@ember/component';
import layout from '../templates/components/user-menu-actions';

export default Component.extend({
  session: Ember.inject.service(),
  layout,
  useBaseLinks: true,
  links: [],
  actions: {
    show() {
      this.$('.more-dropdown').css({visibility: 'visible', opacity: 1});
    },
    hide() {
      this.$('.more-dropdown').css({visibility: 'hidden', opacity: 0});
    },
    logout() {
      this.get('session').invalidate();
    }
  }
});
