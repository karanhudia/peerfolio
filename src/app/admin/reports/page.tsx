"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getReports, resolveReport } from "@/lib/actions/admin";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function AdminReportsPage() {
  const router = useRouter();
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReports() {
      try {
        const result = await getReports();
        
        if (result.error) {
          setError(result.error);
          setReports([]);
        } else {
          setReports(result);
        }
      } catch (err) {
        setError("Failed to load reports");
        setReports([]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchReports();
  }, []);

  async function handleIgnore(reportId: string) {
    setProcessingId(reportId);
    
    try {
      const result = await resolveReport(reportId, false);
      
      if (result.error) {
        setError(result.error);
      } else {
        // Remove the resolved report from the list
        setReports((prev) => prev.filter((report) => report.id !== reportId));
      }
    } catch (err) {
      setError("Failed to resolve report");
    } finally {
      setProcessingId(null);
    }
  }

  async function handleRemoveReview(reportId: string) {
    setProcessingId(reportId);
    
    try {
      const result = await resolveReport(reportId, true);
      
      if (result.error) {
        setError(result.error);
      } else {
        // Remove the resolved report from the list
        setReports((prev) => prev.filter((report) => report.id !== reportId));
      }
    } catch (err) {
      setError("Failed to remove review");
    } finally {
      setProcessingId(null);
    }
  }

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Reported Reviews</h1>
        <Button variant="outline" onClick={() => router.push("/admin")}>
          Back to Dashboard
        </Button>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="text-center py-10">
          <p className="text-gray-500">Loading reports...</p>
        </div>
      ) : reports.length === 0 ? (
        <div className="card bg-gray-50 text-center py-8">
          <h2 className="text-xl font-medium mb-2">No pending reports</h2>
          <p className="text-gray-600">All reports have been resolved.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {reports.map((report) => (
            <div key={report.id} className="card bg-white">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold">
                    Report by: {report.reporter.name} ({report.reporter.email})
                  </h3>
                  <p className="text-sm text-gray-500">
                    Date: {formatDate(report.createdAt)}
                  </p>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-md">
                <p className="font-medium">Reason for report:</p>
                <p className="mt-2">{report.reason}</p>
              </div>
              
              <div className="mt-4 border-t pt-4">
                <h4 className="font-medium mb-2">Reported Review:</h4>
                <div className="p-4 bg-gray-50 rounded-md">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">
                        Review for: {report.review.person.name || "Unknown"}
                      </p>
                      <p className="text-sm text-gray-500">
                        By: {report.review.author.name} ({report.review.author.email})
                      </p>
                    </div>
                    <div className="text-yellow-400">
                      {"★".repeat(report.review.rating)}
                      {"☆".repeat(5 - report.review.rating)}
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="whitespace-pre-line">{report.review.content}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t flex justify-end gap-4">
                <Button
                  variant="outline"
                  onClick={() => handleIgnore(report.id)}
                  disabled={processingId === report.id}
                >
                  {processingId === report.id ? "Processing..." : "Ignore Report"}
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleRemoveReview(report.id)}
                  disabled={processingId === report.id}
                >
                  {processingId === report.id ? "Processing..." : "Remove Review"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 