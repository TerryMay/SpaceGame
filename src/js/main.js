import * as PIXI from "pixi.js";
import Omega from "./lib/Omega";
import OmegaEngine from "./lib/OmegaEngine";
import BasicCannon from "./lib/BasicCannon";
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
    this.ballisticsArray = [];
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

		// Base container
		this.stage = new PIXI.Container();

    // make a ship with a base engine
    this.omega = new Omega(
      window.innerWidth / 2,
      window.innerHeight / 2,
      this.controls,
      new OmegaEngine());

    this.omega.setWeapon(new BasicCannon())
      .subscribe((projectile) => this.ballisticsArray.push(projectile));

    this.stage.addChild(this.omega);
	}

	animate() {
		// Render the scene
		this.renderer.render(this.stage);
    this.omega.update();

    //simple wrapping for testing
    if (this.omega.x > window.innerWidth) {
      this.omega.x = 0;
    } else if ( this.omega.x < -1) {
      this.omega.x = window.innerWidth;
    }

    if (this.omega.y > window.innerHeight) {
      this.omega.y = 0;
    } else if (this.omega.y < -1) {
      this. omega.y = window.innerHeight;
    }

    

		// Request to render at next browser redraw
		requestAnimationFrame(this.animate.bind(this));
	}

  getVectorFromDirection(direction) {

  }
}
