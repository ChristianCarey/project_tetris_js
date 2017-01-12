// Board (model)
var GAME = GAME || {}

GAME.Board = function() {
  "use strict";

  var _width = GAME.CONFIG.board.width;
  var _height = GAME.CONFIG.board.height;
  var _TetrominoFactory = GAME.TetrominoFactory;
  var _currentTetromino;
  var _rows;
  var _newPlacedBlocks = false;
  var _boardState = {};
  var _placedBlocks = [];

  var init = function() {
    return _setRows();
  };

  var tic = function() {
    return _ticTetromino(_ticCurrentTetromino);
  };

  var moveTetrominoWithInput = function(keycode) {
    return _ticTetromino(function(){_currentTetromino.moveWithInput(keycode)
    });
  }

  var _ticTetromino = function(callback) {
    _newPlacedBlocks = false;
    _saveCurrentTetromino();
    if (!_currentTetromino) {
      _createCurrentTetromino();
    }
    callback();
    _handleCollision();
    return _getBoardState();
  }

  var _handleCollision = function() {
    if (_checkCollision()) {
      _processCollision();
    };
  }

  var _setRows = function() {
    _rows = new Array(_height);
    for (var i = 0; i < _height; i++) {
      var row = new Array(_width);
      for (var j = 0; j < _width; j++) {
        row[j] = null;
      };
      _rows[i] = row;
    };
    return _rows;
  };

  var _randomOriginX = function() {
    return 5;
  };

  var _createCurrentTetromino = function() {
    var currentTetromino = _TetrominoFactory.createRandom(_randomOriginX());
    _currentTetromino = currentTetromino;
  };

  var _getBoardState = function() {
    _boardState.currentTetromino = _currentTetromino;
    _boardState.placedBlocks = _placedBlocks;
    _boardState.newPlacedBlocks = _newPlacedBlocks;
    return _boardState;
  };

  var _ticCurrentTetromino = function() {
    _currentTetromino.tic({ x: 0, y: 1 })
  };

  var _saveCurrentTetromino = function() {
    if (_currentTetromino){
      _boardState.lastTetrominoCoords = _currentTetromino.coords();
    }
  };

  var _checkCollision = function() {
    for (var i = 0; i < _currentTetromino.blocks.length; i++) {
      var tetrominoBlock = _currentTetromino.blocks[i];
      if (_atBottom(tetrominoBlock)) {return true;}
      for (var j = 0; j < _placedBlocks.length; j++) {
        var block = _placedBlocks[j]
        if (_blockCollision(tetrominoBlock, block)) {
          return true;
        }
      };
    };
  };

  var _processCollision = function() {
    _currentTetromino.blocks.forEach(function(block) {
      _placedBlocks.push(block);
    })
    _currentTetromino = null;
    _newPlacedBlocks = true;
  };

  var _blockCollision = function(tetrominoBlock, block) {
    return tetrominoBlock.y + 1 === block.y && tetrominoBlock.x === block.x;
  };

  var _atBottom = function(tetrominoBlock) {
    return tetrominoBlock.y === _height - 1;
  };

  return {
    init: init,
    tic: tic,
    moveTetrominoWithInput: moveTetrominoWithInput
  };

}();
