import { paginationRange } from "@/lib/paginationRange"
import { cn } from "@/lib/utils"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination"

const PaginationComponent = ({ totalPage, page, siblings, setPage }) => {
    let array = paginationRange(totalPage, page + 1, siblings)
    return (
        <Pagination className='select-none'>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => { setPage(page - 1) }}
                        className={`cursor-pointer ${page === 0 ? 'pointer-events-none opacity-50' : ''}`} />
                </PaginationItem>
                {array.map((v, idx) =>
                    <PaginationItem key={idx}>
                        {v === '...' ?
                            (
                                <PaginationEllipsis className={cn('w-10 h-10')} />
                            )
                            :
                            (
                                <PaginationLink
                                    className={`cursor-pointer ${v - 1 === page ? 'bg-accent' : ''}`}
                                    onClick={() => setPage(v - 1)}
                                >
                                    {v}
                                </PaginationLink>
                            )
                        }
                    </PaginationItem>
                )}
                <PaginationItem >
                    <PaginationNext
                        className={`cursor-pointer ${page === totalPage - 1 && 'pointer-events-none opacity-50'}`}
                        onClick={() => { setPage(page + 1) }} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>

    )
}

export default PaginationComponent