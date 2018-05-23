import Ember from 'ember';
import Masker from 'talentrh-components/utils/talent-masker';

export function talentFormatCep(params/*, hash*/) {
  if (!params[0]) {
    return params[0];
  }

  return Masker.format(params[0], '99.999-999');
}

export default Ember.Helper.helper(talentFormatCep);
