export const Movement = {
	infinity () {
		return true;
	},
	die (x, y) {
		return (
			x > 100
			|| y > 100
			|| x + this.entity.w < 0
			|| y + this.entity.h < 0
		)? null : true;
	},
	hide (x, y) {
		return !(
			x > 100
			|| y > 100
			|| x + this.entity.w < 0
			|| y + this.entity.h < 0
		);
	},
	stop (x, y) {
		return !(
			x + this.entity.w >= 100
			|| y + this.entity.h >= 100
			|| x <= 0
			|| y <= 0
		);
	},
	bounce (x, y) {
		if (
			x + this.entity.w >= 100
			|| x <= 0
		)
			this.entity.speed.x *= -1;
		
		if (
			y + this.entity.h >= 100
			|| y <= 0
		)
			this.entity.speed.y *= -1;
	},
};
