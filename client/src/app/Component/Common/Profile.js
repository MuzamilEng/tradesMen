import { profileCard } from '../../Data';
import Profilecard from '../Card/Profilecard'
 
const Profile = ()=>{
 return (
  <>
    {/* <h1 className = "font-bold text-[1vw]">Doctors in Lahore</h1> */}
   <section className="bg-slate-200 p-[1vw] flex w-full max-w-[80vw] m-auto">
     {profileCard?.map((elem, i) => (
       <Profilecard
         name={elem.name}
         experience={elem.experience}
         proffession={elem.proffession}
         img={elem.img}
         key={i}
         />
     ))}
   </section>
    </>
 );   
}
export default Profile