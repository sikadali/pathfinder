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

		for (let i = 0; i < openEdgesInOrder.length; i++) {
			setTimeout(() => {
				setGrid( (prev) => new Map(prev).set(openEdgesInOrder[i].center.row, new Map(prev.get(openEdgesInOrder[i].center.row))
							.set(openEdgesInOrder[i].center.col, {...openEdgesInOrder[i].center, isWall: false,})) );
				setGrid( (prev) => new Map(prev).set(openEdgesInOrder[i].first.row, new Map(prev.get(openEdgesInOrder[i].first.row))
							.set(openEdgesInOrder[i].first.col, {...openEdgesInOrder[i].first, isWall: false,})) );
				setGrid( (prev) => new Map(prev).set(openEdgesInOrder[i].second.row, new Map(prev.get(openEdgesInOrder[i].second.row))
							.set(openEdgesInOrder[i].second.col, {...openEdgesInOrder[i].second, isWall: false,})) );
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
