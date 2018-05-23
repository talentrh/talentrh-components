import Ember from 'ember';
import Masker from 'talentrh-components/utils/talent-masker';

export function talentFormatPhone(params/*, hash*/) {
  if (!params[0]) {
    return;
  }

  return Masker.format(params[0], '(99) 9999-9999');
}

export default Ember.Helper.helper(talentFormatPhone);
