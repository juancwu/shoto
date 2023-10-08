import clerkFormStyles from '@/components/styles/clerk-auth.styles';
import { SignIn } from '@clerk/nextjs';

export default function Page() {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <SignIn
                appearance={{
                    variables: {
                        colorText: 'white',
                    },
                    elements: clerkFormStyles,
                }}
            />
        </div>
    );
}
