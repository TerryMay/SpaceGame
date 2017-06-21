import * as PIXI from "pixi.js";
import Asteroid from "./lib/Asteroid"
import Omega from "./lib/Omega";
import OmegaEngine from "./lib/OmegaEngine";
import BasicCannon from "./lib/BasicCannon";
import Controls from "./lib/Controls";
import Util from "./lib/Util";
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
    this.ballisticsMap = new Map();
    this.asteroidMap = new Map();
    this.vesselMap = new Map();
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
          this.ballisticsMap.set(this.ballisticsCount++, ammo);
          this.ballisticsMap[ammo.getId()] = ammo;
        }
      });
    this.addToStage(this.vesselMap, +new Date(), omega);
    this.addToStage(this.asteroidMap, +new Date(),
      new Asteroid(10, 100, 200, .5, -80));
    this.addToStage(this.asteroidMap, +new Date(),
      new Asteroid(9, window.innerWidth - 100, window.innerHeight - 100, .5, 80));
	}

	animate() {
  	// Render the scene
		this.renderer.render(this.stage);

    this.updateGameObjectMap(this.vesselMap);
    this.updateGameObjectMap(this.ballisticsMap);
    this.updateGameObjectMap(this.asteroidMap);

    this.ballisticsMap.forEach((ammo, bKey) => {
      this.asteroidMap.forEach((asteroid, aKey) => {
        if (Util.circlePointCollision(ammo.x, ammo.y, asteroid.x, asteroid.y, asteroid.getRadius())) {
          if (asteroid.getSize() > 1) {
            this.removeFromStage(this.ballisticsMap, bKey);
            const smaller = new Asteroid(asteroid.getSize()-1);
            smaller.position = asteroid.position;
            smaller.velocity = asteroid.velocity;
            smaller.velocity.setAngle(ammo.velocity.getAngle());
            this.addToStage(this.asteroidMap, this.asteroidCount++,
              smaller);
          }
          this.removeFromStage(this.asteroidMap, aKey); 
        }
      });
    });
		// Request to render at next browser redraw
		requestAnimationFrame(this.animate.bind(this));
	}

  updateGameObjectMap(map) {
    map.forEach((value, key) => {
      if (!this.checkBounds(value) && !value.wrapsScreenBounds) {
          this.removeFromStage(map, key);
        } else {
          value.update();
        }
    });
  }

  addToStage(map, key, myGameSprite) {
    map.set(key, myGameSprite);
    this.stage.addChild(myGameSprite);
  }

  removeFromStage(map, key) {
    this.stage.removeChild(map.get(key));
    map.delete(key);
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
