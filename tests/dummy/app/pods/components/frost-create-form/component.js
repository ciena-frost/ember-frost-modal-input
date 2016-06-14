import Ember from 'ember'
import layout from './template'
const {Component, Logger} = Ember

export default Component.extend({

  layout,
  modalName: 'my-awesome-modal',
  userValue: {},
  userModel: {
    'type': 'object',
    'properties': {
      'username': {
        'type': 'string'
      },
      'description': {
        'type': 'string'
      },
      'password': {
        'type': 'string'
      }
    },
    'required': [
      'username', 'password'
    ]
  },

  clearForm () {
    this.set('userValue', {})
  },

  actions: {
    clearForm () {
      this.clearForm()
      Logger.log('modal closed')
    },

    formValueChanged (formState) {
      this.set('userValue', formState)
    },

    onValidation (e) {
      this.set('isValid', e.errors.length === 0)
    },

    open () {
      Logger.log('modal opened')
    },

    save () {
      this.get('onConfirm')(this.get('userValue'))
      this.clearForm()
    },

    myCustomAction () {
      Logger.log('Custom action triggered')
    }
  }
})
