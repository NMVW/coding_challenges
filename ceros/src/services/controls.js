export class Controls {

	// SKIER STATES:
	// 0 crash,
	// 1 left,
	// 2 leftDown,
	// 3 down,
	// 4 rightDown,
	// 5 right

	static ski = {

		left (skier, react=d=>d) {
			if (skier.direction === 0) {
				// get back up, clutz
				skier.direction = 1;
				return;
			}
			if (skier.direction === 1) {
				// hockey stop
				skier.x -= skier.speed;
				react(skier.direction);
				return;
			}
			if (skier.direction > 1) skier.direction--;
		},

		right (skier, react=d=>d) {
			if(skier.direction === 5) {
				skier.x += skier.speed;
				react(skier.direction);
			} else {
				skier.direction++;
			}
		},

		up (skier, react=d=>d) {
			if(skier.direction === 1 || skier.direction === 5) {
				skier.y -= skier.speed;
				react(6);
			}
		},

		down (skier, react=d=>d) {
			skier.direction = 3;
		},

		jump (skier, react=d=>d) {
			skier.jump();
		},
	};

	static keymap = {
		37: Controls.ski.left,
		39: Controls.ski.right,
		38: Controls.ski.up,
		40: Controls.ski.down,
		32: Controls.ski.jump,
	};

	constructor (game, global) {
		this.game = game;
		this.bindKeys(game, global);
	}

	bindKeys (game, global) {
		const skier = game.entities.skier;
		const react = direction => game.addNewObstacles(direction);

		global.keydown(ev => {
			// skier must focus on landing... check back later
			if (skier.state !== 'airborne') Controls.keymap[ev.which](skier, react);
			ev.preventDefault();
		});
	}
}