"use client";

import { useEffect, useState } from "react";

export default function AccountPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const data =
      localStorage.getItem("curego_user");

    if (data) {
      setUser(JSON.parse(data));
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-8">
        Manage Account
      </h1>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

        <div className="mb-5">
          <p className="text-slate-400">
            Name
          </p>

          <p className="text-xl">
            {user?.name}
          </p>
        </div>

        <div className="mb-5">
          <p className="text-slate-400">
            Email
          </p>

          <p>{user?.email}</p>
        </div>

        <div>
          <p className="text-slate-400">
            Mobile Number
          </p>

          <p>
            {user?.mobile ||
              "Not Available"}
          </p>
        </div>

      </div>
    </div>
  );
}