export const astar = (gridMap) => {
    const {grid, startNode, endNode} = mapToArray(gridMap);
	const closedList = [];   //visitedNodesInOrder

    const openList = [];
    openList.push(startNode)

    while (!!openList.length){
        // take nodeU, the node from openList with the biggest heuristic (manhattan distance in this case)
        sortOpenListByF(openList)
        const currentNode = openList.shift()

        // loop : for each neighbor of nodeU inside the grid
        const neighbors = getNeighbors(currentNode, grid);
        for(let neighbor of neighbors){
            // if neighbor already been visited, or is a wall node, skip to the next neighbor
            if ( insideList(neighbor, closedList) || neighbor.isWall ) {
                continue
            }

            // the node cost is the shortest distance from start to current node, we need to check if
            // the path we have arrived at this neighbor is the shortest one we have seen yet
            var costNode = currentNode.cost + 1; // 1 is the distance from a node to its neighbor
            var costNodeIsBest = false;
    
    
            if( !insideList(neighbor, openList) ) {
                // This the the first time we have arrived at this node, it must be the best
                // Also, we need to take the h (heuristic) score since we haven't done so yet
                costNodeIsBest = true;
                neighbor.heuristic = heuristicManhattan(neighbor, endNode);
                openList.push(neighbor);
            }
            else if(costNode < neighbor.cost) {
                // We have already seen the node, but last time it had a worse cost (distance from start)
                costNodeIsBest = true;
            }
    
            if(costNodeIsBest) {
                // Found an optimal (so far) path to this node.  Store info on how we got here and
                // just how good it really is...
                neighbor.previousNode = currentNode;
                neighbor.cost = costNode;
                neighbor.f = neighbor.cost + neighbor.heuristic;
            }
        }
        closedList.push(currentNode)

        // if the node taken is the endNode then END
        if (currentNode.row === endNode.row && currentNode.col === endNode.col) {
			return (closedList)
		}
    }
    // end program (with error)
    console.log("ERROR: A* not giving results")
    // inspired from https://briangrinstead.com/blog/astar-search-algorithm-in-javascript/
}

const mapToArray = (gridMap) => {
    const grid = [];
	const nodes = [];
    let startNode = {};
    let endNode = {};

    for(let row of gridMap.values()){
        const currentRow = [];
        for(let node of row.values()){
            if(node.isStart){
                startNode = {...node, cost: 0, heuristic: 0, f: 0};
				currentRow.push({...node, cost: 0, heuristic: 0, f: 0});
				nodes.push({...node, cost: 0, heuristic: 0, f: 0});
            }
			else{
				currentRow.push({...node, cost: 0, heuristic: 0, f: 0});
				nodes.push({...node, cost: 0, heuristic: 0, f: 0});
			}

            if(node.isEnd){
                endNode = {...node};
            }
        }
        grid.push(currentRow);
	}
    return {grid: grid, nodes: nodes, startNode: startNode, endNode: endNode};
}

const getNeighbors = (node, grid) => {
    const neighbors = [];
	const { col, row } = node;
	if (row > 0) {  //down
		neighbors.push(grid[row - 1][col]);
	}
	if (row < grid.length - 1) { //up
		neighbors.push(grid[row + 1][col]);
	}
	if (col > 0) { //left
		neighbors.push(grid[row][col - 1]);
	}
	if (col < grid[0].length - 1) { //right
		neighbors.push(grid[row][col + 1]);
	}

	return (
		neighbors
	);
}

const sortOpenListByF = (openList) => {
    openList.sort((nodeA, nodeB) => {return(nodeA.f - nodeB.f)});
}

const insideList = (neighbor, list) => {
    for (let node of list) {
        if (node.row === neighbor.row && node.col === neighbor.col) {
            return true
        }
    }
    return false
}

const heuristicManhattan = (nodeA, nodeB) => {
    // This is the Manhattan distance
    var d1 = Math.abs (nodeB.row - nodeA.row);
    var d2 = Math.abs (nodeB.col - nodeA.col);
    return d1 + d2;
}