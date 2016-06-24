import {assert, expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import { initialize } from 'ember-block-slots/initializers/component-block-slots'
import $ from 'jquery'
import {afterEach, beforeEach, describe} from 'mocha'

const testModel = {
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
    }
  },
  'required': [
    'username', 'password'
  ]
}

describeComponent(
  'frost-modal-input',
  'Integration | Component | FrostModalInput',
  {
    integration: true
  },
  function () {
    let container, application, sandbox

    beforeEach(function () {
      sandbox = sinon.sandbox.create()
      Ember.testing = true
      Ember.run(() => {
        application = Ember.Application.create()
        container = application.__container__
        application.deferReadiness()
      })
      initialize(container, application)
    })

    afterEach(function () {
      sandbox.restore()
      Ember.testing = false
    })

    describe('render', function () {
      let onOpen, onClose, isValid, formValue, showAllErrors

      beforeEach(function () {
        onClose = sandbox.spy()
        onOpen = sandbox.spy()
        showAllErrors = false
        isValid = false
        formValue = {}

        this.setProperties({onClose, onOpen, isValid, formValue, showAllErrors, testModel})

        this.render(hbs`{{#frost-modal-input
          onOpen=onOpen
          onClose=onClose
          isValid=isValid
          formValue=formValue
          title='Test title'
          subtitle='Subtitle'
          modalName='my-test-modal' as |slot|}}
          {{#block-slot slot 'target'}}
              {{frost-button
                text='Open long form with scroll'
                priority='secondary'
                size='medium'}}
          {{/block-slot}}
          {{#block-slot slot 'body' as |content|}}
            {{content.form
              autofocus=false
              bunsenModel=testModel
              inline=true
              value=formValue
              showAllErrors=showAllErrors
              }}
          {{/block-slot}}
          {{#block-slot slot 'footer' as |controls|}}
            {{controls.confirm
              text='Submit'}}
          {{/block-slot}}
        {{/frost-modal-input}}
        `)
      })

      it('renders target', function () {
        expect(this.$('.frost-button:visible')).to.have.length(1)
      })

      it('has no disabled inputs', function () {
        expect(this.$('input:disabled').length).to.equal(0)
      })

      describe('open modal', function () {
        beforeEach(function (done) {
          this.$('.frost-button').first().click()
          Ember.run.later(() => {
            done()
          }, 750)
        })

        it('opens the modal', function () {
          let length = $('[data-test-id="modalWindow"].remodal-is-opened').length ||
                      $('[data-test-id="modalWindow"].remodal-is-opening').length
          expect(length).to.equal(1)
        })

        it('renders header', function () {
          expect($('[data-test-id="yielded"] .input-header').length).is.equal(1)
        })

        it('renders title', function () {
          expect($('[data-test-id="yielded"] .input-header .primary-title').text()).to.equal('Test title')
        })

        it('has action buttons', function () {
          var cancelBtn = $('[data-test-id="modalWindow"] .footer .frost-button')[0]
          var confirmBtn = $('[data-test-id="modalWindow"] .footer .frost-button')[1]
          assert.isNotNull(cancelBtn)
          assert.isNotNull(confirmBtn)
        })

        it('fires onOpen property', function () {
          expect(onOpen.callCount).to.equal(1)
        })

        it('does not fire onClose property', function () {
          expect(onClose.callCount).to.equal(0)
        })
      })
    })
  }
)
