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
