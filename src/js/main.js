import * as PIXI from "pixi.js";
import MyCircle from "./MyCircle";
import Ship from "./Ship";
import Omega from "./Omega";
import OmegaEngine from "./lib/OmegaEngine";
import Controls from "./lib/Controls";
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
		this.stage = new PIXI.Container();
    console.log(this.stage.width)
    //this.ship = new Ship(this.container.width/2, this.container.height/2);
    //this.ship.addControls(this.controls.getControlsObservble());
    //this.container.addChild(this.ship);
    this.omega = new Omega(window.innerWidth / 2, window.innerHeight / 2, new OmegaEngine());
    this.omega.setControls(this.controls.getObservable());
    this.stage.addChild(this.omega);
		// Set anchor to the middle
		//this.pixi.anchor.x = this.pixi.anchor.y = 0.5;
	}

	animate() {
		// Render the scene
		this.renderer.render(this.stage);
    this.omega.update();
		// Request to render at next browser redraw
		requestAnimationFrame(this.animate.bind(this));
	}

  getVectorFromDirection(direction) {

  }
}
