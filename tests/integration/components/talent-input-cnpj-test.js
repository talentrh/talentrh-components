import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('talent-input-cnpj', 'Integration | Component | talent input cnpj', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{talent-input-cnpj}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#talent-input-cnpj}}
      template block text
    {{/talent-input-cnpj}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
