export const Avatar = ({ initials }: {initials: string}) => {
    return (
        <div className="relative flex h-20 w-20 shrink-0 overflow-hidden items-center justify-center rounded-full dark:bg-neutral-800 bg-neutral-200">
            <p className="text-2xl text-neutral-800 dark:text-neutral-200 font-bold">{initials}</p>
        </div>
    )
}