import axios, { axiosPrivate } from "@/api/axios"
import Loader from "@/components/Loader"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import errorToast from "@/lib/errorToast"
import useViewNavigate from "@/lib/hooks/viewNavigate"
import transition from "@/lib/transition"
import { CanceledError } from "axios"
import { useEffect, useState } from "react"
import { flushSync } from "react-dom"
import { useParams } from "react-router-dom"

const Product = () => {
    const navigate = useViewNavigate()
    const { id } = useParams()
    const [product, setProduct] = useState({})
    const [isLoading, setLoading] = useState(true)

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
                transition(() => {
                    flushSync(() => {
                        event.target.innerText = 'Add to cart'
                        event.target.disabled = false
                    })
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
                if (err instanceof CanceledError)
                    return
                if (err.response.status !== 404) {
                    errorToast()
                    navigate('/error', { replace: true })
                }
                else
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
                                <img className='h-full rounded-xl' src={product?.imgUrl ?? '/furniture.png'} alt={`${product?.title} image`} />
                            </Card>
                            <Badge variant='secondary' className='w-fit'>{product?.category.toUpperCase()}</Badge>

                            <p className="text-lg sm:text-xl font-semibold text-secondary-foreground tracking-tight ">
                                {product?.description}
                            </p>

                            <span className="text-lg sm:text-xl font-semibold tracking-tight">
                                USD ${product?.price}
                            </span>

                            <Button className='w-fit' onClick={(e) => { addToCart(e, product.id) }}>
                                Add to cart
                            </Button>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default Product