import { Blocks } from 'react-loader-spinner'

export const Analyzing = () => {
    return (
        <div className="flex flex-col space-y-4">
            <Blocks
                height="100"
                width="100"
                color="#2E66E5"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                visible={true}
            />
            <p className="dark:text-neutral-300 text-neutral-700 text-xl animate-pulse">Analyzing...</p>
        </div>
    )
}