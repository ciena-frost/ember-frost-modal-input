[ci-img]: https://img.shields.io/travis/ciena-frost/ember-frost-modal-input.svg "Travis CI Build Status"
[ci-url]: https://travis-ci.org/ciena-frost/ember-frost-modal-input

[cov-img]: https://img.shields.io/coveralls/ciena-frost/ember-frost-modal-input.svg "Coveralls Code Coverage"
[cov-url]: https://coveralls.io/github/ciena-frost/ember-frost-modal-input

[npm-img]: https://img.shields.io/npm/v/ember-frost-modal-input.svg "NPM Version"
[npm-url]: https://www.npmjs.com/package/ember-frost-modal-input

[![Travis][ci-img]][ci-url] [![Coveralls][cov-img]][cov-url] [![NPM][npm-img]][npm-url]

# ember-frost-modal-input
A modal component that contains bunsen form content. Renders a custom header, a bunsen form and custom actions in the footer.

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
| `modalName` | `string` | | Required name for the modal |
| `onChange` | `Function` | `<action-name>` | Optional callback for when form values change |
| `onClose` | `Function` | `<action-name>` | Optional callback for when modal is closed |
| `onOpen` | `Function` | `<action-name>` | Optional callback for when modal is opened |
| `onValidation` | `Function` | `<action-name>` | Optional callback for when form is validated |

## Examples

#### Component template using ember-block-slots
Below is an example of template.hbs
```handlebars
{{#frost-modal-input
  onClose=(action 'clearForm')
  onSubmitHandler=(action 'save')
  title='Edit user'
  subtitle='John Smith'
  modalName=modalName as |slot|}}
  {{#block-slot slot 'target'}}
    {{frost-button
      text='Open long form with scroll'
      priority='secondary'
      size='medium'}}
  {{/block-slot}}

  {{#block-slot slot 'body'}}
    {{frost-bunsen-form
      bunsenModel=userModel
      autofocus=false
      inline=true
      onChange=(action 'formValueChanged')
      onValidation=(action 'onValidation')
      renderers=renderers
      showAllErrors=showAllErrors
      value=formValue
      validators=validators
      }}
  {{/block-slot}}
{{/frost-modal-input}}
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

#### Background effects
ember-remodal provides you with a [remodal-bg](http://sethbrasile.github.io/ember-remodal/#/styling) class that you can apply to your application content, to apply blur effects to the modal overlay.
```handlebars
<div class="dummy-content remodal-bg">
  {{outlet}}
</div>
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
