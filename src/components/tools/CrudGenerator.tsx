"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { parseColumns, generateCrud, type QueryType, type ParamStyle } from "@/lib/logic/crudGenerator";

export function CrudGenerator() {
    const [tableName, setTableName] = useState("");
    const [columnsInput, setColumnsInput] = useState("");
    const [output, setOutput] = useState("");
    const [queryType, setQueryType] = useState<QueryType>("SELECT");
    const [paramStyle, setParamStyle] = useState<ParamStyle>("sqlserver");

    const handleGenerate = () => {
        if (!columnsInput.trim()) {
            toast.error("Please enter column names");
            return;
        }

        const columns = parseColumns(columnsInput);
        if (columns.length === 0) {
            toast.error("No valid column names found");
            return;
        }

        const result = generateCrud(tableName, columns, queryType, paramStyle);
        setOutput(result);
        toast.success(`Generated ${queryType} query`);
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
        setTableName("");
        setColumnsInput("");
        setOutput("");
    };

    const queryTypes: QueryType[] = ["SELECT", "INSERT", "UPDATE", "DELETE"];

    return (
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                    <span className="text-2xl">🗃️</span> CRUD Generator
                </CardTitle>
                <CardDescription className="text-slate-400">
                    Generate SELECT, INSERT, UPDATE, DELETE queries from table and column names.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Input */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Table Name</label>
                            <input
                                type="text"
                                placeholder="users"
                                value={tableName}
                                onChange={(e) => setTableName(e.target.value)}
                                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-md text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Columns (space/comma separated)</label>
                            <Textarea
                                placeholder={`id
name
email
created_at`}
                                value={columnsInput}
                                onChange={(e) => setColumnsInput(e.target.value)}
                                className="h-44 bg-slate-950 border-slate-700 text-slate-100 font-mono text-sm placeholder:text-slate-400 resize-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Options */}
                    <div className="space-y-4">
                        <label className="text-sm font-medium text-slate-300">Options</label>
                        <div className="space-y-4 p-4 bg-slate-900/30 rounded-lg border border-slate-700/50">
                            {/* Query Type */}
                            <div className="space-y-2">
                                <span className="text-sm text-slate-400">Query Type</span>
                                <div className="grid grid-cols-2 gap-2">
                                    {queryTypes.map((type) => (
                                        <Button
                                            key={type}
                                            size="sm"
                                            variant={queryType === type ? "default" : "outline"}
                                            onClick={() => setQueryType(type)}
                                            className={queryType === type ? "bg-blue-600 hover:bg-blue-700" : ""}
                                        >
                                            {type}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            {/* Parameter Style */}
                            <div className="space-y-2">
                                <span className="text-sm text-slate-400">Parameter Style</span>
                                <div className="flex gap-2">
                                    <Button
                                        size="sm"
                                        variant={paramStyle === "sqlserver" ? "default" : "outline"}
                                        onClick={() => setParamStyle("sqlserver")}
                                        className={`flex-1 ${paramStyle === "sqlserver" ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                                    >
                                        @param
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant={paramStyle === "oracle" ? "default" : "outline"}
                                        onClick={() => setParamStyle("oracle")}
                                        className={`flex-1 ${paramStyle === "oracle" ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                                    >
                                        :param
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-2">
                            <Button
                                onClick={handleGenerate}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                            >
                                Generate
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
                        <label className="text-sm font-medium text-slate-300">Output (SQL Query)</label>
                        <Textarea
                            readOnly
                            value={output}
                            placeholder="SELECT&#10;    id,&#10;    name&#10;FROM users&#10;WHERE 1=1"
                            className="h-64 bg-slate-950 border-slate-700 text-green-400 font-mono text-sm placeholder:text-slate-500 resize-none"
                        />
                    </div>
                </div>
                {/* How to Use */}
                <div className="mt-8 pt-6 border-t border-slate-700/50">
                    <h3 className="text-white font-semibold text-sm mb-4">📖 How to Use the CRUD SQL Builder</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-slate-900/40 rounded-lg p-4 border border-slate-700/30">
                            <div className="text-blue-400 font-bold text-xs mb-1">STEP 1</div>
                            <div className="text-slate-300 text-sm font-medium mb-1">Enter table &amp; columns</div>
                            <div className="text-slate-500 text-xs">Type the table name and paste column names (one per line, or space/comma separated). You can copy column names directly from SQL Management Studio or DBeaver.</div>
                        </div>
                        <div className="bg-slate-900/40 rounded-lg p-4 border border-slate-700/30">
                            <div className="text-blue-400 font-bold text-xs mb-1">STEP 2</div>
                            <div className="text-slate-300 text-sm font-medium mb-1">Select query type &amp; style</div>
                            <div className="text-slate-500 text-xs">Pick SELECT, INSERT, UPDATE, or DELETE. Choose parameter style: <code className="text-green-400 bg-slate-950 px-1 rounded">@param</code> for SQL Server / MySQL, or <code className="text-green-400 bg-slate-950 px-1 rounded">:param</code> for Oracle / PostgreSQL.</div>
                        </div>
                        <div className="bg-slate-900/40 rounded-lg p-4 border border-slate-700/30">
                            <div className="text-blue-400 font-bold text-xs mb-1">STEP 3</div>
                            <div className="text-slate-300 text-sm font-medium mb-1">Generate &amp; Copy</div>
                            <div className="text-slate-500 text-xs">Click Generate to produce a ready-to-use SQL template. Copy the result into your IDE or query tool and replace parameter placeholders with real values.</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-900/40 rounded-lg p-4 border border-slate-700/30">
                            <div className="text-slate-400 text-xs font-semibold mb-2">📥 Example Input</div>
                            <div className="text-slate-500 text-xs mb-1">Table: <code className="text-slate-300">users</code> &nbsp;|&nbsp; Columns:</div>
                            <pre className="text-slate-300 font-mono text-xs leading-relaxed">{`id\nusername\nemail\ncreated_at`}</pre>
                        </div>
                        <div className="bg-slate-900/40 rounded-lg p-4 border border-slate-700/30">
                            <div className="text-slate-400 text-xs font-semibold mb-2">📤 Example Output (INSERT, @param)</div>
                            <pre className="text-green-400 font-mono text-xs leading-relaxed">{`INSERT INTO users\n  (username, email, created_at)\nVALUES\n  (@username, @email, @created_at)`}</pre>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
