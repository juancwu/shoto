import NewShoto from '@/components/client/new-shoto';
import DropDownMenu from '@/components/client/dropdown-menu';

export default async function Home() {
    return (
        <>
            <nav className="flex justify-end border-b border-b-white/10 py-6">
                <DropDownMenu />
            </nav>
            <div className="flex justify-center">
                <div className="flex-grow py-6 pt-12 md:max-w-xl md:py-16 md:pt-6">
                    <h1 className="text-md text-center text-zinc-200 md:text-xl">
                        Make your URLs shorter!
                    </h1>
                    <div className="pt-12">
                        <NewShoto />
                    </div>
                </div>
            </div>
            <div className="relative">
                <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                >
                    <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center">
                    <span className="bg-zinc-900 px-2 text-sm text-zinc-400">
                        Your Shotos
                    </span>
                </div>
            </div>
        </>
    );
}
