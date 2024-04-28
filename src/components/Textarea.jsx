import React, { useEffect, useRef,useState } from 'react'
import Textbox from './Textbox';
import '../styles/textarea.css'

const Textarea = ({bodyRef,texts,setTexts}) => {
  // const [texts,setTexts] = useState(["adbcd","dsfbs"])
  // const [indices,setIndices] = useState(0)
  const [inFocus,setinFocus] = useState(false)
  const areaRef = useRef(null)

  const handleDoubleClick = () => {
    console.log("double click")
     const obj = {
        text : "",
        zIndex : texts.length,
        top : window.innerHeight/2,
        left : window.innerWidth/2,
        topLeft : Math.sqrt((window.innerHeight/2)**2 + (window.innerWidth/2)**2)
      }
    setTexts([...texts,obj])
    console.log(texts.length)
  }

  const handlePaste = (e) => {
    e.preventDefault()
    let pasteData = e.clipboardData.getData("text")
    const obj = {
      text : pasteData,
      zIndex : texts.length,
      top : window.innerHeight/2,
      left : window.innerWidth/2,
      topLeft : Math.sqrt((window.innerHeight/2)**2 + (window.innerWidth/2)**2)
    }
    setTexts([...texts,obj])
  }

  const handleDrop = (e) => {
    e.preventDefault()
    if(inFocus) return;
    let droppedText = e.dataTransfer.getData("text")
    const obj = {
      text : droppedText,
      zIndex : texts.length,
      top : window.innerHeight/2,
      left : window.innerWidth/2,
      topLeft : Math.sqrt((window.innerHeight/2)**2 + (window.innerWidth/2)**2)
    }
    setTexts([...texts,obj])
  }

  const handleDragover = (e) => {
    e.preventDefault()
    if(inFocus) return;
  }

  return (
    <div  role="input" className="mx-auto textarea"  ref={areaRef} onDoubleClick={handleDoubleClick} onPaste={handlePaste} onDrop={handleDrop} onDragOver={handleDragover}>
        {texts.map((obj,index) => {
          return (<Textbox obj={obj} objsFunc={setTexts} objs={texts} key={index} index={index} bodyRef={bodyRef} inFocus={inFocus} inFocusFunc={setinFocus}/>)
        })}
    </div>
  )
}

export default Textarea