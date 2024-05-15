import { Outlet } from "react-router-dom";
import { Toaster } from "./ui/toaster";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
    return (
        <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex flex-1 border-b">
                <div className="py-6 container relative">
                    <Outlet />
                </div>
            </main>
            <Toaster />
            <Footer />
        </div>

    )
}

export default Layout