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
                                <Button variant="outline" onClick={handleClear} className="flex-1 border-slate-700 hover:bg-red-900/20 hover:text-red-400 hover:border-red-900/50 text-slate-400">
                                    <span className="mr-2">🗑️</span> Clear
                                </Button>
                                <Button variant="secondary" onClick={handleCopy} className="flex-1 bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 border border-emerald-600/50">
                                    <span className="mr-2">📋</span> Copy Result
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
                {/* How to Use */}
                <div className="mt-8 pt-6 border-t border-slate-700/50">
                    <h3 className="text-white font-semibold text-sm mb-4">📖 How to Use the Query Interpolator</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-slate-900/40 rounded-lg p-4 border border-slate-700/30">
                            <div className="text-blue-400 font-bold text-xs mb-1">STEP 1</div>
                            <div className="text-slate-300 text-sm font-medium mb-1">Paste your SQL query</div>
                            <div className="text-slate-500 text-xs">Paste a parameterized SQL query with placeholders like <code className="text-green-400 bg-slate-950 px-1 rounded">?</code>, <code className="text-green-400 bg-slate-950 px-1 rounded">@p0</code>, or <code className="text-green-400 bg-slate-950 px-1 rounded">:1</code>. These come from your application log or ORM-generated queries.</div>
                        </div>
                        <div className="bg-slate-900/40 rounded-lg p-4 border border-slate-700/30">
                            <div className="text-blue-400 font-bold text-xs mb-1">STEP 2</div>
                            <div className="text-slate-300 text-sm font-medium mb-1">Enter parameters</div>
                            <div className="text-slate-500 text-xs">Enter parameters one per line, in the same order as the placeholders appear in the query. Select the placeholder type that matches your query.</div>
                        </div>
                        <div className="bg-slate-900/40 rounded-lg p-4 border border-slate-700/30">
                            <div className="text-blue-400 font-bold text-xs mb-1">STEP 3</div>
                            <div className="text-slate-300 text-sm font-medium mb-1">Interpolate &amp; Copy</div>
                            <div className="text-slate-500 text-xs">Click Interpolate to produce a runnable SQL statement with real values substituted. Use this to debug queries in SQL Management Studio or DBeaver without manual editing.</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-slate-900/40 rounded-lg p-4 border border-slate-700/30">
                            <div className="text-slate-400 text-xs font-semibold mb-2">📥 Example Input (? placeholder)</div>
                            <pre className="text-slate-300 font-mono text-xs leading-relaxed">{`-- SQL:\nSELECT * FROM orders\nWHERE user_id = ? AND status = ?\n\n-- Parameters:\n42\nshipped`}</pre>
                        </div>
                        <div className="bg-slate-900/40 rounded-lg p-4 border border-slate-700/30">
                            <div className="text-slate-400 text-xs font-semibold mb-2">📤 Example Output</div>
                            <pre className="text-green-400 font-mono text-xs leading-relaxed">{`SELECT * FROM orders\nWHERE user_id = '42' AND status = 'shipped'`}</pre>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="bg-slate-900/40 rounded-lg p-3 border border-slate-700/30">
                            <div className="text-slate-400 text-xs font-semibold mb-1">? (JDBC / MyBatis)</div>
                            <div className="text-slate-500 text-xs">Standard JDBC and MyBatis positional placeholder. Values are substituted left to right.</div>
                        </div>
                        <div className="bg-slate-900/40 rounded-lg p-3 border border-slate-700/30">
                            <div className="text-slate-400 text-xs font-semibold mb-1">@p0 (SQL Server ADO.NET)</div>
                            <div className="text-slate-500 text-xs">Used by ADO.NET and Entity Framework for SQL Server. Parameters are numbered starting at 0.</div>
                        </div>
                        <div className="bg-slate-900/40 rounded-lg p-3 border border-slate-700/30">
                            <div className="text-slate-400 text-xs font-semibold mb-1">:1 (Oracle)</div>
                            <div className="text-slate-500 text-xs">Oracle JDBC positional binding. Parameters are numbered starting at 1.</div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
