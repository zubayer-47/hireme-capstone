import { ExtractedKeywords as ExtractedKeywordsType } from '../../_types/ai-result-type';

export const ExtractedKeywords = ({ extractedKeywords }: { extractedKeywords: ExtractedKeywordsType }) => {

    return (
        <>
            <h3 className="mt-6 text-lg font-semibold">Extracted Keywords</h3>
            <h4 className="mt-4 text-md font-semibold">High Importance</h4>
            <ul className="list-disc pl-5">
                {extractedKeywords.high_importance.map((keywordObj, index) => (
                    <li key={index}>{keywordObj.keyword}</li>
                ))}
            </ul>
            <h4 className="mt-4 text-md font-semibold">Medium Importance</h4>
            <ul className="list-disc pl-5">
                {extractedKeywords.medium_importance.map((keywordObj, index) => (
                    <li key={index}>{keywordObj.keyword}</li>
                ))}
            </ul>
            <h4 className="mt-4 text-md font-semibold">Low Importance</h4>
            <ul className="list-disc pl-5">
                {extractedKeywords.low_importance.map((keywordObj, index) => (
                    <li key={index}>{keywordObj.keyword}</li>
                ))}
            </ul>
        </>
    )
}