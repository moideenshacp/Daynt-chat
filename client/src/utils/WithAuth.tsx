"use client"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

const withAuth = <P extends object>(WrappedComponent: React.FC<P>) => {
  return function ProtectedComponent(props: P) {
    const { isAuthenticated } = useSelector((state: RootState) => state.user);
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (!isAuthenticated) {
        router.replace("/auth/signin"); // Redirect to sign-in if not authenticated
      } else {
        setLoading(false);
      }
    }, [isAuthenticated, router]);

    if (loading || !isAuthenticated) return null; // Prevents flicker before redirect

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
