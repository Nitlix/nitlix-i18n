import { headers } from "next/headers"
import SETTINGS from "./SETTINGS"

/**
 * @returns {string} The locale of the current session (Using headers, so server only)
 */
export default function(){
    return headers().get(SETTINGS.signalHeader);
}