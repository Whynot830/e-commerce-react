import ViewTransitionLink from "@/components/ViewTransitionLink"

const Home = () => {
    return (
        // <div className="flex flex-col gap-4 -my-6 -mx-8">
        <div className="h-screen overflow-y-auto snap-y snap-mandatory max-w-[1440px] m-auto">
            <div className="snap-center relative">
                <img className='w-full h-auto' src="laurameroni-luxury-diningroom_intro.jpg" alt="laurameroni-luxury-diningroom_intro" />
                <div className="absolute inset-0 h-3/4 flex items-center justify-center">
                    <p className="bg-background/30 py-2 w-full text-white font-bold tracking-tight text-center text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                        <span className="text-[#633]">Простой </span>
                        способ добавить
                        <span className="text-[#973737]"> тепла </span>
                        и
                        <span className="text-[#8d6666]"> уюта </span>
                        в дом
                    </p>
                </div>
            </div>
            <div className="snap-center relative">
                <img className="w-full h-auto" src="laurameroni-luxury-livingroom-interior-design_09.jpg" alt="laurameroni-luxury-livingroom-interior-design_09.jpg" />
                <div className="absolute inset-0 h-5/6 flex items-center justify-center">
                    <p className="bg-background/30 py-2 w-full text-white font-bold tracking-tight text-center text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                        Большой выбор
                        <span className="text-[#442d1a]"> мебели</span>
                    </p>
                </div>
            </div>
            <div className="snap-center relative">
                <img className="w-full h-auto" src="laurameroni-luxury-livingroom-interior-design_intro_0.jpg" alt="aurameroni-luxury-livingroom-interior-design_intro_0" />
                <div className="absolute inset-0 h-2/3 flex flex-col gap-y-5 items-center justify-center">
                    <p className="bg-background/30 py-2 w-full text-white font-bold tracking-tight text-center text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                        <span className="text-[#461717]">Начните </span>
                        свое приключение
                    </p>
                    <ViewTransitionLink to='/catalog' className="">
                        <p className="p-2 rounded-xl bg-background/30
                        text-white font-bold tracking-tight text-xl
                        sm:text-2xl md:text-3xl lg:text-4xl underline-offset-2 hover:backdrop-blur-xl transition
                        ">Перейти в каталог</p>
                    </ViewTransitionLink>
                </div>
            </div>
        </div >
    )
}
export default Home