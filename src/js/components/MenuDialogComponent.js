
export default class MenuDialogComponent {
  constructor() {
    this.$overlay = $('#menu-overlay');
    this.$siteNav = $('.site-nav');
    this.$closeButton = $('.close');
  }

  get overlay() {
    return this.$overlay;
  }

  get closeButton() {
    return this.$closeButton;
  }

  openMenu() {
    this.$overlay.addClass('is-visible');
    this.$siteNav.addClass('is-visible');
  }

  closeMenu() {
    this.$overlay.removeClass('is-visible');
    this.$siteNav.removeClass('is-visible');
  }
}
