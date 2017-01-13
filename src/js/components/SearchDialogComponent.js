import '../helpers/simpleJekyllSearch';

export default class SearchDialogComponent {
  constructor() {
    this.$searchDialog = $('.search-dialog');
    this.$query = $('#search-query');
    this.$overlay = $('#search-overlay');
    this.$closeBtn = $('.close');
  }

  get closeBtn() {
    return this.$closeBtn;
  }

  openSearchDialog() {
    this.$searchDialog.attr('data-state', null);
    this.$overlay.addClass('is-visible');
    this.$searchDialog.find('input').focus();
    this.$query.simpleJekyllSearch();
  }

  closeSearchDialog() {
    this.$searchDialog.attr('data-state', 'is-hidden');
    this.$overlay.removeClass('is-visible');
  }

  isEscKeyPressedWhenTheSearchDialogIsVisible(event) {
    return event.keyCode === 27 && !this.$searchDialog.attr('data-state');
  }
}
