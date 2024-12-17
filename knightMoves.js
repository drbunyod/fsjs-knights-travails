const isValidMove = (move) => {
  return 0 <= move[0] && move[0] <= 7 && 0 <= move[1] && move[1] <= 7;
};

const getPossibleMoves = (position) => {
  const moves = [];

  const changes = [
    [1, 2],
    [2, 1],
    [-1, 2],
    [-2, 1],
    [1, -2],
    [2, -1],
    [-1, -2],
    [-2, -1],
  ];

  for (const change of changes) {
    let x = position[0] + change[0];
    let y = position[1] + change[1];
    if (isValidMove([x, y])) {
      moves.push([x, y]);
    }
  }

  return moves;
};

const printMoves = (moves) => {
  console.log(`You made it in ${moves.length - 1} moves! Here's your path:`);
  for (const move of moves) {
    console.log(move);
  }
};

const knightMoves = (start, end) => {
  if (!isValidMove(start) || !isValidMove(end)) {
    console.log('Invalid starting or ending position!');
    return;
  }

  const queue = [];
  queue.push({ position: start, path: [start] });

  const visited = new Set();
  visited.add(start.toString());

  while (queue.length > 0) {
    let queueItem = queue.shift();
    let cell = queueItem.position;
    if (end[0] === cell[0] && end[1] === cell[1]) {
      printMoves(queueItem.path);
      break;
    }

    let possibleMoves = getPossibleMoves(cell);
    for (const possibleMove of possibleMoves) {
      if (!visited.has(possibleMove.toString())) {
        queue.push({
          position: possibleMove,
          path: [...queueItem.path, possibleMove],
        });
        visited.add(possibleMove.toString());
      }
    }
  }
};

knightMoves([0, 0], [7, 7]);
