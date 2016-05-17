import Ember from 'ember'
import layout from './template'
const {inject, Component} = Ember

export default Component.extend({
  remodal: inject.service(),
  modalForms: inject.service('modal-forms'),

  layout,
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
  closeModal() {
    this.get('remodal').close('my-awesome-modal');
  },
  /* Ember.Component method */
  willInsertElement () {
    this.get('modalForms').setModalActive(true)
  },

  /* Ember.Component method */
  willDestroyElement () {
    this.get('modalForms').setModalActive(false)
  },

  actions: {
    cancel () {
      this.clearForm()
      this.closeModal()
    },

    formValueChanged (formState) {
      this.set('userValue', formState)
    },

    onValidation (e) {
      this.set('isValid', e.errors.length === 0)
    },

    save () {
      this.get('onConfirm')(this.get('userValue'))
      this.clearForm()
      this.closeModal()
    }
  }
})
