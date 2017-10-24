import Ember from 'ember';

export function selectBuildText(params, hash) {
  let record = hash.record;
  let showProperties = hash.showProperties;
  let splited = showProperties.split('|');
  let textShow = '';

  if (!record || !showProperties) {return;}
  record = record.toJSON({ includeId: true });
  
  splited.forEach((item) => {
    textShow += ' ' + (record[item] || item);
  });

  return textShow;
}

export default Ember.Helper.helper(selectBuildText);
