import NewShoto from './new-shoto';
import SignOutButton from '@/components/client/sign-out-button';

export default function Home() {
    return (
        <main className="h-full w-full px-6 md:px-32">
            <nav className="flex justify-end py-6">
                <SignOutButton />
            </nav>
            <div className="flex h-full w-full justify-center">
                <div className="h-full flex-grow py-6 pt-12 md:max-w-xl md:py-32 md:pt-6">
                    <h1 className="text-md text-center text-zinc-200 md:text-xl">
                        Make your URLs shorter!
                    </h1>
                    <div className="pt-12">
                        <NewShoto />
                    </div>
                </div>
            </div>
        </main>
    );
}
