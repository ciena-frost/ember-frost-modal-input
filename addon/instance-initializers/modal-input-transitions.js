import modalInputTransitions from 'ember-frost-modal-input/transitions'

export function initialize (appInstance) {
  const transitionService = appInstance.lookup('service:liquid-fire-transitions')
  transitionService.map(modalInputTransitions)
}

export default {
  name: 'modal-input-transition',
  after: 'global-instance',
  initialize: initialize
}
