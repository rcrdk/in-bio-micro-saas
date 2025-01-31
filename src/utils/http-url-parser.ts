export function httpUrlParser(entry?: string) {
	if (!entry) return ''

	return entry.startsWith('http') ? entry : `https://${entry}`
}
