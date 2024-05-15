import ViewTransitionLink from "@/components/ViewTransitionLink"
import { Button } from "@/components/ui/button"
import { MonitorXIcon } from "lucide-react"

const NotFound = () => {
    return (

        <div className="flex h-3/4 flex-col gap-5 justify-center items-center max-w-[500px] m-auto">
            <MonitorXIcon className="h-10 w-10" />
            <span className="text-2xl font-semibold">Упс!</span>
            <span className="text-xl text-balance text-center font-semibold">К сожалению, здесь ничего нет...</span>
            <Button><ViewTransitionLink to={'/'}>На главную</ViewTransitionLink></Button>
        </div>
    )
}

export default NotFound