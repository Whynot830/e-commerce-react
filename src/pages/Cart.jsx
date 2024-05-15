import { axiosPrivate } from "@/api/axios"
import ViewTransitionLink from "@/components/ViewTransitionLink"
import { DeleteIcon } from "@/components/ui/DeleteIcon"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "@/components/ui/use-toast"
import useViewNavigate from "@/lib/hooks/viewNavigate"
import transition from "@/lib/transition"
import { Delete, Loader, LucideDelete, Trash, Trash2, X } from "lucide-react"
import { useEffect, useState } from "react"

const Cart = () => {
    const navigate = useViewNavigate()

    const [cart, setCart] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const fetchCart = async () => {
        try {
            const response = await axiosPrivate.get('/cart')
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
    const deleteFromCart = async (itemId) => {
        transition(() => setIsLoading(true))
        try {
            const response = await axiosPrivate.delete(`/cart/items/${itemId}`)
            if (response.status === 200) {
                setIsLoading(false)
                toast({
                    title: 'Товар успешно удален'
                })
                fetchCart().then((cart) => transition(() => setCart(cart)))
            }
        } catch (err) {
            toast({
                variant: 'destructive',
                title: 'Что-то пошло не так...',
                description: 'Возникла проблема с запросом, попробуйте позже',
            })
            setIsLoading(false)
        }
    }
    const clearCart = async () => {
        transition(() => setIsLoading(true))
        try {
            const response = await axiosPrivate.delete('/cart/items')
            if (response.status === 200) {
                setIsLoading(false)
                toast({
                    title: 'Корзина успешно очищена'
                })
                fetchCart().then((cart) => transition(() => setCart(cart)))
            }
        } catch (err) {
            toast({
                variant: 'destructive',
                title: 'Что-то пошло не так...',
                description: 'Возникла проблема с запросом, попробуйте позже',
            })
            console.log(err)
        }
    }
    const checkOut = async () => {
        transition(() => setIsLoading(true))
        try {
            const response = await axiosPrivate.post('/cart/checkout')
            if (response.status === 200) {
                navigate('/catalog')
                toast({
                    title: 'Успешное подтверждение заказа',
                    description: 'На почту отправлено письмо с деталями',
                })
            }
        } catch (err) {
            setIsLoading(false)
            toast({
                variant: 'destructive',
                title: 'Что-то пошло не так...',
                description: 'Возникла проблема с запросом, попробуйте позже',
            })
            console.log(err)
        }
    }
    useEffect(() => {
        // let isMounted = true
        // const controller = new AbortController()

        fetchCart().then((cart) => transition(() => setCart(cart)))
        // return () => {
        //     isMounted = false
        //     controller.abort()
        // }
    }, [])

    return (
        <>
            <div className="flex h-full flex-col gap-y-3 items-center ">
                {cart && cart.items?.length > 0 ? (
                    <>
                        <div className="p-4 rounded-md bg-accent flex justify-center items-center gap-x-5">
                            <h2 className='text-lg text-secondary-foreground font-semibold'>Сумма: {cart?.total && `$ ${cart.total}`}</h2>
                            <Button disabled={isLoading} size='sm' onClick={checkOut} className='w-fit'>
                                {isLoading ? 'Подождите...' : 'Оформить заказ'}
                            </Button>
                        </div>
                        <div className="p-5 rounded-md bg-accent flex flex-col gap-y-2">
                            <div className="flex justify-between mb-2">
                                <h2 className='text-lg font-semibold'>Добавленные товары</h2>
                                <Button disabled={isLoading} size='sm' onClick={clearCart} className='w-fit'>
                                    {isLoading ? <Loader className="animate-spin" /> : <Trash2 />}
                                </Button>

                            </div>
                            <ScrollArea className="max-h-[60vh]">
                                <div className="flex flex-col w-full gap-y-4 px-3">
                                    {cart.items.map((item) =>
                                        <Card key={item.id} className="flex">
                                            <CardHeader className='p-4'>
                                                <CardTitle className="text-base text-balance">
                                                    <div className="max-w-[120px]">
                                                        <object className="w-full" data={`http://localhost:8080/api/images/${item.product.imgName}`} type="image/png">
                                                            <img className='w-full' src='furniture.png' alt="IMAGE" />
                                                        </object>
                                                    </div>
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className='p-4 border-x w-[150px]'>
                                                <p className="h-full font-semibold flex flex-col gap-y-3 justify-between items-end text-sm md:text-base">
                                                    <span className="w-full">{item.product.title}</span>
                                                    <span>$ {item.product.price}</span>
                                                </p>
                                            </CardContent>
                                            <CardFooter >
                                                <button disabled={isLoading}
                                                    onClick={() => { deleteFromCart(item.id) }}
                                                    className="p-1 text-destructive cursor-pointer hover:bg-secondary transition-colors rounded-sm disabled:pointer-events-none disabled:opacity-50">
                                                    <X />
                                                </button>
                                            </CardFooter>
                                        </Card>
                                    )}
                                </div>
                            </ScrollArea>
                        </div>
                    </>
                )
                    : cart?.items?.length == 0 &&
                    (
                        <div className="flex h-3/4 flex-col gap-5 justify-center items-center max-w-[500px]">

                            <span className="text-2xl flex align-middle font-semibold">Корзина пуста</span>
                            <Button onClick={() => navigate('/catalog')}>Перейти в каталог</Button>

                        </div>
                    )

                }
            </div>
        </>
    )
}

export default Cart