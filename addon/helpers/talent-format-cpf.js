import Ember from 'ember';

export function talentFormatCpf(params/*, hash*/) {
  if (!params[0]) {
    return params[0];
  }

  return Inputmask.format(params[0], '999.999.999-99');
}

export default Ember.Helper.helper(talentFormatCpf);
