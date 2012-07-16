(function(foxhound) {
    var one = function() {};
    one.prototype.handle = function() {
        foxhound.on('init', function(eventName) {
            document.getElementById('one').innerHTML = 'called from function in one.js on line 4';
        });
    };
    (new one()).handle();
})(window.foxhound);