import Ember from 'ember';
import layout from '../templates/components/simple-light-table';
import TableCommon from '../mixins/table-common';

export default Ember.Component.extend(TableCommon, {
  layout
});
