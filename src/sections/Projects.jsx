
import TitleHeader from "../components/TitleHeader"
import Carousel from "../components/Carousel"

export default function Projects() {

    return (
        <section  className="w-full  flex-center relative" id="projects">
            <div className="container w-full my-4  md:my-10 relative z-10">
                <TitleHeader
                    title={"MY PROJECTS"}
                    number={"03"}
                    text={"Check out my recent projects"} />

                
                    <div className="md:mt-20 mt-10 translate-y-20 md:translate-y-0">
                        <Carousel />
                    </div>
               


            </div>
        </section>
    )
}