"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { Loader2, User, Wrench } from "lucide-react"
import StudentDashboardPage from "./student"

export default function DashboardPage() {
    const { data: session, isPending } = authClient.useSession()
    const router = useRouter()

    useEffect(() => {
        if (!isPending && !session) {
            router.push("/signin")
        }
    }, [session, isPending, router])

    if (isPending) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        )
    }

    if (!session) {
        return null
    }

    return <StudentDashboardPage session={session} />
}