import React from "react";

function AboutUs() {
  return (
    <main className="min-h-screen bg-gray-100 ">
      <div className="flex flex-col items-center justify-center mt-[2rem] text-center">
        <h1 className="text-2xl font-bold text-Colorlogo mt-[4rem]">
          About us
        </h1>
      </div>
      <nav className="flex flex-col justify-center p-[1rem]">
        <section className="mb-6 text-[1rem]">
          <p className=" text-[1.1rem] font-semibold">Introduction</p>
          <p className=" text-gray-700">
            <strong>Guild Foods </strong> is a website designed to provide users
            with detailed food-related information through a web browser. Users
            can search for the name of a dish or specific ingredients to
            discover various recipes with step-by-step cooking instructions.
          </p>
          <p className="text-gray-700">
            This website highlights a wide selection of Khmer dishes, featuring:
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>Names of the dishes</li>
            <li>Types of dishes</li>
            <li>Descriptions</li>
            <li>Ingredients</li>
            <li>Cooking instructions</li>
            <li>Notes</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-[1.1rem] font-semibold ">Purpose</h2>
          <p className="text-gray-700">Sometimes, it can be challenging to decide what to cook for yourself or your family. Guild Foods is the perfect solution, offering a variety of recipes to discover new dishes and learn how to cook foods you've never tried before.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-[1.1rem] font-semibold ">How to Use Guild Foods</h2>
          <p className="text-gray-700">
          First, users can search by dish names, types of dishes, or ingredients. Guild Foods will then display a variety of dishes, including details such as names, types, descriptions, ingredients, cooking instructions, and notes. Finally, users can select a dish and follow the step-by-step instructions to prepare it.
          </p>
        </section>

        <section className="bg-Colorlogo ">
          <h2 className="text-[1.1rem] font-semibold m-[1rem] text-white">
            Our Members :
          </h2>
          <div className=" m-[0.5rem] flex-row gap-[1rem] md:gap-[5rem] items-center justify-center flex flex-wrap">
            <div className="text-white text-sm font-bold flex flex-col items-center justify-center ">
              <img
                src="images/nova.jpg"
                alt="Nova's Profile"
                width={90}
                height={90}
              />
              <p className="text-[1rem] font-semibold mt-2">Liev Nova</p>
              <p className="text-[0.8rem] font-semibold mb-4">UI Builder</p>
            </div>

            <div className="text-white text-sm font-bold flex flex-col items-center justify-center">
              <img
                src="images/sopheak.png"
                alt="Pheak's Profile"
                width={90}
                height={90}
              />
              <p className="text-[1rem] font-semibold mt-2">Sey Sopheak</p>
              <p className="text-[0.8rem] font-semibold mb-4">API Builder</p>
            </div>

            <div className="text-white text-sm font-bold flex flex-col items-center justify-center">
              <img
                src="images/dalen.jpg"
                alt="Pheak's Profile"
                width={90}
                height={90}
              />
              <p className="text-[1rem] font-semibold mt-2">Sin Dalen</p>
              <p className="text-[0.8rem] font-semibold mb-4">Database</p>
            </div>

            <div className="text-white text-sm font-bold flex flex-col items-center justify-center">
              <img
                src="images/Sreydav.jpg"
                alt="Pheak's Profile"
                width={90}
                height={90}
              />
              <p className="text-[1rem] font-semibold mt-2">Chheng Sreydav</p>
              <p className="text-[0.8rem] font-semibold mb-4">Database</p>
            </div>
            <div className="text-white mb-[4rem] text-sm font-bold flex flex-col items-left space-y-2 justify-center">
                <p className="text-[1rem] font-semibold mt-2">Contact US :</p>
                <div className="flex flex-row gap-[0.5rem]">
                    <img
                    src="images/telegram.png"
                    alt="Pheak's Profile"
                    width={30}
                    height={10}
                    />
                    <img
                    src="images/facebook.png"
                    alt="Pheak's Profile"
                    width={30}
                    height={10}
                    />
                    <img
                    src="images/ig.png"
                    alt="Pheak's Profile"
                    width={30}
                    height={5}
                    />
                
                </div>
                
            </div>
          </div>
        </section>
      </nav>
    </main>
  );
}

export default AboutUs;
