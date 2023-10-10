import { auth, clerkClient } from '@clerk/nextjs';

export async function DELETE() {
    try {
        const { userId } = auth();

        if (!userId) {
            return new Response('Unauthorized', { status: 401 });
        }

        await clerkClient.users.deleteUser(userId);
        console.log(`User account with ID: ${userId} has been deleted.`);
    } catch (error: any) {
        console.error('Error deleting user account: ', error);
        return new Response('Error Occurred', { status: 500 });
    }

    return new Response('Account deleted', { status: 200 });
}
