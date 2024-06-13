import { useLocation, useParams } from "react-router-dom"
import ViewTransitionLink from "./ViewTransitionLink"
import { ArmchairIcon, ChevronLeft, ShoppingBasket, User2 } from "lucide-react"
import useViewNavigate from "@/lib/hooks/viewNavigate"

const Header = () => {
    const location = useLocation()
    const params = useParams()
    const navigate = useViewNavigate()
    return (
        <header className="sticky top-0 z-50 w-full bg-black/10 backdrop-blur supports-[backdrop-filter]:bg-black/10">
            <div className="container px-4 sm:px-8 flex h-14 max-w-screen-2xl items-center justify-between">
                <ViewTransitionLink to='/'>
                    <div className="flex gap-2 sm:gap-x-4">
                        <ArmchairIcon size={28} />
                        <span className="text-xl font-semibold tracking-tight">
                            Furniture Shop
                        </span>
                    </div>
                </ViewTransitionLink>

                <div className="flex gap-x-2 sm:gap-x-4 md:gap-x-8">

                    {(['/login', '/signup', '/profile', '/cart'].includes(location.pathname) || params.id || params.category)
                        && (
                            <ChevronLeft className="cursor-pointer" onClick={() => { navigate(-1) }} size={28} />
                        )}

                    {!['/login', '/signup', '/cart'].includes(location.pathname) && (
                        <ViewTransitionLink to='/cart'>
                            <ShoppingBasket size={28} />
                        </ViewTransitionLink>
                    )}

                    {!['/login', '/signup', '/profile'].includes(location.pathname) && (
                        <ViewTransitionLink to='/profile'>
                            <User2 size={28} />
                        </ViewTransitionLink>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header
