"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { parseInputValues, generateInClause, type InClauseOptions } from "@/lib/logic/inClauseBuilder";

export function InClauseBuilder() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [options, setOptions] = useState<InClauseOptions>({
        addQuotes: true,
        separator: "comma",
        oracleSplit: false,
    });

    const handleConvert = () => {
        if (!input.trim()) {
            toast.error("Please enter data");
            return;
        }

        const values = parseInputValues(input);
        if (values.length === 0) {
            toast.error("No valid data found");
            return;
        }

        const result = generateInClause(values, options);
        setOutput(result);
        toast.success(`Converted ${values.length} items`);
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
        setInput("");
        setOutput("");
    };

    return (
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                    <span className="text-2xl">📋</span> Smart IN-Clause Generator
                </CardTitle>
                <CardDescription className="text-slate-400">
                    Paste newline-separated values (e.g., from Excel). Convert to SQL IN clause.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Input */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-slate-300">Input (one value per line)</label>
                        <Textarea
                            placeholder={`123
456
789
...`}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="h-64 bg-slate-950 border-slate-700 text-slate-100 font-mono text-sm placeholder:text-slate-400 resize-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    {/* Options */}
                    <div className="space-y-4">
                        <label className="text-sm font-medium text-slate-300">Options</label>
                        <div className="space-y-3 p-4 bg-slate-900/30 rounded-lg border border-slate-700/50">
                            {/* Quotes */}
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-400">Add quotes</span>
                                <button
                                    onClick={() => setOptions(o => ({ ...o, addQuotes: !o.addQuotes }))}
                                    className={`w-12 h-6 rounded-full transition-colors ${options.addQuotes ? 'bg-blue-600' : 'bg-slate-600'}`}
                                >
                                    <span className={`block w-5 h-5 bg-white rounded-full transition-transform ${options.addQuotes ? 'translate-x-6' : 'translate-x-0.5'}`} />
                                </button>
                            </div>

                            {/* Separator */}
                            <div className="space-y-2">
                                <span className="text-sm text-slate-400">Separator</span>
                                <div className="flex gap-2">
                                    <Button
                                        size="sm"
                                        variant={options.separator === "comma" ? "default" : "outline"}
                                        onClick={() => setOptions(o => ({ ...o, separator: "comma" }))}
                                        className="flex-1"
                                    >
                                        Comma (,)
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant={options.separator === "pipe" ? "default" : "outline"}
                                        onClick={() => setOptions(o => ({ ...o, separator: "pipe" }))}
                                        className="flex-1"
                                    >
                                        Pipe (|)
                                    </Button>
                                </div>
                            </div>

                            {/* Oracle Split */}
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-400">Oracle 1000 split</span>
                                <button
                                    onClick={() => setOptions(o => ({ ...o, oracleSplit: !o.oracleSplit }))}
                                    className={`w-12 h-6 rounded-full transition-colors ${options.oracleSplit ? 'bg-blue-600' : 'bg-slate-600'}`}
                                >
                                    <span className={`block w-5 h-5 bg-white rounded-full transition-transform ${options.oracleSplit ? 'translate-x-6' : 'translate-x-0.5'}`} />
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-2">
                            <Button
                                onClick={handleConvert}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                            >
                                Convert
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
                        <label className="text-sm font-medium text-slate-300">Output (SQL IN clause)</label>
                        <Textarea
                            readOnly
                            value={output}
                            placeholder="IN ('123', '456', '789')"
                            className="h-64 bg-slate-950 border-slate-700 text-green-400 font-mono text-sm placeholder:text-slate-500 resize-none"
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
