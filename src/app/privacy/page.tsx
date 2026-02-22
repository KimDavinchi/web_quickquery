import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "Privacy Policy for QuickQuery — how we handle your data when you use our free SQL developer tools.",
};

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Header */}
            <header className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center gap-3">
                        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                            <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center shadow-lg shadow-black/50">
                                <span className="text-blue-500 font-black text-xl">Q</span>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-white">QuickQuery</h1>
                                <p className="text-sm text-slate-400">Essential Tools for SQL &amp; Data Development</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-6 py-12">
                <h2 className="text-3xl font-bold text-white mb-2">Privacy Policy</h2>
                <p className="text-slate-500 text-sm mb-8">Last updated: February 2026</p>

                <div className="space-y-8 text-slate-300 text-sm leading-relaxed">

                    <section>
                        <h3 className="text-white font-semibold text-base mb-3">1. Overview</h3>
                        <p>
                            QuickQuery (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the website{" "}
                            <span className="text-blue-400">web-quickquery.vercel.app</span>. This Privacy Policy explains
                            what information we collect, how we use it, and your rights regarding that information when you
                            use our free developer tools.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-white font-semibold text-base mb-3">2. Information We Do Not Collect</h3>
                        <p className="mb-3">
                            All tools on QuickQuery (IN-Clause Generator, CRUD Builder, Model Mapper, Query Interpolator)
                            run <strong className="text-white">entirely in your browser</strong>. This means:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-slate-400 ml-2">
                            <li>Your SQL queries and data values are never sent to our servers.</li>
                            <li>We do not store any input or output from the tools.</li>
                            <li>No account, login, or personal information is required to use the tools.</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-white font-semibold text-base mb-3">3. Analytics</h3>
                        <p>
                            We use <strong className="text-white">Vercel Analytics</strong> to collect anonymous,
                            aggregated usage statistics (e.g., page views, referrer, country). This data does not
                            personally identify you and is used solely to understand site traffic and improve performance.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-white font-semibold text-base mb-3">4. Advertising (Google AdSense)</h3>
                        <p className="mb-3">
                            We display advertisements served by <strong className="text-white">Google AdSense</strong>.
                            Google may use cookies and similar technologies to serve personalized ads based on your visit
                            to this site and other sites on the internet. You can opt out of personalized advertising by
                            visiting{" "}
                            <a
                                href="https://www.google.com/settings/ads"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:underline"
                            >
                                Google Ads Settings
                            </a>
                            .
                        </p>
                        <p>
                            For more information on how Google uses data when you use our site, please visit{" "}
                            <a
                                href="https://policies.google.com/technologies/partner-sites"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:underline"
                            >
                                Google&apos;s Privacy &amp; Terms
                            </a>
                            .
                        </p>
                    </section>

                    <section>
                        <h3 className="text-white font-semibold text-base mb-3">5. Cookies</h3>
                        <p>
                            QuickQuery itself does not set any first-party cookies. Cookies may be set by third-party
                            services such as Google AdSense for advertising purposes. You can manage or disable cookies
                            through your browser settings.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-white font-semibold text-base mb-3">6. Third-Party Links</h3>
                        <p>
                            Our website does not contain links to third-party websites other than those mentioned in this
                            policy. We are not responsible for the privacy practices of external sites.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-white font-semibold text-base mb-3">7. Children&apos;s Privacy</h3>
                        <p>
                            QuickQuery is not directed at children under the age of 13. We do not knowingly collect any
                            information from children.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-white font-semibold text-base mb-3">8. Changes to This Policy</h3>
                        <p>
                            We may update this Privacy Policy from time to time. Any changes will be posted on this page
                            with an updated revision date. We encourage you to review this page periodically.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-white font-semibold text-base mb-3">9. Contact</h3>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us via the GitHub
                            repository associated with this project.
                        </p>
                    </section>
                </div>

                <div className="mt-10 pt-6 border-t border-slate-700/50">
                    <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors text-sm">
                        ← Back to QuickQuery Tools
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-slate-700/50 mt-8">
                <div className="max-w-7xl mx-auto px-6 py-4 text-center text-slate-600 text-xs">
                    QuickQuery © 2026 — Developer Productivity Tools
                </div>
            </footer>
        </main>
    );
}
