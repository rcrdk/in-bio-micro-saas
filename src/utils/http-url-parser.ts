export function httpUrlParser(entry: string) {
	return entry.startsWith('http') ? entry : `https://${entry}`
}
