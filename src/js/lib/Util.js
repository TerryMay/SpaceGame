class Util {

  static clamp(value, min, max) {
		return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));
	}

  static distance(p0, p1) {
		var dx = p1.x - p0.x,
			dy = p1.y - p0.y;
		return Math.sqrt(dx * dx + dy * dy);
	}

	static rectIntersect(r0, r1) {
		return Util.rangeIntersect(r0.x, r0.x + r0.width, r1.x, r1.x + r1.width) &&
			   Util.rangeIntersect(r0.y, r0.y + r0.height, r1.y, r1.y + r1.height);
	}

	static degreesToRads(degrees) {
		return degrees / 180 * Math.PI;
	}

	static radsToDegrees(radians) {
		return radians * 180 / Math.PI;
	}

	static randomRange(min, max) {
		return min + Math.random() * (max - min);
	}

	static randomInt(min, max) {
		return Math.floor(min + Math.random() * (max - min + 1));
	}

	static roundToPlaces(value, places) {
		var mult = Math.pow(10, places);
		return Math.round(value * mult) / mult;
	}

	static roundNearest(value, nearest) {
		return Math.round(value / nearest) * nearest;
	}
}

export default Util;
