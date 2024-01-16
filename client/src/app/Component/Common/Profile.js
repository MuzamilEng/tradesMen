import { profileCard } from '../../Data';
import Profilecard from './Profilecard';
 
const Profile = ()=>{
 return (
  <>
    <h1 className = "font-bold text-[1.3vw] transform translate-y-[4.5vw] translate-x-[3vw] text-blue-900">Doctors in Lahore</h1>
   <section className="p-[2vw]">
    <div className='p-[2vw] bg-slate-200  w-full rounded-md shadow-lg'>

     <div className='mx-[2vw] w-full max-w-[90vw] flex gap-[1vw] transform translate-y-[1vw]'>
     {profileCard?.map((elem, i) => (
       
       <div className='w-full pr-[2vw]'>

       <Profilecard
       name={elem.name}
       experience={elem.experience}
       proffession={elem.proffession}
       img={elem.img}
       key={i}
       />
       </div>
       
       ))}
         </div>
       </div>
   </section>
    </>
 );   
}
export default Profile