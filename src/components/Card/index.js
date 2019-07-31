import React, { useRef, useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import BoarContext from '../Board/context'

import { Container, Label } from './styles';

export default function Card({ data, index }) {
    const ref = useRef();
    const { move } = useContext(BoarContext)
    
    const [{ isDragging }, dragRef] = useDrag({
        item: { type: 'CARD', index, id: data.id, content: data.content },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    })
    
    const [, dropRef] = useDrop({
        accept: 'CARD',
        hover(item, monitor) {
            const draggedIndex = item.index
            const targetIndex = index

            if (draggedIndex === targetIndex) {
                return;
            }

            const targetSize = ref.current.getBoundingClientRect()
            const targetCenter = (targetSize.bottom - targetSize.top) / 2

            const draggedOffset = monitor.getClientOffset()
            const draggetTop = draggedOffset.y - targetSize.top

            if(draggedIndex <  targetIndex && draggetTop < targetCenter ) {
                return;
            }

            if (draggedIndex > targetIndex && draggetTop > targetCenter) {
                return;
            }

            move(draggedIndex, targetIndex)
        }
    })
    

    dragRef(dropRef(ref))

    return (
        <Container ref={ref} isDragging={isDragging}>
            <header>
                {data.labels.map(label => <Label key={label} color={label} /> )} 
            </header>
            <p>{data.content}</p>
            {data.user && <img src={data.user} alt="" />}

        </Container>
    );
}
