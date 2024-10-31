import { Outlet } from "react-router-dom"
import Header from "../Header/Header"

function Layout() {

    return (
        <>
            <Header />
            <>
                <Outlet />
            </>
            {/* <Footer /> */}
        </>
    )
}

export default Layout
