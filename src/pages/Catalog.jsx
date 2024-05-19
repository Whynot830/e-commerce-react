import axios from "@/api/axios"
import Loader from "@/components/Loader"
import ViewTransitionLink from "@/components/ViewTransitionLink"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import useViewNavigate from "@/lib/hooks/viewNavigate"
import transition from "@/lib/transition"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

const Catalog = () => {
    const navigate = useViewNavigate()
    const location = useLocation()
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState({})
    const [isLoading, setLoading] = useState(true)



    useEffect(() => {
        const fetchCategories = async () => {
            const response = await axios.get('/categories')
            return response.data
        }
        const fetchProductsByCategory = async (category) => {
            try {
                const response = await axios.get(`/products?category=${category}&limit=5`)
                return response.data.products
            } catch (err) {
                console.error(err);
            }
        }
        fetchCategories().then((categories) => {
            if (categories) {
                transition(() => {
                    setCategories(categories)
                    setLoading(false)
                })
                // for (const category of categories) {
                //     const name = category.name
                //     fetchProductsByCategory(name).then((fetchedProducts) => {
                //         transition(() => {
                //             setProducts(prev => ({ ...prev, [name]: fetchedProducts }))
                //         })
                //     })
                // }
            }
            !categories && transition(() => setLoading(false))
        }).catch((err) => {
            console.log(err)
            setLoading(false)
            toast({
                variant: 'destructive',
                title: 'Что-то пошло не так...',
                description: 'Возникла проблема с запросом, попробуйте позже',
            })
        })
    }, [])
    return (
        <>
            {isLoading
                ? (
                    <Loader />
                ) :

                <div className="p-3 gap-y-8 gap-x-4 grid grid-cols-2 sm:grid-cols-3 place-items-center">
                    <h2 className='text-xl sm:text-2xl leading-none font-semibold tracking-tight col-span-full'>Категории</h2>
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
                            <h2 className="text-2xl font-semibold">Пока категорий нет</h2>
                            <Button>
                                <ViewTransitionLink to='/'>На главную страницу</ViewTransitionLink>
                            </Button>
                        </div>
                    )}
                </div>

            }
        </>
    )
}

export default Catalog