$(document).ready(function () {
    'use strict';
    var a = 3;
    for (var i = 0; i < 10; i++) {
        console.log((function (j) { return j + j; }) (i));
    }
});