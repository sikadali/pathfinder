import React, { useContext, useState } from 'react';
import './Pathfindings.scss'
import { StoreContext } from '../../../utils/StoreProvider';
import { visualizeAlgorithm } from '../../animations/AnimateAlgorithm';

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
        visualizeAlgorithm(gridState, grid, 0);
        setAlgorithm('PATH !');
      }
      if (algorithm === 'A* PATH !'){
        visualizeAlgorithm(gridState, grid, 1);
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
