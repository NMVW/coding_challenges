// services
import { AssetLoader } from 'services';

// components
import { Game } from './game';

export { app }

function app () {

	const assetList = {
		'skierCrash' : require('assets/skier/skier_crash.png'),
		'skierLeft' : require('assets/skier/skier_left.png'),
		'skierLeftDown' : require('assets/skier/skier_left_down.png'),
		'skierDown' : require('assets/skier/skier_down.png'),
		'skierRightDown' : require('assets/skier/skier_right_down.png'),
		'skierRight' : require('assets/skier/skier_right.png'),
		'skierJump1' : require('assets/skier/skier_jump_1.png'),
		'skierJump2' : require('assets/skier/skier_jump_2.png'),
		'skierJump3' : require('assets/skier/skier_jump_3.png'),
		'skierJump4' : require('assets/skier/skier_jump_4.png'),
		'skierJump5' : require('assets/skier/skier_jump_5.png'),
		'tree' : require('assets/landscape/tree_1.png'),
		'treeCluster' : require('assets/landscape/tree_cluster.png'),
		'rock1' : require('assets/landscape/rock_1.png'),
		'rock2' : require('assets/landscape/rock_2.png'),
    'rhinoDefault': require('assets/rhino/rhino_default.png'),
    'rhinoLeft': require('assets/rhino/rhino_run_left.png'),
    'rhinoLeft2': require('assets/rhino/rhino_run_left_2.png'),
    'rhinoEat0': require('assets/rhino/rhino_lift_eat_0.png'),
    'rhinoEat1': require('assets/rhino/rhino_lift_eat_1.png'),
    'rhinoEat2': require('assets/rhino/rhino_lift_eat_2.png'),
    'rhinoEat3': require('assets/rhino/rhino_lift_eat_3.png'),
    'rhinoEat4': require('assets/rhino/rhino_lift_eat_4.png'),
    'rhinoEat5': require('assets/rhino/rhino_lift_eat_5.png'),
	};

	const assetLoader = new AssetLoader(assetList);

	const dimensions = {
		width: window.innerWidth,
		height: window.innerHeight,
		dpr: window.devicePixelRatio,
	};
	const game = new Game(dimensions, 'body');

	const skier = game.makeSkier({
		direction: 5,
		x: 0,
		y: 0,
		speed: 8
	});

	const rhino = game.makeRhino({
		direction: 1,
		x: 5,
		y: 20,
		speed: 10
	});

	const gameLoop = function() {

		game.ui.render(window, () => {

			skier.move(() => game.addNewObstacles(skier.direction));
			skier.draw();

			rhino.move();
			rhino.draw();

			game.drawAllObstacles();

			game.detectCollision();

			game.renderScore();

		});

		requestAnimationFrame(gameLoop);
	};

	const start = function() {

		game.initControls($(window)); // bind key interface

		assetLoader.loading.then(function() {
			game.initObstacles();
			game.startScoring();
			requestAnimationFrame(gameLoop);
		});
	};

	start();
}