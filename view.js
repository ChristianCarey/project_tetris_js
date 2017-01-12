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

  var _clearTetromino = function(tetromino) {
    tetromino.blocks.forEach(_clearBlock);
  };

  var _renderTetromino = function(tetromino) {
    tetromino.blocks.forEach(_renderBlock);
  };

  var _renderPlacedBlocks = function(placedBlocks) {
    placedBlocks.forEach(_renderBlock);
  };

  var _clearBlock = function(block) {
    var $cell = _findCell(block.x, block.y - 1);
    $cell.attr("class", "cell");
  };

  var _renderBlock = function(block) {
    var $cell = _findCell(block.x, block.y);
    $cell.addClass(block.name);
  };

  var _findCell = function(x, y) {
    return $("#" + x + "-" + y);
  }

  return {
    init: function(rows, listeners) {
      _$board = $("#board");
      _setRows(rows);
      _attachListeners(listeners);
    },

    render: function(boardState) {
      if (boardState.lastTetromino) {
        _clearTetromino(boardState.lastTetromino);
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
