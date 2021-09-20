// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
export function dijkstra(gridMap) {
    const {grid, nodes, endNode} = mapToArray(gridMap);
	const visitedNodesInOrder = [];

	while (!!nodes.length) { // '!!' to convert length of unvisited nodes to boolean true since it reaches 0 and begin false
		sortNodesByDistance(nodes);
		const closestNode = nodes.shift();

		// If we encounter a wall, we skip it.
		if (closestNode.isWall) {
			continue
		}
		// If the closest node is at a distance of infinity, we must be trapped and should therefore stop.
		if (closestNode.distance === 1000) {
			return (visitedNodesInOrder)
		}

		closestNode.isVisited = true;
		visitedNodesInOrder.push(closestNode);

		if (closestNode.row === endNode.row && closestNode.col === endNode.col) {
			return (visitedNodesInOrder)
		}
		updateUnvisitedNeighbors(closestNode, grid, nodes);
	}
	
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
                startNode = {...node};
				currentRow.push({...node, distance: 0, isVisited: false});
				nodes.push({...node, distance: 0, isVisited: false});
            }
			else{
				currentRow.push({...node, distance: Number.POSITIVE_INFINITY, isVisited: false});
				nodes.push({...node, distance: Number.POSITIVE_INFINITY, isVisited: false});
			}

            if(node.isEnd){
                endNode = {...node};
            }
        }
        grid.push(currentRow);
	}
    return {grid: grid, nodes: nodes, startNode: startNode, endNode: endNode};
}


const sortNodesByDistance = (unvisitedNodes) => {
    unvisitedNodes.sort((nodeA, nodeB) => {return(nodeA.distance - nodeB.distance)});
}

const updateUnvisitedNeighbors = (node, grid, nodes) => {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
	for (const element of nodes) {
		for(const neighbor of unvisitedNeighbors){
			if(neighbor.row === element.row && neighbor.col === element.col){
				element.distance = node.distance + 1;
				element.previousNode = node;
			}
		}
	}
}

const getUnvisitedNeighbors = (node, grid) => {
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
		neighbors.filter(neighbor => !neighbor.isVisited)
	);
}