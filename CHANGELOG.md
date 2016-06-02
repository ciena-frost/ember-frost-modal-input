# 4.1.0

* **Added** `onClose` property so consumer can know when modal is closed.
* **Added** `onOpen` property so consumer can know when modal is opened.

# 4.0.1

* **Changed** dialog footer buttons from a fixed width of `150px` to have a minimum width of `150px`.

# 4.0.0

## Breaking

* **Upgraded** [ember-frost-bunsen](https://github.com/ciena-frost/ember-frost-bunsen) to version `6.0.3`.
* **Upgraded** [ember-prop-types](https://github.com/ciena-blueplanet/ember-prop-types) to version `2.0.0`.

## Non-Breaking

* **Added** `renderers` property for passing renderers to `frost-bunsen-form`.
* **Added** `showAllErrors` property for whether or not form should show all errors.
* **Added** `validators` property for passing validators to `frost-bunsen-form`.
* **Updated** component to use [ember-prop-types](https://github.com/ciena-blueplanet/ember-prop-types) for property validation.

# 3.0.1
No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`

# 3.0.0
## Changed
- **BREAKING** Using [ember-remodal](http://sethbrasile.github.io/ember-remodal/) addon to simplify modal dialog support. Additional modal-input template options required

## Removed
- **BREAKING** Removed liquid-fire modal code.
  - Removed the need to define/import transitions and configure the router.js file

## Upgrade notes
If you are upgrading your app to use this version, note the following -
- Remove the modal declaration from your router.js file
- Remove any import statement from your modal component file that is importing transitions from frost-modal-input
- Remove `{{liquid-modal}}` template code if you do not have any other liquid-fire modals in your app
- Apply `remodal-bg` class to the parent container where you want a blur effect on the modal overlay.
- `frost-modal-input` root template must use block-slots and contain `frost-bunsen-form` attrs - formView/formModel/formValue/onChange/onValidation. See README for details.
