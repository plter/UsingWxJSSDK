var express = require('express');
var router = express.Router();
const https = require("https");
const Wx = require("../src/Wx");

/* GET home page. */
router.get('/', async function (req, res, next) {

    let ticket = await Wx.getTicket();
    res.render('index', {title: 'Express', ticket: ticket});
});

module.exports = router;
