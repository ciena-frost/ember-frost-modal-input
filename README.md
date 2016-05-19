[ci-img]: https://img.shields.io/travis/ciena-frost/ember-frost-modal-input.svg "Travis CI Build Status"
[ci-url]: https://travis-ci.org/ciena-frost/ember-frost-modal-input

[cov-img]: https://img.shields.io/coveralls/ciena-frost/ember-frost-modal-input.svg "Coveralls Code Coverage"
[cov-url]: https://coveralls.io/github/ciena-frost/ember-frost-modal-input

[npm-img]: https://img.shields.io/npm/v/ember-frost-modal-input.svg "NPM Version"
[npm-url]: https://www.npmjs.com/package/ember-frost-modal-input

[![Travis][ci-img]][ci-url] [![Coveralls][cov-img]][cov-url] [![NPM][npm-img]][npm-url]

# ember-frost-modal-input
A modal component that can contain any other components. Has classes to support a header, an input form and actions in the footer.

 * [Installation](#installation)
 * [API](#api)
 * [Examples](#examples)
 * [Development](#development)

## Installation

```
ember install ember-frost-modal-input
```

## API
| Attribute | Type | Value | Description |
| --------- | ---- | ----- | ----------- |
| `title` | `string` | | Optional custom title |
| `subtitle` | `string` | |  Optional custom subtitle |
| `titleComponent` | `string` | | Optional title component to replace standard title/subtitle styles |
| `modalName` | `string` | | Optional name for your modal |

## Examples

### Parent Controller
Inject the modal-forms service into the parent controller

```js
modalForms: Ember.inject.service('modal-forms'),
isModalActive: Ember.computed.readOnly('modalForms.isModalActive'),
```

### Modal component
Inject the [remodal](http://sethbrasile.github.io/ember-remodal/#/styling) and modal-forms services in your component
```js
remodal: inject.service(),
modalForms: inject.service('modal-forms'),
```

Update the active state of the modal in your component
```js
willInsertElement () {
  this.get('modalForms').setModalActive(true)
},

willDestroyElement () {
  this.get('modalForms').setModalActive(false)
}
```

#### Default title component template
```handlebars
{{#frost-modal-input title='Test title' subtitle='Subtitle'}}
    // Custom modal content
{{/frost-modal-input}}
```

#### Custom title component template
```handlebars
{{#frost-modal-input titleComponent='myTitleComponent'}}
  // Custom modal content
{{/frost-modal-input}}
```

#### Modal input component
Below is an excerpt of component.js
```js
import layout from './template'
const {Component, inject} = Ember

export default Component.extend({
  layout,
  remodal: inject.service(),
  modalForms: inject.service('modal-forms'),
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
})
```
#### Component template using ember-block-slots
Below is an example of template.hbs
```handlebars
{{#frost-modal-input
  title='Test title'
  subtitle='Subtitle'
  modalName=modalName as |slot|}}
  {{#block-slot slot 'openButton' as |item|}}
    {{item.button
      text='Open long form with scroll'
      priority='secondary'
      size='medium'}}
  {{/block-slot}}
  {{#block-slot slot 'form'}}
    {{frost-bunsen-form
      model=userModel
      view=userView
      onChange=(action 'formValueChanged')
      onValidation=(action 'onValidation')}}
  {{/block-slot}}
  {{#block-slot slot 'actions'}}
    {{frost-button
      onClick=(action 'cancel')
      size='medium'
      text='Cancel'
      priority='tertiary'}}
    {{frost-button
      onClick=(action 'save')
      size='medium'
      text='Save'
      priority='primary'}}
  {{/block-slot}}
{{/frost-modal-input}}
```

### ember-perfectscroll effects

This gives you styling of header/footer when content is scrolled underneath either element

Styling includes: box shadow plus slight transparency in header/footer to reveal content underneath
For more documentation on ember-perfectscroll:  [perfect-scrollbar](https://github.com/noraesae/perfect-scrollbar)

## Development
### Setup
```
git clone git@github.com:ciena-frost/ember-frost-modal-input.git
cd ember-frost-modal-input
npm install && bower install
```

### Development Server
A dummy application for development is available under `ember-frost-modal-input/tests/dummy`.
To run the server run `ember server` (or `npm start`) from the root of the repository and
visit the app at http://localhost:4200.

### Testing
Run `npm test` from the root of the project to run linting checks as well as execute the test suite
and output code coverage.
