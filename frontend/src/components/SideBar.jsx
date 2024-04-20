import React,{useState} from 'react'
import Dropdown from './DropDown'
import Panel from './Panel';



function SideBar() {
  //   const [selection, setSelection] = useState(null);
  //   const [event, setEvents] = useState(null);

  // const handleEvent = (option) => {
  //   setEvents(option);
  // };
  // const handleCommity = (option) => {
  //   setSelection(option);
  // };

  // const options = [
  //   { label: 'garba', value: 'garba' },
  //   { label: 'cc', value: 'cc' },
  //   { label: 'marathi', value: 'marathi' },
  // ];
  
  // const events = [
  //   { label: 'culrav', value: 'culrav' },
  //   { label: 'avishkar', value: 'avishkar' },
  //   { label: 'gdsc', value: 'gdsc' },
  // ];
  

   
  return (
    <div className="mt-4 w-11/12  flex flex-col items-center justify-center text-center">
          {/* <Panel>Home</Panel>  
          <Dropdown options={options} value={selection} onChange={handleCommity} name='commity'/> 
          <Dropdown options={events} value={event} onChange={handleEvent} name='event'/>  */}
          
    </div>
  )
}

export default SideBar