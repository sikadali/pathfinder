import React, { useContext, useState } from 'react';
import { StoreContext } from '../../../utils/StoreProvider';
import { kruskal } from '../../../utils/kruskal';

export default function Mazes() {

	const {
        grid: [grid, setGrid], 
        gridState: [ gridState,  ]
      } = useContext(StoreContext);
    const [algorithm, setAlgorithm] = useState('MAZE !');

	const visualizeGo = (algorithm) => {
		if (algorithm === 'MAZE !'){
		  alert('Select a maze algorithm');
		}
		if (algorithm === 'KRUSKAL MAZE !'){
		  visualizeKruskal();
		  setAlgorithm('MAZE !');
		}
	  }

    const selectAlgorithm = (algorithm) => {
        switch(algorithm) {
          case "kruskal": { setAlgorithm('KRUSKAL MAZE !'); break; }
          case "prim": { setAlgorithm('PRIM MAZE !'); break; }
          case "wilson": { setAlgorithm('WILSON MAZE !'); break; }
          case "aldous": { setAlgorithm('ALDOUS-BRODER MAZE !'); break; }
          default: { break;}
        }
    }

	const visualizeKruskal = () => {
		const openEdgesInOrder = kruskal(grid);

		//Put all nodes to wall mode
		for(let [rowkey, row] of grid.entries()){
			for(let [nodekey, node] of row.entries()){
				setGrid( (prev) => new Map(prev).set(rowkey, new Map(prev.get(rowkey))
							.set(nodekey, {...node, isWall: true,})) );
			}
		}

		for (let openEdge of openEdgesInOrder) {
			setTimeout(() => {
				setGrid( (prev) => new Map(prev).set(openEdge.center.row, new Map(prev.get(openEdge.center.row))
							.set(openEdge.center.col, {...openEdge.center, isWall: false,})) );
				setGrid( (prev) => new Map(prev).set(openEdge.first.row, new Map(prev.get(openEdge.first.row))
							.set(openEdge.first.col, {...openEdge.first, isWall: false,})) );
				setGrid( (prev) => new Map(prev).set(openEdge.second.row, new Map(prev.get(openEdge.second.row))
							.set(openEdge.second.col, {...openEdge.second, isWall: false,})) );
			}, 5)
		}
	}
	

	return (
		<div className="container">
			<div className="mazes">
				<span>Maze algorithm</span>
				<div className="options">
					<span onClick={()=>selectAlgorithm('kruskal')}>Kruskal's algorithm</span>
					<span onClick={()=>selectAlgorithm('prim')}>Prim's algorithm</span>
					<span onClick={()=>selectAlgorithm('wilson')}>Wilson's algorithm</span>
					<span onClick={()=>selectAlgorithm('aldous')}>Aldous-Broder algorithm</span>
				</div>
			</div>
			<input className="vizualize" type="submit" value={algorithm} onClick={()=>visualizeGo(algorithm)}/>
		</div>
	);
}
