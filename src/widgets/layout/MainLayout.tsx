import { Outlet } from "react-router-dom";
import { Footer, Header, Sidebar } from "@/widgets";

export function MainLayout() {

    return (
        <>
            <Header />
            <section>
                <Sidebar />
                <Outlet />
            </section>
            <Footer />
        </>
    );
};