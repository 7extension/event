"use strict";
String.prototype.toProperCase = function () {
    return this.toLowerCase().replace(/(^|[\s.])[^\s.]/gm, (s) => s.toUpperCase());
};
Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)];
};
/**
 * Checks whether a text is empty.
 * @returns {boolean}
 */
String.prototype.isEmpty = function () {
    return this.length === 0 || !this.trim();
};
