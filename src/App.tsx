import { useEffect, useRef, useState, type ReactNode } from "react";

function CollapsibleSection({
  title,
  defaultOpen = false,
  children,
}: {
  title: ReactNode;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="reveal-on-view border-b border-white/10">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-6 py-7 text-left transition-colors hover:text-cyan-100"
        aria-expanded={open}
      >
        <span className="text-[clamp(1.5rem,3vw,2.4rem)] font-light tracking-[-0.03em] text-white">
          {title}
        </span>
        <span
          className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-cyan-200 transition-transform duration-500 ${
            open ? "rotate-45 bg-cyan-300/10" : ""
          }`}
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-500 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="pb-10">{children}</div>
        </div>
      </div>
    </div>
  );
}

const clamp = (value: number, min = 0, max = 1) => Math.min(Math.max(value, min), max);
const smooth = (value: number) => value * value * (3 - 2 * value);

function BiologicalParticles({ progress }: { progress: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const colors = [
      "rgba(95, 147, 91, 0.12)",   // soft green from logo
      "rgba(14, 51, 70, 0.08)",    // soft navy from logo
      "rgba(103, 232, 249, 0.08)",  // soft cyan
    ];

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      color: string;
    }

    const particles: Particle[] = Array.from({ length: 25 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -Math.random() * 0.5 - 0.2,
      r: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.strokeStyle = `rgba(15, 30, 40, ${0.05 * (1 - dist / 150)})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const opacity = Math.max(0, 1 - progress * 1.5);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity, transition: "opacity 0.2s ease-out" }}
    />
  );
}

const researchInterests = [
  "Plant Centromere biology",
  "Uniparental genome elimination",
  "Genome stability, Aneuploidy",
  "Haploid genetics",
  "Minichromosome biology",
];

const publications = [
  {
    year: "2025",
    title: "Doubled Haploids: Accelerating the Breeding of Resilient Crops for the Future",
    authors: "Najeeb, R., Uniyal, A., Bondada, R. and Maruthachalam, R.",
    venue: "Plant Breeding 2050, Springer, Singapore",
    link: "https://doi.org/10.1007/978-981-95-0583-8_12",
  },
  {
    year: "2024",
    title: "The holocentricity in the dioecious nutmeg (Myristica fragrans) is not based on major satellite repeats",
    authors: "Kuo, Y.T., Kurian, J.G., Schubert, V. et al.",
    venue: "Chromosome Research 32, 8",
    link: "https://doi.org/10.1007/s10577-024-09751-1",
  },
  {
    year: "2024",
    title: "Haploids fast-track hybrid plant breeding",
    authors: "Maruthachalam, R.",
    venue: "Nature Plants 10, 530-532",
    link: "https://doi.org/10.1038/s41477-024-01656-5",
  },
  {
    year: "2024",
    title: "Gametophytic epigenetic regulators, MEDEA and DEMETER, synergistically suppress ectopic shoot formation in Arabidopsis",
    authors: "Rajabhoj, M.P., Sankar, S., Bondada, R., Shanmukhan, A.P., Prasad, K. and Maruthachalam, R.",
    venue: "Plant Cell Reports 43",
    link: "https://link.springer.com/journal/299",
  },
  {
    year: "2023",
    title: "Transgene-Free Genome Editing for Biotic and Abiotic Stress Resistance in Sugarcane: Prospects and Challenges",
    authors: "Surya Krishna, S., Harish Chandar, S.R., Ravi, M. et al.",
    venue: "Agronomy 13, 1000",
    link: "https://www.mdpi.com/2073-4395/13/4/1000",
  },
  {
    year: "2023",
    title: "Establishment and inheritance of minichromosomes from Arabidopsis haploid induction",
    authors: "Tan, E.H., Ordoñez, B., Thondehaalmath, T., Seymour, D.K., Maloof, J.N., Maruthachalam, R. and Comai, L.",
    venue: "Chromosoma",
    link: "https://doi.org/10.1007/s00412-023-00788-5",
  },
  {
    year: "2023",
    title: "Identification of Arabidopsis thaliana haploid plants by counting the chloroplast numbers in stomatal guard cells",
    authors: "Watts, A., Bondada, R. and Maruthachalam, R.",
    venue: "Plant Physiology Reports",
    link: "https://doi.org/10.1007/s40502-022-00706-4",
  },
  {
    year: "2022",
    title: "The kinetochore protein NNF1 has a moonlighting role in the vegetative development of Arabidopsis thaliana",
    authors: "Allipra, S., Anirudhan, K., Shivanandan, S., Raghunathan, A. and Maruthachalam, R.",
    venue: "The Plant Journal",
    link: "https://doi.org/10.1111/tpj.15614",
  },
  {
    year: "2021",
    title: "Epigenetically mismatched parental centromeres trigger genome elimination in hybrids",
    authors: "Marimuthu, M.P.A., Maruthachalam, R., Bondada, R. et al.",
    venue: "Science Advances 7(47), eabk1151",
    link: "https://doi.org/10.1126/sciadv.abk1151",
  },
  {
    year: "2021",
    title: "Cantil - a new organ or a morphological oddity?",
    authors: "Bondada, R., Kulaar, D.S., Siddiqi, I. and Maruthachalam, R.",
    venue: "New Phytologist",
    link: "https://doi.org/10.1111/nph.17744",
  },
  {
    year: "2021",
    title: "Understanding and exploiting uniparental genome elimination in plants: insights from Arabidopsis thaliana",
    authors: "Thondehaalmath, T., Kulaar, D.S., Bondada, R. and Maruthachalam, R.",
    venue: "Journal of Experimental Botany 72(13), 4646-4662",
    link: "https://doi.org/10.1093/jxb/erab161",
  },
  {
    year: "2020",
    title: "Natural epialleles of Arabidopsis SUPERMAN display superwoman phenotypes",
    authors: "Bondada, R., Somasundaram, S., Marimuthu, M.P., Badarudeen, M.A., Vaishak, K.P. and Maruthachalam, R.",
    venue: "Communications Biology 3, 772",
    link: "https://doi.org/10.1038/s42003-020-01525-9",
  },
  {
    year: "2018",
    title: "The polycomb group repressor MEDEA attenuates pathogen defense",
    authors: "Roy, S., Gupta, P., Rajabhoj, M.P., Maruthachalam, R. and Nandi, A.K.",
    venue: "Plant Physiology 177(4), 1728-1742",
    link: "https://doi.org/10.1104/pp.17.01579",
  },
  {
    year: "2018",
    title: "MutS-Homolog2 Silencing Generates Tetraploid Meiocytes in Tomato (Solanum lycopersicum)",
    authors: "Sarma, S., Pandey, A.K., Ravi, M., Sreelakshmi, Y. and Sharma, R.",
    venue: "Plant Direct 2, 1-15",
    link: "https://doi.org/10.1002/pld3.17",
  },
  {
    year: "2017",
    title: "The generation of double haploid lines for QTL mapping",
    authors: "Filiault, D.L., Seymour, D.K., Maruthachalam, R. and Maloof, J.",
    venue: "Methods in Molecular Biology 1610, 39-57",
    link: "https://doi.org/10.1007/978-1-4939-7003-2_4",
  },
  {
    year: "2016",
    title: "Genome Elimination by Tailswap CenH3: in vivo Haploid Production in Arabidopsis thaliana",
    authors: "Ravi, M. and Bondada, R.",
    venue: "Methods in Molecular Biology 1469, 77-99",
    link: "https://doi.org/10.1007/978-1-4939-4931-1_6",
  },
  {
    year: "2015",
    title: "Catastrophic chromosomal restructuring during genome elimination in plants",
    authors: "Tan, E.H., Henry, I.M., Ravi, M. et al.",
    venue: "eLife",
    link: "https://doi.org/10.7554/eLife.06516",
  },
  {
    year: "2014",
    title: "A haploid genetic tool box for Arabidopsis thaliana",
    authors: "Ravi, M., Marimuthu, M.P., Tan, E.H. et al.",
    venue: "Nature Communications 5, 5334",
    link: "https://doi.org/10.1038/ncomms6334",
  },
  {
    year: "2014",
    title: "Hybrid recreation by reverse breeding in Arabidopsis thaliana",
    authors: "Wijnker, E., Deurhof, L., van de Belt, J. et al.",
    venue: "Nature Protocols 9, 761-772",
    link: "https://doi.org/10.1038/nprot.2014.049",
  },
  {
    year: "2013",
    title: "Centromere-mediated generation of haploid plants",
    authors: "Ravi, M. and Chan, S.W.L.",
    venue: "Plant Centromere Biology, Wiley-Blackwell",
    link: "https://www.wiley.com/",
  },
  {
    year: "2012",
    title: "Reverse breeding in Arabidopsis generates homozygous parental lines from a heterozygous plant",
    authors: "Wijnker, E., van Dun, K., de Snoo, C.B. et al.",
    venue: "Nature Genetics 44, 467-470",
    link: "https://doi.org/10.1038/ng.2203",
  },
  {
    year: "2012",
    title: "Rapid creation of Arabidopsis doubled haploid lines for quantitative trait locus mapping",
    authors: "Seymour, D.K., Filiault, D.L., Henry, I.M. et al.",
    venue: "PNAS 109(11), 4227-4232",
    link: "https://doi.org/10.1073/pnas.1117277109",
  },
  {
    year: "2011",
    title: "Synthetic clonal reproduction through seeds",
    authors: "Marimuthu, M.P.A., Jolivet, S., Ravi, M. et al.",
    venue: "Science 331, 876",
    link: "https://doi.org/10.1126/science.1199682",
  },
  {
    year: "2011",
    title: "Meiosis-specific loading of the centromere specific histone CENH3 in Arabidopsis thaliana",
    authors: "Ravi, M., Shibata, F., Ramahi, J.S., Nagaki, K., Chen, C., Murata, M. and Chan, S.W.",
    venue: "PLoS Genetics 7(6), e1002121",
    link: "https://doi.org/10.1371/journal.pgen.1002121",
  },
  {
    year: "2010",
    title: "The rapidly evolving centromere-specific histone has stringent functional requirements in Arabidopsis thaliana",
    authors: "Ravi, M., Kwong, P.N., Menorca, R.M. et al.",
    venue: "Genetics 186(2), 461-471",
    link: "https://doi.org/10.1534/genetics.110.120337",
  },
  {
    year: "2010",
    title: "Haploid plants produced through centromere mediated genome elimination",
    authors: "Ravi, M. and Chan, S.W.L.",
    venue: "Nature 464, 615-618",
    link: "https://doi.org/10.1038/nature08842",
  },
  {
    year: "2009",
    title: "Molecular approaches for the fixation of plant hybrid vigor",
    authors: "Siddiqi, I., Marimuthu, M.P.A. and Ravi, M.",
    venue: "Biotechnology Journal 4, 342-347",
    link: "https://doi.org/10.1002/biot.200800290",
  },
  {
    year: "2009",
    title: "The Plant Adherin AtSCC2 is required for embryogenesis and sister chromatid cohesion during meiosis in Arabidopsis",
    authors: "Sebastian, J., Ravi, M., Andreuzza, S. et al.",
    venue: "The Plant Journal 59, 1-13",
    link: "https://doi.org/10.1111/j.1365-313X.2009.03834.x",
  },
  {
    year: "2008",
    title: "Gamete formation without meiosis in Arabidopsis",
    authors: "Ravi, M., Marimuthu, M.P.A. and Siddiqi, I.",
    venue: "Nature 451, 1121-1124",
    link: "https://doi.org/10.1038/nature06557",
  },
  {
    year: "2006",
    title: "AtMND1 is required for homologous pairing during meiosis in Arabidopsis",
    authors: "Panoli, A.P., Ravi, M., Sebastian, J. et al.",
    venue: "BMC Molecular Biology 7, 24",
    link: "https://doi.org/10.1186/1471-2199-7-24",
  },
  {
    year: "2003",
    title: "Molecular marker based genetic diversity analysis in Rice (Oryza sativa L.) using RAPD and SSR markers",
    authors: "Ravi, M., Geethanjali, S., Sameeyafarheen, F. and Maheswaran, M.",
    venue: "Euphytica 133, 243-252",
    link: "https://doi.org/10.1023/A:1025513111279",
  },
];

const activeMembers = {
  phds: [
    { name: "Riniya Najeeb", role: "PhD Scholar", focus: "Haploid Induction", img: "https://images.unsplash.com/photo-1559839734-2b71f1e3c770?auto=format&fit=crop&q=80&w=400" },
    { name: "Mohit P. Rajabhoj", role: "PhD Scholar", focus: "Epigenetic Regulation", img: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=400" },
    { name: "Sudev Sankar", role: "PhD Scholar", focus: "Genome Stability", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" },
  ],
  projectStudents: [
    { name: "Abhinav Uniyal", role: "Project Associate", focus: "Centromere Biology", img: "https://images.unsplash.com/photo-1542362567-b05503f3f5f4?auto=format&fit=crop&q=80&w=400" },
    { name: "Anju P. Shanmukhan", role: "Project Associate", focus: "Chromosome Dynamics", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400" },
  ],
  bsms: [
    { name: "Student A", role: "BS-MS Major", focus: "Plant Biology", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" },
    { name: "Student B", role: "BS-MS Major", focus: "Genetics", img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400" },
    { name: "Student C", role: "BS-MS Major", focus: "Molecular Biology", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400" },
  ],
  interns: [
    { name: "Intern 1", role: "Summer Intern", focus: "Molecular Cloning", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400" },
    { name: "Intern 2", role: "Winter Intern", focus: "Bioinformatics", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400" },
  ],
};

const alumni = [
  { name: "Dr. Ramesh Bondada", role: "PhD (2015-2021)", now: "Postdoctoral Fellow, USA", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" },
  { name: "Dr. Thondehaalmath", role: "PhD (2016-2022)", now: "Research Scientist, India", img: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=400" },
  { name: "Dr. Kulaar D.S.", role: "PhD (2017-2023)", now: "Faculty, Agricultural University", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400" },
  { name: "Tejas Sabu", role: "BS-MS (2020)", now: "Graduate Student, Abroad", img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400" },
  { name: "Allipra Sreejith", role: "MS Thesis (2021)", now: "PhD Student, IISc", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400" },
  { name: "Surya Krishna S.", role: "MS Thesis (2022)", now: "Research Associate, TNAU", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" },
];

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About PI", href: "#about-pi" },
  { label: "Research", href: "#research" },
  { label: "Publications", href: "#publications" },
  { label: "Lab Members", href: "#lab-members" },
  { label: "Alumni", href: "#alumni" },
  { label: "Contact", href: "#contact" },
];

const awards = [
  { year: "1998", text: "Sathiyavan Gopalapillai Award (TNAU) — top scorer in Agricultural Botany of B.Sc. (Ag.)" },
  { year: "1998", text: "Dr. Clement Williams Memorial Prize (TNAU) — top scorer in Dairy Science of B.Sc. (Ag.)" },
  { year: "2000", text: "Baby K. Devarajan Prize — best student in M.Sc.(Ag.) Plant Breeding and Genetics" },
  { year: "2000", text: "Dr. K. Ramiah Award (TNAU) — best student in Plant Breeding and Genetics" },
  { year: "2004", text: "Indian Society of Developmental Biologists (ISDB) Prize for best poster at the annual meeting" },
  { year: "2011", text: "ASPB Early Career Award by the American Society of Plant Biologists" },
  { year: "2011", text: "UC Davis Award for Excellence in Postdoctoral Research" },
  { year: "2014", text: "DuPont Young Professor Award" },
  { year: "2016", text: "G.D. Naidu Award" },
];

const fellowships = [
  { year: "1999", text: "TNAU merit scholarship for M.Sc. (Ag) programme — declined" },
  { year: "1999 – 2000", text: "Senior Research Fellowship, Rockefeller Foundation International Rice Biotechnology Programme" },
  { year: "2001 – 2003", text: "Junior Research Fellowship, University Grants Commission (UGC), Government of India" },
  { year: "2003 – 2006", text: "Senior Research Fellowship, UGC, Government of India" },
  { year: "2007", text: "Travel Grant, Department of Science and Technology (DST), Government of India" },
  { year: "2012", text: "Ramalingaswami Re-entry Fellowship, Department of Biotechnology (DBT), Government of India" },
];

const patents = [
  {
    year: "2014",
    title: "Nucleic acids and methods for producing seeds with a full diploid complement of the maternal genome in the embryo",
    inventors: "Siddiqi, I., Ravi, M. and Marimuthu, M.P.A.",
    pub: "US 8878002 B2 · Publication date: 4 Nov 2014",
  },
  {
    year: "2013",
    title: "Generation of haploid plants and improved plant breeding",
    inventors: "Chan, S. and Ravi, M.",
    pub: "US 20110083202 A1 (also AU2010303635B2, MX349747B, EP2486135A4, WO2011044132A1, US8618354B2, RU2571927C2, CA2774941A1) · 31 Dec 2013",
  },
  {
    year: "2014",
    title: "Synthetic clonal reproduction through seeds",
    inventors: "Mercier, R., Nogue, F., Chan, S. and Ravi, M.",
    pub: "EP 2645845A4 (also CA2819491A1, WO2012075195A1) · 5 Nov 2014",
  },
];

const timeline = [
  {
    year: "1993 – 1998",
    type: "Education",
    title: "B.Sc (Ag.)",
    place: "Tamil Nadu Agricultural University (TNAU), Coimbatore",
    note: "",
  },
  {
    year: "1998 – 2000",
    type: "Education",
    title: "M.Sc. (Ag.) Plant Breeding and Genetics",
    place: "Centre for Plant Breeding and Genetics (CPBG), TNAU, Coimbatore",
    note: "Mentor: Dr. M. Maheswaran, Professor (Genetics), CPBG",
  },
  {
    year: "2001 – 2008",
    type: "Education",
    title: "Ph.D",
    place: "Centre for Cellular and Molecular Biology (CCMB), Hyderabad",
    note: "Degree awarded by Jawaharlal Nehru University (JNU), New Delhi. PI: Dr. Imran Siddiqi, CCMB.",
  },
  {
    year: "2008 – 2012",
    type: "Experience",
    title: "Post Doctoral Research Scholar",
    place: "Department of Plant Biology, University of California at Davis",
    note: "PI: Late Dr. Simon Chan, GBMF–HHMI investigator & Associate Professor, UC Davis.",
  },
];

function getSectionProgress(section: HTMLElement | null) {
  if (!section) return 0;
  const rect = section.getBoundingClientRect();
  const scrollableDistance = rect.height - window.innerHeight;
  return scrollableDistance > 0 ? clamp(-rect.top / scrollableDistance) : 0;
}

function ConfocalFrame({
  name,
  img,
  isAlumni = false,
}: {
  name: string;
  role?: string;
  img: string;
  isAlumni?: boolean;
}) {
  return (
    <div className="mx-auto mb-5 w-full max-w-[14rem] flex flex-col items-center">
      <div className="relative w-44 h-44 rounded-full bg-slate-900 border-[10px] border-slate-800 shadow-[0_0_40px_rgba(0,0,0,0.5),inset_0_0_30px_rgba(0,0,0,0.8)] flex items-center justify-center overflow-hidden group">
        <div className={`w-full h-full overflow-hidden ${isAlumni ? "grayscale contrast-125" : "contrast-110 saturate-125"}`}>
          <img src={img} alt={name} className="h-full w-full object-cover scale-110 transition-transform duration-700 group-hover:scale-125" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
          <div className="w-full h-px bg-white" />
          <div className="h-full w-px bg-white absolute" />
        </div>
        <div className="absolute bottom-5 right-5 flex items-center gap-1 opacity-50">
          <div className="w-5 h-px bg-white" />
          <span className="text-[6px] text-white font-mono">10μm</span>
        </div>
        {isAlumni && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-600/80 text-white text-[7px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
            Alumni
          </div>
        )}
      </div>
    </div>
  );
}

function DNADock({ activeSection }: { activeSection: string }) {
  return (
    <nav className="dna-dock fixed right-3 top-1/2 z-50 hidden h-[78vh] max-h-[650px] min-h-[520px] w-52 -translate-y-1/2 lg:block" aria-label="Main navigation">
      <svg className="absolute inset-y-0 right-0 h-full w-20 overflow-visible" viewBox="0 0 80 650" fill="none" aria-hidden="true">
        <path className="dna-strand dna-strand-a" d="M24 20 C68 82 68 142 24 204 C-20 266 -20 326 24 388 C68 450 68 510 24 572 C8 594 4 614 10 632" />
        <path className="dna-strand dna-strand-b" d="M56 20 C12 82 12 142 56 204 C100 266 100 326 56 388 C12 450 12 510 56 572 C72 594 76 614 70 632" />
        {navItems.map((item, index) => {
          const y = 42 + index * 70;
          const leftX = index % 2 === 0 ? 24 : 56;
          const rightX = index % 2 === 0 ? 56 : 24;
          const isActive = item.href === `#${activeSection}`;

          return (
            <g key={item.label} className={`dna-rung ${isActive ? "is-active" : ""}`}>
              <line x1={leftX} y1={y} x2={rightX} y2={y + 24} />
              <circle cx={leftX} cy={y} r="4.5" />
              <circle cx={rightX} cy={y + 24} r="4.5" />
            </g>
          );
        })}
      </svg>

      <div className="absolute inset-y-0 right-0 w-full">
        {navItems.map((item, index) => {
          const isActive = item.href === `#${activeSection}`;
          return (
            <a
              key={item.label}
              href={item.href}
              className={`dna-link group absolute right-12 flex items-center gap-3 text-right text-[10px] font-semibold uppercase tracking-[0.24em] transition duration-300 ${
                isActive ? "text-cyan-200" : "text-white/54 hover:text-cyan-100"
              }`}
              style={{
                top: `${((54 + index * 70) / 650) * 100}%`,
                transform: `translateY(-50%) translateX(${index % 2 === 0 ? 0 : -18}px)`,
              }}
            >
              <span className={`dna-link-text rounded-full border px-3 py-2 backdrop-blur-md transition duration-300 ${
                isActive
                  ? "border-cyan-400/50 bg-cyan-400/15 shadow-[0_0_15px_rgba(34,211,238,0.25)] text-cyan-200"
                  : "border-white/10 bg-black/28 group-hover:border-cyan-200/45 group-hover:bg-cyan-300/10"
              }`}>
                {item.label}
              </span>
              <span className={`h-px transition duration-300 ${
                isActive ? "w-8 bg-cyan-300" : "w-5 bg-cyan-100/35 group-hover:w-8 group-hover:bg-cyan-100"
              }`} />
            </a>
          );
        })}
      </div>
    </nav>
  );
}

export default function App() {
  const homeSectionRef = useRef<HTMLElement | null>(null);
  const plantSectionRef = useRef<HTMLElement | null>(null);
  const chromosomeSectionRef = useRef<HTMLElement | null>(null);
  const membersSectionRef = useRef<HTMLElement | null>(null);
  
  const [labProgress, setLabProgress] = useState(0);
  const [plantProgress, setPlantProgress] = useState(0);
  const [chromosomeProgress, setChromosomeProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    let frame = 0;
    const updateProgress = () => {
      setLabProgress(getSectionProgress(homeSectionRef.current));
      setPlantProgress(getSectionProgress(plantSectionRef.current));
      setChromosomeProgress(getSectionProgress(chromosomeSectionRef.current));
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Reveal elements when they enter the viewport
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal-on-view");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -80px 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // ScrollSpy to track active section
  useEffect(() => {
    const sectionIds = ["home", "about-pi", "research", "research-interests", "publications", "lab-members", "alumni", "contact"];
    const elements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let id = entry.target.id;
            // Map sub-sections to their main navigation anchor
            if (id === "research-interests") id = "research";
            setActiveSection(id);
          }
        });
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // --- Animations ---
  const labLogoOpacity = 1 - smooth(clamp(labProgress / 0.45));
  const labLogoScale = 1.0 + labProgress * 0.08;
  const labLogoY = 0;
  const homeBgColorOpacity = smooth(clamp((labProgress - 0.65) / 0.3));

  const plantEnter = smooth(clamp(plantProgress / 0.28));
  const plantBaseScale = 0.28 + plantEnter * 0.72;
  const plantEnterOpacity = plantEnter;
  const plantEnterY = (1 - plantEnter) * -12;
  const introReveal = smooth(clamp((plantProgress - 0.18) / 0.22));
  const nameOpacity = introReveal * (1 - smooth(clamp((plantProgress - 0.50) / 0.2)));
  const zoomEased = smooth(clamp((plantProgress - 0.40) / 0.42));
  const plantScale = plantBaseScale + zoomEased * 14;
  const plantX = -zoomEased * 35;
  const plantY = plantEnterY - zoomEased * 18;
  const plantOpacity = plantEnterOpacity * (1 - smooth(clamp((plantProgress - 0.82) / 0.18)));
  const plantBlur = smooth(clamp((plantProgress - 0.72) / 0.18)) * 20;

  const chromosomeIntro = smooth(clamp(chromosomeProgress / 0.18));
  const researchReveal = smooth(clamp((chromosomeProgress - 0.28) / 0.28));
  const chromosomeScale = 1.15 - chromosomeProgress * 0.08;
  const chromosomeX = -researchReveal * 7;
  const chromosomeTitleY = researchReveal * -32;
  const chromosomeTitleScale = 1 - researchReveal * 0.28;

  return (
    <main className="min-h-screen">
      <DNADock activeSection={activeSection} />

      {/* === Floating Mobile/Tablet Header === */}
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 bg-black/40 backdrop-blur-md border-b border-white/5 lg:hidden">
        <a href="#home" className="flex items-center gap-3">
          <img src="./favicon.png" alt="HapGen Logo" className="w-8 h-8 object-contain" />
          <span className="text-lg font-light tracking-[0.2em] text-white uppercase">HapGen</span>
        </a>
        <button
          type="button"
          onClick={() => setIsMenuOpen(true)}
          className="text-white hover:text-cyan-300 transition-colors p-2"
          aria-label="Open menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      {/* === Fullscreen Mobile Navigation Drawer === */}
      <div
        className={`fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex flex-col justify-center items-center transition-all duration-500 lg:hidden ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          type="button"
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-6 right-6 text-white hover:text-cyan-300 transition-colors p-2"
          aria-label="Close menu"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <nav className="flex flex-col gap-6 text-center">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl font-light tracking-[0.25em] uppercase text-white hover:text-cyan-300 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      {/* === SECTION 1: HapGen Lab === */}
      <section id="home" ref={homeSectionRef} className="relative h-[250vh] bg-[#f7f8f6]">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden transition-colors duration-75" style={{ backgroundColor: `rgba(0, 0, 0, ${homeBgColorOpacity})` }}>
          <BiologicalParticles progress={labProgress} />
          <div className="absolute inset-0 w-full h-full will-change-transform pointer-events-none" style={{ opacity: labLogoOpacity, transform: `scale(${labLogoScale}) translateY(${labLogoY}px)` }}>
            <img src="./images/hapgen.png" alt="HapGen Lab Logo" className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-12 left-1/2 flex -translate-x-1/2 flex-col items-center gap-4" style={{ opacity: 1 - smooth(clamp(labProgress / 0.35)) }}>
            <span className="text-[9px] uppercase tracking-[0.5em] text-gray-400">Scroll to explore</span>
            <div className="scroll-line h-10 w-px bg-gradient-to-b from-gray-400 to-transparent" />
          </div>
        </div>
      </section>

      {/* === SECTION 2: About PI === */}
      <section id="about-pi" className="relative min-h-screen overflow-hidden bg-black text-white py-24 lg:py-32">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('./images/cell-division.jpg')",
            opacity: 0.9,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/25 to-black/55" />

        <div className="relative max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="reveal-on-view">
            <p className="text-[10px] font-semibold uppercase tracking-[0.6em] text-cyan-300/80 mb-3">About PI</p>
            <h2 className="text-[clamp(2.2rem,5vw,4.2rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-white">Dr. Ravi Maruthachalam</h2>
            <p className="mt-3 text-base sm:text-lg text-cyan-100/55 font-light italic">Principal Investigator · HapGen Lab</p>
          </div>

          <div className="mt-14 grid lg:grid-cols-[340px_1fr] gap-10 lg:gap-16 items-start">
            <div className="reveal-on-view relative aspect-[3/4] w-full max-w-[340px] rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_60px_-20px_rgba(103,232,249,0.25)]" style={{ animationDelay: "120ms" }}>
              <img src="./images/dr-ravi.jpg" alt="Dr. Ravi Maruthachalam" className="h-full w-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; (e.target as HTMLImageElement).parentElement!.classList.add("bg-gradient-to-br", "from-cyan-900/40", "to-slate-900"); }} />
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/85 to-transparent">
                <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-200/70">Principal Investigator</p>
                <p className="text-sm text-white/90 mt-1">Plant Cytogenetics & Genome Engineering</p>
              </div>
            </div>

            <div className="reveal-on-view space-y-5 text-white/70 font-light leading-relaxed text-base sm:text-lg" style={{ animationDelay: "220ms" }}>
              <p className="text-white/85 text-lg sm:text-xl">Welcome to the HapGen Lab — where genetics meets discovery.</p>
              <p>Our research focuses on understanding the fundamental mechanisms governing plant chromosome biology, with a particular emphasis on centromere function, uniparental genome elimination, and the development of haploid induction systems.</p>
              <p>By bridging classical cytogenetics with modern molecular tools, we aim to unravel how genomes maintain stability across generations and how that knowledge can be harnessed to accelerate crop improvement.</p>
              <p className="text-cyan-100/70 italic text-sm sm:text-base pt-2">"Genetics never lies."</p>
            </div>
          </div>

          <div className="mt-28 lg:mt-36">
            <p className="text-[10px] font-semibold uppercase tracking-[0.6em] text-cyan-300/80 mb-3">Personal Information</p>
            <h3 className="text-[clamp(1.8rem,3.5vw,3rem)] font-light tracking-[-0.03em] text-white">Profile &amp; <span className="italic text-cyan-100/80">Recognition</span></h3>
            <p className="mt-3 text-sm text-white/45">Click any section below to expand.</p>
          </div>

          <div className="mt-10 border-t border-white/10">
            {/* === Collapsible 1: Education & Experience === */}
            <CollapsibleSection title={<>Education &amp; <span className="italic text-cyan-100/80">Experience</span></>} defaultOpen>
              <div className="grid gap-10 lg:grid-cols-2">
                <div>
                  <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.5em] text-cyan-300/70">Education</p>
                  <ul className="space-y-4">
                    {timeline.filter((t) => t.type === "Education").map((item, i) => (
                      <li key={i} className="border-l border-cyan-300/25 pl-4">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-cyan-200/70">{item.year}</span>
                        <p className="mt-1 text-base sm:text-lg text-white/85 font-light leading-snug">{item.title}</p>
                        <p className="mt-1 text-sm text-cyan-100/60 font-light">{item.place}</p>
                        {item.note && <p className="mt-1 text-xs sm:text-sm text-white/45 font-light leading-relaxed">{item.note}</p>}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.5em] text-lime-300/70">Experience</p>
                  <ul className="space-y-4">
                    {timeline.filter((t) => t.type === "Experience").map((item, i) => (
                      <li key={i} className="border-l border-lime-300/25 pl-4">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-lime-200/70">{item.year}</span>
                        <p className="mt-1 text-base sm:text-lg text-white/85 font-light leading-snug">{item.title}</p>
                        <p className="mt-1 text-sm text-cyan-100/60 font-light">{item.place}</p>
                        {item.note && <p className="mt-1 text-xs sm:text-sm text-white/45 font-light leading-relaxed">{item.note}</p>}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CollapsibleSection>

            {/* === Collapsible 2: Awards & Fellowships === */}
            <CollapsibleSection title={<>Awards &amp; <span className="italic text-cyan-100/80">Fellowships</span></>}>
              <div className="grid gap-10 lg:grid-cols-2">
                <div>
                  <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.5em] text-lime-300/70">Awards</p>
                  <ul className="space-y-4">
                    {awards.map((a, i) => (
                      <li key={i} className="flex gap-4 border-l border-lime-300/25 pl-4">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-lime-200/70 whitespace-nowrap pt-1">{a.year}</span>
                        <p className="text-sm sm:text-base text-white/75 leading-relaxed">{a.text}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.5em] text-cyan-300/70">Fellowships</p>
                  <ul className="space-y-4">
                    {fellowships.map((f, i) => (
                      <li key={i} className="flex gap-4 border-l border-cyan-300/25 pl-4">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-cyan-200/70 whitespace-nowrap pt-1">{f.year}</span>
                        <p className="text-sm sm:text-base text-white/75 leading-relaxed">{f.text}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CollapsibleSection>

            {/* === Collapsible 3: Patents === */}
            <CollapsibleSection title={<>Patents</>}>
              <div className="space-y-6">
                {patents.map((p, i) => (
                  <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-5 sm:p-6 hover:border-cyan-200/30 transition-all duration-500">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/8 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-200/90">
                        Patent
                      </span>
                      <span className="text-[11px] uppercase tracking-[0.3em] text-white/45">{p.year}</span>
                    </div>
                    <h4 className="text-lg sm:text-xl font-light tracking-[-0.02em] text-white leading-snug">{p.title}</h4>
                    <p className="mt-2 text-sm sm:text-base text-cyan-100/70 font-light italic">{p.inventors}</p>
                    <p className="mt-3 text-xs sm:text-sm text-white/45 font-light leading-relaxed border-t border-white/10 pt-3">{p.pub}</p>
                  </div>
                ))}
              </div>
            </CollapsibleSection>
          </div>
        </div>
      </section>

      {/* === SECTION 3: Arabidopsis Plant === */}
      <section id="research" ref={plantSectionRef} className="relative h-[200vh] lg:h-[500vh] bg-black text-white">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <div className="absolute inset-0 will-change-transform" style={{ transformOrigin: "62% 30%", transform: `translate3d(${plantX}%, ${plantY}%, 0) scale(${plantScale})`, opacity: plantOpacity, filter: plantBlur > 0.5 ? `blur(${plantBlur}px)` : undefined, transition: "transform 60ms linear" }}>
            <img src="./images/arabidopsis-real.jpg" alt="Arabidopsis thaliana specimen" className="hero-plant h-full w-full object-contain object-center" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_20%,rgba(0,0,0,0.35)_60%,black_95%)]" />
          </div>
          <div className="absolute left-0 top-0 z-10 w-full px-8 pt-10 pointer-events-none sm:px-12 sm:pt-16" style={{ opacity: introReveal * (1 - smooth(clamp((plantProgress - 0.50) / 0.15))), transform: `translateY(${(1 - introReveal) * 30}px)` }}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.6em] text-lime-400/90">Biological Model</p>
          </div>
          <div className="absolute bottom-0 left-0 z-10 w-full px-8 pb-14 pointer-events-none sm:px-12 sm:pb-16" style={{ opacity: nameOpacity, transform: `translateY(${(1 - introReveal) * 60}px)` }}>
            <h1 className="text-[clamp(3rem,12vw,10rem)] font-bold uppercase leading-[0.85] tracking-tighter text-white">Arabidopsis<span className="block font-light italic tracking-tight text-white/70">Thaliana</span></h1>
          </div>
          <div className="absolute bottom-12 left-1/2 flex -translate-x-1/2 flex-col items-center gap-4" style={{ opacity: clamp(1 - plantProgress * 5) }}>
            <span className="text-[9px] uppercase tracking-[0.5em] text-white/40">Scroll to research</span>
            <div className="scroll-line h-10 w-px bg-gradient-to-b from-white/40 to-transparent" />
          </div>
        </div>
      </section>

      {/* === SECTION 4: Chromosome & Research Interests === */}
      <section id="research-interests" ref={chromosomeSectionRef} className="relative h-[200vh] lg:h-[430vh] bg-black">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <div className="absolute inset-0 will-change-transform" style={{ opacity: chromosomeIntro, transform: `translate3d(${chromosomeX}%, 0, 0) scale(${chromosomeScale})`, transition: "transform 70ms linear" }}>
            <img src="./images/chromosome-field.jpg" alt="Glowing chromosomes in a dark microscopic field" className="chromosome-field h-full w-full object-cover object-center" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_45%,transparent_0%,rgba(0,0,0,0.2)_45%,black_100%)]" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/10 to-black/70" />
          </div>
          <div className="absolute left-8 top-[42%] z-10 max-w-5xl -translate-y-1/2 pointer-events-none sm:left-12 lg:left-16" style={{ opacity: chromosomeIntro, transform: `translate3d(0, calc(-50% + ${chromosomeTitleY}px), 0) scale(${chromosomeTitleScale})`, transformOrigin: "left center" }}>
            <h2 className="text-[clamp(3.8rem,13vw,13rem)] font-semibold uppercase leading-[0.78] tracking-[-0.09em] text-white">Research<span className="block font-light italic tracking-tight text-cyan-100/75">Interests</span></h2>
          </div>
          <div className="absolute bottom-12 left-8 right-8 z-10 pointer-events-none sm:left-12 sm:right-12 lg:left-auto lg:right-16 lg:top-1/2 lg:w-[46vw] lg:-translate-y-1/2" style={{ opacity: researchReveal, transform: `translateY(${(1 - researchReveal) * 40}px)` }}>
            <p className="mb-7 text-[10px] font-semibold uppercase tracking-[0.55em] text-cyan-200/70">Focus areas</p>
            <div className="space-y-4 sm:space-y-5">
              {researchInterests.map((interest, index) => {
                const lineReveal = smooth(clamp((chromosomeProgress - (0.38 + index * 0.075)) / 0.12));
                return (
                  <p key={interest} className="border-b border-cyan-200/15 pb-4 text-[clamp(1.45rem,3.5vw,4.25rem)] font-light leading-[0.95] tracking-[-0.055em] text-white" style={{ opacity: lineReveal, transform: `translateX(${(1 - lineReveal) * 34}px)` }}>{interest}</p>
                );
              })}
            </div>
          </div>
          <div className="absolute bottom-12 left-1/2 flex -translate-x-1/2 flex-col items-center gap-4" style={{ opacity: chromosomeIntro * clamp(1 - chromosomeProgress * 5) }}>
            <span className="text-[9px] uppercase tracking-[0.5em] text-cyan-100/45">End of overview</span>
            <div className="scroll-line h-10 w-px bg-gradient-to-b from-cyan-100/45 to-transparent" />
          </div>
        </div>
      </section>

      {/* === SECTION 5: Publications === */}
      <section id="publications" className="relative overflow-hidden bg-[#f6f0df] px-6 py-24 text-slate-950 sm:px-10 lg:px-16 lg:py-32">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('./images/lab-doodle-bg.jpg')",
            opacity: 0.55,
          }}
        />

        <div className="relative mx-auto max-w-7xl">
          <div className="reveal-on-view mb-14 max-w-5xl">
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.6em] text-emerald-900/60">
              Research output
            </p>
            <h2 className="text-[clamp(2.2rem,8vw,8rem)] font-semibold uppercase leading-[0.8] tracking-[-0.09em] text-slate-950">
              Publications
            </h2>
            <p className="mt-8 max-w-3xl text-sm leading-7 text-slate-700 sm:text-base">
              Latest-first publication list compiled from Dr. Ravi Maruthachalam's IISER TVM faculty publications page, with recent additions cross-checked through Google Scholar, ResearchGate, SciProfiles, and publisher records.
            </p>
          </div>

          <div className="grid gap-4">
            {publications.map((publication, index) => (
              <a
                key={`${publication.year}-${publication.title}`}
                href={publication.link}
                target="_blank"
                rel="noreferrer"
                className="reveal-on-view group grid gap-4 border-t border-slate-950/15 bg-white/72 px-4 py-5 backdrop-blur-md transition duration-300 hover:bg-white/92 sm:grid-cols-[7rem_1fr] sm:px-6"
                style={{ animationDelay: `${Math.min(index, 10) * 45}ms` }}
              >
                <div>
                  <p className="text-2xl font-semibold tracking-[-0.06em] text-emerald-900 sm:text-3xl">
                    {publication.year}
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.34em] text-slate-500">
                    #{String(index + 1).padStart(2, "0")}
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-light leading-tight tracking-[-0.04em] text-slate-950 transition group-hover:text-emerald-900 sm:text-3xl">
                    {publication.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-700">
                    {publication.authors}
                  </p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-900/55">
                    {publication.venue}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* === SECTION 6: Lab Members === */}
      <section id="lab-members" ref={membersSectionRef} className="relative bg-[#f7f8f4] text-[#081014] py-24 lg:py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('./images/karyotype-logo.jpg')",
            opacity: 0.15,
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="reveal-on-view mb-14">
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.6em] text-emerald-800/60">
              The Team
            </p>
            <h2 className="text-[clamp(3rem,9vw,9rem)] font-semibold uppercase leading-[0.82] tracking-[-0.085em] text-slate-950">
              Lab<span className="block font-light italic tracking-[-0.06em] text-emerald-900/65">Members</span>
            </h2>
          </div>

          <div className="border-t border-slate-950/10">
            {/* Active Members - PhDs */}
            <CollapsibleSection title={<>Active Members — <span className="italic text-emerald-900/65">PhDs</span></>} defaultOpen>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {activeMembers.phds.map((member, i) => (
                  <div key={member.name} className="reveal-on-view rounded-2xl border border-slate-950/10 bg-white/80 p-6 shadow-lg backdrop-blur-md" style={{ animationDelay: `${i * 80}ms` }}>
                    <ConfocalFrame name={member.name} role={member.role} img={member.img} />
                    <h3 className="text-center text-lg font-semibold text-slate-950">{member.name}</h3>
                    <p className="text-center text-xs text-emerald-800/65 mt-1 uppercase tracking-[0.2em]">{member.role}</p>
                    <p className="text-center text-xs text-slate-600 mt-2">{member.focus}</p>
                  </div>
                ))}
              </div>
            </CollapsibleSection>

            {/* Active Members - Project Students */}
            <CollapsibleSection title={<>Active Members — <span className="italic text-emerald-900/65">Project Students</span></>}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {activeMembers.projectStudents.map((member, i) => (
                  <div key={member.name} className="reveal-on-view rounded-2xl border border-slate-950/10 bg-white/80 p-6 shadow-lg backdrop-blur-md" style={{ animationDelay: `${i * 80}ms` }}>
                    <ConfocalFrame name={member.name} role={member.role} img={member.img} />
                    <h3 className="text-center text-lg font-semibold text-slate-950">{member.name}</h3>
                    <p className="text-center text-xs text-emerald-800/65 mt-1 uppercase tracking-[0.2em]">{member.role}</p>
                    <p className="text-center text-xs text-slate-600 mt-2">{member.focus}</p>
                  </div>
                ))}
              </div>
            </CollapsibleSection>

            {/* Active Members - BSMs */}
            <CollapsibleSection title={<>Active Members — <span className="italic text-emerald-900/65">BS-MS Majors</span></>}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {activeMembers.bsms.map((member, i) => (
                  <div key={member.name} className="reveal-on-view rounded-2xl border border-slate-950/10 bg-white/80 p-6 shadow-lg backdrop-blur-md" style={{ animationDelay: `${i * 80}ms` }}>
                    <ConfocalFrame name={member.name} role={member.role} img={member.img} />
                    <h3 className="text-center text-lg font-semibold text-slate-950">{member.name}</h3>
                    <p className="text-center text-xs text-emerald-800/65 mt-1 uppercase tracking-[0.2em]">{member.role}</p>
                    <p className="text-center text-xs text-slate-600 mt-2">{member.focus}</p>
                  </div>
                ))}
              </div>
            </CollapsibleSection>

            {/* Active Members - Interns */}
            <CollapsibleSection title={<>Active Members — <span className="italic text-emerald-900/65">Interns</span></>}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {activeMembers.interns.map((member, i) => (
                  <div key={member.name} className="reveal-on-view rounded-2xl border border-slate-950/10 bg-white/80 p-6 shadow-lg backdrop-blur-md" style={{ animationDelay: `${i * 80}ms` }}>
                    <ConfocalFrame name={member.name} role={member.role} img={member.img} />
                    <h3 className="text-center text-lg font-semibold text-slate-950">{member.name}</h3>
                    <p className="text-center text-xs text-emerald-800/65 mt-1 uppercase tracking-[0.2em]">{member.role}</p>
                    <p className="text-center text-xs text-slate-600 mt-2">{member.focus}</p>
                  </div>
                ))}
              </div>
            </CollapsibleSection>

            {/* Alumni */}
            <div id="alumni">
              <CollapsibleSection title={<>Alumni</>}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {alumni.map((member, i) => (
                  <div key={member.name} className="reveal-on-view rounded-2xl border border-slate-950/10 bg-white/60 p-6 shadow-lg backdrop-blur-md" style={{ animationDelay: `${i * 80}ms` }}>
                    <ConfocalFrame name={member.name} role={member.role} img={member.img} isAlumni />
                    <h3 className="text-center text-lg font-semibold text-slate-950 grayscale">{member.name}</h3>
                    <p className="text-center text-xs text-emerald-800/65 mt-1 uppercase tracking-[0.2em] grayscale">{member.role}</p>
                    <p className="text-center text-xs text-slate-500 mt-2 italic">Now: {member.now}</p>
                  </div>
                ))}
              </div>
            </CollapsibleSection>
            </div>
          </div>
        </div>
      </section>

      {/* === SECTION 6: Contact === */}
      <section id="contact" className="relative min-h-screen overflow-hidden bg-black px-6 py-24 text-white sm:px-10 lg:px-16 lg:py-32">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('./images/microscopy-bg.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.72)_38%,rgba(0,0,0,0.82)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(103,232,249,0.12),transparent_32%),radial-gradient(circle_at_78%_70%,rgba(190,242,100,0.11),transparent_36%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.06)_0_1px,transparent_1px_120px)] opacity-30" />

        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="reveal-on-view">
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.6em] text-cyan-300/75">
              Contact
            </p>
            <h2 className="text-[clamp(2.2rem,8vw,8rem)] font-semibold uppercase leading-[0.8] tracking-[-0.09em] text-white">
              Get in
              <span className="block font-light italic tracking-[-0.06em] text-cyan-100/70">Touch</span>
            </h2>
            <p className="mt-8 max-w-xl text-sm leading-7 text-white/52 sm:text-base">
              Contact details for Dr. Ravi Maruthachalam, listed from the IISER TVM faculty contact page.
            </p>
          </div>

          <div className="reveal-on-view rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8" style={{ animationDelay: "140ms" }}>
            <div className="border-b border-white/10 pb-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.42em] text-lime-300/70">
                Principal Investigator
              </p>
              <h3 className="mt-3 text-3xl font-light tracking-[-0.04em] text-white sm:text-5xl">
                Dr. Ravi Maruthachalam
              </h3>
              <p className="mt-3 text-sm text-white/50 sm:text-base">
                Associate Professor (Biology), School of Biology, IISER Thiruvananthapuram
              </p>
            </div>

            <div className="grid gap-5 py-7 sm:grid-cols-2">
              <a href="mailto:ravi@iisertvm.ac.in" className="group rounded-2xl border border-white/10 bg-black/28 p-5 transition duration-300 hover:border-cyan-200/40 hover:bg-cyan-200/10">
                <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-cyan-200/55">Email</p>
                <p className="mt-3 break-all text-lg font-light tracking-[-0.02em] text-white group-hover:text-cyan-100">
                  ravi@iisertvm.ac.in
                </p>
              </a>

              <a href="tel:+914712778175" className="group rounded-2xl border border-white/10 bg-black/28 p-5 transition duration-300 hover:border-lime-200/40 hover:bg-lime-200/10">
                <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-lime-200/55">Phone</p>
                <p className="mt-3 text-lg font-light tracking-[-0.02em] text-white group-hover:text-lime-100">
                  +91 (0)471 - 2778175
                </p>
              </a>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/24 p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/40">Address</p>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/68 sm:text-base">
                School of Biology, Indian Institute of Science Education and Research, Maruthamala P.O, Vithura, Thiruvananthapuram - 695551, Kerala, India.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 text-[11px] uppercase tracking-[0.24em] text-white/35 sm:flex-row sm:items-center sm:justify-between">
              <a href="https://www.iisertvm.ac.in/faculty/ravi/contact" target="_blank" rel="noreferrer" className="transition hover:text-cyan-100">
                IISER TVM Faculty Contact
              </a>
              <a href="https://www.iisertvm.ac.in/faculty/ravi" target="_blank" rel="noreferrer" className="transition hover:text-lime-100">
                Faculty Profile
              </a>
            </div>
            <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-white/28">
              Background: IISER TVM academic block, Biological Sciences building in green.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
