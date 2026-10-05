import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { Download } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Brand } from "@/components/Brand";
import { SignOutButton } from "@/components/SignOutButton";
import { UploadForm } from "@/components/UploadForm";

export const metadata: Metadata = {
  title: "Upload — Video Speed Reader",
  description: "Submit a video and get its transcript.",
};

// Always render fresh: job statuses change while the worker runs.
export const dynamic = "force-dynamic";

type JobRow = {
  id: string;
  created_at: string;
  video_source_url: string;
  status: "pending" | "downloading" | "transcribe" | "done";
};

const statusStyle: Record<JobRow["status"], string> = {
  pending: "border-border bg-muted text-muted-foreground",
  downloading: "border-border bg-muted text-muted-foreground",
  transcribe: "border-primary/25 bg-accent text-primary",
  done: "border-mint/30 bg-mint/10 text-mint",
};

function truncate(s: string, n = 50) {
  return s.length > n ? `${s.slice(0, n - 1)}…` : s;
}

export default async function UploadPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in");

  // RLS ("users read own jobs") already limits this to the signed-in user;
  // the explicit filter keeps the intent obvious.
  const { data } = await supabase
    .from("jobs")
    .select("id, created_at, video_source_url, status")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(20);
  const jobs = (data ?? []) as JobRow[];

  return (
    <div className="min-h-screen">
      <header className="border-b border-border">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-5 sm:px-8">
          <Brand />
          <div className="flex items-center gap-3">
            <Link href="/app" className="hidden text-sm text-muted-foreground hover:text-foreground sm:inline">
              Workspace
            </Link>
            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <p className="mb-4 text-xs font-medium uppercase text-primary">YOUR TRANSCRIPTIONS</p>
        <h1 className="text-2xl font-semibold sm:text-3xl">上傳影片，拿到逐字稿。</h1>

        <section className="mt-8 overflow-x-auto rounded-lg border border-border bg-card">
          {jobs.length === 0 ? (
            <p className="px-6 py-10 text-center text-sm text-muted-foreground">
              No transcriptions yet. Submit your first video below.
            </p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-5 py-3 font-medium">Created</th>
                  <th className="px-5 py-3 font-medium">URL</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Transcript</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id} className="border-b border-border last:border-0">
                    <td className="whitespace-nowrap px-5 py-3 text-muted-foreground">
                      {formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}
                    </td>
                    <td className="px-5 py-3" title={job.video_source_url}>
                      {truncate(job.video_source_url)}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusStyle[job.status]}`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      {job.status === "done" ? (
                        <a
                          href={`/api/jobs/${job.id}/transcript`}
                          download={`transcript-${job.id.slice(0, 8)}.txt`}
                          className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline"
                        >
                          <Download className="size-3.5" />
                          .txt
                        </a>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <section className="mt-10 max-w-2xl">
          <h2 className="text-lg font-semibold">New transcription</h2>
          <UploadForm />
        </section>
      </main>
    </div>
  );
}
