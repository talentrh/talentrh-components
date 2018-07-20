import Component from '@ember/component';
import layout from '../templates/components/application-menu';

export default Component.extend({
  layout,
  classNames: ['not-printable'],
  session: Ember.inject.service(),
  ajax: Ember.inject.service(),
  routing: Ember.inject.service('-routing'),
  userLinks: [],

  didInsertElement() {
    this._enableEvents();
    this._openMenuOnClickEvent();
    this._closeMenuOnPressESCEvent();
    this._closeMenuOnClickItem();
    this._initPerfectScrollBar();
  },

  _enableEvents() {
    //
    // $(".js-expanded-menu").on('click', function() {
    //   $('.profile-menu').toggleClass('expanded-menu');
    //   return false;
    // });
    //
    // $(".js-expanded-menu").on('click', function() {
    //   $('.profile-menu').toggleClass('expanded-menu');
    //   return false;
    // });
    //
    // $(".js-open-responsive-menu").on('click', function() {
    //   $('.header-menu').toggleClass('open');
    //   return false;
    // });
    //
    // $(".js-close-responsive-menu").on('click', function() {
    //   $('.header-menu').removeClass('open');
    //   return false;
    // });
  },

  _initPerfectScrollBar() {
    new PerfectScrollbar('#sidebar-closed', {
      wheelPropagation: false
    });
    new PerfectScrollbar('#sidebar-open', {
      wheelPropagation: false
    });
  },
  _openMenuOnClickEvent() {
    this.$(document).on('click', '.js-sidebar-open', function() {
      $(this).toggleClass('active');
      $(this).closest($('.fixed-sidebar')).toggleClass('open');
      return false;
    });
  },
  _closeMenuOnPressESCEvent() {
    $(document).keydown(function(eventObject) {
      if ((eventObject.which === 27) && $('.fixed-sidebar').is(':visible')) {
        $('.fixed-sidebar').removeClass('open');
        $('.profile-settings-responsive').removeClass('open');
      }
    });
  },
  _closeMenuOnClickItem() {
    this.$(document).on('click', function(event) {
      if (!$(event.target).closest($('.fixed-sidebar')).length && $('.fixed-sidebar').is(':visible')) {
        $('.fixed-sidebar').removeClass('open');
      }

      $('.fixed-sidebar-responsive').removeClass('open');
      $('.profile-settings-responsive').removeClass('open');
    });
  },

  actions: {
    logout() {
      this.get('session').invalidate().then(() => {
        this.transitionToRoute('login');
      });
    },

    clickLogo() {
      let currentPath = Ember.getOwner(this).lookup('controller:application').currentPath;
      if (currentPath === 'home' || currentPath === 'home.index') {
        this.sendAction('refreshModel');
        window.scrollTo(0, 0);
      } else {
        this.get("routing").transitionTo('home');
      }
    }
  }
});
