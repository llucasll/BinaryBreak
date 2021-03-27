import { keepInRange } from "../utils.js";

export const Movement = {
	infinity () {
		return true;
	},
	die (x, y) { // TODO make it default
		return (
			x > 100 // right
			|| y > 100 // bottom
			|| x + this.entity.w < 0 // left
			|| y + this.entity.h < 0 // top
		)? null : true;
	},
	hide (x, y) {
		return [
			keepInRange(x, 0-this.entity.w, 100),
			keepInRange(y, 0-this.entity.h, 100),
		];
	},
	stop (x, y) {
		return [
			keepInRange(x, 0, 100-this.entity.w),
			keepInRange(y, 0, 100-this.entity.h),
			true,
		];
	},
	bounce (x, y) {
		const { speed } = this.entity;
		
		if (speed.x>0 && x + this.entity.w >= 100) // right
			speed.x *= -1;
		if (speed.x<0 && x<=0) // left
			speed.x *= -1;
		
		if (speed.y>0 && y + this.entity.h >= 100) // bottom
			speed.y *= -1;
		if (speed.y<0 && y<=0) // top
			speed.y *= -1;

		// It shall become to the screen, even if it have been
		// outside of the screen for a long time
		return [
			keepInRange(x, 0, 100-this.entity.w),
			keepInRange(y, 0, 100-this.entity.h),
		];
	},
	bounceOrFall (x, y) {
		const { speed } = this.entity;
		
		if (speed.x>0 && x + this.entity.w >= 100) // right
			speed.x *= -1;
		if (speed.x<0 && x<=0) // left
			speed.x *= -1;
		
		if (y >= 100) // bottom
			return null;
		if (speed.y<0 && y<=0) // top
			speed.y *= -1;
		
		return [
			keepInRange(x, 0, 100-this.entity.w),
			keepInRange(y, 0, Infinity),
		];
	},
};
