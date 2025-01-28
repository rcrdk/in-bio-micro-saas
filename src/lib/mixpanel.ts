import Mixpanel from 'mixpanel'

import { env } from '@/lib/env'

const mixpanelEvent = Mixpanel.init(env.MIXPANEL_SECRET ?? '')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function trackServerEvent(eventName: string, properties: any) {
	if (process.env.NODE_ENV !== 'production' || !env.MIXPANEL_SECRET) return

	mixpanelEvent.track(eventName, properties)
}
