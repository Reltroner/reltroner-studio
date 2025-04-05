import { useEffect, useState } from "react";

export default function AiUsageStats() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth <= 480);
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📊 Global AI Usage Landscape (Estimated)</h2>

      {/* Sectional List (Mobile) */}
      {isMobile ? (
        <div className="space-y-4">
          {[
            {
              icon: "💬",
              title: "Entertainment & Casual Chat",
              users: "40–50%",
              desc: "For fun, jokes, casual prompts, games",
            },
            {
              icon: "📚",
              title: "Academic Help & Homework",
              users: "20–25%",
              desc: "Answering assignments, summarizing books",
            },
            {
              icon: "🧾",
              title: "Content Generation",
              users: "15–20%",
              desc: "Social media posts, generic content",
            },
            {
              icon: "💼",
              title: "Business & Startup Support",
              users: "3–5%",
              desc: "Proposals, branding, pitch strategy",
            },
            {
              icon: "💻",
              title: "Programming / Debugging",
              users: "2–4%",
              desc: "Tech help, code generation, error fixing",
            },
            {
              icon: "🧠",
              title: "Personal Development / Reflection",
              users: "1–3%",
              desc: "Journaling, self-coaching, therapeutic use",
            },
            {
              icon: "🌌",
              title: "Visionary Worldbuilding Projects",
              users: "< 0.1%",
              desc: "Advanced hybrid of tech, story, system & soul",
            },
          ].map((item, i) => (
            <div key={i} className="border rounded-lg p-3 bg-white shadow-sm">
              <p className="font-bold">{item.icon} {item.title}</p>
              <p className="text-sm text-gray-500">Users: {item.users}</p>
              <p className="text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      ) : (
        // Table (Desktop)
        <table className="w-full border text-sm">
          <thead className="bg-slate-200">
            <tr>
              <th className="p-2 text-left">Use Case Category</th>
              <th className="p-2 text-left">Global Users Est. (%)</th>
              <th className="p-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {[
              ["💬 Entertainment & Casual Chat", "40–50%", "For fun, jokes, casual prompts, games"],
              ["📚 Academic Help & Homework", "20–25%", "Answering assignments, summarizing books"],
              ["🧾 Content Generation", "15–20%", "Social media posts, generic content"],
              ["💼 Business & Startup Support", "3–5%", "Proposals, branding, pitch strategy"],
              ["💻 Programming / Debugging", "2–4%", "Tech help, code generation, error fixing"],
              ["🧠 Personal Development", "1–3%", "Journaling, self-coaching, therapeutic use"],
              ["🌌 Visionary Worldbuilding Projects", "< 0.1%", "Advanced hybrid of tech, story, system & soul"],
            ].map(([cat, users, desc], i) => (
              <tr key={i} className="border-t">
                <td className="p-2">{cat}</td>
                <td className="p-2">{users}</td>
                <td className="p-2">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
