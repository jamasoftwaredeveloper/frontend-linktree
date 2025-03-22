import { Link, Navigate, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import NavigationTabs from "../components/NavigationTabs";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/DevTreeAPI";
import Header from "../components/Header";

export default function AppLayout() {

    const { data, isLoading, isError } = useQuery({
        queryFn: getUser,
        queryKey: ['getUser'],
        retry: 1,
        refetchOnWindowFocus: true

    });

    if (isLoading) {
        return "Cargando...";
    }
    if (isError) {
        return <Navigate to={'/auth/login'} />
    }

    if (data) return <Header data={data}/>
}