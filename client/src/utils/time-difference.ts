export const timeDifference = (ts: number) => {
	//ts - timestamp at which message sent
	const currentDate = new Date().getTime();

	const difference = Math.floor((currentDate - ts) / 36e5);

	if (difference > 48) {
		return new Date(ts).toLocaleDateString();
	} else if (difference < 48 && difference > 24) {
		return "Yeasterday";
	}
};
