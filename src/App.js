import React ,{useState,useRef,useEffect} from 'react';
import { ChromePicker } from 'react-color';
import './App.css';

function App() {
  const [color,setColor] = useState('#f15025');
  const [color2,setColor2] = useState('#222');
  const [showPallete,setShowPallete] = useState(false);
  const [showPallete2,setShowPallete2] = useState(false);
   const ref = useRef()
   const ref2 = useRef()
   useOnClickOutside(ref,()=>setShowPallete(false))
   useOnClickOutside(ref2,()=>setShowPallete2(false))

   function useOnClickOutside(ref, handler) {
    useEffect(
      () => {
        const listener = (event) => {
          // Do nothing if clicking ref's element or descendent elements
          if (!ref.current || ref.current.contains(event.target)) {
            return;
          }
          handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
          document.removeEventListener("mousedown", listener);
          document.removeEventListener("touchstart", listener);
        };
      },
      // Add ref and handler to effect dependencies
      // It's worth noting that because passed in handler is a new ...
      // ... function on every render that will cause this effect ...
      // ... callback/cleanup to run every render. It's not a big deal ...
      // ... but to optimize you can wrap handler in useCallback before ...
      // ... passing it into this hook.
      [ref, handler]
    );
  }
 
  const setPalletes = () =>{
    setShowPallete2(false)
    setShowPallete(true)
  }
  const setPalletes2 =() =>{
    setShowPallete(false);
    setShowPallete2(true)
  }

  return (
    <div className="App"  style={{background:`linear-gradient(to right,${color},${color2})`}} >
      
      <h1>MY BACKGROUND GENERATOR</h1>
      <section>
      <button ref={ref} onClick={setPalletes} style={{backgroundColor:`${color}`}}>&nbsp;</button>
       <button ref={ref2} onClick={setPalletes2} style={{backgroundColor:`${color2}`}}>&nbsp;</button>
      </section>
      <section className='selection'>
        <h2>CURRENT CSS SELECTION</h2>
        <p className='text'>linear-gradient(to right, {color}, {color2})</p>
      </section>
      <section>
        <div ref={ref}>
      {showPallete &&
      <ChromePicker   className='color1' color={color} onChange={updatedColor => setColor(updatedColor.hex)} />}
      </div>
      <div  ref={ref2}>
      {showPallete2 &&
      <ChromePicker className='color2' color={color2} onChange={updatedColor => setColor2(updatedColor.hex)} />}
      </div>
      </section>
     
      </div>
    
  );
}

export default App;
