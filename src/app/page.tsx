import NewShoto from './new-shoto';

export default function Home() {
    return (
        <main className="flex h-full w-full justify-center px-6 md:px-32">
            <div className="h-full flex-grow py-6 md:max-w-xl md:py-32">
                <h1 className="text-md text-center text-zinc-200 md:text-xl">
                    Make your URLs shorter!
                </h1>
                <div className="pt-12">
                    <NewShoto />
                </div>
            </div>
        </main>
    );
}
