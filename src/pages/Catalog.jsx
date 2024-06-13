import axios from "@/api/axios"
import Loader from "@/components/Loader"
import ViewTransitionLink from "@/components/ViewTransitionLink"
import { Button } from "@/components/ui/button"
import errorToast from "@/lib/errorToast"
import useViewNavigate from "@/lib/hooks/viewNavigate"
import transition from "@/lib/transition"
import { useEffect, useState } from "react"

const Catalog = () => {
    const navigate = useViewNavigate()
    const [categories, setCategories] = useState([])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await axios.get('/categories')
            return response.data
        }
        fetchCategories().then((categories) => {
            if (categories) {
                transition(() => {
                    setCategories(categories)
                    setLoading(false)
                })

            }
            !categories && transition(() => setLoading(false))
        }).catch((err) => {
            console.log(err)
            setLoading(false)
            errorToast()
        })
    }, [])
    return (
        <>
            {isLoading
                ? (
                    <Loader />
                ) :

                <div className="p-3 gap-y-8 gap-x-4 grid grid-cols-2 sm:grid-cols-3 place-items-center">
                    <h2 className='text-xl sm:text-2xl leading-none font-semibold tracking-tight col-span-full'>Categories</h2>
                    {categories.length !== 0 && categories.map((category) =>

                    (
                        <Button variant='secondary' key={category.id} onClick={() => navigate(`/catalog/${category.name}`)} >
                            <h2 className="text-base sm:text-lg font-semibold text-secondary-foreground/90">
                                {category.name.charAt(0).toUpperCase() + category.name.substr(1)}
                            </h2>
                        </Button>
                    ))}

                    {categories.length == 0 && (
                        <div className="absolute inset-0 bottom-20 flex flex-col gap-6 justify-center items-center">
                            <h2 className="text-2xl font-semibold">There are no categories yet</h2>
                            <Button>
                                <ViewTransitionLink to='/'>To home page</ViewTransitionLink>
                            </Button>
                        </div>
                    )}
                </div>

            }
        </>
    )
}

export default Catalog