"use client";

import { Card } from "@/components/card";
import { DynamicInput } from "@/components/dynamic-input";
import { useCoverLetterStore } from "@/store/cover-letter-store";

export const RecruiterInfoForm = () => {
    const { recruiterInfo, setRecruiterInfo } = useCoverLetterStore();

    return (
        <Card>
            <aside className="grid gap-2">
                <DynamicInput
                    id="name"
                    type="text"
                    labelName="Full Name"
                    value={recruiterInfo.name}
                    placeholder="Jenny Johnson"
                    onChange={(e) => { setRecruiterInfo("name", e.target.value) }}
                />
            </aside>
            <aside className="grid gap-2">
                <DynamicInput
                    id="role"
                    type="text"
                    labelName="Job RecruiterTitle"
                    value={recruiterInfo.title}
                    placeholder="Human Resource"
                    onChange={(e) => { setRecruiterInfo("title", e.target.value) }}
                />
            </aside>
            <aside className="grid gap-2">
                <DynamicInput
                    id="companyName"
                    type="text"
                    labelName="Company Name"
                    value={recruiterInfo.companyName}
                    placeholder="Apple"
                    onChange={(e) => { setRecruiterInfo("companyName", e.target.value) }}
                />
            </aside>

            <aside className="grid grid-cols-2 gap-4">
                <aside className="grid gap-2">
                    <DynamicInput
                        id="address"
                        type="text"
                        labelName="Address"
                        value={recruiterInfo.address}
                        placeholder="55 Bixby Way"
                        onChange={(e) => { setRecruiterInfo("address", e.target.value) }}
                    />
                </aside>
                <aside className="grid gap-2">
                    <DynamicInput
                        id="cityStateCode"
                        type="text"
                        labelName="City | State | Code"
                        value={recruiterInfo.cityStateZip}
                        placeholder="Manchester, NH 40344"
                        onChange={(e) => { setRecruiterInfo("cityStateZip", e.target.value) }}
                    />
                </aside>
            </aside>
        </Card>
    )
}