import Ember from 'ember';
import Masker from 'talentrh-components/utils/talent-masker';

export function talentFormatCpf(params/*, hash*/) {
  if (!params[0]) {
    return params[0];
  }

  return Masker.format(params[0], '999.999.999-99');
}

export default Ember.Helper.helper(talentFormatCpf);
