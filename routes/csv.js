/*jslint browser: true, this: true*/
/*global
    console 
*/
'use strict';
const express = require('express'),
    calc = require('../src/js/csv');
const router = express.Router();
console.log(calc);
router.get('/', (req, res) => {
    res.json(calc(req.query.input));
});
module.exports = router;
