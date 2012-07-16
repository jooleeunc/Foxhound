/**
 * Foxhound JavaScript Event Manager v0.1
 * Joo Lee
 *
 * Copyright (c) 2012
 * Can be freely distributed under the MIT license.
 */
(function() {
    window.foxhound = {
        _events: [],
        _filename: 'foxhound.js', //name of this file
        _isFirefox: (navigator.userAgent.indexOf('Firefox') !== -1),
        _isChrome: (navigator.userAgent.indexOf('Chrome') !== -1),
        _tracking: true, //is tracking on?

        /**
         * Attach an event handler for a given event name
         *
         * @param name
         * @param callback
         */
        on: function(name, callback) {
            var caller = this._tracking ? this._getTargetLocation() : '',
                event = Event.create(name, this.on.caller, caller, callback);

            this._events.push(event);
        },

        /**
         * Fire an event, which executes all event handlers for the given event name
         *
         * @param name
         */
        fire: function(name) {
            var index, length = this._events.length,
                event = null;
            for(index=0; index < length; index++) {
                event = this._events[index];
                if (event.id === name) {
                    event.source = this.fire.caller;
                    event.callback.apply(event.target, arguments);
                }
            }
        },

        /**
         * Enable tracking (tracking is enabled by default)
         */
        enableTracking: function() {
            this._tracking = true;
        },

        /**
         * Disable tracking
         */
        disableTracking: function() {
            this._tracking = false;
        },

        /**
         * Show where all event handlers are declared, given an event name
         *
         * @param name
         */
        track: function(name) {
            if (!this._isFirefox && !this._isChrome) {
                throw new Error('Only supported in Chrome and Firefox.');
            }

            if (!this._tracking) {
                throw new Error('Tracking is disabled.');
            }

            var index, event, length,
                bucket = [];

            for(index=0, length = this._events.length; index < length; index++) {
                event = this._events[index];
                if (event.id === name) {
                    bucket.push(index);
                }
            }

            length = bucket.length;
            console.log(length + ' event handler' + (length === 1 ? '' : 's') + ' found:');
            for(index=0; index < length; index++) {
                event = this._events[bucket[index]];
                if (this._isChrome) {
                    console.log(event.targetLocation);
                } else {
                    console.log(event.target, event.targetLocation);
                }
            }
        },

        /**
         * Get the function caller location
         *
         * @private
         */
        _getTargetLocation: function() {
            var index, length, stack = [],
                stacktrace = this._getStackTrace();

            if (stacktrace !== null) {
                stack = stacktrace.split('\n');
                length = stack.length;
                for(index=1; index < length; index++) {
                    if (stack[index].indexOf(this._filename) === -1) {
                        return stack[index];
                    }
                }
            }
            return '';
        },

        /**
         * Get the full stack trace
         *
         * @private
         */
        _getStackTrace: function() {
            var error = new Error();
            if (error.stack) {
                return error.stack;
            }
            return null;
        }
    };

    var Event = (function() {
        var _Event = function() {
            this.id = null;
            this.source = null;
            this.target = null;
            this.targetLocation = null;
            this.callback = null;
        };

        return {
            create: function(id, target, targetLocation, callback) {
                var event = new _Event();
                event.id = id;
                event.target = target;
                event.targetLocation = targetLocation;
                event.callback = callback;
                return event;
            }
        };
    })();
})();