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
    this.vesselMap = {};
    this.ballisticsCount = 0;
    this.asteroidCount = 0;
    this.vesselCount = 0;

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
    // make a ship with a base engine & weapon
    const omega = new Omega(
      window.innerWidth / 2,
      window.innerHeight / 2,
      this.controls,
      new OmegaEngine());
    omega.setWeapon(new BasicCannon())
      .subscribe((ammo) => {
        if(ammo !== null) {
          this.stage.addChild(ammo);
          ammo.setId(this.ballisticsCount++);
          this.ballisticsMap[ammo.getId()] = ammo;
        }
      });
    this.addToStage(this.vesselMap, this.vesselCount++, omega);
    this.addToStage(this.asteroidMap, this.asteroidCount++,
      new Asteroid(10, 100, 200, .5, -80));
    this.addToStage(this.asteroidMap, this.asteroidCount++,
      new Asteroid(10, window.innerWidth - 100, window.innerHeight - 100, .5, 80));
	}

	animate() {
  	// Render the scene
		this.renderer.render(this.stage);

    this.updateGameObjectMap(this.vesselMap);
    this.updateGameObjectMap(this.ballisticsMap);
    this.updateGameObjectMap(this.asteroidMap);
		// Request to render at next browser redraw
		requestAnimationFrame(this.animate.bind(this));
	}

  updateGameObjectMap(map) {
    const keys = Object.keys(map);
    if (keys.length > 0) {
      keys.forEach((key) => {
        if (!this.checkBounds(map[key]) && !map[key].wrapsScreenBounds) {
          this.removeFromStage(map, key);
        } else {
          map[key].update();
        }
      });
    }
  }

  addToStage(map, key, myGameSprite) {
    map[key] = myGameSprite;
    this.stage.addChild(myGameSprite);
  }

  removeFromStage(map, key) {
    this.stage.removeChild(map[key]);
    delete map[key];
  }

  checkBounds(myGameSprite) {
    //simple wrapping for testing
    if (myGameSprite.x > window.innerWidth + outerbound) {
      if (myGameSprite.wrapsScreenBounds)
        myGameSprite.x = 0;
      return false;
    } else if ( myGameSprite.x < -outerbound) {
      if(myGameSprite.wrapsScreenBounds)
        myGameSprite.x = window.innerWidth;
      return false;
    }

    if (myGameSprite.y > window.innerHeight + outerbound) {
        if(myGameSprite.wrapsScreenBounds)
          myGameSprite.y = 0;
      return false;
    } else if (myGameSprite.y < -outerbound) {
        if(myGameSprite.wrapsScreenBounds)
          myGameSprite.y = window.innerHeight;
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
      // return full size 
      
      return new Asteroid(10, 150, 200, .5, -80);
    }
  }
}
