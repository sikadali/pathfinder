//RANDOMIZED KRUSKAL ALGORITHM : essayer la version avec la moitie des cellules deja ouvertes !!!!!
export function kruskal(mazeMap) {
    
    const {maze, cells, startNode, endNode, hasStart, hasEnd} = mapToArray(mazeMap);
	const openEdgesInOrder = [];

    //Step 1 : make the edges set; 
        //an edge is a linear(to say not diagonal) combinaison of three nodes, and is only 'perpendicularly' adjacent to others edges
    let edges = setEdges(maze);

    //Step 2 : While the set of edges is not empty
    while (!!edges.length) {
        //Randomly get an edge and remove it from the set
        const index = getRandomInt(edges.length)
        const edge = edges[index];
        edges.splice(index, 1);
        

        //If cells are not already in the same bucket: Connect them !!!PROBLEM HERE!!!
        if (maze[edge.first.row][edge.first.col].kruskalID !== maze[edge.second.row][edge.second.col].kruskalID){
            //merge edges in the maze
            mergeKruskalGroup(edge, maze);
            openEdgesInOrder.push(edge);
        }
    }
    console.log(openEdgesInOrder)
    console.log(maze)
    return (openEdgesInOrder);
}

const mergeKruskalGroup = (edge, maze) => {
    const temp = maze[edge.first.row][edge.first.col].kruskalID;
    maze[edge.center.row][edge.center.col].kruskalID = temp;

    const secondGroup = maze[edge.second.row][edge.second.col].kruskalID;

    for(let row of maze){
        for(let node of row){
            if (node.kruskalID === secondGroup){
                node.kruskalID = temp;
            }
        }
    }
}


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}


const setEdges = (maze) => {
    const rows = maze.length;
    const cols = maze[0].length;

    const edges = [];
    for(let i=0; i<rows; i++){
        for(let j=0; j<cols; j++){
            const edge = {first: {}, center: {}, second: {}};
            if(i%2 !== 0 && j%2 === 0){
                edge.first = {...maze[i-1][j]};
                edge.center = {...maze[i][j]};
                edge.second = {...maze[i+1][j]};

                edges.push(edge);
            }
            if(i%2 === 0 && j%2 !== 0){
                edge.first = {...maze[i][j-1]};
                edge.center = {...maze[i][j]};
                edge.second = {...maze[i][j+1]};

                edges.push(edge);
            }
        }
    }
    return edges;
}

const mapToArray = (mazeMap) => {
    const maze = [];
	const cells = [];
    let startNode = {};
    let endNode = {};
    let hasStart = false;
    let hasEnd = false;

    let key = 0;
    for(let row of mazeMap.values()){
        const currentRow = [];
        for(let node of row.values()){

            currentRow.push({...node, kruskalID: key});
			cells.push({...node, kruskalID: key}); 
            key = key + 1;

            if(node.isStart){
				hasStart = true;
                startNode = {...node};
            }
            if(node.isEnd){
                hasEnd = true;
                endNode = {...node};
            }
        }
        maze.push(currentRow);
	}
    return {maze: maze, cells: cells, startNode: startNode, endNode: endNode, hasStart: hasStart, hasEnd: hasEnd};
}
