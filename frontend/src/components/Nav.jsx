import Reac,{useState}  from 'react'
import { PersonSharp } from 'react-ionicons'
import logo from '../assets/hacker.png'
import { SearchSharp } from 'react-ionicons'
import { NotificationsSharp } from 'react-ionicons'
import Dropdown from './DropDown'
function Nav() {
    const [selection, setSelection] = useState(null);
    const options = [
        { label: 'garba', value: 'garba' },
        { label: 'cc', value: 'cc' },
        { label: 'marathi', value: 'marathi' },
      ];
      const handleCommity = (option) => {
        setSelection(option);
      };
    return (
        <>
            <div className='w-full h-16 bg-nav flex justify-between items-center shadow-lg'>
                <div className='flex items-center mx-5'>
                    <img className='h-12 w-12 rounded-full mx-2 border-2 border-gray-600 bg-red-400' src={logo} alt="logo" />
                    <p className='text-lg font-bold'>Motis</p>
                </div>

                <div className='flex items-center'>
                    <input className='py-2 px-7 text-base w-[700px] rounded-s-md focus:outline-none' type="text" placeholder='Search .....' />
                    <div className='py-[9px] text-lg bg-yellow-400 px-3 rounded-e-md font-bold'>
                        <SearchSharp/>
                    </div>

                </div>
                <div className='flex items-center w-1/6 '>
                <Dropdown options={options} value={selection} onChange={handleCommity} name='commity' className='bg-nav'/> 
                </div>

                <div className='flex items-center mx-5'>
                    <div className='text-2xl mx-3'>
                        <NotificationsSharp className='hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer' height="24px" width="24px"/>
                    </div>

                    <div className='text-2xl mx-3'>
                        <PersonSharp color="#222831" className='hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer' eight="24px" width="24px"/>
                    </div>


                </div>
            </div>
        </>
    )
}

export default Nav