import React from 'react';
import { DndProvider } from 'react-dnd'
import HTML5DndBackend from 'react-dnd-html5-backend'

import GlobalStyle from './styles/Global';

import Header from './components/Header';
import Board from './components/Board';

function App() {
    return ( 
        <DndProvider backend={HTML5DndBackend}>
            <Header />
            <Board />
            <GlobalStyle />
        </DndProvider>
    );
}

export default App;
