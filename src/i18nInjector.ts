import { NextResponse, NextRequest } from 'next/server'
import { Config } from './types'
import settings from './settings'
const { geolocation } = require('@vercel/edge')

export default function(request: NextRequest, config: Config, response: NextResponse = NextResponse.next()){
    const {
        routes = {
            default: 'en',
        },
        locales = [
            "en"
        ],
        localeLogic = (request: NextRequest, config: Config)=>geolocation(request).country,
        langCookie = 'lang',
    } = config

    if (!response){
        response = NextResponse.next();
    }


    function setCookie(name: string, value: string){
        request.cookies.set(name, value);
        response.cookies.set(name, value);
    }

    const getCookie = (name: string) => request.cookies.get(name);

    function setHeader(name: string, value: string){
        response.headers.set(name, value);
        request.headers.set(name, value);
    }

    let lang: any = getCookie(langCookie);
    if (lang){
        lang = lang.value.toLowerCase();
    }

    if(!locales.includes(lang)) {
        const route = localeLogic(request, config);
        
        if (routes[route]) {
            lang = routes[route];
        }
        else {
            lang = routes.default;
        }

        setCookie(langCookie, lang);
    }

    setHeader(settings.signalHeader, lang);
    setCookie(settings.signalCookie, lang);

    return {
        request, 
        response
    }
}