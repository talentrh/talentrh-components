import Ember from 'ember';
/*global Inputmask*/

export function talentFormatCep(params/*, hash*/) {
  if (!params[0]) {
    return params[0];
  }

  return Inputmask.format(params[0], '99.999-999');
}

export default Ember.Helper.helper(talentFormatCep);
