import { useRef } from "react";

export function useSwipe(onSwipeLeft: () => void, onSwipeRight: () => void) {
	const startX = useRef<number | null>(null);

	const handleTouchStart = (e: React.TouchEvent) => {
		startX.current = e.touches[0].clientX;
	};

	const handleTouchEnd = (e: React.TouchEvent) => {
		if (startX.current === null) return;

		const endX = e.changedTouches[0].clientX;
		const diff = startX.current - endX;

		// swipe threshold
		if (diff > 50) {
			onSwipeLeft();
		} else if (diff < -50) {
			onSwipeRight();
		}

		startX.current = null;
	};

	return { handleTouchStart, handleTouchEnd };
}
