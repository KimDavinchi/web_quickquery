"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { parseParameters, interpolateQuery, type PlaceholderType } from "@/lib/logic/queryInterpolator";

export function QueryInterpolator() {
    const [sqlInput, setSqlInput] = useState("");
    const [paramsInput, setParamsInput] = useState("");
    const [output, setOutput] = useState("");
    const [placeholderType, setPlaceholderType] = useState<PlaceholderType>("question");
    const [addQuotes, setAddQuotes] = useState(true);

    const handleConvert = () => {
        if (!sqlInput.trim()) {
            toast.error("Please enter SQL query");
            return;
        }

        const params = parseParameters(paramsInput);
        const result = interpolateQuery(sqlInput, params, placeholderType, addQuotes);
        setOutput(result);
        toast.success(`Replaced ${params.length} parameters`);
    };

    const handleCopy = async () => {
        if (!output) {
            toast.error("No content to copy");
            return;
        }
        await navigator.clipboard.writeText(output);
        toast.success("Copied to clipboard! ✓");
    };

    const handleClear = () => {
        setSqlInput("");
        setParamsInput("");
        setOutput("");
    };

    const placeholderTypes: { value: PlaceholderType; label: string }[] = [
        { value: "question", label: "? (JDBC)" },
        { value: "sqlserver", label: "@p0 (SQL Server)" },
        { value: "oracle", label: ":1 (Oracle)" },
    ];

    return (
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                    <span className="text-2xl">🔗</span> Query Interpolator
                </CardTitle>
                <CardDescription className="text-slate-400">
                    Replace placeholders (?, @p0, :1) with actual parameter values.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Input */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">SQL Query</label>
                            <Textarea
                                placeholder="SELECT * FROM users WHERE id = ? AND status = ?"
                                value={sqlInput}
                                onChange={(e) => setSqlInput(e.target.value)}
                                className="h-32 bg-slate-950 border-slate-700 text-slate-100 font-mono text-sm placeholder:text-slate-400 resize-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Parameters (one per line)</label>
                            <Textarea
                                placeholder={`123
active
2024-01-01`}
                                value={paramsInput}
                                onChange={(e) => setParamsInput(e.target.value)}
                                className="h-28 bg-slate-950 border-slate-700 text-slate-100 font-mono text-sm placeholder:text-slate-400 resize-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Options */}
                    <div className="space-y-4">
                        <label className="text-sm font-medium text-slate-300">Options</label>
                        <div className="space-y-4 p-4 bg-slate-900/30 rounded-lg border border-slate-700/50">
                            {/* Placeholder Type */}
                            <div className="space-y-2">
                                <span className="text-sm text-slate-400">Placeholder Type</span>
                                <div className="flex flex-col gap-2">
                                    {placeholderTypes.map((type) => (
                                        <Button
                                            key={type.value}
                                            size="sm"
                                            variant={placeholderType === type.value ? "default" : "outline"}
                                            onClick={() => setPlaceholderType(type.value)}
                                            className={`w-full justify-start ${placeholderType === type.value ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                                        >
                                            {type.label}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            {/* Add Quotes */}
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-400">Add quotes to values</span>
                                <button
                                    onClick={() => setAddQuotes(q => !q)}
                                    className={`w-12 h-6 rounded-full transition-colors ${addQuotes ? 'bg-blue-600' : 'bg-slate-600'}`}
                                >
                                    <span className={`block w-5 h-5 bg-white rounded-full transition-transform ${addQuotes ? 'translate-x-6' : 'translate-x-0.5'}`} />
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-2">
                            <Button
                                onClick={handleConvert}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                            >
                                Interpolate
                            </Button>
                            <div className="flex gap-2">
                                <Button variant="outline" onClick={handleCopy} className="flex-1">
                                    Copy
                                </Button>
                                <Button variant="outline" onClick={handleClear} className="flex-1">
                                    Clear
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Output */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-slate-300">Output (Interpolated SQL)</label>
                        <Textarea
                            readOnly
                            value={output}
                            placeholder="SELECT * FROM users WHERE id = '123' AND status = 'active'"
                            className="h-64 bg-slate-950 border-slate-700 text-green-400 font-mono text-sm placeholder:text-slate-500 resize-none"
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
