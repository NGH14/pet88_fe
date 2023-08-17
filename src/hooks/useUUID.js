export default function useUUID() {
	const UUID = crypto.randomUUID();

	return UUID;
}
