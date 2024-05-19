import transition from "@/lib/transition"
import ViewTransitionLink from "./ViewTransitionLink"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Skeleton } from "./ui/skeleton"
import axios, { axiosPrivate } from "@/api/axios"
import { toast } from "./ui/use-toast"
import { flushSync } from "react-dom"
import useViewNavigate from "@/lib/hooks/viewNavigate"
import { useLocation } from "react-router-dom"
import { ToastAction } from "./ui/toast"

const CatalogCard = ({ product }) => {
    const navigate = useViewNavigate()
    const location = useLocation()

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

    return (
        <Card className="flex flex-col w-full border-none">
            <CardHeader className='p-4'>
                <CardTitle className="text-base flex items-center">
                    <p className='text-nowrap overflow-hidden text-ellipsis'>
                        {product ? product.title : "Скоро!"}
                    </p>
                </CardTitle>

                <CardDescription>
                    <ViewTransitionLink disabled={!product} to={`/catalog/${product?.category}/${product?.id}`}>
                        <span className=' underline-offset-4 hover:underline'>
                            Смотреть подробнее
                        </span>
                    </ViewTransitionLink>
                </CardDescription>


            </CardHeader>
            <CardContent className='p-4 pt-0 flex justify-center items-end' >
                <div className=" flex h-[120px] sm:h-[150px] w-full justify-center">
                    {product ? (

                        <object data={`${axios.defaults.baseURL}/images/${product.imgName}`} type="image/png">
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
            <CardFooter className='p-4 flex flex-wrap justify-between gap-y-3'>

                <span className="text-muted-foreground">{product ? <>${product.price}</> : 'N/A'} </span>
                <Button disabled={!product} onClick={(e) => { addToCart(e, product.id) }}>
                    Добавить в корзину
                </Button>
            </CardFooter>
        </Card>
    )
}

export default CatalogCard