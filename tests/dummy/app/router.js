import Ember from 'ember'
import config from './config/environment'

var Router = Ember.Router.extend({
  location: config.locationType
})

Router.map(function () {
  this.route('demo', {path: '/'}, function () {
    this.modal('frost-create-form', {
      withParams: 'showModalForm',
      dialogClass: 'frost-bunsen-form-dialog',
      actions: {
        save: 'save'
      }
    })
  })
})

export default Router
