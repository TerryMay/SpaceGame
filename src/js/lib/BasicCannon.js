import Vector from "./Vector";
import Controls from "./Controls";
import Projectile from "./BaseProjectile";

class BasicCannon {
  constructor() {

  }

  getFireEmitter(fireButtonObservable) {
    return fireButtonObservable
      .flatMap((input) => {
          return Rx.Observable.of(new Projectile());
      })
      .throttle(50);
  }
}

export default BasicCannon;
