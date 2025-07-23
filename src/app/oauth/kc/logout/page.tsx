import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function KcLogout() {
    const router = useRouter();
    useEffect(() => {
        router.push('/login');
    }, []);
    return null;
}