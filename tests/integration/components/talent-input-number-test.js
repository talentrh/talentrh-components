import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('talent-input-number', 'Integration | Component | talent input number', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{talent-input-number}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#talent-input-number}}
      template block text
    {{/talent-input-number}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
