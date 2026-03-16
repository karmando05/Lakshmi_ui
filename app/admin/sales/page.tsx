import { SalesStatusBadge, SummaryCard } from "../../../components/admin/admin-ui";
import { mockSales } from "../../../lib/data/mock/sales";

export default function AdminSalesPage() {
  const totalOrders = mockSales.length;
  const totalRevenue = mockSales.reduce((acc, sale) => acc + sale.amount, 0);
  const averageOrderValue = totalRevenue / totalOrders;

  return (
    <section className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <SummaryCard label="Total Orders" value={String(totalOrders)} />
        <SummaryCard label="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} />
        <SummaryCard label="Average Order Value" value={`$${averageOrderValue.toFixed(2)}`} />
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-[850px] w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-500">
            <tr>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Student</th>
              <th className="px-4 py-3">Course</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockSales.map((sale) => (
              <tr key={sale.id} className="border-t border-slate-100">
                <td className="px-4 py-3 font-medium">{sale.id}</td>
                <td className="px-4 py-3">{sale.userName}</td>
                <td className="px-4 py-3">{sale.courseTitle}</td>
                <td className="px-4 py-3">${sale.amount}</td>
                <td className="px-4 py-3">{sale.createdAt}</td>
                <td className="px-4 py-3">
                  <SalesStatusBadge status={sale.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
