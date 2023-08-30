const { headers } = require("next/headers")
const SETTINGS = require("./SETTINGS")

/**
 * @returns {string} The locale of the current session (Using headers, so server only)
 */
module.exports = function(){
    return headers().get(SETTINGS.signalHeader);
}