"use client";

import { useEffect, useState } from "react";

type Application = {
  _id: string;
  name: string;
  email: string;
  role: string;
  message: string;
  createdAt: string;
};

export default function AdminPage() {
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/applications")
      .then(res => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(data => setApps(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="px-6 py-32 max-w-6xl mx-auto text-white">
      <h1 className="text-4xl font-bold mb-10">Applications</h1>

      {loading && <p className="text-white/60">Loading applications...</p>}

      {!loading && apps.length === 0 && (
        <p className="text-white/60">No applications yet.</p>
      )}

      <div className="space-y-4">
        {apps.map(app => (
          <div
            key={app._id}
            className="border border-white/10 p-6 rounded-xl bg-white/5"
          >
            <p className="text-lg font-bold">{app.name}</p>
            <p className="text-sm text-white/60">{app.email}</p>
            <p className="text-cyan-400 mt-1">{app.role}</p>
            <p className="text-white/80 mt-3">{app.message}</p>
            <p className="text-xs text-white/40 mt-2">
              {new Date(app.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
