import '../../assets/js/zepto';
import './helpers/target_blank';
import './helpers/fastclick';

// Containers
// Represents a place where events and elements communicate with each other
import searchDialog from './containers/search';
import menu from './containers/menu';

menu($('#menu-open'));
searchDialog($('#search-open'));
