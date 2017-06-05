class Controls {
  
  static get KEY() {
    return {
      UP_UP      : 0x01,
      UP_DOWN    : 0x02,
      DOWN_UP    : 0x03,
      DOWN_DOWN  : 0x04,
      LEFT_UP    : 0x05,
      LEFT_DOWN  : 0x06,
      RIGHT_UP   : 0x07,
      RIGHT_DOWN : 0x08,
      FIRE_DOWN  : 0x09,
      FIRE_UP    : 0x0A,
    };
  }

  constructor() {
    this.anyKeyIsDown = false;
    this.left = this.keyboard(37);
    this.up = this.keyboard(38);
    this.right = this.keyboard(39);
    this.down = this.keyboard(40);
    this.fire = this.keyboard(32);
  }

  getKeyDownObservable() {
    return Rx.Observable.create(observer => {
      this.left.press = () => observer.onNext(Controls.KEY.LEFT_DOWN);
      this.right.press = () => observer.onNext(Controls.KEY.RIGHT_DOWN);
      this.up.press = () => observer.onNext(Controls.KEY.UP_DOWN);
      this.down.press = () => observer.onNext(Controls.KEY.DOWN_DOWN);
    })
  }

  getKeyUpObservable() {
    return Rx.Observable.create(observer => {
      this.left.release = () => observer.onNext(Controls.KEY.LEFT_UP);
      this.right.release = () => observer.onNext(Controls.KEY.RIGHT_UP);
      this.up.release = () => observer.onNext(Controls.KEY.UP_UP);
      this.down.release = () => observer.onNext(Controls.KEY.UP_DOWN);
    });
  }

  getFireObservable() {
    return Rx.Observable.create(observer => {
      this.fire.press = () => observer.onNext(Controls.KEY.FIRE_DOWN);
      this.fire.release = () => observer.onNext(Controls.KEY.FIRE_UP);
    });
  }

  getObservable() {
    return Rx.Observable.merge(
      this.getKeyDownObservable(),
      this.getKeyUpObservable(),
      this.getFireObservable(),
    );
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
        
        //if (key.isUp && key.press)  {
          key.press()
        //};

        key.isDown = true;
        key.isUp = false;
        this.anyKeyIsDown = true;
      }
      event.preventDefault();
    };

    //The `upHandler`
    key.upHandler = function(event) {
      if (event.keyCode === key.code) {
        if (key.isDown && key.release) key.release();
        key.isDown = false;
        key.isUp = true;
        this.anyKeyIsDown = false;
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