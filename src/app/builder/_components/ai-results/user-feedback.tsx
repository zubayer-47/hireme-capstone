import { UserFeedback as UserFeedbackType } from "../../_types/ai-result-type"

export const UserFeedback = ({ userFeedback }: { userFeedback: UserFeedbackType}) => {
    return (
        <>
        <h3 className="mt-6 text-lg font-semibold">User Feedback</h3>
            <h4 className="mt-4 text-md font-semibold">Matching Elements</h4>
            <ul className="list-disc pl-5">
                {userFeedback.matchingElements.length > 0 ? (
                    userFeedback.matchingElements.map((element, index) => (
                        <li key={index}>{element}</li>
                    ))
                ) : (
                    <li>None</li>
                )}
            </ul>
            <h4 className="mt-4 text-md font-semibold">Missing Elements</h4>
            <ul className="list-disc pl-5">
                {userFeedback.missingElements.map((element, index) => (
                    <li key={index}>{element}</li>
                ))}
            </ul>
            <h4 className="mt-4 text-md font-semibold">Suggestions</h4>
            <ul className="list-disc pl-5">
                {userFeedback.suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                ))}
            </ul>
            </>
    )
}