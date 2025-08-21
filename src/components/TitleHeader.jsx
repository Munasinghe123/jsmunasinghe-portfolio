export default function TitleHeader({
    title,text,number
}){

    return(
        <div className="flex justify-between items-center">
            <div className="">
                <h1 className="gradient-title font-semibold md:text-4xl text-3xl">{title}</h1>
                <p className="md:text-3xl text-2xl md:mt-5">{text}</p>
            </div>
            <div className="md:flex hidden items-center gap-7">
                <div className="w-36 border border-white-50"></div>
                <p className="gradient-title text-6xl">{number}</p>
            </div>
        </div>
    )
}