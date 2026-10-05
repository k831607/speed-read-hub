"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function UploadForm() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState("zh");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          video_source_url: url.trim(),
          topic: topic.trim() || null,
          language,
        }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        setError(body.error ?? `Request failed (${res.status})`);
        return;
      }
      setUrl("");
      setTopic("");
      router.refresh();
    } catch {
      setError("Unable to connect. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-5 space-y-5 rounded-lg border border-border bg-card p-6 sm:p-8">
      <div>
        <label htmlFor="video-url" className="mb-2 block text-sm font-medium">
          Video URL
        </label>
        <Input
          id="video-url"
          type="url"
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Direct mp4 / mp3 URL (e.g. CloudFront, Vimeo, Internet Archive)"
          className="h-12 bg-background"
          disabled={busy}
        />
        <p className="mt-2 text-xs text-muted-foreground">
          YouTube links aren&apos;t supported yet (YouTube blocks downloads from cloud servers).
        </p>
      </div>
      <div>
        <label htmlFor="topic" className="mb-2 block text-sm font-medium">
          Topic <span className="font-normal text-muted-foreground">(optional)</span>
        </label>
        <Input
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. Tech podcast — useful context for the model"
          className="h-12 bg-background"
          disabled={busy}
        />
      </div>
      <div>
        <label htmlFor="language" className="mb-2 block text-sm font-medium">
          Language
        </label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          disabled={busy}
          className="h-12 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <option value="zh">中文 (zh)</option>
          <option value="en">English (en)</option>
          <option value="ja">日本語 (ja)</option>
        </select>
      </div>
      {error && (
        <p role="alert" className="text-sm leading-6 text-destructive">
          {error}
        </p>
      )}
      <Button type="submit" disabled={busy} className="h-12 w-full sm:w-auto sm:px-8">
        {busy ? <Loader2 className="animate-spin" /> : null}
        Transcribe
        {!busy && <ArrowRight />}
      </Button>
    </form>
  );
}
