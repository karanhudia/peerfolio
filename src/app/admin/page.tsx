import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/session";
import { getPendingReviews, getReports } from "@/lib/actions/admin";

export const metadata = {
  title: "Admin Dashboard | PeerFolio",
  description: "Administration dashboard for PeerFolio.",
};

export default async function AdminPage() {
  const user = await getCurrentUser();
  
  // Redirect if not admin
  if (!user || user.role !== "ADMIN") {
    redirect("/");
  }
  
  const pendingReviews = await getPendingReviews();
  const reports = await getReports();
  
  const pendingReviewsCount = Array.isArray(pendingReviews) ? pendingReviews.length : 0;
  const reportsCount = Array.isArray(reports) ? reports.length : 0;

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="card bg-blue-50 border-blue-100">
          <h2 className="text-lg font-medium mb-2">Pending Reviews</h2>
          <p className="text-gray-600 mb-4">
            {pendingReviewsCount} reviews awaiting approval
          </p>
          <Link href="/admin/reviews">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
              Manage Reviews
            </button>
          </Link>
        </div>
        
        <div className="card bg-amber-50 border-amber-100">
          <h2 className="text-lg font-medium mb-2">Reports</h2>
          <p className="text-gray-600 mb-4">
            {reportsCount} reports to resolve
          </p>
          <Link href="/admin/reports">
            <button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded">
              Handle Reports
            </button>
          </Link>
        </div>
      </div>
      
      <div className="card">
        <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/admin/users">
            <button className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-medium py-2 px-4 rounded">
              Manage Users
            </button>
          </Link>
          
          <Link href="/admin/settings">
            <button className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-medium py-2 px-4 rounded">
              System Settings
            </button>
          </Link>
          
          <Link href="/admin/logs">
            <button className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-medium py-2 px-4 rounded">
              View Logs
            </button>
          </Link>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-lg font-medium mb-4">System Stats</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <p className="text-sm text-gray-500">Total Users</p>
            <p className="text-2xl font-bold">-</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <p className="text-sm text-gray-500">Total Reviews</p>
            <p className="text-2xl font-bold">-</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <p className="text-sm text-gray-500">Professionals</p>
            <p className="text-2xl font-bold">-</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <p className="text-sm text-gray-500">Avg. Rating</p>
            <p className="text-2xl font-bold">-</p>
          </div>
        </div>
        
        <p className="text-sm text-gray-500 mt-4">
          Note: Advanced statistics will be implemented in a future update.
        </p>
      </div>
    </div>
  );
} 