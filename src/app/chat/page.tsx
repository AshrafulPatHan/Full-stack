"use client";
import { useEffect, useState } from "react";

interface Notice {
  _id: string;
  title: string;
  description: string;
}

export default function Home() {
  const [form, setForm] = useState({ title: "", description: "" });
  const [notices, setNotices] = useState<Notice[]>([]);

  // fetch all notices
  const getNotices = async () => {
    const res = await fetch("/api/notices");
    const data = await res.json();
    setNotices(data);
  };

  useEffect(() => {
    getNotices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/notices", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });
    setForm({ title: "", description: "" });
    getNotices();
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/notices/${id}`, {
      method: "DELETE",
    });
    getNotices();
  };

  const handleUpdate = async (id: string) => {
    const newTitle = prompt("New title:");
    const newDesc = prompt("New description:");
    if (!newTitle || !newDesc) return;
    await fetch(`/api/notices/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle, description: newDesc }),
    });
    getNotices();
  };

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-10">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border rounded p-2"
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          className="w-full border rounded p-2"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        ></textarea>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>

      <div className="space-y-4">
        {notices.map((n) => (
          <div key={n._id} className="border rounded p-4 space-y-2 bg-[#161616a4] ">
            <h2 className="text-lg font-bold">{n.title}</h2>
            <p>{n.description}</p>
            <div className="flex gap-4">
              <button
                onClick={() => handleUpdate(n._id)}
                className="text-sm bg-yellow-600 px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(n._id)}
                className="text-sm bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
