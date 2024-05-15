import { LoaderCircle } from "lucide-react"

const Loader = () => {
    return (
        <div className="absolute inset-0 bottom-20 flex justify-center items-center">
            <LoaderCircle className="animate-spin h-1/6 w-1/6" />
        </div>
    )
}

export default Loader