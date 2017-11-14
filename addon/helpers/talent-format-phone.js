import Ember from 'ember';
/*global Inputmask*/

export function talentFormatPhone(params/*, hash*/) {
  if (!params[0]) {
    return;
  }

  return Inputmask.format(params[0], {
    alias: ['(99) 9999-9999', '(99) 99999-9999']
  });
}

export default Ember.Helper.helper(talentFormatPhone);
