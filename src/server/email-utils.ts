import { Resend } from 'resend';
import { CreateEmailOptions } from 'resend/build/src/emails/interfaces';
import { db } from './db';
import { emails as emailsTable } from './schema';

export const resend = new Resend(process.env.EMAIL_API_KEY as string);

export async function sendEmail(createEmailOptions: CreateEmailOptions) {
    try {
        const data = await resend.emails.send(createEmailOptions);

        console.log(`Email sent. ID: ${data.id}`);

        return true;
    } catch (error: any) {
        console.log('Error sending email: ', error.message);
        return false;
    }
}

export async function getEmail(id: string) {
    try {
        const email = await resend.emails.get(id);
        return email;
    } catch (error: any) {
        console.log('Error getting email: ', error.message);
        return null;
    }
}

export async function getAllEmailRef() {
    try {
        const emails = await db.select().from(emailsTable).all();

        return emails;
    } catch (error: any) {
        console.log('Error getting all email ref: ', error.message);
        return [];
    }
}
