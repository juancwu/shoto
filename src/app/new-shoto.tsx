'use client';
import { useCallback, useState } from 'react';
import TextInput from '@/components/client/text-input';
import Button from '@/components/client/button';
import ErrorAlert from '@/components/client/error-alert';
import SuccessAlert from '@/components/client/success-alert';
import { flushSync } from 'react-dom';

const NewShoto: React.FC = () => {
    const [shoto, setShoto] = useState('');
    const [originalURL, setOriginalURL] = useState('');
    const [errors, setErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [newShoto, setNewShoto] = useState('');

    const reset = useCallback(() => {
        setShoto('');
        setOriginalURL('');
    }, []);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (loading) return;

        const spaceRegex = /\s+/g;

        if (spaceRegex.test(shoto)) {
            setErrors(["Shoto URL can't include any white spaces"]);
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('/api/shoto', {
                method: 'POST',
                body: JSON.stringify({ name: shoto, url: originalURL }),
            });

            if (res.status !== 201) {
                const data = await res.json();
                setErrors(data?.errors ?? ['An Error Occured']);
            } else {
                flushSync(() => {
                    setSuccess(true);
                    setErrors([]);
                    setNewShoto(shoto);
                    reset();
                });
            }
        } catch (error: any) {
            console.log('error', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-y-6">
            <ErrorAlert
                show={errors.length > 0}
                errors={errors}
                title="Oops, this is not good."
            />
            <SuccessAlert show={success} onDimiss={() => setSuccess(false)}>
                <p className="text-green-400">
                    New Shoto Created! Try it out now!
                    <a
                        className="mt-2 block font-bold text-blue-400 hover:underline"
                        href={`/l/${newShoto}`}
                    >{`https://shoto.at/l/${newShoto}`}</a>
                </p>
            </SuccessAlert>
            <div className="flex flex-col gap-y-6 border-b border-white/10 pb-12">
                <TextInput
                    value={shoto}
                    id="shotourl"
                    label="Shoto URL"
                    name="shoto"
                    prefix="shoto.at/l/"
                    onChange={(e) => setShoto(e.target.value)}
                    required={true}
                />
                <TextInput
                    value={originalURL}
                    id="originalurl"
                    label="Original URL"
                    name="url"
                    onChange={(e) => setOriginalURL(e.target.value)}
                    required={true}
                />
            </div>
            <div className="flex items-center justify-end gap-x-6">
                <Button
                    type="reset"
                    intent="secondary"
                    onClick={reset}
                    disabled={loading}
                >
                    Clear
                </Button>
                <Button
                    disabled={
                        loading || shoto.length < 1 || originalURL.length < 1
                    }
                    type="submit"
                    intent="primary"
                >
                    Save
                </Button>
            </div>
        </form>
    );
};

export default NewShoto;
