import React, { useContext } from 'react'
import './Grid.scss'
import { Node } from './node/Node'
import { StoreContext } from '../../utils/StoreProvider';


export default function Grid() {

    const {
        grid: [grid, setGrid], 
        gridState: [ gridState, setGridState ]
      } = useContext(StoreContext);

    const defineNode = (rowkey, nodekey, node) => {
        if(gridState.hasStart) {
            if(gridState.hasEnd) {
                setGrid( (prev) => new Map(prev).set(rowkey, new Map(prev.get(rowkey))
							.set(nodekey, {...node, isWall: true, isEnd: false, isStart: false})) );
            }
            else{
                setGrid( (prev) => new Map(prev).set(rowkey, new Map(prev.get(rowkey))
							.set(nodekey, {...node, isWall: false, isEnd: true, isStart: false})) );
                setGridState({...gridState, hasEnd: true});
            }
        }
        else {
            setGrid( (prev) => new Map(prev).set(rowkey, new Map(prev.get(rowkey))
							.set(nodekey, {...node, isWall: false, isEnd: false, isStart: true})) );
            setGridState({...gridState, hasStart: true});
        }        
	};

    const clearNode = (rowkey, nodekey, node) => {
        if(node.isStart){
            setGridState({...gridState, hasStart: false});
        }
        if(node.isEnd){
            setGridState({...gridState, hasEnd: false});
        }
		setGrid( (prev) => new Map(prev).set(rowkey, new Map(prev.get(rowkey))
							.set(nodekey, {...node, isWall: false, isEnd: false, isStart: false})) );
	};

    return (
        <div className="grid">
			{[...grid.entries()].map(([rowkey, row]) => {
				return(
					<div key={rowkey} className="grid_rows">
						{[...row.entries()].map( ([nodekey, node]) => {
							const {row, col, isWall, isEnd, isStart} = node;
							return (
								<Node 
									key={nodekey} 
									row={row} 
                                    col={col}
                                    isWall={isWall} 
									isEnd={isEnd}
									isStart={isStart}
                                    onClick={()=>defineNode(rowkey, nodekey, node)}
                                    onContextMenu={(e) => {
                                        e.preventDefault();
                                        clearNode(rowkey, nodekey, node);
                                    }}
								/>
							);
						})}
					</div>
				);
			})}
		</div>
    )
}
