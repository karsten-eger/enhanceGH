var pushState = history.pushState;
history.pushState = function () {
    pushState.apply(history, arguments);
    enhanceGitHub();
};
window.addEventListener('pjax:end', function(){
    enhanceGitHub();
});
enhanceGitHub();
function enhanceGitHub() {
    // Add Whitespace Button to Pull Request File Change List
    if (window.location.href.indexOf('/files') !== -1 && !document.querySelector('.ehgh-buttons')) {
        var prButtons = document.querySelector('.pr-review-tools');
        var buttonDiv = document.createElement('div');
        buttonDiv.className = 'diffbar-item ehgh-buttons';
        var w1Button = document.createElement('a');
        w1Button.href = '?w=1';
        w1Button.className = 'btn btn-sm btn-primary';
        w1Button.append(document.createTextNode('No Whitespace'));
        buttonDiv.append(w1Button);
        prButtons.append(buttonDiv);
    }

    // Add Filter Buttons to Pull Request List
    if (window.location.href.indexOf('/pulls') !== -1 && !document.querySelector('.ehgh-buttons')) {
        var filterContainer = document.querySelector('div.subnav div[role="search"]');
        var filtersElement = filterContainer.querySelector('.select-menu-list');
        var repoString = window.location.pathname;
        var filterString = window.location.search;
        var elementTemplate = filtersElement.querySelector('.select-menu-item.js-navigation-item:first-child').cloneNode(1);
        elementTemplate.className += ' ehGHfilter';
        var filterHelp = filtersElement.querySelector('.select-menu-item.js-navigation-item:last-child');

        var filters = {};
        ehGHinitFilters();

        function ehGHaddFilter() {
            var filterName = prompt('Name your new filter!', 'new filter');
            if (!filterName) return;

            filterObject = {name : filterName, search : filterString};
            if (!filters[repoString]) {
                filters[repoString] = [];
            }
            filters[repoString].push(filterObject);
            localStorage.setItem('filters', JSON.stringify(filters));
            ehGHinitFilters();
        }

        function ehGHremoveFilter(name) {
            handler = JSON.parse(localStorage.getItem('filters'));
            if (handler[repoString]) {
                Object.keys(handler[repoString]).map(function(objectKey, index) {
                    if (handler[repoString][objectKey]['name'] == name) {
                        handler[repoString].splice(objectKey, 1);
                    }
                });
            }
            localStorage.setItem('filters', JSON.stringify(handler));
            ehGHinitFilters();
        }

        function ehGHinitFilters() {
            // Delete existing nodes
            var ownFilters = filtersElement.querySelectorAll('.ehGHfilter');
            Object.keys(ownFilters).map(function(objectKey, index) {
                ownFilters[objectKey].remove();
            });

            // Add new nodes for all saved filters
            filters = JSON.parse(localStorage.getItem('filters')) || {};
            if (filters && filters[repoString]) {
                Object.keys(filters[repoString]).map(function(objectKey, index) {
                    filter = elementTemplate.cloneNode(1);
                    filter.querySelector('div').innerHTML = filters[repoString][objectKey]['name'];
                    filter.href = filters[repoString][objectKey]['search'];
                    var deleteSpan = document.createElement('span');
                    deleteSpan.className = 'select-menu-item-icon';
                    deleteSpan.style = 'width: 18px;text-align: center;margin-left: -25px;';
                    deleteSpan.append(document.createTextNode('x'));
                    deleteSpan.addEventListener('click', function(e){e.preventDefault();ehGHremoveFilter(filters[repoString][objectKey]['name'])});
                    filter.prepend(deleteSpan);
                    filtersElement.insertBefore(filter, filterHelp);
                });
            }
            // add "Add Filter" Button
            addFilter = elementTemplate.cloneNode(1);
            addFilter.querySelector('div').innerHTML = 'Save current filter';
            addFilter.href = '#';
            addFilter.addEventListener('click', function(e){e.preventDefault();ehGHaddFilter()});
            filtersElement.insertBefore(addFilter, filterHelp);
        }
    }
}
