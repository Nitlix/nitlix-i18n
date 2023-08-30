const SETTINGS = require("./SETTINGS")
const { NextResponse } = require('next/server')
const { geolocation } = require('@vercel/edge')

module.exports = function(request, config, response=null){
    const {
        routes = {
            default: 'en',
        },
        languages = [
            "en"
        ],
        localeLogic=(request, config, response)=>geolocation(request).country,
        langCookie = 'lang',
    } = config;

    if (!response){
        response = NextResponse.next();
    }

    function setCookie(name, value){
        request.cookies.set(name, value);
        response.cookies.set(name, value);
    }

    const getCookie = (name) => request.cookies.get(name);

    function setHeader(name, value){
        response.headers.set(name, value);
        request.headers.set(name, value);
    }

    let lang = getCookie(langCookie);
    if (lang){
        lang = lang.value.toLowerCase();
    }

    if(!languages[lang]) {
        const route = localeLogic(request, config, response);
        
        if (routes[route]) {
            lang = routes[route];
        }
        else {
            lang = routes.default;
        }

        setCookie(langCookie, lang);
    }

    setHeader(SETTINGS.signalHeader, lang);
    setCookie(SETTINGS.signalCookie, lang);

    return {request, response}
}