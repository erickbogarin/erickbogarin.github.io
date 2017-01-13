import SearchDialogComponent from '../components/SearchDialogComponent';

const searchDialog = new SearchDialogComponent();

/**
*
* @params {dom element} - The target element attached to the DOM
*/
export default ($element) => {
  if (!$element) {
    throw new Error('A valid DOM Element must be passed.');
  }

  /**
  * @event register a click listener that opens the search dialog
  *
  * Opens a hidden menu dialog to the screen
  */
  $element.click(() => {
    searchDialog.openSearchDialog();
  });

  /**
  * @event register a click listener for a close button element
  *
  * Hides the search dialog
  */
  searchDialog.closeBtn.click((e) => {
    e.stopPropagation();
    searchDialog.closeSearchDialog();
  });

  /**
  * @event register a listener for ESC key
  *
  * Hides the search dialog
  */
  document.addEventListener('keydown', (e) => {
    if (searchDialog.isEscKeyPressedWhenTheSearchDialogIsVisible(e)) {
      searchDialog.closeSearchDialog();
    }
  });
};
