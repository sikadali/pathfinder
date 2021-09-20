import React, { useState } from 'react';

export default function Mazes() {
    const [algorithm, setAlgorithm] = useState('MAZE !');

    const selectAlgorithm = (algorithm) => {
        switch(algorithm) {
          case "kruskal": { setAlgorithm('KRUSKAL MAZE !'); break; }
          case "prim": { setAlgorithm('PRIM MAZE !'); break; }
          case "wilson": { setAlgorithm('WILSON MAZE !'); break; }
          case "aldous": { setAlgorithm('ALDOUS-BRODER MAZE !'); break; }
          default: { break;}
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
			<input className="vizualize" type="submit" value={algorithm} />
		</div>
	);
}
