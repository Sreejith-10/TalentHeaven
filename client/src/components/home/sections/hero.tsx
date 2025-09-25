import SectionWrapper from "@/components/wrapper/section-wrapper";
import HeroSeachBar from "../hero-search-bar";

const Hero = () => {
  return (
    <section className="w-full h-screen py-[200px] flex justify-center relative">
      {/* <div className="w-[300px] h-[360px] sm:w-[200px] sm:h-[150px] bg-purple-600 dark:bg-purple-950 blur-3xl absolute top-[30%] left-[20%] md:top-[10%] -z-10 bb"></div> */}

      <div className="absolute top-[30%] left-[10%] -z-50 lg:left-10 lg:top-24">
        <div className="w-[300px] h-[300px] lg:w-[200px] lg:h-[200px] bg-purple-600 bb blur-lg opacity-80 dark:blur-md absolute top-1/2 animate-blob"></div>
        <div className="w-[300px] h-[300px] lg:w-[200px] lg:h-[200px] bg-purple-500 bb blur-lg opacity-80 dark:blur-md absolute bottom-[-70px] left-[150px] animate-blob [animation-delay:5s]"></div>
        <div className="w-[300px] h-[300px] lg:w-[200px] lg:h-[200px] bg-purple-400 bb blur-lg opacity-80 dark:blur-md absolute left-[240px] animate-blob [animation-delay:10s]"></div>
      </div>

      <div className="absolute top-[50%] left-[60%] -z-50 sm:-left-14 sm:top-24 lg:hidden">
        <div className="w-[300px] h-[300px] sm:w-[200px] sm:h-[200px] bg-purple-500 bb blur-lg opacity-80 dark:blur-md absolute left-[240px] animate-blob [animation-delay:10s]"></div>
        <div className="w-[300px] h-[300px] sm:w-[200px] sm:h-[200px] bg-purple-400 bb blur-lg opacity-80 dark:blur-md absolute top-1/2 sm:left-20 animate-blob"></div>
        <div className="w-[300px] h-[300px] sm:w-[200px] sm:h-[200px] bg-purple-600 bb blur-lg opacity-80 dark:blur-md absolute bottom-[-70px] left-[150px] animate-blob [animation-delay:5s]"></div>
      </div>

      <SectionWrapper>
        <div className="w-full flex flex-col items-center justify-center">
          {/* <h1 className="text-[120px] font-semibold md:text-cente sm:text-3xl">
						Talent <span className="text-purple-600">Heaven</span>
					</h1> */}
          <h1 className="text-[120px] font-semibold md:text-cente sm:text-3xl lg:text-3xl relative">
            Talent <span className="text-purple-600">Heaven</span>
          </h1>
          <h2 className="text-[50px] font-semibold sm:text-xl lg:text-xl">
            {" "}
            Finding a Job You Deserve
          </h2>
          <br />
          <p className="text-slate-500 font-medium">
            1,80,570 jobs listed here! find your dream job
          </p>
          <br />
          <br />
          <br />

          <HeroSeachBar />
        </div>
      </SectionWrapper>
    </section>
  );
};

export default Hero;
