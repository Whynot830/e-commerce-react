import { CopyrightIcon } from "lucide-react"

const Footer = () => {
    return (
        <footer className="flex justify-between">
            <div className="container flex py-3 min-h-14 max-w-screen-2xl justify-center sm:justify-between gap-4 sm:items-center">
                <p className="flex items-center text-sm font-medium ">
                    <CopyrightIcon size={14} className="mr-1" /> 2024 &mdash; Все права защищены
                </p>
                {/* <ul className="sm:flex space-y-2 sm:space-x-5 sm:space-y-0 text-sm font-medium">
                    <li><a href="">Terms</a></li>
                    <li><a href="">Privacy Policy</a></li>
                    <li><a href="">Cookie Policy</a></li>
                </ul> */}
            </div>

        </footer>
    )
}

export default Footer