'use strict';

function sendResponse(data) {
    res.send(data.code, data.message);
}

module.exports = {
    sendResponse: sendResponse
};