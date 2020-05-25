function Automata(x, y, c) {
    this.pos = createVector(random(width), random(height));
    this.target = createVector(x, y);
    this.vel = p5.Vector.random3D();
    this.acc = createVector();
    this.r = 8;
    this.mouseRadius = 100;
    this.maxspeed = 5;
    this.maxforce = 1;
    this.color = c;
  }
  
  Automata.prototype.behaviors = function() {
    var arrive = this.arrive(this.target);
    var mouse = createVector(mouseX, mouseY);
    var flee = this.flee(mouse);
  
    arrive.mult(1);
    flee.mult(5);
  
    this.applyForce(arrive);
    this.applyForce(flee);
  };
  
  Automata.prototype.applyForce = function(f) {
    this.acc.add(f);
  };
  
  Automata.prototype.update = function() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
  };
  
  Automata.prototype.show = function() {
    stroke(this.color);
    strokeWeight(this.r);
    point(this.pos.x, this.pos.y);
  };
  
  Automata.prototype.arrive = function(target) {
    var desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag();
    var speed = this.maxspeed;
    if (d < 100) {
      speed = map(d, 0, 100, 0, this.maxspeed);
    }
    desired.setMag(speed);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    return steer;
  };
  
  Automata.prototype.flee = function(target) {
    var desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag();
    if (d < this.mouseRadius) {
      desired.setMag(this.maxspeed);
      desired.mult(-1);
      var steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxforce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  };