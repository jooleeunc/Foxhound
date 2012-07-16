(function(foxhound) {
    var two = {
        handle: function() {
            foxhound.on('init', function(eventName) {
                document.getElementById('two').innerHTML = 'called from function in two.js on line 4';
            });
        }
    };
    two.handle();
})(window.foxhound);