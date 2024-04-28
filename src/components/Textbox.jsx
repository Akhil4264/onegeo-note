
import React, { useState, useRef, useEffect } from 'react';
import '../styles/textbox.css';

const Textbox = (props) => {
  // console.log(props.obj)
  const [isDragging, setIsDragging] = useState(false);
  // const [value, setValue] = useState(props.obj.text);
  // const [topLoc,settopLoc] = useState(props.obj.top)
  // const [leftLoc,setleftLoc] = useState(props.obj.left)
  // const [TopleftLoc,setTopleftLoc] = useState(props.obj.topLeft)
  const [object,setObject] = useState(props.obj)
  const [count,setCount] = useState(0)

  const textRef = useRef(null);
  const startPos = useRef({ x: 0, y: 0 });

  const updateObjectAtIndex = (i, object) => {
    props.objsFunc(props.objs.map((obj,index) => {
      if(index === i) return object 
      return obj
    }));
    console.log(props.objs)
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    startPos.current = {
      x: e.clientX - textRef.current.offsetLeft,
      y: e.clientY - textRef.current.offsetTop
    };
    textRef.current.style.zIndex = 1000;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    textRef.current.style.zIndex = 0; // Send back to original layer
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const minH = 15.5*window.innerHeight/100
      const minW = 13.7*window.innerWidth/100
      const maxH = 84.5*window.innerHeight/100
      const maxW = 86.3*window.innerWidth/100
      let newX = e.clientX - startPos.current.x;
      let newY = e.clientY - startPos.current.y;
      if(newX-100 < minW || newX+100 > maxW){
        // console.log(newX,minW,maxW)
        newX = parseInt(textRef.current.style.left.replace("px",""))
        
        // let topleft =  Math.sqrt((newX)**2 + (object.top)**2)
        
      }
      if(newY-100 < minH || newY+100 > maxH){
        // console.log(newY,minH,maxH)
        newY = parseInt(textRef.current.style.top.replace("px", ""))
        
        // let topleft =  Math.sqrt((newY)**2 + (object.left)**2)
        // setObject({...object , top : newY , topLeft : topleft})
        // updateObjectAtIndex(props.index,object);
      }
      textRef.current.style.top = `${newY}px`;
      textRef.current.style.left = `${newX}px`;
      let topleft =  Math.sqrt((newX)**2 + (newY)**2)
      setObject({...object , left : newX ,top:newY, topLeft : topleft})
      updateObjectAtIndex(props.index,object);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault()
    let droppedText = e.dataTransfer.getData("text")
    let data = object.text + droppedText
    setObject({...object , text : data})
    
    updateObjectAtIndex(props.index,object);
    setTimeout(() => {
      props.inFocusFunc(false)
    },100)
    
  }

  const handlePaste = (e) => {
    e.preventDefault()
    e.stopPropagation()
    let pasteData = e.clipboardData.getData("text")
    let data = object.text + pasteData
    setObject({...object , text : data})
    console.log(object)
    updateObjectAtIndex(props.index,object);
    
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    props.inFocusFunc(true)
  }

  const handleDragEnd = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDoubleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }


  useEffect(() => {
    if(count === 0){
      if(textRef && textRef.current){
          textRef.current.style.top = window.innerHeight/2
          textRef.current.style.left = window.innerWidth/2
        setTimeout(() => {
            textRef.current.style.transition = "top 1s, left 1s";
            textRef.current.style.top = props.obj.top
            textRef.current.style.left = props.obj.left
            setCount(count+1)
          // textRef.current.style.transition = "none";
        },500)
      }
      
    }
    if(count === 1){
      textRef.current.style.transition = "none";
    }
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]); // Dependency on isDragging to minimize unnecessary rebinds


  return (
    <div className='note border-rounded card'  id={`textBox${props.index}`} style={{ position: 'absolute', width: "200px",top:object.top,left : object.left}} ref={textRef} onDoubleClick={handleDoubleClick}>
      <div className='header d-flex'
           style={{ height: "30px" }}
           onMouseDown={handleMouseDown}>
        <div className='m-auto pt-1'><h6>Note</h6></div>
      </div>
      <textarea
        onChange={(e) =>{ setObject({...object , text : e.target.value}) ;updateObjectAtIndex(props.index,object);}}
        placeholder={"Add your note..."}
        value={object.text}
        onDropCapture={handleDrop}
        onDragOver = {handleDrag}
        onDragEnter={handleDrag}
        onDragEnd = {handleDragEnd}
        onPasteCapture={handlePaste}
        style={{ resize: "none", height: "200px",backgroundColor:'lightblue'}}
        className="textbox-input border-0"
      ></textarea>
    </div>
  );
};

export default Textbox;
