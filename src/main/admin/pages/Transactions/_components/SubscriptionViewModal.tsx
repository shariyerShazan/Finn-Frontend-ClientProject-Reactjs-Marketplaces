/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";
import {
  Dialog,
  DialogContent,
//   DialogHeader,
//   DialogTitle,
} from "@/components/ui/dialog";
import {
//   CheckCircle2,
  Calendar,
  Hash,
  User,
  CreditCard,
  Clock,
  ArrowUpRight,
} from "lucide-react";

const SubscriptionViewModal = ({ isOpen, onClose, data }: any) => {
  if (!data) return null;

  const { plan, seller, transactionId, createdAt, endDate, status } = data;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] rounded-3xl p-0 overflow-hidden border-none shadow-2xl">
        {/* Header Section with Brand Gradient */}
        <div className="bg-gradient-to-br from-[#0064AE] to-[#003d6b] p-8 text-white relative">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-blue-100 text-[10px] font-black uppercase tracking-[2px]">
              <CreditCard size={12} />
              <span>Payment Receipt</span>
            </div>
            <h2 className="text-3xl font-black">{plan?.name} Plan</h2>
          </div>

          <div className="absolute top-8 right-8 text-right">
            <p className="text-xs font-bold text-blue-200 uppercase tracking-tighter">
              Amount Paid
            </p>
            <p className="text-3xl font-black">{plan?.price} PLN</p>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 space-y-6 bg-white">
          {/* Transaction Summary Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-2 mb-1 text-slate-400">
                <Hash size={14} />
                <span className="text-[10px] font-black uppercase">
                  Transaction ID
                </span>
              </div>
              <p className="text-xs font-bold text-slate-700 break-all">
                {transactionId?.slice(0, 18)}...
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-2 mb-1 text-slate-400">
                <Clock size={14} />
                <span className="text-[10px] font-black uppercase">
                  Payment Date
                </span>
              </div>
              <p className="text-xs font-bold text-slate-700">
                {new Date(createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* User Details Section */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <User size={12} /> Seller Information
            </h4>
            <div className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl">
              <div>
                <p className="text-sm font-bold text-slate-800">
                  {seller?.firstName} {seller?.lastName}
                </p>
                <p className="text-xs text-slate-500">{seller?.email}</p>
              </div>
              <div
                className={`px-3 py-1 rounded-full text-[10px] font-black ${
                  status === "COMPLETED" || status === "ACTIVE"
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-amber-50 text-amber-600"
                }`}
              >
                {status}
              </div>
            </div>
          </div>

          {/* Subscription Validity Section */}
          <div className="space-y-4 pt-2">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b pb-2">
              Plan Entitlements
            </h4>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-[#0064AE] rounded-lg">
                    <Calendar size={16} />
                  </div>
                  <span className="text-sm font-bold text-slate-600">
                    Access Until
                  </span>
                </div>
                <span className="text-sm font-black text-slate-800">
                  {new Date(endDate).toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-[#0064AE] rounded-lg">
                    <ArrowUpRight size={16} />
                  </div>
                  <span className="text-sm font-bold text-slate-600">
                    Total Ad Limit
                  </span>
                </div>
                <span className="text-sm font-black text-slate-800">
                  {plan?.postLimit} Posts
                </span>
              </div>
            </div>
          </div>

          {/* Footer Close Button */}
          <button
            onClick={onClose}
            className="w-full py-4 mt-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all shadow-lg text-sm uppercase tracking-widest"
          >
            Close Receipt
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionViewModal;
