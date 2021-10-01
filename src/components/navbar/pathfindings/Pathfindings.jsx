import React, { useContext, useState } from 'react';
import './Pathfindings.scss'
import { StoreContext } from '../../../utils/StoreProvider';
import { dijkstra } from '../../../utils/dijkstra';

export default function Pathfindings() {

    const {
        grid: [grid, ], 
        gridState: [ gridState,  ]
      } = useContext(StoreContext);
    const [algorithm, setAlgorithm] = useState('PATH !');

    const visualizeGo = (algorithm) => {
      if (algorithm === 'PATH !'){
        alert('Select a pathfinding algorithm');
      }
      if (algorithm === 'DIJKSTRA PATH !'){
        visualizeDijkstra();
        setAlgorithm('PATH !');
      }
    }

    const selectAlgorithm = (algorithm) => {
      switch(algorithm) {
        case "dijkstra": { setAlgorithm('DIJKSTRA PATH !'); break; }
        case "astar": { setAlgorithm('A* PATH !'); break; }
        case "greedy": { setAlgorithm('GREEDY PATH !'); break; }
        case "bfs": { setAlgorithm('BFS PATH !'); break; }
        case "dfs": { setAlgorithm('DFS PATH !'); break; }
        default: { break;}
      }
    }

    const visualizeDijkstra = () => {
        if(gridState.hasStart){
          if(gridState.hasEnd){
            const visitedNodesInOrder = dijkstra(grid);

            const nodesInShortestPathOrder = [];
            let currentNode = visitedNodesInOrder[visitedNodesInOrder.length-1];
            
            while (currentNode !== undefined) {
              nodesInShortestPathOrder.push(currentNode);
              currentNode = currentNode.previousNode;
            }
            animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);

          }else{
            alert('Please define a finish node')
          }
        }
        else{
          alert('Please define a start node')
        }
    }

    const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
          if (i === visitedNodesInOrder.length) {
            setTimeout(() => {
              animateShortestPath(nodesInShortestPathOrder);
            }, 10 * i);
            return;
          }
          setTimeout(() => {
            document.getElementById(`node-${visitedNodesInOrder[i].row}-${visitedNodesInOrder[i].col}`).className =
              'node node-visited';
          }, 10 * i);
        }
    }
    
    const animateShortestPath = (nodesInShortestPathOrder) => {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
          setTimeout(() => {
            //const node = nodesInShortestPathOrder[i];
            document.getElementById(`node-${nodesInShortestPathOrder[i].row}-${nodesInShortestPathOrder[i].col}`).className =
              'node node-shortest-path';
          }, 50 * i);
        }
    }

	return (
		<div className='container'>
			<div className="pathfindings">
				<span>Pathfinding algorithm</span>
				<div className="options">
					<span onClick={()=>selectAlgorithm('dijkstra')}>Dijkstra's algorithm</span>
					<span onClick={()=>selectAlgorithm('astar')}>A* algorithm</span>
					<span onClick={()=>selectAlgorithm('greedy')}>Greedy algorithm</span>
					<span onClick={()=>selectAlgorithm('bfs')}>Breadth-First Search algoriithm</span>
					<span onClick={()=>selectAlgorithm('dfs')}>Depth-First Search algorithm</span>
				</div>
			</div>
			<input className="vizualize" type="submit" value={algorithm} onClick={()=>visualizeGo(algorithm)}/>
		</div>
	);
}
