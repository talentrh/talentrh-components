import Ember from 'ember';

export function getAttribute(params, hash) {
  return hash.model.get(hash.attribute);
}

export default Ember.Helper.helper(getAttribute);
