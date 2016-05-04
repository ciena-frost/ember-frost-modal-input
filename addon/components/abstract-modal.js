/**
 * Functionality to style headder/footer elements depending on scroll state, content hidden under header/footer
 */

import Ember from 'ember'
import $ from 'jquery'

const {Component} = Ember

/**
* Checks scroll position within container element to add/remove scroll styling to header/footer elements
* @ctx {Ember.component}
*/
function updateScrollStyles () {
  const $containerEl = this.get('$containerEl')
  const $headerEl = this.get('$headerEl')
  const $footerEl = this.get('$footerEl')
  const scrollTop = $containerEl.scrollTop()
  const innerHeight = $containerEl.innerHeight()
  const scrollHeight = $containerEl.get(0) && $containerEl.get(0).scrollHeight

  // style top of form with box shadow if content overflow hidden underneath header
  if (scrollTop > 0) {
    $headerEl.addClass('header-scrolled')
  } else {
    $headerEl.removeClass('header-scrolled')
  }

  // style bottom of form with box shadow if content overflow hidden underneath footer
  if (scrollTop + innerHeight >= scrollHeight) {
    $footerEl.removeClass('footer-scrolled')
  } else {
    $footerEl.addClass('footer-scrolled')
  }
}

/**
 * sets bindings/callbacks for perfect-scrollbar events on document element
 * creates a window.MutationObserver for mutating events on container element
 * @ctx {Ember.component}
 */
function setScrollBindings () {
  const $containerEl = this.get('$containerEl')
  const $headerEl = this.get('$headerEl')
  const $footerEl = this.get('$footerEl')

  const createContainerObserver = () => {
    // create an observer instance
    let mutationObserver = new window.MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        updateScrollStyles.apply(this)
      })
    })

    // configuration of the observer
    const config = { attributes: true, childList: true, characterData: false, subtree: true }

    // pass in the target DOM node, as well as the observer options
    mutationObserver.observe($containerEl.get(0), config)

    this.set('containerObserver', mutationObserver)
  }

  createContainerObserver()

  // bind document to perfect-scrollbar events
  $(document).on('ps-scroll-up', () => $footerEl.addClass('footer-scrolled'))
  $(document).on('ps-y-reach-end', () => $footerEl.removeClass('footer-scrolled'))
  $(document).on('ps-scroll-down', () => $headerEl.addClass('header-scrolled'))
  $(document).on('ps-y-reach-start', () => $headerEl.removeClass('header-scrolled'))

  $(window).resize(() => updateScrollStyles.apply(this))

  // update scroll styles in case where content already hidden on initial DOM render
  updateScrollStyles.apply(this)

  this.set('scrollBindingsSet', true)
}

export default Component.extend({
  scrollBindingsSet: false,
  containerObserver: null,  // @type {MutationObserver}
  $containerEl: null,
  $headerEl: null,
  $footerEl: null,
  containerElClassname: 'ps-container',
  headerElClassname: 'input-header',
  footerElClassname: 'actions',

  /* Ember.Component method */
  willDestroyElement () {
    // perfect-scrollbar events
    $(document).off('ps-scroll-up')
    $(document).off('ps-scroll-down')
    $(document).off('ps-y-reach-start')
    $(document).off('ps-y-reach-end')

    $(window).off('resize')

    if (this.get('containerObserver')) {
      this.get('containerObserver').disconnect()
    }
  },

  /* Ember.Component method */
  didUpdateAttrs () {
    this._super(...arguments)

    this.set('$containerEl', this.$('.' + this.get('containerElClassname')))
    this.set('$headerEl', this.$('.' + this.get('headerElClassname')))
    this.set('$footerEl', this.$('.' + this.get('footerElClassname')))

    if (!(this.get('$containerEl').length > 0 && this.get('$headerEl').length > 0 && this.get('$footerEl').length > 0)) {
      return
    }
    if (!this.get('scrollBindingsSet')) {
      setScrollBindings.apply(this)
    }
  }
})
