import axios, { axiosPrivate } from "@/api/axios"
import Loader from "@/components/Loader"
import ViewTransitionLink from "@/components/ViewTransitionLink"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import transition from "@/lib/transition"
import { useEffect, useState } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import useViewNavigate from "@/lib/hooks/viewNavigate"
import { ToastAction } from "@/components/ui/toast"
import { Link, useLocation } from "react-router-dom"
import { flushSync } from "react-dom"

const Catalog = () => {
    const navigate = useViewNavigate()
    const location = useLocation()
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState({})
    const [isLoading, setLoading] = useState(true)

    const addToCart = async (event, productId) => {
        transition(() => {
            event.target.innerText = 'Подождите...'
            event.target.disabled = true
        })
        try {
            await axiosPrivate.post(`/cart/items?productId=${productId}`, {}, {
                validateStatus: (status) => status === 200
            })
            event.target.innerText = 'Добавлено'
            toast({
                title: 'Товар добавлен в корзину'
            })
        } catch (err) {
            transition(() => {
                flushSync(() => {
                    event.target.innerText = 'Добавить в корзину'
                    event.target.disabled = false
                })
            })
            if (err.response?.status === 401)
                toast({
                    title: 'Необходима авторизация!',
                    description: 'Чтобы добавлять товары в корзину',
                    action: <ToastAction className="" altText="Войти" onClick={() => {
                        navigate('/login', { state: { from: location } })
                    }}>Войти</ToastAction>
                })
        }
    }

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
                for (const category of categories) {
                    const name = category.name
                    fetchProductsByCategory(name).then((fetchedProducts) => {
                        transition(() => {
                            setProducts(prev => ({ ...prev, [name]: fetchedProducts }))
                        })
                    })
                }
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
                (
                    <>
                        {categories.length !== 0 && categories.map((category, idx) =>

                        (
                            <div key={idx} className="p-6 px-12 flex flex-col gap-y-3">

                                <ViewTransitionLink disabled key={category.id} to={`/catalog/${category.name}`}>
                                    <span className="text-2xl font-semibold leading-none tracking-tight text-secondary-foreground">
                                        {category.name.charAt(0).toUpperCase() + category.name.substr(1)}
                                    </span>
                                </ViewTransitionLink>
                                <Carousel
                                    opts={{
                                        align: "start",
                                    }}
                                    className="w-full"
                                >
                                    <CarouselContent className=''>
                                        {
                                            Array.from({ length: 5 }).map((_, idx) => {
                                                const product = products?.[category.name]?.[idx]
                                                return (
                                                    <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 flex justify-center ">
                                                        <div className="p-1 flex justify-center w-full max-w-[350px]">

                                                            <Card className="flex flex-col w-full">
                                                                <CardHeader className='p-3'>
                                                                    <CardTitle className="text-base flex items-center">
                                                                        <p className='text-nowrap overflow-hidden text-ellipsis'>
                                                                            {product ? product.title : "Скоро!"}
                                                                        </p>
                                                                    </CardTitle>

                                                                    <CardDescription >
                                                                        <ViewTransitionLink disabled={!product} to={`/catalog/${product?.category}/${product?.id}`}>
                                                                            <span className='text-foreground underline-offset-4 hover:underline'>
                                                                                Смотреть подробнее
                                                                            </span>
                                                                        </ViewTransitionLink>
                                                                    </CardDescription>


                                                                </CardHeader>
                                                                <CardContent className='p-3 pt-0 flex justify-center items-end border-b' >
                                                                    <div className=" flex h-[120px] sm:h-[150px] w-full justify-center">
                                                                        {product ? (

                                                                            <object data={`http://localhost:8080/api/images/${product.imgName}`} type="image/png">
                                                                                <img className='h-full' src='/furniture.png' alt={`${product.title} image`} />
                                                                            </object>

                                                                        ) : (
                                                                            // CHECK
                                                                            <div className="flex-1 px-6">
                                                                                <Skeleton className='h-full w-full' />
                                                                            </div>

                                                                        )}
                                                                    </div>
                                                                </CardContent>
                                                                <CardFooter className='p-3 flex flex-wrap justify-between '>

                                                                    <span className="text-muted-foreground">{product ? <>${product.price}</> : 'N/A'} </span>
                                                                    <Button disabled={!product} onClick={(e) => { addToCart(e, product.id) }}>
                                                                        Добавить в корзину
                                                                    </Button>
                                                                </CardFooter>
                                                            </Card>

                                                        </div>
                                                    </CarouselItem>
                                                )
                                            })
                                        }
                                    </CarouselContent>
                                    <CarouselPrevious />
                                    <CarouselNext />
                                </Carousel>
                            </div>
                        ))}

                        {categories.length == 0 && (
                            <div className="absolute inset-0 bottom-20 flex flex-col gap-6 justify-center items-center">
                                <h2 className="text-2xl font-semibold">No categories added yet</h2>
                                <Button>
                                    <ViewTransitionLink to='/'>Back to home page</ViewTransitionLink>
                                </Button>
                            </div>
                        )}
                    </>
                )
            }
        </>
    )
}

export default Catalog