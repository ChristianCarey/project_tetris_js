var GAME = GAME || {}

GAME.TetrominoFactory = function() {
  "use strict";

  var BlockFactory = GAME.BlockFactory;

  var createRandom = function(originX) {
    var shape = _randomShape();
    return new _Tetromino(shape, originX);
  };

  var _shapes = [
    {
      name: "I",
      starting: [{ x: 0, y: -1 }, { x: 1, y: -1 }, { x: 2, y: -1 }, { x: 3, y: -1 }]
    },
    {
      name: "J",
      starting: [{ x: 0, y: -1 }, { x: 1, y: -1 }, { x: 2, y: -1 }, { x: 2, y: 0 } ]
    },
    {
      name: "L",
      starting: [{ x: 0, y: 0 }, { x: 0, y: -1 }, { x: 1, y: -1 }, { x: 2, y: -1 }]
    },
    {
      name: "O",
      starting: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: -1 }, { x: 0, y: -1 }]
    },
    {
      name: "S",
      starting: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: -1 }, { x: 2, y: -1 }]
    },
    {
      name: "T",
      starting: [{ x: 1, y: 0 }, { x: 0, y: -1 }, { x: 1, y: -1 }, { x: 2, y: -1 }]
    },
    {
      name: "Z",
      starting: [{ x: 0, y: -1 }, { x: 1, y: -1 }, { x: 1, y: 0 }, { x: 2, y: 0 }]
    }
  ];

  var _randomShape = function() {
    return GAME.helpers.randArrayElement(_shapes);
  };

  var _Tetromino = function Tetromino(shape, originX) {
    var that = this;

    this.blocks = new Array(shape.starting.length) // always 4

    shape.starting.forEach(function(block, index) {
      that.blocks[index] = BlockFactory.create({
        x: block.x + originX,
        y: block.y,
        name: shape.name
      })
    });

    this.tic = function(velocity) {
      this.blocks.forEach(function(block) {
        block.x += velocity.x;
        block.y += velocity.y;
      });
    };

  };


  return {
    createRandom: createRandom
  };

}();
