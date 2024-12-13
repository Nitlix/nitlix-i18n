import { headers } from "next/headers";
import settings from "./settings";

/**
 * @returns {string} The locale of the current session (Using headers, so server only)
 */
export default async function () {
    return (await headers()).get(settings.signalName);
}
