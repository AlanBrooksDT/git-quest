/* eslint-disable func-names */
const Character = require('./character');

function Player(config) {
  Character.call(this, config);
  this.equippedWeapon = null;
  this.nextLevel = 1000;
  this.currentExperience = 0;
}

Player.prototype = Object.create(Character.prototype);

Object.defineProperty(Player.prototype, 'constructor', {
  value: Player,
  enumerable: false,
  writable: true,
});

Player.prototype._describeAttack = function (target) {
  return `${this.name} lets out a ${this.dialogue}, and hits ${target.name} with ${this.equippedWeapon.name} for ${this.equippedWeapon.damage} damage!`;
};

Player.prototype.equip = function (weapon) {
  this.equippedWeapon = weapon;
};

Player.prototype.attack = function (target) {
  target._takeDamage(this.equippedWeapon.damage + this.attackTotal);
  if (!target.isAlive) {
    this.currentExperience += target.experienceReward;
  };
  return this._describeAttack(target);
};

Player.prototype.levelUp = function () {
  this.level += 1;
}


module.exports = Player;
