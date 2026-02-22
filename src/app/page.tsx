"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/sonner";
import { InClauseBuilder } from "@/components/tools/InClauseBuilder";
import { CrudGenerator } from "@/components/tools/CrudGenerator";
import { ModelMapper } from "@/components/tools/ModelMapper";
import { QueryInterpolator } from "@/components/tools/QueryInterpolator";
import AdSenseBanner from "@/components/AdSenseBanner";
import Link from "next/link";

const tools = [
  {
    id: "in-clause",
    icon: "📋",
    title: "IN-Clause Generator",
    desc: "Convert newline-separated values (e.g., from Excel) into a SQL IN clause in seconds. Supports comma/pipe separators, optional quotes, and Oracle 1000-row splitting.",
  },
  {
    id: "crud",
    icon: "⚙️",
    title: "CRUD SQL Builder",
    desc: "Auto-generate SELECT, INSERT, UPDATE, DELETE statements from your table schema. Supports MySQL, PostgreSQL, Oracle, and SQL Server syntax.",
  },
  {
    id: "mapper",
    icon: "🔄",
    title: "C# Model Mapper",
    desc: "Map SQL query result columns to C# class properties. Eliminates manual mapping code and reduces typos in your data access layer.",
  },
  {
    id: "interpolator",
    icon: "🔍",
    title: "Query Interpolator",
    desc: "Substitute named parameters (:param or @param) in your SQL query with real values for easy debugging and logging. No more manual substitution.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Toaster position="top-right" richColors />

      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center shadow-lg shadow-black/50">
              <span className="text-blue-500 font-black text-xl">Q</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">QuickQuery</h1>
              <p className="text-sm text-slate-400">Essential Tools for SQL &amp; Data Development</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero / Intro Section */}
      <section className="max-w-5xl mx-auto px-6 pt-10 pb-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-3">
            Free SQL &amp; Developer Productivity Tools
          </h2>
          <p className="text-slate-400 text-base max-w-2xl mx-auto">
            QuickQuery is a collection of lightweight, browser-based tools designed to speed up repetitive
            SQL and data-mapping tasks for developers. No login required — just paste, click, and copy.
          </p>
        </div>

        {/* Tool Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 flex flex-col gap-2 hover:border-blue-500/50 transition-colors"
            >
              <span className="text-2xl">{tool.icon}</span>
              <h3 className="text-white font-semibold text-sm">{tool.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{tool.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Layout Container */}
      <div className="flex justify-center gap-4 px-4 pb-8">

        {/* Left Ad (Desktop Only) */}
        <aside className="hidden xl:block w-[160px] flex-shrink-0 sticky top-24 h-fit">
          <AdSenseBanner
            slotId={process.env.NEXT_PUBLIC_ADSENSE_SIDE_SLOT}
            format="vertical"
            style={{ width: "160px", height: "600px" }}
            className="min-h-[600px]"
          />
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 max-w-5xl w-full min-w-0 flex flex-col gap-6">

          <Tabs defaultValue="in-clause" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border border-slate-700/50 p-1 rounded-xl mb-6">
              <TabsTrigger value="in-clause" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300 bg-slate-900/40 hover:bg-slate-800 hover:text-white transition-all border border-transparent data-[state=inactive]:border-slate-800">IN-Clause</TabsTrigger>
              <TabsTrigger value="crud" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300 bg-slate-900/40 hover:bg-slate-800 hover:text-white transition-all border border-transparent data-[state=inactive]:border-slate-800">CRUD</TabsTrigger>
              <TabsTrigger value="mapper" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300 bg-slate-900/40 hover:bg-slate-800 hover:text-white transition-all border border-transparent data-[state=inactive]:border-slate-800">Model Mapper</TabsTrigger>
              <TabsTrigger value="interpolator" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300 bg-slate-900/40 hover:bg-slate-800 hover:text-white transition-all border border-transparent data-[state=inactive]:border-slate-800">Interpolator</TabsTrigger>
            </TabsList>

            <TabsContent value="in-clause">
              <InClauseBuilder />
            </TabsContent>

            <TabsContent value="crud">
              <CrudGenerator />
            </TabsContent>

            <TabsContent value="mapper">
              <ModelMapper />
            </TabsContent>

            <TabsContent value="interpolator">
              <QueryInterpolator />
            </TabsContent>
          </Tabs>

          {/* Bottom Ad — placed AFTER content */}
          <AdSenseBanner
            slotId={process.env.NEXT_PUBLIC_ADSENSE_BOTTOM_SLOT || process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT}
            className="w-full min-h-[90px]"
            style={{ width: "100%", height: "90px" }}
          />

        </div>
        {/* End Main Content Area */}

        {/* Right Ad (Desktop Only) */}
        <aside className="hidden xl:block w-[160px] flex-shrink-0 sticky top-24 h-fit">
          <AdSenseBanner
            slotId={process.env.NEXT_PUBLIC_ADSENSE_SIDE_SLOT}
            format="vertical"
            style={{ width: "160px", height: "600px" }}
            className="min-h-[600px]"
          />
        </aside>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 mt-8 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center">
                  <span className="text-blue-500 font-black text-sm">Q</span>
                </div>
                <span className="text-white font-bold">QuickQuery</span>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed">
                Free, fast, browser-based SQL and data tools for developers. No account needed.
              </p>
            </div>

            {/* Tools */}
            <div>
              <h4 className="text-slate-300 font-semibold text-sm mb-3">Tools</h4>
              <ul className="space-y-1 text-slate-500 text-xs">
                <li>📋 IN-Clause Generator</li>
                <li>⚙️ CRUD SQL Builder</li>
                <li>🔄 C# Model Mapper</li>
                <li>🔍 Query Interpolator</li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-slate-300 font-semibold text-sm mb-3">Legal</h4>
              <ul className="space-y-1 text-xs">
                <li>
                  <Link href="/privacy" className="text-slate-500 hover:text-slate-300 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-4 text-center text-slate-600 text-xs">
            QuickQuery © 2026 — Developer Productivity Tools. All tools run entirely in your browser.
          </div>
        </div>
      </footer>
    </main>
  );
}
