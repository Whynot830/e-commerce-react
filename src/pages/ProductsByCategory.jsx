import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import transition from "@/lib/transition"
import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

const ProductsByCategory = () => {
    const [isLoading, setLoading] = useState(true)
    const [products, setProducts] = useState([])
    const location = useLocation()
    
    const currentCategory = location.pathname.split('/')[0]
    console.log();
    console.log(currentCategory);
    useEffect(() => {
        const fetchProductsByCategory = async (category) => {
            const response = await axios.get(`/products?category=${category}`)
            console.log(response)
            if (response.status === 200) {
                return response.data
                // transition(() => {
                //     setProducts(response.data.products)
                //     setLoading(false)
                // })
                // console.log(response.data)
            }
            // return []
        }
        fetchProductsByCategory(currentCategory).then((data) => {
            transition(() => {
                setLoading(false)
                setProducts(data.products)
            })
        }).catch((err) => { console.log(err) })
        // fetchProductsByCategory(currentCategory)
    }, [])
    return (
        <>
            {/* {isLoading && <h2>Loading...</h2>}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

                {products.map(product =>
                    <Card key={product.id}>
                        <div className="flex h-full flex-col justify-between">
                            <CardHeader className='p-4'>
                                <CardTitle className='flex justify-center'>
                                    <img className='w-[300px]' src="/123.png" />
                                </CardTitle>
                                <CardDescription className=' !mt-5'>
                                    {product.title}
                                </CardDescription>
                            </CardHeader>
                            <div>
                                <CardContent className='p-4'>
                                     USD ${product.price}
                                </CardContent>
                                <CardFooter className='p-4'>
                                    <Button>
                                        Add to cart
                                    </Button>
                                </CardFooter>

                            </div>

                        </div>
                    </Card>
                )}
            </div> */}

        </>
    )
}

export default ProductsByCategory