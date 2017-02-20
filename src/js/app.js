import '../../assets/js/zepto';
import './helpers/target_blank.js';
import { FastClick } from 'fastclick';

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

// Containers
// Represents a place where events and elements communicate with each other
import SearchDialog from './containers/Search';
import Menu from './containers/Menu';

Menu($('#menu-open'));
SearchDialog($('#search-open'));
