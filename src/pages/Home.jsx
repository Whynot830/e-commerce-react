import ViewTransitionLink from "@/components/ViewTransitionLink"

const Home = () => {
    return (
        <div className="h-screen overflow-y-auto snap-y snap-mandatory max-w-[1440px] m-auto">
            <div className="snap-center relative">
                <img className='w-full h-auto' src="laurameroni-luxury-diningroom_intro.jpg" alt="laurameroni-luxury-diningroom_intro" />
                <div className="absolute inset-0 h-3/4 flex items-center justify-center">
                    <p className="bg-black/30 backdrop-blur-sm py-2 w-full text-white font-bold tracking-tight text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                        <span className="text-[#633]">Easy </span>
                        way to bring
                        <span className="text-[#973737]"> warmth </span>
                        and
                        <span className="text-[#8d6666]"> comfort </span>
                        into your home
                    </p>
                </div>
            </div>
            <div className="snap-center relative">
                <img className="w-full h-auto" src="laurameroni-luxury-livingroom-interior-design_09.jpg" alt="laurameroni-luxury-livingroom-interior-design_09.jpg" />
                <div className="absolute inset-0 h-5/6 flex items-center justify-center">
                    <p className="bg-black/30 backdrop-blur-sm py-2 w-full text-white font-bold tracking-tight text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                        Variety of
                        <span className="text-[#774c29]"> furniture</span>
                    </p>
                </div>
            </div>
            <div className="snap-center relative">
                <img className="w-full h-auto" src="laurameroni-luxury-livingroom-interior-design_intro_0.jpg" alt="aurameroni-luxury-livingroom-interior-design_intro_0" />
                <div className="absolute inset-0 h-5/6 flex flex-col gap-y-5 items-center justify-center">
                    <p className="bg-black/30 backdrop-blur-sm py-2 w-full text-white font-bold tracking-tight text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                        <span className="text-[#461717]">Begin </span>
                        your adventure
                    </p>
                    <ViewTransitionLink to='/catalog' className="">
                        <p className="p-2 rounded-xl bg-black/30
                        text-white font-bold tracking-tight text-xl
                        sm:text-2xl md:text-3xl lg:text-4xl underline-offset-2 backdrop-blur-sm hover:backdrop-blur-xl transition
                        ">Go to catalog</p>
                    </ViewTransitionLink>
                </div>
            </div>
        </div >
    )
}
export default Home