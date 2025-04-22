/**
 * Converts a number between 0 and 100 to a hex string representing the opacity.
 *
 * @param opacity - A number between 0 and 100 representing the opacity.
 * @returns A string representing the opacity in hex format.
 */
export const opacityToHex = (opacity: number): string => {
	const clampedOpacity = Math.max(0, Math.min(100, opacity));
	return Math.round((clampedOpacity / 100) * 255)
		.toString(16)
		.padStart(2, '0');
};
