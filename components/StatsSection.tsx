import { Users, Briefcase, Calendar, MapPin, Wrench, ShieldCheck } from "lucide-react";

const stats = [
  {
    icon: Briefcase,
    value: "+250",
    label: "Chantiers réalisés",
    description: "Sites industriels au Cameroun",
  },
  {
    icon: Calendar,
    value: "35",
    label: "Ans d'expérience",
    description: "Depuis 1990, une référence",
  },
  {
    icon: Users,
    value: "+80",
    label: "Techniciens qualifiés",
    description: "Équipes formées & certifiées",
  },
  {
    icon: MapPin,
    value: "2",
    label: "Agences",
    description: "Douala & Bafoussam",
  },
];

export default function StatsSection() {
  return (
    <section className="bg-base-200 py-16 lg:py-20 border-y border-base-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="section-eyebrow">Notre track record</span>
          <h2 className="section-title mt-3">
            Des chiffres qui parlent d'eux-mêmes.
          </h2>
          <p className="mt-4 text-lg text-base-content/70">
            Une expertise éprouvée au service des plus grands donneurs d'ordres
            industriels du Cameroun.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="card bg-base-100 border border-base-300 hover:border-secondary/40 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="card-body p-6 text-center items-center">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-3">
                    <Icon className="w-6 h-6 text-secondary" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-extrabold text-base-content tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-sm font-bold text-base-content mt-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-base-content/60 mt-1">
                    {stat.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bandeau de confiance */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-base-content/60">
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary" />
            Conformité HSE
          </span>
          <span className="inline-flex items-center gap-2">
            <Wrench className="w-4 h-4 text-primary" />
            Équipements certifiés
          </span>
          <span className="inline-flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            Équipes formées
          </span>
        </div>
      </div>
    </section>
  );
}