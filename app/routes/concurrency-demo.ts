import { json, type LoaderArgs } from '@remix-run/node'
import {sleep} from '~/utils/sleep'

export const loader = async ({ request }: LoaderArgs) => {
    const urlSearchParams = new URLSearchParams(request.url.split("?")[1])
    const params = Object.fromEntries(urlSearchParams.entries())
    
    if(params.duration && typeof parseInt(params.duration, 10) === 'number') {
        await sleep(parseInt(params.duration, 10))
        return json({ success: true })
    }

    return json({success: true})
}