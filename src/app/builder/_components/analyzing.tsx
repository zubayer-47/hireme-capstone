import { Blocks } from 'react-loader-spinner'

export const Analyzing = () => {
    return (
        <div className="flex flex-col items-center gap-2">
            <Blocks
                height="80"
                width="80"
                color="#2E66E5"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                visible={true}
            />
            <p className="dark:text-neutral-300 text-neutral-700 text-lg animate-pulse">Analyzing...</p>
        </div>
    )
}