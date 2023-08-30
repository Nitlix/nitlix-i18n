"use client";

const SETTINGS = require("./SETTINGS")

function getCookie(name){
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++){
        const cookie = cookies[i].split('=');
        if (cookie[0].trim() === name){
            return cookie[1];
        }
    }
    return null;
}

/**
 * @returns {string} The locale of the current session (Using client cookies, so client only)
 */
module.exports = function(){
    let lang = getCookie(SETTINGS.signalCookie);
    if (lang){
        return lang.toLowerCase();
    }
    else {
        console.warn("Language fetching failure, defaulting to null")
        return null;
    }
}