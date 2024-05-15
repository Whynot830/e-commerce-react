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
import { useLocation, useParams } from "react-router-dom"
import { CanceledError } from "axios"

const Product = () => {
    const navigate = useViewNavigate()
    const location = useLocation()
    const { id } = useParams()
    const [product, setProduct] = useState({})
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
            event.target.innerText = 'Add to cart'
            event.target.disabled = false
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
        let isMounted = true
        const controller = new AbortController()
        const fetchData = async (id) => {
            try {
                const response = await axios.get(`/products/${id}`, {
                    signal: controller.signal
                })
                return response.data
            } catch (err) {
                console.log(err)
                if (err instanceof CanceledError)
                    return
                if (err.response.status !== 404)
                    toast({
                        variant: 'destructive',
                        title: 'Uh oh! Something went wrong',
                        description: 'There was a problem with request, try again later',
                    })
                navigate('/404', { replace: true })
            }
        }
        fetchData(id).then((product) => {
            isMounted && transition(() => {
                setProduct(product)
                setLoading(false)
            })
        })
        return () => {
            isMounted = false
            controller.abort()
        }
    }, [])
    return (
        <>
            {isLoading
                ? (
                    <Loader />
                ) :
                (
                    <>
                        <div className="m-auto">
                            <div className="flex flex-col gap-y-4">
                                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-secondary-foreground">
                                    {product?.title}
                                </h2>

                                <Card className="bg-secondary p-1 w-2/3 max-w-[300px] sm:max-w-[400px] md:w-[400px]">
                                    <object className="w-full rounded-sm" data={`${axios.defaults.baseURL}/images/${product?.imgName}`} type="image/png">
                                        <img className='h-full transition' src='/furniture.png' alt={`${product?.title} image`} />
                                    </object>
                                </Card>

                                <p className="text-xl font-semibold text-secondary-foreground tracking-tight ">
                                    {product?.description}
                                </p>

                                <span className="text-xl font-semibold tracking-tight">
                                    USD ${product?.price}
                                </span>

                                <Button className='w-fit' onClick={(e) => { addToCart(e, product.id) }}>
                                    Добавить в корзину
                                </Button>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default Product