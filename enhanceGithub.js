var pushState = history.pushState;
history.pushState = function () {
    pushState.apply(history, arguments);
    enhanceGitHub();
};

window.addEventListener('pjax:end', function(){
    enhanceGitHub();
});

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
    var subNav = document.querySelector('.subnav-links');
    var buttonAll = document.createElement('a');
    buttonAll.href = 'pulls';
    buttonAll.className = 'js-selected-navigation-item subnav-item ehgh-buttons';
    buttonAll.append(document.createTextNode('All'));
    var buttonNew = document.createElement('a');
    buttonNew.className = 'js-selected-navigation-item subnav-item ehgh-buttons';
    buttonNew.href = 'pulls?utf8=✓&q=is%3Aopen is%3Apr -label%3A"request changes" -label%3A"WIP"';
    buttonNew.append(document.createTextNode('Only New'));
    subNav.prepend(buttonNew);
    subNav.prepend(buttonAll);
}
}
enhanceGitHub();
