import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import { initialize } from 'ember-block-slots/initializers/component-block-slots'

describeComponent(
  'frost-modal-input',
  'Integration: EmberFrostModalInputComponent',
  {
    integration: true
  },
  function () {
    let container, application

     beforeEach(function () {
       Ember.run(() => {
         application = Ember.Application.create()
         container = application.__container__
         application.deferReadiness()
       initialize(container, application)
      })
    })

    it('renders', function () {
      this.set('model', {
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
      })

      this.render(hbs`{{#frost-modal-input
          formModel=model
          title='Test title'
          subtitle='Subtitle' as |slot|}}
          {{#block-slot slot 'target'}}
            {{frost-button
              text='Open small form'
              priority='secondary'
              size='medium'}}
          {{/block-slot}}
      {{/frost-modal-input}}`)
      expect(this.$('.frost-button')).to.have.length(1)
    })
  }
)
