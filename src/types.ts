import { NextRequest } from 'next/server'

export type LocaleLogicFunction = (req: NextRequest, config: Config) => string

export type Config = {
    routes?: {
        [key: string]: string,
        default: string
    }
    locales? : string[],
    localeLogic?: LocaleLogicFunction,
    langCookie?: string
}