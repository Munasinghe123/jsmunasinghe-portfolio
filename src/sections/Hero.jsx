
import Typewriter from "../components/TypeWriter";
import HeroExprience from '../components/HeroExperience'

export default function Hero() {



    return (
        <section id="home" className="h-dvh relative text-white-50 px-5 md:p-0">
            {/* <GradientSphere sphere1Class={"gradient-sphere sphere-1"} sphere2Class={"gradient-sphere sphere-2"}/> */}
            <div className="w-full h-full flex-center">
                <div className="container relative w-full h-full">
                    <div className="md:mt-40 mt-20">
                        <p className="font-medium md:text-4xl text-base">👋 Hi! I'm here</p>

                        <Typewriter
                            words={["JS MUNASINGHE", "UNDERGRADUATE"]}
                            className="font-black md:text-9xl text-3xl text-white"
                            typeSpeed={60}
                            deleteSpeed={45}
                            finishDelay={2000}
                        />



                    </div>

                    <div className="absolute w-full z-30 bottom-20 right-0">
                        <div className="flex justify-between items-end">
                            <div className="flex flex-col items-center md:gap:5 gap-1">
                                <p className="md:text-base text-sm">Explore</p>
                                <img className="size-7 animate-bounce" src="images/arrowdown.svg" />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
           
                <div className="w-full h-full absolute inset-0">
                    <HeroExprience />
                </div>
         
        </section>
    )
}