import { LoaderIcon } from "lucide-react"

const Loader = () => {
    return (
        <div className="absolute inset-0 bottom-20 flex justify-center items-center">
            <LoaderIcon className="animate-spin h-[15%] w-[15%]" />
        </div>
    )
}

export default Loader