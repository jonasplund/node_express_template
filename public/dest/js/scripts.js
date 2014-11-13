$(document).ready(function () {
    'use strict';
    for (var i = 0; i < 10; i++) {
        console.log((function (j) { return j + j; }) (i));
    }
});