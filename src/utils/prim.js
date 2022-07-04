// Maze Prims(int width, int height, Cell startCell)
// {
//RANDOMIZED PRIM ALGORITHM
export function prim(mazeMap, startCell) {
    const { maze } = mapToArray(mazeMap);
//   Maze maze(width, height);
//   Set pathSet(startCell);

//   // While the set of cells is not empty
//   while (!pathSet.empty())
//   {
//     // Select randomly a cell to extend the path and remove it from the set
//     // Mark the cell as visited
//     auto cell = Cell::Visite(pathSet.GetRandom());

//     // Get available neighbors from bottom, left, right, top and visited
//     // Randomly connect to one
//     auto neighbors = GetVisitedneighbors(maze, cell);
//     if (!neighbors.empty())
//     {
//       // Randomly connect to an available cell
//       auto randIdx = Random() % neighbors.size();
//       Connect(cell, neighbors[randIdx]);
//     }

//     // Add all unvisited neighbors to the set
//     pathSet.insert(Getneighbors(maze, cell));
//   }

//   return maze;
// } 
}