import { SignUp } from '@clerk/nextjs';
import clerkFormStyles from '@/components/styles/clark-auth.styles';

export default function Page() {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <SignUp
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
