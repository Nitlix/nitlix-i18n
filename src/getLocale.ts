import { headers } from "next/headers"
import settings from "./settings"

/**
 * @returns {string} The locale of the current session (Using headers, so server only)
 */
export default function(){
    return headers().get(settings.signalHeader);
}