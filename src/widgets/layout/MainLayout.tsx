import { Outlet } from "react-router-dom";
import { Header } from "@/widgets/header";
import { Sidebar } from "@/widgets/sidebar";
import { Footer } from "@/widgets/footer";


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