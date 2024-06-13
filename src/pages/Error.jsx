import { MonitorXIcon } from "lucide-react"

const ErrorPage = () => {
    return (
        <div className="flex h-3/4 flex-col gap-5 justify-center items-center max-w-[500px] m-auto">
            <MonitorXIcon className="h-10 w-10" />
            <span className="text-2xl font-semibold">Oops...</span>
            <span className="text-xl text-balance text-center font-medium">Unfortunately, something is not working right now</span>
            <span className="text-xl text-balance text-center font-medium">Please, try again later</span>
        </div>
    )
}

export default ErrorPage