import Ember from 'ember'
const {Component, computed} = Ember
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

export default Component.extend(PropTypeMixin, {
  // ==========================================================================
  // Dependencies
  // ==========================================================================

  // ==========================================================================
  // Properties
  // ==========================================================================

  propTypes: {
    modalName: PropTypes.string,
    subtitle: PropTypes.string,
    title: PropTypes.string,
    formValue: PropTypes.object,
    isValid: PropTypes.bool
  },

  getDefaultProps () {
    return {
      modalName: 'my-modal-input',
      isValid: false,
      attemptedSave: false
    }
  },

  // ==========================================================================
  // Computed Properties
  // ==========================================================================

  showErrorCount: computed('attemptedSave', 'isValid', function () {
    return this.get('attemptedSave') && !this.get('isValid')
  }),
  // ==========================================================================
  // Functions
  // ==========================================================================

  // ==========================================================================
  // Events
  // ==========================================================================

  // ==========================================================================
  // Actions
  // ==========================================================================

  actions: {
    formValueChanged (formState) {
      this.set('formValue', formState)
    },
    onClose () {
      this.set('attemptedSave', false)
      if (this.onClose) {
        this.onClose()
      }
    },
    saveAttempted (attrs) {
      this.set('attemptedSave', true)
    },
    validate (e) {
      this.set('isValid', e.errors.length === 0)
      this.set('errorLength', e.errors.length)
    }
  }
})
