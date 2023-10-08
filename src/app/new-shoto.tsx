'use client';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/20/solid';
import TextInput from '@/components/client/text-input';
import Button from '@/components/client/button';
import { useCallback, useState } from 'react';

const NewShoto: React.FC = () => {
    const [shoto, setShoto] = useState('');
    const [originalURL, setOriginalURL] = useState('');
    const [errors, setErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

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
                const content = await res.text();
                setErrors(content.split('\n'));
            } else {
                setSuccess(true);
                setErrors([]);
                reset();
            }
        } catch (error: any) {
            console.log('error', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-y-6">
            {errors.length > 0 && (
                <div className="rounded-md border-2 border-red-400 bg-red-950 p-4">
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-200">
                            Not Allowed!
                        </h3>
                        <div className="mt-2 text-sm text-red-200">
                            <ul
                                role="list"
                                className="list-disc space-y-1 pl-5"
                            >
                                {errors.map((error) => (
                                    <li key={error}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
            {success && (
                <div className="rounded-md border-2 border-green-400 bg-green-950 p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <CheckCircleIcon
                                className="h-5 w-5 text-green-400"
                                aria-hidden="true"
                            />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-green-400">
                                {`Successfully created new shoto: ${shoto}`}
                            </p>
                        </div>
                        <div className="ml-auto pl-3">
                            <div className="-mx-1.5 -my-1.5">
                                <button
                                    type="button"
                                    className="inline-flex rounded-md bg-green-400 p-1.5 text-green-900 hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-green-950"
                                    onClick={() => setSuccess(false)}
                                >
                                    <span className="sr-only">Dismiss</span>
                                    <XMarkIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="flex flex-col gap-y-6 border-b border-white/10 pb-12">
                <TextInput
                    value={shoto}
                    id="shotourl"
                    label="Shoto URL"
                    name="shoto"
                    prefix="shoto.sh/l/"
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
