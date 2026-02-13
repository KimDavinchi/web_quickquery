"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
    parseNames,
    snakeToPascal,
    pascalToSnake,
    generateProperty,
    csharpDataTypes,
    type CSharpDataType
} from "@/lib/logic/modelMapper";

export function ModelMapper() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [toPascal, setToPascal] = useState(true);
    const [generateProp, setGenerateProp] = useState(false);
    const [dataType, setDataType] = useState<CSharpDataType>("string");

    const handleConvert = () => {
        if (!input.trim()) {
            toast.error("Please enter variable names");
            return;
        }

        const names = parseNames(input);
        if (names.length === 0) {
            toast.error("No valid variable names found");
            return;
        }

        const results = names.map((name) => {
            const converted = toPascal ? snakeToPascal(name) : pascalToSnake(name);
            return generateProp ? generateProperty(converted, dataType) : converted;
        });

        setOutput(results.join("\n"));
        toast.success(`Converted ${names.length} names`);
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
                    <span className="text-2xl">🔄</span> Model Mapper
                </CardTitle>
                <CardDescription className="text-slate-400">
                    Convert between snake_case and PascalCase. Generate C# properties.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Input */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-slate-300">Input (variable names)</label>
                        <Textarea
                            placeholder="user_id&#10;created_at&#10;order_status&#10;..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="h-64 bg-slate-900/50 border-slate-600 text-slate-100 font-mono text-sm placeholder:text-slate-500 resize-none"
                        />
                    </div>

                    {/* Options */}
                    <div className="space-y-4">
                        <label className="text-sm font-medium text-slate-300">Options</label>
                        <div className="space-y-4 p-4 bg-slate-900/30 rounded-lg border border-slate-700/50">
                            {/* Conversion Direction */}
                            <div className="space-y-2">
                                <span className="text-sm text-slate-400">Direction</span>
                                <div className="flex gap-2">
                                    <Button
                                        size="sm"
                                        variant={toPascal ? "default" : "outline"}
                                        onClick={() => setToPascal(true)}
                                        className={`flex-1 ${toPascal ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                                    >
                                        → PascalCase
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant={!toPascal ? "default" : "outline"}
                                        onClick={() => setToPascal(false)}
                                        className={`flex-1 ${!toPascal ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                                    >
                                        → snake_case
                                    </Button>
                                </div>
                            </div>

                            {/* Generate Property */}
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-400">Generate C# Property</span>
                                <button
                                    onClick={() => setGenerateProp(p => !p)}
                                    className={`w-12 h-6 rounded-full transition-colors ${generateProp ? 'bg-blue-600' : 'bg-slate-600'}`}
                                >
                                    <span className={`block w-5 h-5 bg-white rounded-full transition-transform ${generateProp ? 'translate-x-6' : 'translate-x-0.5'}`} />
                                </button>
                            </div>

                            {/* Data Type */}
                            {generateProp && (
                                <div className="space-y-2">
                                    <span className="text-sm text-slate-400">Data Type</span>
                                    <select
                                        value={dataType}
                                        onChange={(e) => setDataType(e.target.value as CSharpDataType)}
                                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-md text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {csharpDataTypes.map((type) => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
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
                        <label className="text-sm font-medium text-slate-300">Output</label>
                        <Textarea
                            readOnly
                            value={output}
                            placeholder="UserId&#10;CreatedAt&#10;OrderStatus&#10;..."
                            className="h-64 bg-slate-950 border-slate-700 text-green-400 font-mono text-sm placeholder:text-slate-400 resize-none"
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
