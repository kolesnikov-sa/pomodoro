export default function convertTimestampToMinutesSeconds (timestamp: number) {
	const timestampInSeconds = Math.floor(timestamp / 1000);
	
	const minutes = Math.floor(timestampInSeconds / 60);
	const seconds = Math.floor((timestamp - minutes * 60 * 1000) / 1000);
	
	return minutes + ':' + String(seconds).padStart(2, '0');
}