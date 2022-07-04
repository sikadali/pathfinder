import React, { useContext } from 'react'
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import { StoreContext } from '../../../utils/StoreProvider';

export default function Reset() {
    const {
        grid: [grid, setGrid], 
        gridState: [ gridState, setGridState ]
      } = useContext(StoreContext);

    const resetGrid = () => {
        visitingReset()
    }
    
    const visitingReset = () => {
        let hasVisited = false
        grid.forEach((row) => {
            row.forEach((node) => {
                // first check if node has been visited
                if (document.getElementById(`node-${node.row}-${node.col}`).className ===  "node node-visited" ||
                    document.getElementById(`node-${node.row}-${node.col}`).className ===  "node node-shortest-path"){
                       hasVisited = true
                }
                if (!node.isWall && !node.isStart && !node.isEnd) {
                    document.getElementById(`node-${node.row}-${node.col}`)
                        .className = "node";
                }
                if (node.isStart) {
                    document.getElementById(`node-${node.row}-${node.col}`)
                        .className = "node start";
                }
                if (node.isEnd) {
                    document.getElementById(`node-${node.row}-${node.col}`)
                        .className = "node end";
                }
            })
        })
        if (!hasVisited){ // there had no visited nodes then continue
            defaultReset()
        }
    }
    const defaultReset = () => {
        if (gridState.hasWall) { // if there is walls, remove them only
            grid.forEach((row, rowkey) => {
                row.forEach((node, nodekey) => {
                    // reset the wall node properties
                    if (node.isWall) {
                        setGrid( (prev) => new Map(prev).set(rowkey, new Map(prev.get(rowkey))
                        .set(nodekey, {...node, isWall: false})) );
                    }
                })
            })
            setGridState({...gridState, hasWall: false});
        } else { // else, there is only start & end node left, remove them
            grid.forEach((row, rowkey) => {
                row.forEach((node, nodekey) => {
                    // reset the start & end nodes' properties
                    setGrid( (prev) => new Map(prev).set(rowkey, new Map(prev.get(rowkey))
                        .set(nodekey, {...node, isEnd: false, isStart: false})) );
                })
            })
            setGridState({...gridState, hasEnd: false, hasStart: false});
        }
    }

    return (
        <div>
            <RotateLeftIcon className="icon" data-tip="Reset" onClick={() => resetGrid()}/>
        </div>
    )
}
