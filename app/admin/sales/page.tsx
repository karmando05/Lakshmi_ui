"use client";

import { AdminPage } from "../../../components/admin/AdminPage";
import { OrderStatusBadge } from "../../../components/admin/Badges";
import { mockSalesData } from "../../../lib/data/mock/sales";

export default function AdminSalesPage() {
  const totalOrders = mockSalesData.length;
  const totalRevenue = mockSalesData.reduce((sum, sale) => sum + sale.amount, 0);
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  return (
    <AdminPage title="Sales">
      <div className="space-y-6">
        <section className="grid gap-4 sm:grid-cols-3">
          <SummaryCard label="Total orders" value={String(totalOrders)} />
          <SummaryCard label="Total revenue" value={`$${totalRevenue.toLocaleString()}`} />
          <SummaryCard label="Average order value" value={`$${averageOrderValue.toFixed(2)}`} />
        </section>

        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-3 py-3">Order ID</th>
                <th className="px-3 py-3">Student</th>
                <th className="px-3 py-3">Course</th>
                <th className="px-3 py-3">Amount</th>
                <th className="px-3 py-3">Date</th>
                <th className="px-3 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockSalesData.map((sale) => (
                <tr key={sale.id} className="border-t border-slate-100">
                  <td className="px-3 py-3 font-medium text-slate-800">{sale.id}</td>
                  <td className="px-3 py-3 text-slate-600">{sale.userName}</td>
                  <td className="px-3 py-3 text-slate-600">{sale.courseTitle}</td>
                  <td className="px-3 py-3 text-slate-600">${sale.amount}</td>
                  <td className="px-3 py-3 text-slate-600">{new Date(sale.createdAt).toLocaleDateString()}</td>
                  <td className="px-3 py-3"><OrderStatusBadge status={sale.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminPage>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
    </article>
  );
}
