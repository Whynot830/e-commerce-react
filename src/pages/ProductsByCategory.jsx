import axios from "@/api/axios"
import CatalogCard from "@/components/CatalogCard"
import Loader from "@/components/Loader"
import PaginationComponent from "@/components/Pagination"
import Combobox from "@/components/ui/Combobox"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import errorToast from "@/lib/errorToast"
import useViewNavigate from "@/lib/hooks/viewNavigate"
import transition from "@/lib/transition"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

const ProductsByCategory = () => {
    const location = useLocation()
    const navigate = useViewNavigate()

    const [isLoading, setLoading] = useState(true)
    const [products, setProducts] = useState([])
    const [query, setQuery] = useState('')
    const searchedProducts = products.filter(p => p.title.toLowerCase().includes(query.toLowerCase()))

    const sortStrategies = [{ name: 'Title', value: 'title' }, { name: 'Price', value: 'price' }]
    const sortOrders = [{ name: 'Ascending', value: 'asc' }, { name: 'Descending', value: 'desc' }]

    const [page, setPage] = useState(0)
    const [sort, setSort] = useState(sortStrategies[0])
    const [order, setOrder] = useState(sortOrders[0])
    const [totalPages, setTotalPages] = useState(null)

    const encodedCategory = location.pathname.split('/')[2]
    const decodedCategory = decodeURIComponent(encodedCategory)

    useEffect(() => {
        const fetchProductsByCategory = async () => {
            const response = await axios.get(`/products?category=${decodedCategory}&page=${page}&limit=12&sort=${sort.value}&order=${order.value}`)
            if (response.status === 200) {
                return response.data
            }
        }
        fetchProductsByCategory().then((data) => {
            transition(() => {
                setLoading(false)
                setProducts(data.products)
                setTotalPages(data.totalPages)
            })
        }).catch((err) => {
            console.log(err)
            setLoading(false)
            errorToast()
        })
    }, [page, decodedCategory, sort, order])
    return (
        <>
            {isLoading
                ? <Loader />
                : (
                    <div className="h-full flex flex-col items-center">
                        <Card className="flex flex-col items-start mx-auto w-full max-w-[400px] sm:max-w-[600px]
                        sm:grid grid-cols-3 bg-card p-4 gap-y-3 sm:items-center rounded-lg text-secondary-foreground font-semibold">
                            <h3>Search by title</h3>
                            <Input placeholder='Start by typing title...' className='col-span-2' onChange={(e) => transition(() => setQuery(e.target.value))} />
                            <h3>Sort by</h3>
                            <Combobox value={sort.name} setValue={setSort} data={sortStrategies} caption={`${sort.name}`} />
                            <Combobox value={order.name} setValue={setOrder} data={sortOrders} caption={`${order.name}`} />
                        </Card>
                        {searchedProducts.length !== 0 && (
                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
                                            xl:grid-cols-4 gap-4 justify-items-center flex-1 w-fit">
                                {searchedProducts.map(product =>
                                (
                                    <div key={product.id} className="w-full max-w-[400px]">
                                        <CatalogCard product={product} />
                                    </div>
                                )
                                )}

                                {totalPages && (
                                    <Card className="col-span-full self-end">
                                        <CardContent className='p-2'>
                                            <PaginationComponent totalPage={totalPages} page={page} limit={1} siblings={1} setPage={setPage} />
                                        </CardContent>
                                    </Card>
                                )}
                            </div>

                        )}
                        {products.length !== 0 && searchedProducts.length === 0 && (
                            <div className="mt-20 flex flex-col justify-center items-center gap-y-5">
                                <h2 className="text-center text-lg sm:text-xl text-secondary-foreground font-semibold tracking-tight">No product matches query...</h2>
                                <h2 className="text-center sm:text-lg text-secondary-foreground font-semibold tracking-tight">Try searching in other categories!</h2>
                                <Button onClick={() => navigate('/catalog')}>To categories</Button>
                            </div>
                        )}
                        {products.length === 0 && (
                            <div className="absolute inset-0 flex flex-col bottom-20 justify-center items-center gap-y-5">
                                <h2 className="text-center text-lg sm:text-xl text-secondary-foreground font-semibold tracking-tight">There are no products in category &apos;{decodedCategory}&apos; yet...</h2>
                                <h2 className="text-center sm:text-lg text-secondary-foreground font-semibold tracking-tight">Try searching in other categories!</h2>
                                <Button onClick={() => navigate('/catalog')}>To categories</Button>
                            </div>
                        )}
                    </div>
                )}
        </>
    )
}

export default ProductsByCategory