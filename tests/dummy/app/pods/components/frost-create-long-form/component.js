import Ember from 'ember'
import layout from './template'

const {Component, inject} = Ember

export default Component.extend({
  remodal: inject.service(),
  modalForms: inject.service('modal-forms'),

  layout,
  formValue: {},
  modalName: 'my-ps-modal',
  userModel: {
    'type': 'object',
    'properties': {
      'username1': {
        'type': 'string'
      },
      'description1': {
        'type': 'string'
      },
      'password1': {
        'type': 'string'
      },
      'username2': {
        'type': 'string'
      },
      'description2': {
        'type': 'string'
      },
      'password2': {
        'type': 'string'
      },
      'username3': {
        'type': 'string'
      },
      'description3': {
        'type': 'string'
      },
      'password3': {
        'type': 'string'
      },
      'username4': {
        'type': 'string'
      },
      'description4': {
        'type': 'string'
      },
      'password4': {
        'type': 'string'
      },
      'username5': {
        'type': 'string'
      },
      'description5': {
        'type': 'string'
      },
      'password5': {
        'type': 'string'
      }
    },
    'required': [
      'username', 'password'
    ]
  },

  clearForm () {
    this.set('formValue', {})
  },
  closeModal () {
    this.get('remodal').close(this.get('modalName'))
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
      this.set('formValue', formState)
    },

    onValidation (e) {
      this.set('isValid', e.errors.length === 0)
    },

    save () {
      this.get('onConfirm')(this.get('formValue'))
      this.closeModal()
      this.clearForm()
    }
  }
})
