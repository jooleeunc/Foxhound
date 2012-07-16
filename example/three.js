(function(foxhound) {
    foxhound.on('init', function(eventName) {
        document.getElementById('three').innerHTML = 'called from function in three.js on line 2';
    });
})(window.foxhound);