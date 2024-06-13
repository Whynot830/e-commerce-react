import { axiosPrivate } from "@/api/axios"
import useViewNavigate from "@/lib/hooks/viewNavigate"
import transition from "@/lib/transition"
import { flushSync } from "react-dom"
import { useLocation } from "react-router-dom"
import ViewTransitionLink from "./ViewTransitionLink"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { ToastAction } from "./ui/toast"
import { toast } from "./ui/use-toast"

const CatalogCard = ({ product }) => {
    const navigate = useViewNavigate()
    const location = useLocation()

    const addToCart = async (event, productId) => {
        transition(() => {
            event.target.innerText = 'Loading...'
            event.target.disabled = true
        })
        try {
            await axiosPrivate.post(`/cart/items?productId=${productId}`, {}, {
                validateStatus: (status) => status === 200
            })
            event.target.innerText = 'Added'
            toast({
                title: 'Product added to cart'
            })
        } catch (err) {
            transition(() => {
                flushSync(() => {
                    event.target.innerText = 'Add to cart'
                    event.target.disabled = false
                })
            })
            if (err.response?.status === 401)
                toast({
                    title: 'Authentication required',
                    description: 'To add products to cart',
                    action: <ToastAction className="" altText="Sign in" onClick={() => {
                        navigate('/login', { state: { from: location } })
                    }}>Sign in</ToastAction>
                })
        }
    }

    return (
        <Card className="flex flex-col w-full border-none">
            <CardHeader className='p-4'>
                <CardTitle className="text-base flex items-center">
                    <p className='text-nowrap overflow-hidden text-ellipsis'>
                        {product?.title ?? "Coming soon!"}
                    </p>
                </CardTitle>

                <CardDescription>
                    <ViewTransitionLink disabled={!product} to={`/catalog/${product?.category}/${product?.id}`}>
                        <span className=' underline-offset-4 hover:underline'>
                            See more details
                        </span>
                    </ViewTransitionLink>
                </CardDescription>


            </CardHeader>
            <CardContent className='p-4 pt-0 flex justify-center items-end' >
                <div className=" flex h-[120px] sm:h-[150px] w-full justify-center">
                    <img className='h-full' src={product?.imgUrl ?? '/furniture.png'} alt={`${product?.title} image`} />
                </div>
            </CardContent>
            <CardFooter className='p-4 flex flex-wrap justify-between gap-3'>

                <span className="text-muted-foreground">{product ? `$${product?.price}` : 'N/A'} </span>
                <Button disabled={!product} onClick={(e) => { addToCart(e, product?.id) }}>
                    Add to cart
                </Button>
            </CardFooter>
        </Card>
    )
}

export default CatalogCard