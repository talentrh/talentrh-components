import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('talent-input-cpf', 'Integration | Component | talent input cpf', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{talent-input-cpf}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#talent-input-cpf}}
      template block text
    {{/talent-input-cpf}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
