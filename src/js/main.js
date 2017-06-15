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
    this.asteroidMap = {};
    this.ballisticsCount = 0;
    this.asteroidCount = 0;
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
    const a = this.getAsteroid();
    this.stage.addChild(a);

    // make a ship with a base engine & weapon
    this.omega = new Omega(
      window.innerWidth / 2,
      window.innerHeight / 2,
      this.controls,
      new OmegaEngine());
    this.omega.setWeapon(new BasicCannon())
      .subscribe((ammo) => {
        if(ammo !== null) {
          this.stage.addChild(ammo);
          ammo.setId(this.ballisticsCount++);
          this.ballisticsMap[ammo.getId()] = ammo;
        }
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
        if (!this.checkBounds(this.ballisticsMap[key])) {
          this.removeFromStage(this.ballisticsMap, key);
        } else {
          this.ballisticsMap[key].update();
        }
      });
    }
   
		// Request to render at next browser redraw
		requestAnimationFrame(this.animate.bind(this));
	}

  removeFromStage(map, key) {
    this.stage.removeChild(map[key]);
    delete map[key];
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

  getAsteroid(original = null) {
    if (original !== null) {
      // take original size and reduce it
      // carry over position and velo vectors
      // make random chance to split original into more
      // make random chance to drop new items
    } else {
      // make random starting point that isn't a spawn kill
      // return full size asteroid
      const a = new Asteroid(10, 150, 200, 0, 0);
      a.setId(this.asteroidCount++);
      this.asteroidMap[a.getId()] = a;
      return a;
    }
  }
}
