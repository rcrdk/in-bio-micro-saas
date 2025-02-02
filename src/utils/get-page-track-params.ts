export function getPageTrackParams(params: {
	[key: string]: string | string[] | undefined
}) {
	const utmTags: Record<string, string> = {}

	const paramsFilter = [
		'utm_source',
		'utm_medium',
		'utm_campaign',
		'utm_content',
		'utm_term',
		'dclid',
		'fbclid',
		'gclid',
		'ko_click_id',
		'li_fat_id',
		'msclkid',
		'sccid',
		'ttclid',
		'twclid',
		'wbraid',
	]

	Object.entries(params)
		.filter((item) => {
			const [key, value] = item
			return paramsFilter.includes(key) && value
		})
		.map((item) => {
			const [key, value] = item
			return (utmTags[key] = typeof value === 'string' ? value : value!.at(0)!)
		})

	return utmTags
}
