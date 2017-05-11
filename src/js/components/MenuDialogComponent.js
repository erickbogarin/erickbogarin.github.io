
export default class MenuDialogComponent {
  constructor() {
    this.$overlay = $('#menu-overlay');
    this.$siteNav = $('.site-nav');
    this.$menuButton = $('.icon-menu');
  }

  get overlay() {
    return this.$overlay;
  }

  get closeButton() {
    return this.$closeButton;
  }

  toggleMenu() {
    this.$siteNav.toggleClass('is-visible');
    this.$overlay.toggleClass('is-visible');
    this.$menuButton.toggleClass('is-visible');
  }

  closeMenu() {
    this.$overlay.removeClass('is-visible');
    this.$siteNav.removeClass('is-visible');
    this.$menuButton.removeClass('is-visible');
  }
}
