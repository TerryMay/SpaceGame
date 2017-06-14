import * as PIXI from "pixi.js";
import Asteroid from "./lib/Asteroid"
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
const outerbound = 25;

class Game {
	constructor() {
    this.ballisticsMap = {};
    this.ballisticsCount = 0;
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
    const a = new Asteroid(10, 100, 100, 0, 0);
    this.stage.addChild(a.getRenderer());

    // make a ship with a base engine
    this.omega = new Omega(
      window.innerWidth / 2,
      window.innerHeight / 2,
      this.controls,
      new OmegaEngine());
    this.omega.setWeapon(new BasicCannon())
      .subscribe((ammo) => {
        if(ammo !== null)
          this.stage.addChild(ammo.getRenderer());
          ammo.setId(this.ballisticsCount++);
          this.ballisticsMap[ammo.getId()] = ammo;
      });
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
      this.omega.y = window.innerHeight;
    }

    let ballisticsKeys = Object.keys(this.ballisticsMap);
    if (ballisticsKeys.length > 0) {
      ballisticsKeys.forEach((key) => {
        this.ballisticsMap[key].update();
        if (!this.checkBounds(this.ballisticsMap[key].getRenderer())) {
          this.stage.removeChild(this.ballisticsMap[key].getRenderer());
          delete this.ballisticsMap[this.ballisticsMap[key].getId()];
        }
      });
    }
   
		// Request to render at next browser redraw
		requestAnimationFrame(this.animate.bind(this));
	}

  checkBounds(sprite) {
    //simple wrapping for testing
    if (sprite.x > window.innerWidth + outerbound) {
      return false;
    } else if ( sprite.x < -outerbound) {
      return false;
    }

    if (sprite.y > window.innerHeight + outerbound) {
      return false;
    } else if (sprite.y < -outerbound) {
      return false;
    }
    return true;
  }
}
