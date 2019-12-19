export function createGuidGenerator () {
	let guid = 0

	return () => guid++
}
