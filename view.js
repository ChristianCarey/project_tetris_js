// Render(boardstate)
var GAME = GAME || {}

GAME.View = function() {
  "use strict";

  var _$board;

  var _setRows = function(rows) {
    rows.forEach(function(row, rowIndex) {
      var $row = $("<div>").addClass("row").attr("id", rowIndex);
      row.forEach(function(cell, cellIndex) {
        var $cell = $("<div>").addClass("cell").attr("id", cellIndex + "-" + rowIndex);
        $row.append($cell);
      })
      _$board.append($row);
    });
  };

  var _clearTetromino = function(coords) {
    coords.forEach(_clearBlock);
  };

  var _renderTetromino = function(tetromino) {
    tetromino.blocks.forEach(_renderBlock);
  };

  var _renderPlacedBlocks = function(placedBlocks) {
    placedBlocks.forEach(_renderBlock);
  };

  var _clearBlock = function(coords) {
    var $cell = _findCell(coords.x, coords.y);
    $cell.attr("class", "cell");
  };

  var _renderBlock = function(block) {
    var $cell = _findCell(block.x, block.y);
console.log($cell, $cell.attr("class"));
    $cell.addClass(block.name);
console.log($cell, $cell.attr("class"));
  };

  var _findCell = function(x, y) {
    return $("#" + x + "-" + y);
  };

  var _attachMoveListeners = function(moveListener) {
    $(document).on("keypress", function(e) {
      moveListener(e);
    });
  };

  return {
    init: function(rows, moveListener) {
      _$board = $("#board");
      _setRows(rows);
      _attachMoveListeners(moveListener);
    },

    render: function(boardState) {
      console.log(boardState);
      if (boardState.lastTetrominoCoords) {
        _clearTetromino(boardState.lastTetrominoCoords);
      }
      if (boardState.newPlacedBlocks) {
        _renderPlacedBlocks(boardState.placedBlocks);
      }
      if (boardState.currentTetromino) {
        _renderTetromino(boardState.currentTetromino);
      }
    }
  };
}();
