import Ember from 'ember';

export function htmlSafe(params/*, hash*/) {
  let value = Ember.Handlebars.Utils.escapeExpression(params[0]);
  return Ember.String.htmlSafe(`${value}`);
}

export default Ember.Helper.helper(htmlSafe);
