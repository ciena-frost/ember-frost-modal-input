import ModalForms from 'ember-frost-modal-input/services/modal-forms'

export default {
  name: 'modal-forms',

  initialize: function (application) {
    application.register('service:modal-forms', ModalForms)
  }
}
