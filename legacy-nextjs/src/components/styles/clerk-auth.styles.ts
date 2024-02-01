import buttonStyles from '@/components/styles/button.styles';

const clerkFormStyles = {
    formButtonPrimary: buttonStyles({ intent: 'primary' }),
    card: 'bg-white/5 shadow-md',
    formHeaderTitle: 'text-white',
    formFieldLabel: 'text-zinc-400',
    formFieldInput:
        'bg-white/5 px-2 py-1.5 text-white focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500 focus-visible:outline-none sm:text-sm sm:leading-6 border-1 border-white/10',
    formHeaderSubtitle: 'text-white',
    headerSubtitle: 'text-zinc-400',
    headerTitle: 'text-white',
    socialButtonsIconButton: 'bg-white',
    socialButtonsBlockButton: 'bg-white/5 border-1 border-white/10 text-white',
    alert: 'border-2 border-red-400 bg-red-950',
    alertText: 'text-red-200',
    footerActionText: 'text-white',
    footerActionLink: 'text-sky-400 hover:text-sky-300',
    formFieldWarningText: 'text-yellow-400',
    formFieldErrorText: 'text-red-400',
    dividerLine: 'bg-zinc-400',
    dividerText: 'text-zinc-400',
    formFieldInputShowPasswordIcon: 'text-zinc-400',
    formFieldHintText: 'text-zinc-400',
    formFieldInfoText: 'text-sky-400',
    formFieldSuccessText: 'text-green-400',
    providerIcon__github: {
        filter: 'invert(1)',
    },
};

export default clerkFormStyles;
