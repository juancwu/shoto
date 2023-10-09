'use client';

export type TextInputOnChange = (
    e: React.ChangeEvent<HTMLInputElement>
) => void;

type TextInputProps = {
    type?: 'text' | 'email' | 'password';
    id?: string;
    prefix?: string;
    placeholder?: string;
    required?: boolean;
    label: string;
    name: string;
    value: string;
    onChange: TextInputOnChange;
};

const TextInput: React.FC<TextInputProps> = ({
    value,
    onChange,
    label,
    id,
    name,
    required,
    prefix,
    placeholder,
    type = 'text',
}) => {
    return (
        <div>
            <label
                htmlFor={id}
                className="block text-sm font-medium leading-6 text-white"
            >
                {label}
            </label>
            <div className="mt-2 flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                {prefix && (
                    <span className="flex flex-shrink-0 select-none items-center pl-3 text-zinc-400">
                        {prefix}
                    </span>
                )}
                <input
                    required={required}
                    value={value}
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    id={id}
                    className="flex-1 rounded-md border-0 bg-transparent px-2 py-1.5 text-white focus:ring-0 focus-visible:outline-none sm:text-sm sm:leading-6"
                    onChange={onChange}
                />
            </div>
        </div>
    );
};

export default TextInput;
