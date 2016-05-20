/* global Ps */
import Ember from 'ember'
import layout from '../templates/components/frost-modal-input'

const {Component} = Ember

export default Component.extend({
  layout,
  scrollBindingsSet: false,
  containerObserver: null,  // @type {window.MutationObserver}
  $containerEl: null,
  $headerEl: null,
  $footerEl: null,

  /**
   * create a window.MutationObserver on the container element
   * mutation events callback invokes updateScrollStyles()
   * @returns {MutationObserver} window.MutationObserver on container element
   */
  createMutationObserver () {
    // create an observer instance
    let mutationObserver = new window.MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        this.updateScrollStyles()
      })
    })

    // configuration of the observer
    const config = { attributes: false, childList: true, characterData: false, subtree: true }
    // pass in the target DOM node, as well as the observer options
    mutationObserver.observe(this.get('$containerEl').get(0), config)

    return mutationObserver
  },

  /**
  * update perfect-scrollbar before checking scoll position
  * need to disconnect MutationObserver then re-establish to prevent infinite loop
  * of mutation event triggers, callback updates, which triggers new mutation event...
  */
  updatePerfectScrollbar () {
    let mutationObserver
    const $containerEl = this.get('$containerEl')

    Ps.update($containerEl.get(0))

    if (this.get('containerObserver')) {
      this.get('containerObserver').disconnect()
      mutationObserver = this.createMutationObserver()
    }

    if (this.isDestroyed || this.isDestroying) {
      mutationObserver.disconnect()
      return
    }

    this.set('containerObserver', mutationObserver)
  },

  /**
  * Checks scroll position within container element to add/remove scroll styling to header/footer elements
  */
  updateScrollStyles () {
    const $containerEl = this.get('$containerEl')
    const $headerEl = this.get('$headerEl')
    const $footerEl = this.get('$footerEl')
    const scrollTop = $containerEl.scrollTop()
    const innerHeight = $containerEl.innerHeight()
    const scrollHeight = $containerEl.get(0) && $containerEl.get(0).scrollHeight
    this.updatePerfectScrollbar()

    // style top of form with box shadow if content overflow hidden underneath header
    const shouldHeaderClassBePresent = scrollTop > 0
    $headerEl.toggleClass('header-scrolled', shouldHeaderClassBePresent)

    // style bottom of form with box shadow if content overflow hidden underneath footer
    const shouldFooterClassBePresent = scrollTop + innerHeight < scrollHeight
    $footerEl.toggleClass('footer-scrolled', shouldFooterClassBePresent)
  },

  /**
   * sets bindings/callbacks for perfect-scrollbar events on document element
   * creates a window.MutationObserver for mutating events on container element
   */
  setScrollBindings () {
    const $headerEl = this.get('$headerEl')
    const $footerEl = this.get('$footerEl')
    // const $containerEl = this.get('$containerEl')

    this.set('containerObserver', this.createMutationObserver())

    // bind document to perfect-scrollbar events
    Ember.$(document).on('ps-scroll-up', () => $footerEl.addClass('footer-scrolled'))
    Ember.$(document).on('ps-y-reach-end', () => $footerEl.removeClass('footer-scrolled'))
    Ember.$(document).on('ps-scroll-down', () => {
      $headerEl.addClass('header-scrolled')
      // $containerEl.addClass('content-padding')
    })
    Ember.$(document).on('ps-y-reach-start', () => {
      $headerEl.removeClass('header-scrolled')
      // $containerEl.removeClass('content-padding')
    })

    Ember.$(window).resize(this.updateScrollStyles.bind(this))

    // update scroll styles in case where content already hidden on initial DOM render
    this.updateScrollStyles()

    this.set('scrollBindingsSet', true)
  },

  didRender () {
    Ember.$('.ember-remodal.window').addClass('frost-modal-input')
  },

  actions: {
    modalOpen () {
      this.set('$containerEl', Ember.$('.ember-remodal.window.remodal-is-opened .ps-container'))
      this.set('$headerEl', Ember.$('.ember-remodal.window.remodal-is-opened .input-header'))
      this.set('$footerEl', Ember.$('.ember-remodal.window.remodal-is-opened .actions'))

      if (!(this.get('$containerEl').length > 0 && this.get('$headerEl').length > 0 && this.get('$footerEl').length > 0)) {
        return
      }
      if (!this.get('scrollBindingsSet')) {
        this.setScrollBindings()
      }
    },
    modalClose () {
      Ember.$(document).off('ps-scroll-up ps-scroll-down ps-y-reach-start ps-y-reach-end')

      Ember.$(window).off('resize', this.updateScrollStyles)

      if (this.get('containerObserver')) {
        this.get('containerObserver').disconnect()
      }
      this.set('scrollBindingsSet', false)
    }
  }
})
