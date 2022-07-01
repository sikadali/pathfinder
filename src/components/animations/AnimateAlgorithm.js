import { dijkstra } from "../../utils/dijkstra";
import { astar } from "../../utils/astar";

export const visualizeAlgorithm = (gridState, grid, algoIndex) => {
  if (gridState.hasStart) {
    if (gridState.hasEnd) {
        let visitedNodesInOrder
        switch (algoIndex) {
            case 0:
                console.log('Running Dijkstra Algorithm');
                visitedNodesInOrder = dijkstra(grid);
                break;
            case 1:
                console.log('Running A* Algorithm');
                visitedNodesInOrder = astar(grid);
                break;
            default:
              console.log(`There is no algorithm with this index`);
          }
        
        console.log('visitedNodesInOrder => ', visitedNodesInOrder)

        const nodesInShortestPathOrder = [];
        let currentNode = visitedNodesInOrder[visitedNodesInOrder.length - 1];

        while (currentNode !== undefined) {
            nodesInShortestPathOrder.push(currentNode);
            currentNode = currentNode.previousNode;
        }
        animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
    } else {
        alert("Please define a finish node");
    }
  } else {
    alert("Please define a start node");
  }
};

const animateAlgorithm = (visitedNodesInOrder, nodesInShortestPathOrder) => {
  for (let i = 0; i <= visitedNodesInOrder.length; i++) {
    if (i === visitedNodesInOrder.length) {
      setTimeout(() => {
        animateShortestPath(nodesInShortestPathOrder);
      }, 10 * i);
      return;
    }
    setTimeout(() => {
      document.getElementById(
        `node-${visitedNodesInOrder[i].row}-${visitedNodesInOrder[i].col}`
      ).className = "node node-visited";
    }, 10 * i);
  }
};

const animateShortestPath = (nodesInShortestPathOrder) => {
  for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
    setTimeout(() => {
      document.getElementById(
        `node-${nodesInShortestPathOrder[i].row}-${nodesInShortestPathOrder[i].col}`
      ).className = "node node-shortest-path";
    }, 50 * i);
  }
};
