import { navData } from "../../Data";

const Navbar2 = () => {
  return (
    <section className="shadow-lg bg-red-200 p-[1vw] w-full ">
      {navData?.map((elem) => (
        <div className="flex gap-[5vw] ml-[5vw] items-center   w-full max-w-[100vw]">
          <div>
            <h1 className="font-bold text-[2vw]">{elem.logo}</h1>
          </div>
          <div className="flex gap-[3vw]">
            {elem.lists?.map((elem) => (
              <ul key={elem.id} className="text-blue-800">
                <li className="text-vw">{elem.title}</li>
              </ul>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};
export default Navbar2;
