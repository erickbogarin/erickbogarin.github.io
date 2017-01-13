import MenuDialogComponent from '../components/MenuDialogComponent';

const menuDialog = new MenuDialogComponent();

/**
* @params {dom element} - The target element attached to the DOM
*/
export default ($element) => {
  if (!$element) {
    throw new Error('A valid DOM Element must be passed.');
  }

  /**
  * @event register a click listener opening menu
  *
  * Opens the hidden menu
  */
  $element.click(() => {
    menuDialog.openMenu();
  });

  /**
  * @event register a click listener event
  *
  * Triggered either to overlay content or close icon
  *
  * Hides the menu
  */
  menuDialog.overlay.add(menuDialog.closeButton).click((e) => {
    e.stopPropagation();

    menuDialog.closeMenu();
  });
};
