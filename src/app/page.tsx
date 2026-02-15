"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/sonner";
import { InClauseBuilder } from "@/components/tools/InClauseBuilder";
import { CrudGenerator } from "@/components/tools/CrudGenerator";
import { ModelMapper } from "@/components/tools/ModelMapper";
import { QueryInterpolator } from "@/components/tools/QueryInterpolator";
import AdSenseBanner from "@/components/AdSenseBanner";

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
              <p className="text-sm text-slate-400">Essential Tools for SQL & Data Development</p>
            </div>
          </div>
        </div>
      </header>

      {/* Layout Container */}
      <div className="flex justify-center gap-4 px-4 py-8">

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

          {/* Top Ad */}
          <AdSenseBanner
            slotId={process.env.NEXT_PUBLIC_ADSENSE_TOP_SLOT}
            className="w-full min-h-[60px]"
            style={{ width: "100%", height: "60px" }}
          />

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

          {/* Bottom Ad */}
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
      <footer className="border-t border-slate-700/50 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-slate-500 text-sm">
          QuickQuery © 2026 — Developer Productivity Tools
        </div>
      </footer>
    </main>
  );
}
