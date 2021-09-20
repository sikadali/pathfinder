import React, { useState, useEffect } from 'react';

const TOTAL_ROW = 29;
const TOTAL_COL = 61;

export const StoreContext = React.createContext(null);

const StoreProvider = ({ children }) => {

    //Data for grid management
	const [grid, setGrid] = useState(new Map());
    //Data for node state management
    const [gridState, setGridState] = useState({});
    
    const getInitialGrid = () => {
		const map = new Map();
		for (let i = 0; i < TOTAL_ROW; i++) {
			const currentRow = new Map();
			for (let j = 0; j < TOTAL_COL; j++) {
				currentRow.set(j, { row: i, col: j, isStart: false, isWall: false, isEnd: false});
			}
			map.set(i, new Map(currentRow));
		}
		return (map);
	}
	useEffect(() => {
		const g = getInitialGrid();
		setGrid(g);
        setGridState({hasStart: false, hasEnd: false});
	}, [])

    

	const store = {
		grid: [ grid, setGrid ],
        gridState: [ gridState, setGridState ]
	};

	return( 
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    );
};
export default StoreProvider;