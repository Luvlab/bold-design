'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
  Globe, Code2, Lightbulb, Palette, Plus, ExternalLink,
  GitBranch, Users, Layers, ChevronRight, Lock
} from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────
interface InhouseProject {
  id: string;
  created_at: string;
  slug: string;
  name: string;
  name_fr?: string;
  name_mn?: string;
  description?: string;
  description_fr?: string;
  category: 'dev' | 'concept' | 'design' | 'research';
  status: 'concept' | 'design' | 'dev' | 'beta' | 'live' | 'paused';
  owner: string;
  tech_stack: string[];
  tags: string[];
  target_audience?: string;
  languages: string[];
  is_featured: boolean;
  url?: string;
  github_url?: string;
  notes?: string;
}

interface DBConcept {
  id: string;
  slug: string;
  name_fr: string;
  name_en?: string;
  name_mn?: string;
  description_en?: string;
  type: string;
  stage: string;
  is_featured: boolean;
}

interface DBProduct {
  id: string;
  name_fr: string;
  name_en?: string;
  category?: string;
  status: string;
  tags: string[];
}

// ── Status badge ──────────────────────────────────────────────────────────────
const STATUS_COLORS: Record<string, string> = {
  concept : 'bg-bold-border text-bold-muted',
  design  : 'bg-blue-900/40 text-blue-300',
  dev     : 'bg-yellow-900/40 text-yellow-300',
  beta    : 'bg-purple-900/40 text-purple-300',
  live    : 'bg-green-900/40 text-green-300',
  paused  : 'bg-red-900/40 text-red-400',
  research: 'bg-bold-border text-bold-muted',
  ready   : 'bg-green-900/40 text-green-300',
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`text-[9px] uppercase tracking-[0.12em] px-2 py-0.5 rounded-sm font-semibold ${STATUS_COLORS[status] ?? 'bg-bold-border text-bold-muted'}`}>
      {status}
    </span>
  );
}

// ── Category pill ─────────────────────────────────────────────────────────────
const CAT_LABELS: Record<string, string> = { dev: 'Dev Project', concept: 'Concept', design: 'Design', research: 'Research' };

// ── Inhouse project card ──────────────────────────────────────────────────────
function InhouseCard({ project }: { project: InhouseProject }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`bold-card rounded-sm p-6 flex flex-col gap-4 cursor-pointer transition-all duration-200 ${
        project.is_featured ? 'border-bold-gold/40 bg-gradient-to-br from-bold-gold/5 to-bold-card' : ''
      }`}
      onClick={() => setExpanded(e => !e)}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            {project.is_featured && (
              <span className="text-[9px] uppercase tracking-widest text-bold-gold font-semibold">★ Featured</span>
            )}
            <StatusBadge status={project.status} />
            <span className="text-[9px] uppercase tracking-wider text-bold-muted px-2 py-0.5 rounded-sm border border-bold-border">
              {CAT_LABELS[project.category] ?? project.category}
            </span>
          </div>
          <h3 className="text-bold-light font-bold text-lg leading-tight">{project.name}</h3>
          {project.name_fr && (
            <p className="text-bold-muted text-xs mt-0.5">{project.name_fr}</p>
          )}
        </div>
        <ChevronRight
          size={16}
          className={`text-bold-muted flex-shrink-0 transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`}
        />
      </div>

      {/* Description */}
      {project.description && (
        <p className="text-bold-muted text-sm leading-relaxed">
          {expanded ? project.description : project.description.slice(0, 120) + (project.description.length > 120 ? '…' : '')}
        </p>
      )}

      {/* Tags */}
      {project.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map(tag => (
            <span key={tag} className="text-[9px] uppercase tracking-wider px-2 py-0.5 bg-bold-border/50 text-bold-muted rounded-sm">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Expanded detail */}
      {expanded && (
        <div className="pt-2 border-t border-bold-border space-y-3">
          {project.description_fr && (
            <p className="text-bold-muted text-xs leading-relaxed italic border-l-2 border-bold-gold/30 pl-3">
              🇫🇷 {project.description_fr}
            </p>
          )}
          {project.target_audience && (
            <div className="flex items-start gap-2 text-xs text-bold-muted">
              <Users size={13} className="flex-shrink-0 mt-0.5 text-bold-gold" />
              <span>{project.target_audience}</span>
            </div>
          )}
          {project.languages?.length > 0 && (
            <div className="flex items-start gap-2 text-xs text-bold-muted">
              <Globe size={13} className="flex-shrink-0 mt-0.5 text-bold-gold" />
              <span>{project.languages.join(' · ')}</span>
            </div>
          )}
          {project.tech_stack?.length > 0 && (
            <div className="flex items-start gap-2 text-xs text-bold-muted">
              <Code2 size={13} className="flex-shrink-0 mt-0.5 text-bold-gold" />
              <span>{project.tech_stack.join(' · ')}</span>
            </div>
          )}
          {project.owner && (
            <div className="flex items-center gap-2 text-xs text-bold-muted">
              <Layers size={13} className="text-bold-gold" />
              <span>Owner: <strong className="text-bold-light">{project.owner}</strong></span>
            </div>
          )}
          <div className="flex gap-3 pt-1">
            {project.url && (
              <a href={project.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-bold-gold hover:text-bold-gold-light transition-colors"
                onClick={e => e.stopPropagation()}>
                <ExternalLink size={12} /> Live
              </a>
            )}
            {project.github_url && (
              <a href={project.github_url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-bold-muted hover:text-bold-light transition-colors"
                onClick={e => e.stopPropagation()}>
                <GitBranch size={12} /> GitHub
              </a>
            )}
          </div>
          {project.notes && (
            <p className="text-bold-muted text-xs bg-bold-bg/50 rounded-sm p-3 leading-relaxed">
              📝 {project.notes}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// ── Restaurant concept card ───────────────────────────────────────────────────
function ConceptCard({ concept }: { concept: DBConcept }) {
  return (
    <div className="bold-card rounded-sm p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-bold-light font-semibold">{concept.name_fr}</h3>
        <StatusBadge status={concept.stage} />
      </div>
      {concept.name_en && <p className="text-bold-muted text-xs">{concept.name_en}</p>}
      {concept.description_en && (
        <p className="text-bold-muted text-sm leading-relaxed">{concept.description_en}</p>
      )}
      <div className="flex items-center gap-2">
        <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 border border-bold-border rounded-sm text-bold-muted">
          {concept.type}
        </span>
        {concept.is_featured && (
          <span className="text-[9px] uppercase tracking-widest text-bold-gold">★ Featured</span>
        )}
      </div>
    </div>
  );
}

// ── Product / Design card ─────────────────────────────────────────────────────
function ProductCard({ product }: { product: DBProduct }) {
  return (
    <div className="bold-card rounded-sm p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-bold-light font-semibold text-sm">{product.name_fr}</h3>
        <StatusBadge status={product.status} />
      </div>
      {product.name_en && <p className="text-bold-muted text-xs">{product.name_en}</p>}
      <div className="flex flex-wrap gap-1.5">
        {product.tags?.map(tag => (
          <span key={tag} className="text-[9px] uppercase tracking-wider px-2 py-0.5 bg-bold-border/50 text-bold-muted rounded-sm">{tag}</span>
        ))}
        {product.category && (
          <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 border border-bold-border/60 text-bold-muted rounded-sm">{product.category}</span>
        )}
      </div>
    </div>
  );
}

// ── Add project modal (simple form) ──────────────────────────────────────────
function AddProjectForm({ onSave, onClose }: { onSave: (p: Partial<InhouseProject>) => void; onClose: () => void }) {
  const [form, setForm] = useState({
    name: '', name_fr: '', description: '', category: 'dev',
    status: 'concept', owner: 'Bold Design', tags: '', tech_stack: '', notes: '',
  });
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="fixed inset-0 bg-bold-dark/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}>
      <div className="bg-bold-card border border-bold-border rounded-sm p-6 w-full max-w-lg space-y-4"
        onClick={e => e.stopPropagation()}>
        <h3 className="text-bold-light font-bold text-lg">New Inhouse Project</h3>

        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <label className="text-[10px] uppercase tracking-wider text-bold-muted block mb-1">Name (EN)</label>
            <input className="w-full bg-bold-bg border border-bold-border rounded-sm px-3 py-2 text-bold-light text-sm focus:outline-none focus:border-bold-gold"
              value={form.name} onChange={e => set('name', e.target.value)} placeholder="GeoKids — Geography Tutor" />
          </div>
          <div className="col-span-2">
            <label className="text-[10px] uppercase tracking-wider text-bold-muted block mb-1">Name (FR)</label>
            <input className="w-full bg-bold-bg border border-bold-border rounded-sm px-3 py-2 text-bold-light text-sm focus:outline-none focus:border-bold-gold"
              value={form.name_fr} onChange={e => set('name_fr', e.target.value)} />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-wider text-bold-muted block mb-1">Category</label>
            <select className="w-full bg-bold-bg border border-bold-border rounded-sm px-3 py-2 text-bold-light text-sm focus:outline-none focus:border-bold-gold"
              value={form.category} onChange={e => set('category', e.target.value)}>
              <option value="dev">Dev Project</option>
              <option value="concept">Concept</option>
              <option value="design">Design</option>
              <option value="research">Research</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-wider text-bold-muted block mb-1">Status</label>
            <select className="w-full bg-bold-bg border border-bold-border rounded-sm px-3 py-2 text-bold-light text-sm focus:outline-none focus:border-bold-gold"
              value={form.status} onChange={e => set('status', e.target.value)}>
              {['concept','design','dev','beta','live','paused'].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="col-span-2">
            <label className="text-[10px] uppercase tracking-wider text-bold-muted block mb-1">Description</label>
            <textarea className="w-full bg-bold-bg border border-bold-border rounded-sm px-3 py-2 text-bold-light text-sm focus:outline-none focus:border-bold-gold resize-none"
              rows={3} value={form.description} onChange={e => set('description', e.target.value)} />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-wider text-bold-muted block mb-1">Tech stack (comma-separated)</label>
            <input className="w-full bg-bold-bg border border-bold-border rounded-sm px-3 py-2 text-bold-light text-sm focus:outline-none focus:border-bold-gold"
              value={form.tech_stack} onChange={e => set('tech_stack', e.target.value)} placeholder="Next.js, AI, Supabase" />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-wider text-bold-muted block mb-1">Tags (comma-separated)</label>
            <input className="w-full bg-bold-bg border border-bold-border rounded-sm px-3 py-2 text-bold-light text-sm focus:outline-none focus:border-bold-gold"
              value={form.tags} onChange={e => set('tags', e.target.value)} placeholder="education, inhouse, AI" />
          </div>
          <div className="col-span-2">
            <label className="text-[10px] uppercase tracking-wider text-bold-muted block mb-1">Notes</label>
            <textarea className="w-full bg-bold-bg border border-bold-border rounded-sm px-3 py-2 text-bold-light text-sm focus:outline-none focus:border-bold-gold resize-none"
              rows={2} value={form.notes} onChange={e => set('notes', e.target.value)} />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            className="flex-1 py-2.5 bg-bold-gold text-bold-dark text-xs uppercase tracking-widest font-bold rounded-sm hover:bg-bold-gold-light transition-colors"
            onClick={() => {
              if (!form.name.trim()) return;
              onSave({
                name: form.name,
                name_fr: form.name_fr || undefined,
                description: form.description || undefined,
                category: form.category as 'dev',
                status: form.status as 'concept',
                owner: form.owner,
                tech_stack: form.tech_stack ? form.tech_stack.split(',').map(s => s.trim()) : [],
                tags: form.tags ? form.tags.split(',').map(s => s.trim()) : [],
                notes: form.notes || undefined,
                slug: form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
              });
            }}
          >
            Save project
          </button>
          <button
            className="px-5 py-2.5 border border-bold-border text-bold-muted text-xs uppercase tracking-widest rounded-sm hover:text-bold-light hover:border-bold-light transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main admin page ───────────────────────────────────────────────────────────
type AdminTab = 'dev' | 'concepts' | 'design';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('dev');
  const [inhouseProjects, setInhouseProjects] = useState<InhouseProject[]>([]);
  const [concepts, setConcepts] = useState<DBConcept[]>([]);
  const [products, setProducts] = useState<DBProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [p, c, d] = await Promise.all([
        supabase.from('inhouse_projects').select('*').order('is_featured', { ascending: false }).order('created_at', { ascending: false }),
        supabase.from('concepts').select('*').order('is_featured', { ascending: false }),
        supabase.from('products').select('*').order('created_at', { ascending: false }),
      ]);
      if (p.data) setInhouseProjects(p.data);
      if (c.data) setConcepts(c.data);
      if (d.data) setProducts(d.data);
      setLoading(false);
    }
    load();
  }, []);

  async function handleAddProject(data: Partial<InhouseProject>) {
    const { data: inserted } = await supabase
      .from('inhouse_projects')
      .insert([data])
      .select()
      .single();
    if (inserted) setInhouseProjects(prev => [inserted, ...prev]);
    setShowAddForm(false);
  }

  const TABS: { key: AdminTab; label: string; icon: React.ReactNode; count: number }[] = [
    { key: 'dev',      label: 'Dev Projects',  icon: <Code2 size={15} />,    count: inhouseProjects.filter(p => p.category === 'dev').length },
    { key: 'concepts', label: 'Concepts',       icon: <Lightbulb size={15} />, count: concepts.length },
    { key: 'design',   label: 'Design',         icon: <Palette size={15} />,  count: products.length },
  ];

  return (
    <div className="min-h-screen bg-bold-dark">
      {/* Top bar */}
      <div className="border-b border-bold-border bg-bold-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Lock size={14} className="text-bold-gold" />
            <span className="text-bold-light font-bold tracking-wider text-sm uppercase">Bold Design — Admin</span>
          </div>
          <a href="/" className="text-bold-muted hover:text-bold-light text-xs uppercase tracking-wider transition-colors">
            ← Back to site
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Page header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-bold-light mb-2">Inhouse Studio</h1>
          <div className="w-12 h-[2px] bg-bold-gold mb-4" />
          <p className="text-bold-muted text-sm max-w-xl">
            Dev projects, restaurant concepts and design work in progress — private workspace for Bold Design inhouse R&D.
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Dev Projects',    val: inhouseProjects.length, icon: <Code2 size={18} />,    color: 'text-bold-gold' },
            { label: 'Concepts',        val: concepts.length,        icon: <Lightbulb size={18} />, color: 'text-bold-light' },
            { label: 'Design Objects',  val: products.length,        icon: <Palette size={18} />,   color: 'text-bold-muted' },
          ].map(s => (
            <div key={s.label} className="bold-card rounded-sm p-5 flex items-center gap-4">
              <span className={s.color}>{s.icon}</span>
              <div>
                <div className={`text-2xl font-bold ${s.color}`}>{s.val}</div>
                <div className="text-[10px] uppercase tracking-wider text-bold-muted mt-0.5">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 border-b border-bold-border">
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`flex items-center gap-2 px-5 py-3 text-xs uppercase tracking-wider font-semibold border-b-2 transition-colors -mb-px ${
                activeTab === t.key
                  ? 'border-bold-gold text-bold-gold'
                  : 'border-transparent text-bold-muted hover:text-bold-light'
              }`}
            >
              {t.icon}
              {t.label}
              {t.count > 0 && (
                <span className={`text-[9px] px-1.5 py-0.5 rounded-sm ${
                  activeTab === t.key ? 'bg-bold-gold/20 text-bold-gold' : 'bg-bold-border text-bold-muted'
                }`}>
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-bold-muted text-xs uppercase tracking-widest animate-pulse">Loading…</div>
          </div>
        )}

        {/* Dev Projects tab */}
        {!loading && activeTab === 'dev' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-bold-light font-bold text-xl">Dev Projects</h2>
                <p className="text-bold-muted text-xs mt-1">Inhouse Bold Design — software & digital products in development</p>
              </div>
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-bold-gold text-bold-dark text-xs uppercase tracking-wider font-bold rounded-sm hover:bg-bold-gold-light transition-colors"
              >
                <Plus size={13} /> Add project
              </button>
            </div>

            {inhouseProjects.length === 0 ? (
              <div className="bold-card rounded-sm p-12 text-center text-bold-muted text-sm">No dev projects yet.</div>
            ) : (
              <div className="grid md:grid-cols-2 gap-5">
                {inhouseProjects.map(p => <InhouseCard key={p.id} project={p} />)}
              </div>
            )}
          </div>
        )}

        {/* Concepts tab */}
        {!loading && activeTab === 'concepts' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-bold-light font-bold text-xl">Restaurant Concepts</h2>
                <p className="text-bold-muted text-xs mt-1">Gastronomic concepts from street food to fine dining — Paris × Mongolia</p>
              </div>
            </div>
            {concepts.length === 0 ? (
              <div className="bold-card rounded-sm p-12 text-center text-bold-muted text-sm">No concepts in DB.</div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {concepts.map(c => <ConceptCard key={c.id} concept={c} />)}
              </div>
            )}
          </div>
        )}

        {/* Design tab */}
        {!loading && activeTab === 'design' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-bold-light font-bold text-xl">Design Objects</h2>
                <p className="text-bold-muted text-xs mt-1">Premium restaurant objects — from concept to production</p>
              </div>
            </div>
            {products.length === 0 ? (
              <div className="bold-card rounded-sm p-12 text-center text-bold-muted text-sm">No design objects in DB.</div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add project modal */}
      {showAddForm && (
        <AddProjectForm
          onSave={handleAddProject}
          onClose={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
}
