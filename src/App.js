import logo from './logo.svg';
import './App.css';
import Textarea from './components/Textarea';
import Header from './components/Header';
import { useRef, useState } from 'react';
import * as XLSX from 'xlsx';

function App() {

  // const obj1 = {
  //   text : "note 1",
  //   zIndex : 0,
  //   top : window.innerHeight/2,
  //   left : window.innerWidth/2,
  //   topLeft : Math.sqrt((window.innerHeight/2)**2 + (window.innerWidth/2)**2)
  // }

  // const obj2 = {
  //   text : "note 2",
  //   zIndex : 1,
  //   top : window.innerHeight/2,
  //   left : window.innerWidth/2,
  //   topLeft : Math.sqrt((window.innerHeight/2)**2 + (window.innerWidth/2)**2)
  // }

  const [texts,setTexts] = useState([])
  const bodyRef = useRef(null)

  const exportToExcel = (e) => {
    e.preventDefault()
    const wb = XLSX.utils.book_new();
    const wsData = [['Note',"Distance from top","Distance from left","Distance from topleftcorner","z-index"]];
    texts.forEach((obj) => {
      console.log(obj)
      wsData.push([obj.text,obj.top,obj.left,obj.topLeft,obj.zIndex]);
    });
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, 'TextData');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    const fileName = 'text_data.xlsx';
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };




  return (
    <div ref={bodyRef}>
      <Header />
      <div className='m-4'>
        <Textarea bodyRef={bodyRef} texts={texts} setTexts={setTexts}/>
        <div className='m-2 d-flex w-75 justify-content-end mx-auto'>
          <button className='btn btn-sm btn-success p-2' onClick={exportToExcel}>Export Notes</button>
        </div>
      </div>



    </div>
  );
}

export default App;
