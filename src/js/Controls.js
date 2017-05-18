class Controls {
  constructor() {
    this.left = this.keyboard(37);
    this.up = this.keyboard(38);
    this.right = this.keyboard(39);
    this.down = this.keyboard(40);
    this.fire = this.keyboard(32);
}

  getKeyDownObservable() {
    return Rx.Observable.create(observer => {
      this.left.press = () => observer.onNext('left');
      this.right.press = () => observer.onNext('right');
      this.up.press = () => observer.onNext('up');
      this.down.press = () => observer.onNext('down');
    });
  }

  getKeyUpObservable() {
    return Rx.Observable.create(observer => {
      this.left.release = () => observer.onNext('left');
      this.right.release = () => observer.onNext('right');
      this.up.release = () => observer.onNext('up');
      this.down.release = () => observer.onNext('down');
    });
  }

  getFireObservable() {
    return Rx.Observable.create(observer => {
      this.fire.press = () => observer.onNext('fire-down');
      this.fire.release = () => observer.onNext('fire-up');
    });
  }

  keyboard(keyCode) {
    var key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = function(event) {
      if (event.keyCode === key.code) {
        if (key.isUp && key.press) key.press();
        key.isDown = true;
        key.isUp = false;
      }
      event.preventDefault();
    };

    //The `upHandler`
    key.upHandler = function(event) {
      if (event.keyCode === key.code) {
        if (key.isDown && key.release) key.release();
        key.isDown = false;
        key.isUp = true;
      }
      event.preventDefault();
    };

    //Attach event listeners
    window.addEventListener(
      "keydown", key.downHandler.bind(key), false
    );
    window.addEventListener(
      "keyup", key.upHandler.bind(key), false
    );
    return key;
  }
}


export default Controls;