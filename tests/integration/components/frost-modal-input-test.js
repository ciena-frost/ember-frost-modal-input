import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'

describeComponent(
  'frost-modal-input',
  'Integration: EmberFrostModalInputComponent',
  {
    integration: true
  },
  function () {
    it('renders', function () {
      // Set any properties with this.set('myProperty', 'value')
      // Handle any actions with this.on('myAction', function (val) { ... })
      // Template block usage:
      // this.render(hbs`
      //   {{#frost-modal-input}}
      //     template content
      //   {{/frost-modal-input}}
      // `)

      this.render(hbs`{{#frost-modal-input
        title='Test title'
        subtitle='Subtitle'
        openButton='Open default modal'
        openButtonClasses='medium secondary'
        modalName='my-awesome-modal'}}
      {{/frost-modal-input}}`)
      expect(this.$('.ember-remodal.window')).to.have.length(1)
    })
  }
)
