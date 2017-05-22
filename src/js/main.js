import * as PIXI from "pixi.js";
import MyCircle from "./MyCircle";
import Ship from "./Ship";
import Controls from "./Controls";
import Keys from "./Keys";
import Vector from "./lib/Vector";

document.addEventListener("DOMContentLoaded", () => {
	// Create a game class and start its animation
	let game = new Game();
	game.animate();

	// Expose the game instance to global scope (optional)
	window.game = game;
});

class Game {
	constructor() {
    const vectorDispatch = {
      "up":new Vector(0, -1),
      "down":new Vector(0,1),
      "left":new Vector(0, 1),
      "right":new Vector(0, -1)
    };
		// Change this to `this.renderer = new PIXI.WebGLRenderer(width, height)`
		// if you want to force WebGL
		this.renderer = PIXI.autoDetectRenderer(
			window.innerWidth,
			window.innerHeight
		);
		// Set an ID for some simple css styling
		this.renderer.view.id = "pixi";
		document.body.appendChild(this.renderer.view);

		// Pixelated scaling (optional)
		PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

    this.controls = new Controls();
    this.controls.getFireObservable()
      .subscribe(fire => console.log(fire));

		// Base container
		this.container = new PIXI.Container();
    this.ship = new Ship(window.innerWidth / 2, window.innerHeight / 2);

    this.controls.getKeyDownObservable()
      .subscribe(direction => {
        this.ship.addDirection(vectorDispatch[direction]);
      });

    this.controls.getKeyUpObservable()
      .subscribe(direction => console.log(direction));

    this.container.addChild(this.ship);

		// Set anchor to the middle
		//this.pixi.anchor.x = this.pixi.anchor.y = 0.5;
	}

	animate() {
		
		// Render the scene
		this.renderer.render(this.container);

		// Request to render at next browser redraw
		requestAnimationFrame(this.animate.bind(this));
	}

  getVectorFromDirection(direction) {

  }
}
