import { useState } from "react";

const sampleMembers = [
  { name: "Riniya Najeeb", role: "PhD Scholar", focus: "Haploid Induction", img: "https://images.unsplash.com/photo-1559839734-2b71f1e3c770?auto=format&fit=crop&q=80&w=400" },
  { name: "James Holden", role: "Project Associate", focus: "Chromosome Dynamics", img: "https://images.unsplash.com/photo-1542362567-b05503f3f5f4?auto=format&fit=crop&q=80&w=400" },
  { name: "Dr. Ramesh Bondada", role: "Alumni", focus: "Now: Postdoc, USA", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400", alumni: true },
];

// Frame 1: CONFOCAL LENS (Circular Microscope View)
function ConfocalLensFrame({ member }: { member: any }) {
  return (
    <div className="mx-auto w-full max-w-[14rem] flex flex-col items-center">
      <div className="relative w-48 h-48 rounded-full bg-slate-900 border-[10px] border-slate-800 shadow-[0_0_40px_rgba(0,0,0,0.5),inset_0_0_30px_rgba(0,0,0,0.8)] flex items-center justify-center overflow-hidden">
        {/* The Viewport */}
        <div className={`w-full h-full overflow-hidden ${member.alumni ? "grayscale contrast-125" : "contrast-110 saturate-125"}`}>
          <img src={member.img} alt={member.name} className="h-full w-full object-cover scale-110" />
        </div>
        {/* Glass Reflection */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
        {/* Crosshair decoration */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
          <div className="w-full h-px bg-white" />
          <div className="h-full w-px bg-white" />
        </div>
        {/* Measurement Scale */}
        <div className="absolute bottom-6 right-6 flex items-center gap-1 opacity-60">
           <div className="w-6 h-px bg-white" />
           <span className="text-[7px] text-white font-mono">10μm</span>
        </div>
      </div>
    </div>
  );
}

const getStableId = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return 1000 + Math.abs(hash % 9000);
};

// Frame 2: VINTAGE ID BADGE (The "Researcher" look)
function IDBadgeFrame({ member }: { member: any }) {
  return (
    <div className="mx-auto w-full max-w-[14rem] group">
      <div className="relative bg-white rounded-lg border-2 border-slate-200 shadow-xl p-4 pt-10 overflow-hidden transition-all duration-300 group-hover:-translate-y-1">
        {/* Top Header */}
        <div className="absolute top-0 left-0 right-0 h-6 bg-emerald-600 flex items-center justify-center px-4">
           <span className="text-[7px] text-white font-bold uppercase tracking-[0.3em]">HapGen Lab Investigator</span>
        </div>
        {/* Punched hole for clip */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-1.5 rounded-full bg-slate-800/20" />
        
        {/* Photo Square */}
        <div className="w-full aspect-square bg-slate-100 border border-slate-300 mb-4 overflow-hidden">
          <img src={member.img} alt={member.name} className={`h-full w-full object-cover ${member.alumni ? "grayscale" : ""}`} />
        </div>
        
        {/* Info */}
        <div className="space-y-1 border-t border-slate-100 pt-3">
          <p className="text-[7px] text-slate-400 font-bold uppercase">Identification No.</p>
          <p className="text-[10px] font-mono font-bold text-slate-800">HG-{getStableId(member.name)}</p>
          <p className="text-[7px] text-slate-400 font-bold uppercase mt-2">Department</p>
          <p className="text-[9px] text-emerald-800 font-bold">SCHOOL OF BIOLOGY</p>
        </div>
        
        {/* Official Seal stamp */}
        <div className="absolute bottom-2 right-2 w-10 h-10 rounded-full border-2 border-emerald-900/10 flex items-center justify-center -rotate-12 pointer-events-none">
           <span className="text-[6px] text-emerald-900/20 font-bold text-center">OFFICIAL<br/>HapGen</span>
        </div>
      </div>
    </div>
  );
}

// Frame 3: FIELD NOTEBOOK PAGE (Torn Sketchbook style)
function NotebookFrame({ member }: { member: any }) {
  return (
    <div className="mx-auto w-full max-w-[14rem] group">
      <div className="relative bg-[#fdfcf8] p-5 shadow-lg border-l-4 border-slate-300">
        {/* Spirals holes for notebook */}
        <div className="absolute left-1 inset-y-0 flex flex-col justify-around py-4 opacity-30">
          {[...Array(6)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-slate-400" />)}
        </div>
        
        {/* Tape corners */}
        <div className="absolute top-2 left-2 w-8 h-4 bg-lime-400/20 -rotate-45 z-10 border border-lime-400/10" />
        <div className="absolute top-2 right-2 w-8 h-4 bg-cyan-400/20 rotate-45 z-10 border border-cyan-400/10" />
        
        {/* Photo Container */}
        <div className="relative bg-white p-2 shadow-sm border border-slate-200">
          <div className="aspect-[4/5] overflow-hidden bg-slate-100">
            <img src={member.img} alt={member.name} className={`h-full w-full object-cover sepia-[0.1] ${member.alumni ? "grayscale" : ""}`} />
          </div>
        </div>
        
        {/* Handwritten text appearance */}
        <div className="mt-4 space-y-2">
          <div className="h-px bg-slate-200 w-full" />
          <p className="text-xs italic font-serif text-slate-600 leading-tight">
            Observation: <span className="font-bold text-slate-800 underline decoration-slate-300 decoration-wavy">{member.name}</span>
          </p>
          <p className="text-[10px] italic font-serif text-slate-400">
            {member.alumni ? "Subject exited field study." : "Active specimen."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FramePreview() {
  const [active, setActive] = useState<"confocal" | "id" | "notebook">("confocal");

  const Frame = active === "confocal" ? ConfocalLensFrame : active === "id" ? IDBadgeFrame : NotebookFrame;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6 sm:p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 tracking-tight">Non-Chromosome Frame Concepts</h1>
        <p className="text-slate-500 mb-8">Three distinct scientific themes for the team section.</p>

        <div className="flex flex-wrap gap-3 mb-10">
          {[
            { id: "confocal", label: "🔭 Confocal Lens" },
            { id: "id", label: "🪪 Investigator ID" },
            { id: "notebook", label: "📓 Field Notebook" },
          ].map((opt) => (
            <button
              key={opt.id}
              onClick={() => setActive(opt.id as any)}
              className={`px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-wider transition-all ${
                active === opt.id
                  ? "bg-slate-900 text-white shadow-lg scale-105"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-400"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {sampleMembers.map((m) => (
            <div key={m.name} className="bg-white rounded-2xl p-8 shadow-md border border-slate-200 flex flex-col items-center">
              <Frame member={m} />
              <div className="mt-10 text-center w-full">
                <h3 className="text-lg font-semibold text-slate-900">{m.name}</h3>
                <p className="text-xs text-emerald-700 uppercase tracking-wider mt-1">{m.role}</p>
                <p className="text-[11px] text-slate-400 mt-1">{m.focus}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-6 bg-slate-900 text-slate-300 rounded-xl">
           <h4 className="font-bold text-white mb-2">Design Breakdown:</h4>
           <ul className="text-sm space-y-2 list-disc ml-5">
             <li><strong>Confocal Lens:</strong> Best for "microscopy" feel. Round view, crosshairs, scale bars.</li>
             <li><strong>Investigator ID:</strong> Best for "academic team" feel. Very professional and clean.</li>
             <li><strong>Field Notebook:</strong> Best for "botanical journal" feel. Warm, personal, artistic.</li>
           </ul>
        </div>
      </div>
    </div>
  );
}
