'use client';
import { useClerk } from '@clerk/nextjs';
import Button from './button';

const SignOutButton: React.FC = () => {
    const { signOut } = useClerk();

    return (
        <Button onClick={() => signOut()} intent="secondary">
            Sign Out
        </Button>
    );
};

export default SignOutButton;
