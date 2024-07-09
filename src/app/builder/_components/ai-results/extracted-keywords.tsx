import { ExtractedKeywords as ExtractedKeywordsType } from '../../_types/ai-result-type';

export const ExtractedKeywords = ({ extractedKeywords }: { extractedKeywords: ExtractedKeywordsType }) => {

    return (
        <>
            <h3 className="mt-6 text-lg font-semibold">Extracted Keywords</h3>
            <h4 className="mt-4 text-md font-semibold">High Importance</h4>
            <ul className="list-disc pl-5">
                {extractedKeywords.highImportance.map((keywordObj, index) => (
                    <li key={index}>{keywordObj}</li>
                ))}
            </ul>
            <h4 className="mt-4 text-md font-semibold">Medium Importance</h4>
            <ul className="list-disc pl-5">
                {extractedKeywords.mediumImportance.map((keywordObj, index) => (
                    <li key={index}>{keywordObj}</li>
                ))}
            </ul>
            <h4 className="mt-4 text-md font-semibold">Low Importance</h4>
            <ul className="list-disc pl-5">
                {extractedKeywords.lowImportance.map((keywordObj, index) => (
                    <li key={index}>{keywordObj}</li>
                ))}
            </ul>
        </>
    )
}