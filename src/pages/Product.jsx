import axios, { axiosPrivate } from "@/api/axios"
import Loader from "@/components/Loader"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, } from "@/components/ui/card"
import { ToastAction } from "@/components/ui/toast"
import { toast } from "@/components/ui/use-toast"
import useViewNavigate from "@/lib/hooks/viewNavigate"
import transition from "@/lib/transition"
import { CanceledError } from "axios"
import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"

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
            event.target.innerText = 'Добавить в корзину'
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
                        title: 'Что-то пошло не так...',
                        description: 'Возникла проблема с запросом, попробуйте позже',
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
                        <div className="flex flex-col gap-y-4 sm:max-w-[75%]">
                            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-secondary-foreground">
                                {product?.title}
                            </h2>

                            <Card className="bg-secondary p-1 w-2/3 max-w-[300px] sm:max-w-[400px] md:w-[400px]">
                                <object className="w-full rounded-sm" data={`${axios.defaults.baseURL}/images/${product?.imgName}`} type="image/png">
                                    <img className='h-full transition' src='/furniture.png' alt={`${product?.title} image`} />
                                </object>
                            </Card>
                            <Badge variant='secondary' className='w-fit'>{product?.category.toUpperCase()}</Badge>

                            <p className="text-lg sm:text-xl font-semibold text-secondary-foreground tracking-tight ">
                                {product?.description}
                            </p>

                            <span className="text-lg sm:text-xl font-semibold tracking-tight">
                                USD ${product?.price}
                            </span>

                            <Button className='w-fit' onClick={(e) => { addToCart(e, product.id) }}>
                                Добавить в корзину
                            </Button>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default Product