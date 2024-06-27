import { NextResponse, NextRequest } from 'next/server'
import { Config } from './types'
import settings from './settings';


export default function(request: NextRequest, config: Config, response: NextResponse = NextResponse.next()){
    const {
        routes = {
            default: 'en',
        },
        locales = [
            "en"
        ],
        localeLogic = (request: NextRequest)=>{
            const header = request.headers.get('Accept-Language') || request.headers.get('accept-language') || "";
            return header?.split(",")[0].split(";")[0].split("-")[0].toLowerCase();
        },
    } = config;

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

    let lang: any = getCookie(settings.signalName)?.value.toLowerCase() || "";

    if(!locales.includes(lang)) {
        const route: string = (localeLogic(request, config)) || routes.default;
        
        lang = routes.default;
        (routes[route]) && (lang = routes[route]);

        setCookie(settings.signalName, lang);
    }

    setHeader(settings.signalName, lang);
    setCookie(settings.signalName, lang);

    return {
        request, 
        response
    }
}