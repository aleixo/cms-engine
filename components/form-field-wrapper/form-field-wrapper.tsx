import React, { Component, useMemo, useState } from 'react';

const PreviewContainer = ({ onDragOver, selected, children, onClick, onDragStart, onDrop, component }) => {
    const [isOvering,setIsOvering] = useState(false)
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        opacity: selected || isDraggingOver ? 0.9 : 1,
        outlineStyle: 'dashed',
        outlineWidth: selected || isOvering || isDraggingOver ? '1px' : 0,
        outlineColor: 'red',
        minHeight: '20px'
      }}
      draggable
      onDragLeave={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDraggingOver(false);
        setIsOvering(false)
      }}
      onDragOver={(e) => {
        e.stopPropagation();
        e.preventDefault();
        setIsDraggingOver(true);
        onDragOver()
      }}
      onDragStart={(event) => {
        event.stopPropagation();
        onDragStart && onDragStart()
      }}
      onDrop={(event) => {
        event.stopPropagation();
        onDrop && onDrop()
      }}
      onClick={(e) => {
        onClick()
        e.stopPropagation()
      }}
      onMouseOver={() => setIsOvering(true)}
      onMouseLeave={() => setIsOvering(false)}
    >
        {(selected || isOvering) &&(<div>
            <div style={{
            position: 'absolute',
            bottom: '16px',
            zIndex: 2,
            marginLeft: 'auto',
            marginRight: 'auto',
            left: 0,
            textAlign: 'center',
        }}>
        </div>
            <div style={{
            position: 'absolute',
            top: '5px',
            zIndex: 2,
            backgroundColor: 'red',
            margin: 0,
            padding: '6px'
        }}>
            <p style={
                {
                    margin: 0,
                }
            }>{component.component}</p>
        </div></div>)}
      {children}
    </div>
  );
};

export {PreviewContainer}