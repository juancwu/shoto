import { createShoto } from './actions';
import TextInput from '@/components/server/text-input';
import { getButtonStyles } from '@/components/styles/button.styles';

export default function NewShoto() {
    return (
        <form action={createShoto} className="flex flex-col gap-y-6">
            <div className="flex flex-col gap-y-6 border-b border-white/10 pb-12">
                <TextInput
                    id="shotourl"
                    label="Shoto URL"
                    name="shoto"
                    prefix="shoto.at/l/"
                    defaultValue=""
                    required={true}
                    aria-describedby="shoto-url-description-1 shoto-url-description-2 shoto-url-description-3"
                />
                <p className="text-sm leading-6" id="shoto-url-description-1">
                    Choose a custom keyword for your Shoto URL
                </p>
                <p className="text-sm leading-6" id="shoto-url-description-2">
                    For example: shoto.at/l/
                    <span className="font-bold text-white">my-shoto</span>
                </p>
                <p className="text-sm leading-6" id="shoto-url-description-3">
                    Now when you type{' '}
                    <span className="font-bold text-white">
                        shoto.at/l/my-shoto
                    </span>{' '}
                    in a browser, it will open the original URL
                </p>
                <TextInput
                    id="originalurl"
                    label="Original URL"
                    name="url"
                    required={true}
                    defaultValue=""
                    aria-describedby="original-url-description"
                />
                <p className="text-sm leading-6" id="original-url-description">
                    Original URL must start with{' '}
                    <span className="font-bold text-white">http://</span> or{' '}
                    <span className="font-bold text-white">https://</span>
                </p>
            </div>
            <div className="flex items-center justify-end gap-x-6">
                <button
                    type="reset"
                    className={getButtonStyles({ intent: 'clear' })}
                >
                    Clear
                </button>
                <button
                    type="submit"
                    className={getButtonStyles({ intent: 'primary' })}
                >
                    Save
                </button>
            </div>
        </form>
    );
}
