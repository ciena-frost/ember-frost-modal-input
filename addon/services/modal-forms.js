import Ember from 'ember'

export default Ember.Service.extend({
  isModalActive: false,

  setModalActive (isModalActive) {
    Ember.run.schedule('sync', () => {
      this.set('isModalActive', isModalActive)
    })
  }
})
