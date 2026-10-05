export default function KpiCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="card bg-neutral/60 backdrop-blur border border-neutral-content/10 hover:border-primary/50 transition-colors">
      <div className="card-body p-6">
        <div className="text-3xl lg:text-4xl font-extrabold text-neutral-content tracking-tight">
          {value}
        </div>
        <div className="text-sm text-neutral-content/70 font-medium">{label}</div>
      </div>
    </div>
  );
}