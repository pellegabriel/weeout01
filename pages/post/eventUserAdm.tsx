import Image from 'next/image'
// import img1 from '../../public/IMG1.png' 
import user1 from '../../public/user1.png'
import { 
    EventCreateForm 
  } from '../../src/ui-components';
  import { 
    EventUpdateForm 
  } from '../../src/ui-components';
  
export default function EventUserAdm () {
    return (
        
<div className='mt-10 p-8 flex items-center justify-center'>

    <div className=" break-words bg-white  mt-16 ">
            <div className=" flex ">
                <div className="">
                    <Image alt='' src={user1} className="shadow-xl rounded-full align-middle border-none -m-16 -ml-20 lg:-ml-16 max-w-[150px]"/>
                </div>
            </div>
            
        <div className="p-8 mx-20">
            <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1"></h3>
            <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>Paris, France
            </div>
        </div>
        <div className=" flex mt-6 py-6 border-t border-slate-300 text-center">
        <div className=' overflow-hidden flex items-center justify-center'>
    <div className='mt-8  grid-cols-4 p-10 '>
    <h1 className='text-2xl text-slate-700 font-bold leading-normal mt-4'>Crea un evento</h1>
    <EventCreateForm />
    </div>
    <div className='mt-8 mb-8 grid-cols-1 p-10'>
    <h1 className='text-2xl text-slate-700 font-bold leading-normal mb-1'>Actualiza un evento</h1>
    <EventUpdateForm/>
    </div>
</div>
</div>
        </div>
        
    </div>

    )
}