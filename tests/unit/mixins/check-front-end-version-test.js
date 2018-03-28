import Ember from 'ember';
import CheckFrontEndVersionMixin from 'talentrh-components/mixins/check-front-end-version';
import { module, test } from 'qunit';

module('Unit | Mixin | check front end version');

// Replace this with your real tests.
test('it works', function(assert) {
  let CheckFrontEndVersionObject = Ember.Object.extend(CheckFrontEndVersionMixin);
  let subject = CheckFrontEndVersionObject.create();
  assert.ok(subject);
});
