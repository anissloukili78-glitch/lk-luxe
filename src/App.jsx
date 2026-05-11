import { useState, useEffect, useRef } from "react";

const ADMIN_PWD = "jasmineDanissL69";
const CONTACT_EMAIL = "hello.lkluxe@gmail.com";
const REVOLUT_LINK = "https://revolut.me/jasminz6j6";
const PAYPAL_LINK = "https://www.paypal.com/paypalme/Jasminedamouche";

const C = {
  bg: "#FAF7F2", bgDark: "#F2EDE4", surface: "#FFFFFF", border: "#E8DDD0",
  borderDark: "#D4C4B0", text: "#2C1F14", textMid: "#7A6555", textLight: "#B09880",
  accent: "#C4A882", accentDark: "#9E7E5C", accentLight: "#E8D5BC",
  gold: "#B8965A", goldLight: "#D4B07A", green: "#6B8F71", red: "#9B4A4A", white: "#FFFFFF",
};

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');`;

const INIT_CATS = ["Sacs", "Pochettes", "Claquettes", "Ceintures", "Sacoches", "Baskets", "Talons"];
const SHOE_CATS = ["Claquettes", "Baskets", "Talons"];

const INIT_STOCK = [
  { id: 1, name: "Birkin 30", brand: "Hermès", category: "Sacs", color: "Fauve", price: 8900, desc: "Cuir Togo grainé, quincaillerie dorée. État proche du neuf.", img: null, available: true, ref: "HER-B30" },
  { id: 2, name: "Classic Flap Medium", brand: "Chanel", category: "Sacs", color: "Noir", price: 6200, desc: "Cuir caviar, chaîne dorée entrelacée. Avec boîte et dustbag.", img: null, available: true, ref: "CHA-CF" },
  { id: 3, name: "Neverfull MM", brand: "Louis Vuitton", category: "Sacs", color: "Monogramme", price: 1850, desc: "Toile monogramme, intérieur pivoine. Excellent état.", img: null, available: true, ref: "LV-NF" },
  { id: 4, name: "Pochette Métis", brand: "Louis Vuitton", category: "Pochettes", color: "Empreinte Noir", price: 2100, desc: "Cuir empreinte, bandoulière réglable. Comme neuve.", img: null, available: true, ref: "LV-PM" },
  { id: 5, name: "Poolside", brand: "Hermès", category: "Claquettes", color: "Orange", price: 650, desc: "Cuir Swift, pointure 38. Portées une fois.", img: null, available: true, ref: "HER-CL" },
  { id: 6, name: "Ceinture Monogramme", brand: "Louis Vuitton", category: "Ceintures", color: "Noir/Or", price: 320, desc: "Cuir monogramme, boucle LV dorée. Taille 85.", img: null, available: true, ref: "LV-CEI" },
];

const INIT_CATALOG = [
  { id: 101, name: "Kelly 28 Sellier", brand: "Hermès", category: "Sacs", color: "Bleu Encre", estimatedPrice: 12500, deposit: 500, desc: "Kelly sellier cuir Epsom, quincaillerie palladium. Pièce rare.", img: null, ref: "HER-K28", leadTime: "4-8 semaines" },
  { id: 102, name: "Mini Vanity Case", brand: "Chanel", category: "Pochettes", color: "Beige", estimatedPrice: 3200, deposit: 300, desc: "Vanity matelassé beige, chaîne dorée. Édition limitée.", img: null, ref: "CHA-MV", leadTime: "2-4 semaines" },
  { id: 103, name: "Saddle Bag Medium", brand: "Dior", category: "Sacoches", color: "Oblique", estimatedPrice: 3600, deposit: 300, desc: "Toile Oblique iconique, broderie CD, bandoulière incluse.", img: null, ref: "DIO-SAD", leadTime: "3-6 semaines" },
  { id: 104, name: "Oran Claquette", brand: "Hermès", category: "Claquettes", color: "Gris Perle", estimatedPrice: 720, deposit: 150, desc: "Cuir Epsom gris perle, découpe H emblématique.", img: null, ref: "HER-OR", leadTime: "2-3 semaines", sizes: [] },
  { id: 105, name: "Sneaker Triple S", brand: "Balenciaga", category: "Baskets", color: "Blanc/Beige", estimatedPrice: 580, deposit: 120, desc: "Triple S iconic, semelle chunky, état neuf.", img: null, ref: "BAL-TS", leadTime: "1-2 semaines", sizes: [] },
];

const INIT_ORDERS = [];

const fmt = (n) => Number(n).toLocaleString("fr-FR") + " €";
const uid = () => "LK-" + Date.now().toString(36).toUpperCase();
const EMOJI_MAP = { "Sacs": "👜", "Pochettes": "👛", "Claquettes": "👡", "Ceintures": "👔", "Sacoches": "🎒", "Baskets": "👟", "Talons": "👠", default: "✨" };
const getEmoji = (cat) => EMOJI_MAP[cat] || EMOJI_MAP.default;
const isShoeCategory = (cat) => SHOE_CATS.includes(cat);

// ── UI PRIMITIVES ──
function Modal({ title, onClose, children, wide }) {
  useEffect(() => {
    const h = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, []);
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(44,31,20,0.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 3000, padding: 16, backdropFilter: "blur(4px)" }} onClick={onClose}>
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, padding: "36px 40px", maxWidth: wide ? 680 : 520, width: "100%", maxHeight: "92vh", overflowY: "auto", boxShadow: "0 32px 80px rgba(44,31,20,0.18)" }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <h2 style={{ margin: 0, fontSize: 16, color: C.text, letterSpacing: 3, textTransform: "uppercase", fontFamily: "Jost, sans-serif", fontWeight: 500 }}>{title}</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: C.textLight, cursor: "pointer", fontSize: 28, lineHeight: 1, padding: "0 4px" }}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", placeholder, hint, required, rows }) {
  const [focus, setFocus] = useState(false);
  const style = { width: "100%", background: C.bg, border: `1px solid ${focus ? C.accent : C.border}`, borderRadius: 10, padding: "11px 16px", color: C.text, fontSize: 14, fontFamily: "Jost, sans-serif", outline: "none", boxSizing: "border-box", transition: "border-color .2s", resize: "vertical" };
  return (
    <div style={{ marginBottom: 18 }}>
      {label && <label style={{ display: "block", fontSize: 10, letterSpacing: 2.5, color: C.accentDark, textTransform: "uppercase", marginBottom: 7, fontFamily: "Jost, sans-serif", fontWeight: 500 }}>{label}{required && <span style={{ color: C.gold, marginLeft: 3 }}>*</span>}</label>}
      {rows
        ? <textarea value={value} onChange={onChange} rows={rows} placeholder={placeholder} style={style} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} />
        : <input type={type} value={value} onChange={onChange} placeholder={placeholder} style={style} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} />}
      {hint && <div style={{ fontSize: 11, color: C.textLight, marginTop: 5, lineHeight: 1.5 }}>{hint}</div>}
    </div>
  );
}

function Sel({ label, value, onChange, options, required }) {
  return (
    <div style={{ marginBottom: 18 }}>
      {label && <label style={{ display: "block", fontSize: 10, letterSpacing: 2.5, color: C.accentDark, textTransform: "uppercase", marginBottom: 7, fontFamily: "Jost, sans-serif", fontWeight: 500 }}>{label}{required && <span style={{ color: C.gold, marginLeft: 3 }}>*</span>}</label>}
      <select value={value} onChange={onChange} style={{ width: "100%", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: "11px 16px", color: C.text, fontSize: 14, fontFamily: "Jost, sans-serif", outline: "none" }}>
        {options.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
      </select>
    </div>
  );
}

function Btn({ children, onClick, variant = "primary", sm, full, disabled }) {
  const v = {
    primary: { bg: `linear-gradient(135deg, ${C.accent}, ${C.accentDark})`, color: C.white, border: "none", shadow: `0 4px 16px ${C.accent}40` },
    ghost: { bg: "transparent", color: C.accentDark, border: `1px solid ${C.borderDark}`, shadow: "none" },
    dark: { bg: C.text, color: C.bg, border: "none", shadow: "none" },
    green: { bg: `linear-gradient(135deg, ${C.green}, #4A6B50)`, color: C.white, border: "none", shadow: "none" },
    red: { bg: "transparent", color: C.red, border: `1px solid ${C.red}60`, shadow: "none" },
    gold: { bg: `linear-gradient(135deg, ${C.gold}, ${C.accentDark})`, color: C.white, border: "none", shadow: `0 4px 16px ${C.gold}30` },
    purple: { bg: `linear-gradient(135deg, #8B6B9E, #6B4D7E)`, color: C.white, border: "none", shadow: "none" },
  };
  const s = v[variant] || v.primary;
  return (
    <button disabled={disabled} onClick={onClick} style={{ background: s.bg, color: s.color, border: s.border, boxShadow: s.shadow, padding: sm ? "8px 18px" : "12px 28px", borderRadius: 10, fontSize: sm ? 11 : 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", cursor: disabled ? "not-allowed" : "pointer", fontFamily: "Jost, sans-serif", width: full ? "100%" : "auto", opacity: disabled ? 0.4 : 1, transition: "opacity .2s, transform .15s", whiteSpace: "nowrap" }}
      onMouseEnter={e => !disabled && (e.currentTarget.style.opacity = "0.85")}
      onMouseLeave={e => !disabled && (e.currentTarget.style.opacity = "1")}
    >{children}</button>
  );
}

function StatusPill({ s }) {
  const m = {
    en_attente: [C.gold, "En attente"],
    commande: [C.accentDark, "Commandé"],
    disponible: [C.green, "Disponible"],
    solde_recu: ["#2E7D52", "Solde reçu ✓"],
    expediee: ["#4A6B50", "Expédiée"],
    annulee: [C.red, "Annulée"],
    custom_request: ["#8B6B9E", "Demande perso"]
  };
  const [col, label] = m[s] || [C.textLight, s];
  return <span style={{ background: col + "18", color: col, border: `1px solid ${col}35`, padding: "3px 12px", borderRadius: 20, fontSize: 10, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "Jost, sans-serif" }}>{label}</span>;
}

function ImgUpload({ value, onChange, label }) {
  const ref = useRef(null);
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onChange(ev.target.result);
    reader.readAsDataURL(file);
  };
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: "block", fontSize: 10, letterSpacing: 2.5, color: C.accentDark, textTransform: "uppercase", marginBottom: 7, fontFamily: "Jost, sans-serif", fontWeight: 500 }}>{label || "Image du produit"}</label>
      <div style={{ border: `2px dashed ${C.borderDark}`, borderRadius: 12, padding: 20, textAlign: "center", background: C.bg, cursor: "pointer", position: "relative" }} onClick={() => ref.current && ref.current.click()}>
        {value
          ? <img src={value} alt="" style={{ maxHeight: 120, maxWidth: "100%", borderRadius: 8, objectFit: "cover" }} />
          : <div style={{ color: C.textLight, fontSize: 13 }}>📷 Cliquer pour ajouter une image</div>}
        <input ref={ref} type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
      </div>
    </div>
  );
}

// ── CUSTOM REQUEST CARD ──
function CustomRequestCard({ onRequest }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? `linear-gradient(145deg, #F5EEF8, #EDE4F2)` : C.surface,
        border: `2px dashed ${hover ? "#8B6B9E" : C.borderDark}`,
        borderRadius: 16, overflow: "hidden", transition: "all .25s",
        transform: hover ? "translateY(-4px)" : "none",
        boxShadow: hover ? "0 16px 40px rgba(139,107,158,0.15)" : "none",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        minHeight: 320, padding: 32, textAlign: "center", cursor: "pointer"
      }}
      onClick={onRequest}
    >
      <div style={{ fontSize: 52, marginBottom: 16, filter: "drop-shadow(0 4px 12px rgba(139,107,158,0.2))" }}>🔍</div>
      <div style={{ fontSize: 9, letterSpacing: 3, color: "#8B6B9E", textTransform: "uppercase", marginBottom: 8, fontFamily: "Jost, sans-serif", fontWeight: 600 }}>Vous ne trouvez pas ?</div>
      <div style={{ fontSize: 20, color: C.text, fontFamily: "Cormorant, Georgia, serif", fontWeight: 600, marginBottom: 10, lineHeight: 1.2 }}>Commande personnalisée</div>
      <div style={{ fontSize: 12, color: C.textMid, lineHeight: 1.8, fontFamily: "Jost, sans-serif", marginBottom: 20 }}>
        Vous avez repéré un article qui n'est pas dans notre catalogue ? Envoyez-nous une photo et nous le trouverons pour vous.
      </div>
      <div style={{ background: "linear-gradient(135deg, #8B6B9E, #6B4D7E)", color: C.white, padding: "10px 24px", borderRadius: 10, fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", fontFamily: "Jost, sans-serif" }}>
        Faire une demande →
      </div>
    </div>
  );
}

// ── CUSTOM REQUEST FORM ──
const PROCESS_STEPS = [
  { icon: "📸", text: "Tu nous envoies la photo du produit voulu" },
  { icon: "🤝", text: "On négocie le prix avec le fournisseur" },
  { icon: "💶", text: "On te propose le prix final" },
  { icon: "✅", text: "Tu valides ou non la commande" },
  { icon: "💳", text: "Une fois validé : paiement d'un acompte obligatoire pour passer la commande" },
  { icon: "🎥", text: "Le fournisseur nous envoie des vidéos + contrôle qualité" },
  { icon: "👍", text: "Tu confirmes : oui ou non — Refus = acompte remboursé intégralement" },
];

function CustomRequestForm({ onClose, onConfirm }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ productImg: null, productCategory: "Sacs", clientSize: "" });
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const CATEGORIES = ["Sacs", "Pochettes", "Claquettes", "Ceintures", "Sacoches", "Baskets", "Talons"];
  const needsSize = isShoeCategory(form.productCategory);
  const canSubmit = !!form.productImg && (!needsSize || !!form.clientSize);

  const handleSubmit = () => {
    onConfirm(form);
    setSent(true);
  };

  if (sent) {
    return (
      <Modal title="Demande personnalisée" onClose={onClose}>
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>✨</div>
          <div style={{ fontSize: 24, color: C.text, fontFamily: "Cormorant, Georgia, serif", fontWeight: 600, marginBottom: 12 }}>
            Demande envoyée !
          </div>
          <div style={{ fontSize: 13, color: C.textMid, lineHeight: 1.9, marginBottom: 24, fontFamily: "Jost, sans-serif" }}>
            Nous avons bien reçu votre photo.<br />
            Nous vous recontacterons rapidement<br />
            avec la disponibilité et le prix final.<br /><br />
            <span style={{ color: "#8B6B9E", fontWeight: 600 }}>Aucun paiement ne vous sera demandé avant votre accord.</span>
          </div>
          <Btn onClick={onClose}>Fermer</Btn>
        </div>
      </Modal>
    );
  }

  return (
    <Modal title="Commande personnalisée" onClose={onClose} wide>

      {/* Processus */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 11, letterSpacing: 2.5, color: C.accentDark, textTransform: "uppercase", marginBottom: 14, fontFamily: "Jost, sans-serif", fontWeight: 500 }}>
          Comment ça fonctionne ?
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {PROCESS_STEPS.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 14px", background: i === 4 ? "#F5EEF8" : C.bg, border: `1px solid ${i === 4 ? "#D4B8E0" : C.border}`, borderRadius: 10 }}>
              <div style={{ width: 26, height: 26, borderRadius: "50%", background: i === 4 ? "#8B6B9E" : C.accent, color: C.white, fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: "Jost, sans-serif" }}>{i + 1}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 16 }}>{s.icon}</span>
                <span style={{ fontSize: 12, color: i === 4 ? "#6B4D7E" : C.textMid, fontFamily: "Jost, sans-serif", lineHeight: 1.5 }}>{s.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Séparateur */}
      <div style={{ height: 1, background: C.border, marginBottom: 24 }} />

      {/* Formulaire simplifié */}
      <div style={{ fontSize: 11, letterSpacing: 2.5, color: C.accentDark, textTransform: "uppercase", marginBottom: 14, fontFamily: "Jost, sans-serif", fontWeight: 500 }}>
        Votre demande
      </div>

      <ImgUpload
        value={form.productImg}
        onChange={(v) => setForm(f => ({ ...f, productImg: v }))}
        label="Photo de l'article souhaité *"
      />

      <Sel
        label="Catégorie"
        value={form.productCategory}
        onChange={set("productCategory")}
        options={CATEGORIES.map(c => ({ v: c, l: `${getEmoji(c)} ${c}` }))}
        required
      />

      {needsSize && (
        <Field
          label="Votre pointure *"
          value={form.clientSize}
          onChange={set("clientSize")}
          placeholder="Ex : 38, 39, 40..."
          hint="Indiquez votre pointure européenne."
          required
        />
      )}

      <div style={{ background: "#F5EEF8", border: "1px solid #D4B8E0", borderRadius: 10, padding: "12px 16px", marginBottom: 20 }}>
        <div style={{ fontSize: 12, color: "#6B4D7E", lineHeight: 1.7, fontFamily: "Jost, sans-serif" }}>
          📩 Après envoi, nous vous recontactons directement avec le prix. <strong>Aucun acompte avant votre accord.</strong>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
        <Btn variant="ghost" onClick={onClose}>Annuler</Btn>
        <Btn variant="purple" onClick={handleSubmit} disabled={!canSubmit}>Envoyer ma demande →</Btn>
      </div>
    </Modal>
  );
}

// ── PRODUCT CARD ──
function ProductCard({ p, onBuy, isCatalog }) {
  const [hover, setHover] = useState(false);
  const needsSize = isShoeCategory(p.category);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ background: C.surface, border: `1px solid ${hover ? C.borderDark : C.border}`, borderRadius: 16, overflow: "hidden", transition: "transform .25s, box-shadow .25s", transform: hover ? "translateY(-4px)" : "none", boxShadow: hover ? `0 16px 40px ${C.accent}20` : "none" }}>
      <div style={{ background: `linear-gradient(145deg, ${C.bgDark}, ${C.bg})`, aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", position: "relative" }}>
        {p.img
          ? <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          : <div style={{ fontSize: 56, filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.08))" }}>{getEmoji(p.category)}</div>}
        <div style={{ position: "absolute", top: 12, left: 12, background: isCatalog ? C.gold + "22" : C.green + "22", color: isCatalog ? C.gold : C.green, border: `1px solid ${isCatalog ? C.gold : C.green}40`, borderRadius: 20, padding: "3px 10px", fontSize: 9, fontWeight: 700, letterSpacing: 2, fontFamily: "Jost, sans-serif" }}>
          {isCatalog ? "SUR COMMANDE" : "DISPONIBLE"}
        </div>
        {/* Size badges for shoes in catalog */}
        {isCatalog && needsSize && p.sizes && p.sizes.length > 0 && (
          <div style={{ position: "absolute", bottom: 8, left: 8, right: 8, display: "flex", flexWrap: "wrap", gap: 4 }}>
            {p.sizes.map((s, i) => (
              <span key={i} style={{ background: "rgba(255,255,255,0.9)", color: C.accentDark, border: `1px solid ${C.border}`, borderRadius: 6, padding: "2px 8px", fontSize: 10, fontWeight: 600, fontFamily: "Jost, sans-serif" }}>T.{s}</span>
            ))}
          </div>
        )}
      </div>
      <div style={{ padding: "18px 20px 20px" }}>
        <div style={{ fontSize: 9, color: C.textLight, letterSpacing: 3, textTransform: "uppercase", marginBottom: 4, fontFamily: "Jost, sans-serif" }}>{p.brand}</div>
        <div style={{ fontSize: 18, color: C.text, fontFamily: "Cormorant, Georgia, serif", fontWeight: 600, lineHeight: 1.2, marginBottom: 4 }}>{p.name}</div>
        <div style={{ fontSize: 12, color: C.textMid, marginBottom: 10, fontFamily: "Jost, sans-serif" }}>{p.color}</div>
        <div style={{ fontSize: 12, color: C.textLight, lineHeight: 1.6, marginBottom: 16, fontFamily: "Jost, sans-serif", minHeight: 36 }}>{p.desc}</div>
        {isCatalog
          ? <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 9, color: C.textLight, letterSpacing: 2, marginBottom: 2 }}>PRIX ESTIMÉ</div>
              <div style={{ fontSize: 22, color: C.text, fontFamily: "Cormorant, Georgia, serif", fontWeight: 600 }}>{fmt(p.estimatedPrice)}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 9, color: C.textLight, letterSpacing: 2, marginBottom: 2 }}>ACOMPTE</div>
              <div style={{ fontSize: 22, color: C.green, fontFamily: "Cormorant, Georgia, serif", fontWeight: 600 }}>{fmt(p.deposit)}</div>
            </div>
          </div>
          : <div style={{ fontSize: 26, color: C.text, fontFamily: "Cormorant, Georgia, serif", fontWeight: 600, marginBottom: 16 }}>{fmt(p.price)}</div>}
        {isCatalog && <div style={{ fontSize: 11, color: C.textLight, marginBottom: 14, fontFamily: "Jost, sans-serif" }}>⏱ Délai estimé : {p.leadTime}</div>}
        <Btn full onClick={() => onBuy(p)}>{isCatalog ? "Réserver avec acompte" : "Acheter"}</Btn>
      </div>
    </div>
  );
}

// ── ORDER FORM ──
function OrderForm({ product, isCatalog, clientEmail, onClose, onConfirm }) {
  const [step, setStep] = useState(1);
  const needsSize = isShoeCategory(product.category);
  const [form, setForm] = useState({
    nom: "", prenom: "", email: clientEmail || "", tel: "",
    adresse: "", codePostal: "", ville: "", livraison: "point_relais",
    paiement: "revolut", clientSize: ""
  });
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const amount = isCatalog ? product.deposit : product.price;

  const step1ok = form.nom && form.prenom && form.email && form.tel && (!needsSize || !isCatalog || form.clientSize);
  const step2ok = form.adresse && form.codePostal && form.ville;

  const handlePay = () => {
    const link = form.paiement === "revolut" ? REVOLUT_LINK : PAYPAL_LINK;
    window.open(link, "_blank");
    setStep(4);
  };

  const handleConfirmPayment = () => { onConfirm(form); setStep(5); };
  const steps = ["Coordonnées", "Livraison", "Paiement", "Validation", "Confirmé"];

  return (
    <Modal title={isCatalog ? "Réserver — Acompte" : "Finaliser l'achat"} onClose={onClose} wide>
      <div style={{ display: "flex", marginBottom: 32, position: "relative" }}>
        {steps.map((s, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center" }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: step > i + 1 ? C.green : step === i + 1 ? C.accent : C.border, color: step >= i + 1 ? C.white : C.textLight, fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 6px", fontFamily: "Jost, sans-serif", transition: "background .3s" }}>
              {step > i + 1 ? "✓" : i + 1}
            </div>
            <div style={{ fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", color: step === i + 1 ? C.accent : C.textLight, fontFamily: "Jost, sans-serif" }}>{s}</div>
          </div>
        ))}
        <div style={{ position: "absolute", top: 14, left: "12.5%", right: "12.5%", height: 1, background: C.border, zIndex: -1 }} />
      </div>

      {/* Recap */}
      <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 14, padding: "16px 20px", marginBottom: 28, display: "flex", gap: 16, alignItems: "center" }}>
        <div style={{ width: 56, height: 56, borderRadius: 10, background: C.bgDark, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0, overflow: "hidden" }}>
          {product.img ? <img src={product.img} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : getEmoji(product.category)}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10, color: C.textLight, letterSpacing: 2, fontFamily: "Jost, sans-serif" }}>{product.brand}</div>
          <div style={{ fontSize: 16, color: C.text, fontFamily: "Cormorant, Georgia, serif", fontWeight: 600 }}>{product.name}</div>
          <div style={{ fontSize: 12, color: C.textMid, fontFamily: "Jost, sans-serif" }}>{product.color}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          {isCatalog ? <>
            <div style={{ fontSize: 10, color: C.textLight, letterSpacing: 1, fontFamily: "Jost, sans-serif" }}>ACOMPTE</div>
            <div style={{ fontSize: 24, color: C.green, fontFamily: "Cormorant, Georgia, serif", fontWeight: 600 }}>{fmt(product.deposit)}</div>
            <div style={{ fontSize: 11, color: C.textLight, fontFamily: "Jost, sans-serif" }}>sur {fmt(product.estimatedPrice)}</div>
          </> : <>
            <div style={{ fontSize: 10, color: C.textLight, letterSpacing: 1, fontFamily: "Jost, sans-serif" }}>TOTAL</div>
            <div style={{ fontSize: 24, color: C.text, fontFamily: "Cormorant, Georgia, serif", fontWeight: 600 }}>{fmt(product.price)}</div>
          </>}
        </div>
      </div>

      {step === 1 && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
            <Field label="Prénom" value={form.prenom} onChange={set("prenom")} required />
            <Field label="Nom" value={form.nom} onChange={set("nom")} required />
          </div>
          <Field label="Email" type="email" value={form.email} onChange={set("email")} required hint="📧 Vous recevrez vos confirmations sur cet email." />
          <Field label="Téléphone" type="tel" value={form.tel} onChange={set("tel")} required placeholder="06 XX XX XX XX" />
          {isCatalog && needsSize && (
            <Field label={`Votre pointure ${getEmoji(product.category)}`} value={form.clientSize} onChange={set("clientSize")} placeholder="Ex : 38, 39, 40..." required
              hint={product.sizes && product.sizes.length > 0 ? `Tailles disponibles : ${product.sizes.join(", ")}` : "Indiquez votre pointure européenne."} />
          )}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 8 }}>
            <Btn variant="ghost" onClick={onClose}>Annuler</Btn>
            <Btn onClick={() => setStep(2)} disabled={!step1ok}>Continuer →</Btn>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <Sel label="Mode de livraison" value={form.livraison} onChange={set("livraison")} options={[
            { v: "point_relais", l: "📦 Point Relais Mondial Relay" },
            { v: "domicile", l: "🏠 Livraison à domicile" },
          ]} />
          <Field label="Adresse complète" value={form.adresse} onChange={set("adresse")} required placeholder="10 rue de la Paix" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "0 14px" }}>
            <Field label="Code postal" value={form.codePostal} onChange={set("codePostal")} required placeholder="75001" />
            <Field label="Ville" value={form.ville} onChange={set("ville")} required placeholder="Paris" />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginTop: 8 }}>
            <Btn variant="ghost" onClick={() => setStep(1)}>← Retour</Btn>
            <Btn onClick={() => setStep(3)} disabled={!step2ok}>Continuer →</Btn>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <Sel label="Mode de paiement" value={form.paiement} onChange={set("paiement")} options={[
            { v: "revolut", l: "💳 Revolut" },
            { v: "paypal", l: "🅿️ PayPal" },
          ]} />
          <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12, padding: 18, marginBottom: 20 }}>
            <div style={{ fontSize: 13, color: C.text, fontFamily: "Jost, sans-serif", lineHeight: 1.8 }}>
              En cliquant sur <strong>"{isCatalog ? "Payer l'acompte" : "Payer"}"</strong>, vous serez redirigé vers {form.paiement === "revolut" ? "Revolut" : "PayPal"} pour régler <strong style={{ color: C.accent }}>{fmt(amount)}</strong>.
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
            <Btn variant="ghost" onClick={() => setStep(2)}>← Retour</Btn>
            <Btn variant="gold" onClick={handlePay}>{isCatalog ? `Payer l'acompte — ${fmt(amount)}` : `Payer — ${fmt(amount)}`}</Btn>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <div style={{ background: "#FFF8EC", border: `1px solid ${C.gold}40`, borderRadius: 14, padding: 22, marginBottom: 20, textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>💳</div>
            <div style={{ fontSize: 16, color: C.text, fontFamily: "Cormorant, Georgia, serif", fontWeight: 600, marginBottom: 8 }}>Avez-vous bien effectué le paiement ?</div>
            <div style={{ fontSize: 13, color: C.textMid, lineHeight: 1.8, fontFamily: "Jost, sans-serif" }}>
              Revenez ici après avoir réglé <strong style={{ color: C.accent }}>{fmt(amount)}</strong> et cliquez sur le bouton ci-dessous.
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Btn variant="green" full onClick={handleConfirmPayment}>✓ J'ai effectué mon paiement</Btn>
            <Btn variant="ghost" full onClick={() => { const l = form.paiement === "revolut" ? REVOLUT_LINK : PAYPAL_LINK; window.open(l, "_blank"); }}>Rouvrir le lien de paiement</Btn>
            <Btn variant="ghost" full onClick={() => setStep(3)}>← Retour</Btn>
          </div>
        </div>
      )}

      {step === 5 && (
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>{isCatalog ? "✨" : "🛍️"}</div>
          <div style={{ fontSize: 24, color: C.text, fontFamily: "Cormorant, Georgia, serif", fontWeight: 600, marginBottom: 8 }}>{isCatalog ? "Réservation enregistrée !" : "Commande enregistrée !"}</div>
          <div style={{ fontSize: 13, color: C.textMid, lineHeight: 1.9, marginBottom: 24, fontFamily: "Jost, sans-serif" }}>
            Un email de suivi sera envoyé à <strong style={{ color: C.accent }}>{form.email}</strong>
          </div>
          <Btn onClick={onClose}>Fermer</Btn>
        </div>
      )}
    </Modal>
  );
}

// ── MY ORDERS ──
function MyOrders({ orders, setOrders, onClose, prefillEmail }) {
  const [email, setEmail] = useState(prefillEmail || "");
  const [searched, setSearched] = useState(!!prefillEmail);
  const [finalizing, setFinalizing] = useState(null);
  const mine = searched ? orders.filter(o => o.email?.toLowerCase() === email.toLowerCase() && o.status !== "annulee") : [];

  const finalize = (order, form) => {
    setOrders(prev => prev.map(o => o.id === order.id ? { ...o, paiement: form.paiement, status: "solde_recu" } : o));
    setFinalizing(null);
  };

  return (
    <Modal title="Mes commandes" onClose={onClose} wide>
      {!searched ? (
        <div>
          <p style={{ color: C.textMid, fontSize: 14, lineHeight: 1.8, marginBottom: 20, fontFamily: "Jost, sans-serif" }}>
            Entrez l'email utilisé lors de votre commande pour retrouver vos achats.
          </p>
          <Field label="Votre email" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="votre@email.com" />
          <Btn full onClick={() => setSearched(true)} disabled={!email}>Rechercher →</Btn>
        </div>
      ) : (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div style={{ fontSize: 12, color: C.textMid, fontFamily: "Jost, sans-serif" }}>{mine.length} commande(s) pour <span style={{ color: C.accent }}>{email}</span></div>
            <button onClick={() => { setSearched(false); setEmail(""); }} style={{ background: "none", border: "none", color: C.accentDark, cursor: "pointer", fontSize: 12, textDecoration: "underline", fontFamily: "Jost, sans-serif" }}>Changer d'email</button>
          </div>
          {mine.length === 0
            ? <div style={{ textAlign: "center", padding: 40, color: C.textLight, fontFamily: "Jost, sans-serif" }}>Aucune commande trouvée.</div>
            : mine.map(order => (
              <div key={order.id} style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 14, padding: 20, marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
                  <div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 5, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 11, color: C.accent, fontWeight: 600, letterSpacing: 1, fontFamily: "Jost, sans-serif" }}>{order.id}</span>
                      <StatusPill s={order.status} />
                    </div>
                    <div style={{ fontSize: 17, color: C.text, fontFamily: "Cormorant, Georgia, serif", fontWeight: 600 }}>{order.product}</div>
                    <div style={{ fontSize: 12, color: C.textLight, fontFamily: "Jost, sans-serif" }}>{order.date}</div>
                  </div>
                  {order.depositPaid > 0 && (
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 11, color: C.textLight, fontFamily: "Jost, sans-serif" }}>Payé</div>
                      <div style={{ fontSize: 20, color: C.green, fontFamily: "Cormorant, Georgia, serif", fontWeight: 600 }}>{fmt(order.depositPaid)}</div>
                    </div>
                  )}
                </div>
                {order.status === "disponible" && (
                  <div>
                    <div style={{ background: "#F0F9F1", border: `1px solid ${C.green}30`, borderRadius: 10, padding: 12, marginBottom: 12 }}>
                      <div style={{ fontSize: 13, color: C.green, lineHeight: 1.7, fontFamily: "Jost, sans-serif" }}>
                        🎉 <strong>Votre article est disponible !</strong><br />
                        Finalisez en réglant le solde de <strong>{fmt((order.totalPrice || 0) - (order.depositPaid || 0))}</strong>
                      </div>
                    </div>
                    <Btn variant="green" full onClick={() => setFinalizing(order)}>Finaliser mon achat →</Btn>
                  </div>
                )}
                {order.status === "solde_recu" && (
                  <div style={{ background: "#F0F9F1", border: `1px solid ${C.green}30`, borderRadius: 10, padding: 12 }}>
                    <div style={{ fontSize: 13, color: C.green, lineHeight: 1.7, fontFamily: "Jost, sans-serif" }}>
                      ✅ <strong>Paiement reçu !</strong> Votre article sera expédié très prochainement.
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
      {finalizing && (
        <Modal title={`Finaliser — ${finalizing.product}`} onClose={() => setFinalizing(null)}>
          <FinalizeForm order={finalizing} onConfirm={(f) => finalize(finalizing, f)} onClose={() => setFinalizing(null)} />
        </Modal>
      )}
    </Modal>
  );
}

function FinalizeForm({ order, onConfirm, onClose }) {
  const [paiement, setPaiement] = useState("revolut");
  const [step, setStep] = useState(1);
  const solde = (order.totalPrice || 0) - (order.depositPaid || 0);
  const handlePay = () => { const l = paiement === "revolut" ? REVOLUT_LINK : PAYPAL_LINK; window.open(l, "_blank"); setStep(2); };
  return (
    <div>
      {step === 1 && <>
        <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16, marginBottom: 20, textAlign: "center" }}>
          <div style={{ fontSize: 12, color: C.textLight, fontFamily: "Jost, sans-serif" }}>Solde à régler</div>
          <div style={{ fontSize: 36, color: C.text, fontFamily: "Cormorant, Georgia, serif", fontWeight: 600 }}>{fmt(solde)}</div>
        </div>
        <Sel label="Mode de paiement" value={paiement} onChange={e => setPaiement(e.target.value)} options={[{ v: "revolut", l: "💳 Revolut" }, { v: "paypal", l: "🅿️ PayPal" }]} />
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
          <Btn variant="ghost" onClick={onClose}>Annuler</Btn>
          <Btn variant="green" onClick={handlePay}>Payer {fmt(solde)} →</Btn>
        </div>
      </>}
      {step === 2 && <>
        <div style={{ background: "#FFF8EC", border: `1px solid ${C.gold}40`, borderRadius: 14, padding: 22, marginBottom: 20, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 10 }}>💳</div>
          <div style={{ fontSize: 15, color: C.text, fontFamily: "Cormorant, Georgia, serif", fontWeight: 600, marginBottom: 8 }}>Avez-vous bien effectué le paiement ?</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Btn variant="green" full onClick={() => onConfirm({ paiement })}>✓ J'ai payé — Confirmer</Btn>
          <Btn variant="ghost" full onClick={() => { const l = paiement === "revolut" ? REVOLUT_LINK : PAYPAL_LINK; window.open(l, "_blank"); }}>Rouvrir le lien</Btn>
          <Btn variant="ghost" full onClick={() => setStep(1)}>← Retour</Btn>
        </div>
      </>}
    </div>
  );
}

// ── CLIENT SHOP ──
function ClientShop({ stock, setStock, catalog, orders, setOrders, categories }) {
  const [tab, setTab] = useState("stock");
  const [cat, setCat] = useState("Tous");
  const [clientEmail, setClientEmail] = useState("");
  const [emailSet, setEmailSet] = useState(false);
  const [ordering, setOrdering] = useState(null);
  const [myOrdersOpenDirect, setMyOrdersOpenDirect] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [customRequestOpen, setCustomRequestOpen] = useState(false);
  const [emailInput, setEmailInput] = useState("");

  const cats = ["Tous", ...new Set([...stock.map(p => p.category), ...catalog.map(p => p.category)])];
  const filteredStock = (cat === "Tous" ? stock : stock.filter(p => p.category === cat)).filter(p => p.available);
  const filteredCatalog = cat === "Tous" ? catalog : catalog.filter(p => p.category === cat);
  const pendingCount = orders.filter(o => o.email === clientEmail && ["disponible"].includes(o.status)).length;

  const handleOrder = (product, isCatalog, form) => {
    const order = {
      id: uid(), ...form,
      product: `${product.brand} ${product.name}`, ref: product.ref,
      leadTime: product.leadTime || null, type: isCatalog ? "catalog" : "stock",
      depositPaid: isCatalog ? product.deposit : product.price,
      totalPrice: isCatalog ? product.estimatedPrice : product.price,
      status: isCatalog ? "en_attente" : "expediee",
      date: new Date().toISOString().slice(0, 10),
    };
    setOrders(o => [...o, order]);
    // Si c'est un article en stock, le marquer comme vendu immédiatement
    if (!isCatalog) {
      setStock(s => s.map(p => p.id === product.id ? { ...p, available: false } : p));
    }
    if (!emailSet) { setClientEmail(form.email); setEmailSet(true); }
  };

  const handleCustomRequest = (form) => {
    const order = {
      id: uid(),
      productImg: form.productImg,
      productCategory: form.productCategory,
      clientSize: form.clientSize || null,
      product: "Demande personnalisée",
      ref: "CUSTOM", type: "custom",
      depositPaid: 0, totalPrice: 0,
      status: "custom_request",
      date: new Date().toISOString().slice(0, 10),
      isCustom: true,
    };
    setOrders(o => [...o, order]);
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "Jost, sans-serif" }}>

      {/* Barre email / connexion — non sticky, disparaît au scroll */}
      {!emailSet && (
        <div style={{ background: C.text, padding: "10px 24px", display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          <span style={{ fontSize: 12, color: C.accentLight, letterSpacing: 1 }}>Entrez votre email pour suivre vos commandes</span>
          <div style={{ display: "flex", gap: 8 }}>
            <input type="email" value={emailInput} onChange={e => setEmailInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && emailInput) { setClientEmail(emailInput); setEmailSet(true); } }}
              placeholder="votre@email.com"
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, padding: "6px 14px", color: C.white, fontSize: 12, fontFamily: "Jost, sans-serif", outline: "none", width: 220 }} />
            <button onClick={() => { if (emailInput) { setClientEmail(emailInput); setEmailSet(true); } }}
              style={{ background: C.accent, border: "none", borderRadius: 8, padding: "6px 16px", color: C.white, fontSize: 11, fontWeight: 600, letterSpacing: 1.5, cursor: "pointer", fontFamily: "Jost, sans-serif" }}>OK</button>
          </div>
        </div>
      )}
      {emailSet && (
        <div style={{ background: C.accentLight, padding: "8px 24px", display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, color: C.accentDark, letterSpacing: 1 }}>✓ {clientEmail}</span>
          {pendingCount > 0 && (
            <span style={{ background: C.green, color: C.white, borderRadius: 20, padding: "2px 10px", fontSize: 10, fontWeight: 700 }}>
              {pendingCount} article(s) à finaliser !
            </span>
          )}
          {/* Accès direct aux commandes depuis la barre email */}
          <button onClick={() => setMyOrdersOpenDirect(true)}
            style={{ background: C.accentDark, border: "none", borderRadius: 8, padding: "5px 14px", color: C.white, fontSize: 11, fontWeight: 600, letterSpacing: 1, cursor: "pointer", fontFamily: "Jost, sans-serif" }}>
            Mes commandes →
          </button>
        </div>
      )}

      {/* Header sticky — logo uniquement + contact discret */}
      <header style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ padding: "18px 0" }}>
            <div style={{ fontSize: 26, fontFamily: "Cormorant, Georgia, serif", fontWeight: 600, letterSpacing: 6, color: C.text }}>LK <span style={{ color: C.accent }}>Luxe</span></div>
            <div style={{ fontSize: 9, letterSpacing: 4, color: C.textLight, textTransform: "uppercase", marginTop: 1 }}>Le prix du faux, la qualité du vrai</div>
          </div>
          <nav style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <button onClick={() => setContactOpen(true)} style={{ background: "none", border: "none", color: C.textLight, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", fontFamily: "Jost, sans-serif", padding: "6px 12px" }}>Contact</button>
          </nav>
        </div>
      </header>

      <div style={{ background: `linear-gradient(160deg, ${C.bgDark} 0%, ${C.bg} 60%)`, padding: "64px 24px 48px", textAlign: "center", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ fontSize: 11, letterSpacing: 6, color: C.textLight, textTransform: "uppercase", marginBottom: 14, fontFamily: "Jost, sans-serif" }}>Collection Exclusive</div>
        <h1 style={{ margin: "0 0 16px", fontSize: "clamp(36px, 6vw, 64px)", fontFamily: "Cormorant, Georgia, serif", fontWeight: 300, color: C.text, letterSpacing: 2, lineHeight: 1.1 }}>
          Maroquinerie<br /><em style={{ fontStyle: "italic", color: C.accent }}>de Luxe</em>
        </h1>
        <p style={{ color: C.textMid, fontSize: 14, maxWidth: 480, margin: "0 auto", lineHeight: 1.9, fontFamily: "Jost, sans-serif" }}>
          Hermès, Chanel, Dior, Louis Vuitton — Articles authentiques disponibles immédiatement ou sur commande avec acompte.
        </p>
        {/* CTA mis en avant */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 28, flexWrap: "wrap" }}>
          <button onClick={() => setTab("stock")} style={{ background: tab === "stock" ? C.accent : C.surface, color: tab === "stock" ? C.white : C.accentDark, border: `2px solid ${C.accent}`, borderRadius: 12, padding: "12px 28px", fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", fontFamily: "Jost, sans-serif", transition: "all .2s" }}>
            🛍️ En stock
          </button>
          <button onClick={() => setTab("catalog")} style={{ background: tab === "catalog" ? C.accent : C.surface, color: tab === "catalog" ? C.white : C.accentDark, border: `2px solid ${C.accent}`, borderRadius: 12, padding: "12px 28px", fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", fontFamily: "Jost, sans-serif", transition: "all .2s" }}>
            ✨ Sur commande
          </button>
        </div>
      </div>

      {/* Tabs + filtres sticky */}
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, position: "sticky", top: 61, zIndex: 90 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <div style={{ display: "flex" }}>
            {[["stock", "En stock"], ["catalog", "Sur commande"]].map(([v, l]) => (
              <button key={v} onClick={() => setTab(v)} style={{ padding: "14px 24px", background: "none", border: "none", borderBottom: `2px solid ${tab === v ? C.accent : "transparent"}`, color: tab === v ? C.accent : C.textMid, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", fontFamily: "Jost, sans-serif", transition: "color .2s" }}>{l}</button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 6, padding: "8px 0", flexWrap: "wrap" }}>
            {cats.map(c => (
              <button key={c} onClick={() => setCat(c)} style={{ padding: "5px 14px", borderRadius: 20, border: `1px solid ${cat === c ? C.accent : C.border}`, background: cat === c ? C.accentLight : "transparent", color: cat === c ? C.accentDark : C.textMid, fontSize: 11, cursor: "pointer", fontFamily: "Jost, sans-serif", letterSpacing: 0.5, transition: "all .2s" }}>{c}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px" }}>
        {tab === "catalog" && (
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 20, marginBottom: 32, display: "flex", gap: 14, alignItems: "flex-start" }}>
            <span style={{ fontSize: 22, flexShrink: 0 }}>✨</span>
            <div style={{ fontSize: 13, color: C.textMid, lineHeight: 1.8, fontFamily: "Jost, sans-serif" }}>
              Ces articles sont disponibles <strong style={{ color: C.text }}>sur commande</strong>. Versez un acompte pour réserver votre pièce. Vous ne trouvez pas ce que vous cherchez ? Utilisez la carte <strong style={{ color: "#8B6B9E" }}>"Commande personnalisée"</strong> pour nous envoyer une photo de l'article souhaité.
            </div>
          </div>
        )}

        {/* Commande perso EN PREMIER dans le catalogue */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: 24 }}>
          {tab === "catalog" && (
            <CustomRequestCard onRequest={() => setCustomRequestOpen(true)} />
          )}
          {(tab === "stock" ? filteredStock : filteredCatalog).map(p => (
            <ProductCard key={p.id} p={p} isCatalog={tab === "catalog"} onBuy={(prod) => setOrdering({ prod, isCatalog: tab === "catalog" })} />
          ))}
        </div>

        {tab === "stock" && filteredStock.length === 0 && (
          <div style={{ textAlign: "center", padding: 60, color: C.textLight, fontFamily: "Jost, sans-serif" }}>Aucun article disponible dans cette catégorie.</div>
        )}
      </div>

      <footer style={{ background: C.text, padding: "40px 24px", textAlign: "center", marginTop: 40 }}>
        <div style={{ fontSize: 20, fontFamily: "Cormorant, Georgia, serif", fontWeight: 600, letterSpacing: 6, color: C.accentLight, marginBottom: 6 }}>LK Luxe</div>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.textLight, marginBottom: 20 }}>Le prix du faux, la qualité du vrai</div>
        <div style={{ fontSize: 12, color: C.textLight, lineHeight: 2, fontFamily: "Jost, sans-serif" }}>📧 {CONTACT_EMAIL} &nbsp;·&nbsp; 👻 lk-luxe</div>
        <button onClick={() => window.dispatchEvent(new CustomEvent("openAdmin"))} style={{ marginTop: 24, background: "none", border: "none", color: "#3a2a20", fontSize: 9, letterSpacing: 2, cursor: "pointer", fontFamily: "Jost, sans-serif", textTransform: "uppercase" }}>Administration</button>
      </footer>

      {ordering && (
        <OrderForm product={ordering.prod} isCatalog={ordering.isCatalog} clientEmail={clientEmail} onClose={() => setOrdering(null)} onConfirm={(form) => { handleOrder(ordering.prod, ordering.isCatalog, form); }} />
      )}
      {myOrdersOpenDirect && <MyOrders orders={orders} setOrders={setOrders} onClose={() => setMyOrdersOpenDirect(false)} prefillEmail={clientEmail} />}
      {customRequestOpen && <CustomRequestForm onClose={() => setCustomRequestOpen(false)} onConfirm={handleCustomRequest} />}
      {contactOpen && (
        <Modal title="Contact" onClose={() => setContactOpen(false)}>
          <div style={{ textAlign: "center", padding: "10px 0 20px" }}>
            <div style={{ fontSize: 48, marginBottom: 20 }}>💌</div>
            <div style={{ fontSize: 14, color: C.textMid, lineHeight: 2, fontFamily: "Jost, sans-serif" }}>
              Pour toute question :<br /><br />
              <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: C.accent, fontWeight: 600, textDecoration: "none" }}>{CONTACT_EMAIL}</a><br /><br />
              <strong style={{ color: C.text }}>Snapchat :</strong> <span style={{ color: C.textMid }}>lk-luxe</span>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── ADMIN ──
function AdminApp({ stock, setStock, catalog, setCatalog, orders, setOrders, categories, setCategories, onLogout }) {
  const [tab, setTab] = useState("orders");
  const [showAddStock, setShowAddStock] = useState(false);
  const [showAddCatalog, setShowAddCatalog] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [editType, setEditType] = useState(null);
  const [emailPreview, setEmailPreview] = useState(null);
  const [newCat, setNewCat] = useState("");
  const [viewingCustom, setViewingCustom] = useState(null);
  const [sf, setSfRaw] = useState({ name: "", brand: "", category: categories[0], color: "", price: "", ref: "", desc: "", img: null });
  const [cf, setCfRaw] = useState({ name: "", brand: "", category: categories[0], color: "", estimatedPrice: "", deposit: "", ref: "", leadTime: "", desc: "", img: null, sizes: "" });
  const ssf = k => e => setSfRaw(f => ({ ...f, [k]: typeof e === "string" ? e : e.target.value }));
  const scf = k => e => setCfRaw(f => ({ ...f, [k]: typeof e === "string" ? e : e.target.value }));

  const updateOrder = (id, changes) => {
    const order = orders.find(o => o.id === id);
    setOrders(o => o.map(ord => ord.id === id ? { ...ord, ...changes } : ord));
    return { ...order, ...changes };
  };

  const acceptCustomRequest = (order) => {
    setCfRaw({
      name: "",
      brand: "",
      category: order.productCategory || categories[0],
      color: "",
      estimatedPrice: "",
      deposit: "",
      ref: "",
      leadTime: "",
      desc: order.clientSize ? `Pointure client : ${order.clientSize}` : "",
      img: order.productImg || null,
      sizes: order.clientSize || "",
    });
    updateOrder(order.id, { status: "en_attente" });
    setTab("catalog");
    setShowAddCatalog(true);
  };

  const addStock = () => {
    if (!sf.name || !sf.price) return;
    setStock(s => [...s, { ...sf, id: Date.now(), type: "stock", price: +sf.price, available: true }]);
    setSfRaw({ name: "", brand: "", category: categories[0], color: "", price: "", ref: "", desc: "", img: null });
    setShowAddStock(false);
  };

  const addCatalog = () => {
    if (!cf.name || !cf.estimatedPrice) return;
    const sizes = cf.sizes ? cf.sizes.split(",").map(s => s.trim()).filter(Boolean) : [];
    setCatalog(c => [...c, { ...cf, id: Date.now(), type: "catalog", estimatedPrice: +cf.estimatedPrice, deposit: +cf.deposit, sizes }]);
    setCfRaw({ name: "", brand: "", category: categories[0], color: "", estimatedPrice: "", deposit: "", ref: "", leadTime: "", desc: "", img: null, sizes: "" });
    setShowAddCatalog(false);
  };

  const saveEdit = () => {
    if (editType === "stock") setStock(s => s.map(p => p.id === editItem.id ? editItem : p));
    else {
      const sizes = typeof editItem.sizes === "string" ? editItem.sizes.split(",").map(s => s.trim()).filter(Boolean) : (editItem.sizes || []);
      setCatalog(c => c.map(p => p.id === editItem.id ? { ...editItem, sizes } : p));
    }
    setEditItem(null);
  };

  const genEmail = (order, type) => {
    const nom = `${order.prenom || ""} ${order.nom || ""}`.trim() || order.email;
    const solde = fmt((order.totalPrice || 0) - (order.depositPaid || 0));
    const templates = {
      confirmation: { subject: `✨ Confirmation — ${order.id}`, body: `Bonjour ${nom},\n\nNous avons bien reçu votre ${order.depositPaid < order.totalPrice ? "acompte de " + fmt(order.depositPaid) : "paiement"} pour : ${order.product} (réf. ${order.ref}).\n\nVotre commande est enregistrée sous la référence ${order.id}.\n${order.depositPaid < order.totalPrice ? "\nDélai estimé : " + (order.leadTime || "quelques semaines") + "\nVous serez notifié dès que votre article est disponible." : ""}\n\nMerci de votre confiance,\nLK Luxe` },
      disponible: { subject: `🎉 Votre article est disponible ! — ${order.id}`, body: `Bonjour ${nom},\n\nBonne nouvelle ! Votre ${order.product} (réf. ${order.ref}) est disponible.\n\nVous avez déjà réglé un acompte de ${fmt(order.depositPaid)}.\nSolde restant : ${solde}\n\nPour finaliser votre achat, rendez-vous sur notre site et cliquez sur "Mes commandes" avec votre email ${order.email}.\n\nCordialement,\nLK Luxe` },
      expediee: { subject: `📦 Expédié — ${order.id}`, body: `Bonjour ${nom},\n\nVotre ${order.product} est en route via Mondial Relay !\n\nAdresse : ${order.adresse || ""}, ${order.codePostal || ""} ${order.ville || ""}\n\nVous recevrez le numéro de suivi sous peu.\n\nMerci de votre confiance,\nLK Luxe` },
      custom_reply: { subject: `🔍 Votre demande personnalisée — ${order.id}`, body: `Bonjour ${nom},\n\nNous avons bien reçu votre demande pour : ${order.productBrand || "article personnalisé"}.\n\nNous étudions la disponibilité et reviendrons vers vous très bientôt avec un devis et un délai estimé.\n\nCordialement,\nLK Luxe` },
    };
    return templates[type] || { subject: "", body: "" };
  };

  const readyCount = orders.filter(o => o.status === "disponible").length;
  const soldeCount = orders.filter(o => o.status === "solde_recu").length;
  const customCount = orders.filter(o => o.isCustom && o.status === "custom_request").length;

  return (
    <div style={{ minHeight: "100vh", background: C.bgDark, fontFamily: "Jost, sans-serif" }}>
      <div style={{ background: C.text, padding: "0 28px", position: "sticky", top: 0, zIndex: 200, width: "100%", boxSizing: "border-box" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, overflowX: "auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, flexShrink: 0 }}>
            <div style={{ padding: "14px 0", flexShrink: 0 }}>
              <span style={{ fontSize: 18, fontFamily: "Cormorant, Georgia, serif", fontWeight: 600, letterSpacing: 4, color: C.accentLight }}>LK Luxe</span>
              <span style={{ fontSize: 10, color: C.textLight, letterSpacing: 3, marginLeft: 10 }}>ADMIN</span>
            </div>
            <nav style={{ display: "flex", flexShrink: 0 }}>
              {[
                ["orders", `Commandes${readyCount > 0 || soldeCount > 0 ? ` (${readyCount > 0 ? `${readyCount}⏳` : ""}${soldeCount > 0 ? ` ${soldeCount}💰` : ""})` : ""}`],
                ["custom", `Demandes perso${customCount > 0 ? ` (${customCount}🔍)` : ""}`],
                ["stock", "Stock"],
                ["catalog", "Catalogue"],
                ["settings", "Catégories"]
              ].map(([id, label]) => (
                <button key={id} onClick={() => setTab(id)} style={{ padding: "14px 16px", background: "none", border: "none", borderBottom: `2px solid ${tab === id ? C.accent : "transparent"}`, color: tab === id ? C.accentLight : C.textLight, fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", cursor: "pointer", fontFamily: "Jost, sans-serif", whiteSpace: "nowrap" }}>{label}</button>
              ))}
            </nav>
          </div>
          <button onClick={onLogout} style={{ background: "none", border: `1px solid #3a2a20`, borderRadius: 8, padding: "7px 16px", color: C.textLight, fontSize: 10, letterSpacing: 2, cursor: "pointer", fontFamily: "Jost, sans-serif", textTransform: "uppercase", flexShrink: 0 }}>← Site</button>
        </div>
      </div>

      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "32px 28px" }}>

        {/* ORDERS */}
        {tab === "orders" && (
          <div>
            {orders.filter(o => !o.isCustom).length === 0
              ? <div style={{ textAlign: "center", padding: 60, color: C.textLight }}>Aucune commande.</div>
              : orders.filter(o => !o.isCustom).map(order => (
                <div key={order.id} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22, marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 14 }}>
                    <div>
                      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 6 }}>
                        <span style={{ fontSize: 12, color: C.accent, fontWeight: 600, letterSpacing: 1 }}>{order.id}</span>
                        <StatusPill s={order.status} />
                        <span style={{ fontSize: 9, background: C.bgDark, color: C.textLight, padding: "2px 8px", borderRadius: 10, letterSpacing: 1 }}>{order.type === "stock" ? "STOCK" : "COMMANDE"}</span>
                      </div>
                      <div style={{ fontSize: 18, color: C.text, fontFamily: "Cormorant, Georgia, serif", fontWeight: 600, marginBottom: 4 }}>{order.product}</div>
                      <div style={{ fontSize: 12, color: C.textMid, lineHeight: 1.8 }}>
                        <strong>{order.prenom} {order.nom}</strong> · <span style={{ color: C.accent }}>{order.email}</span> · {order.tel}<br />
                        📦 {order.livraison === "point_relais" ? "Point Relais" : "Domicile"} — {order.adresse}, {order.codePostal} {order.ville}<br />
                        💳 {order.paiement === "revolut" ? "Revolut" : "PayPal"} · {order.date}
                        {order.clientSize && <><br />👟 Pointure client : <strong>{order.clientSize}</strong></>}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 10, color: C.textLight, letterSpacing: 1 }}>PAYÉ</div>
                      <div style={{ fontSize: 24, color: C.green, fontFamily: "Cormorant, Georgia, serif", fontWeight: 600 }}>{fmt(order.depositPaid)}</div>
                      {order.totalPrice > order.depositPaid && <div style={{ fontSize: 13, color: C.accent }}>Solde : {fmt(order.totalPrice - order.depositPaid)}</div>}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {order.status === "en_attente" && order.type === "catalog" && <Btn sm variant="ghost" onClick={() => updateOrder(order.id, { status: "commande" })}>✓ Commandé</Btn>}
                    {["en_attente", "commande"].includes(order.status) && <Btn sm variant="green" onClick={() => { const o = updateOrder(order.id, { status: "disponible" }); setEmailPreview({ order: o, type: "disponible" }); }}>📦 Disponible → Notifier</Btn>}
                    {order.status === "disponible" && (
                      <span style={{ fontSize: 11, color: C.gold, fontFamily: "Jost, sans-serif", padding: "8px 14px", background: C.gold + "15", borderRadius: 8, border: `1px solid ${C.gold}30` }}>
                        ⏳ En attente du solde client
                      </span>
                    )}
                    {order.status === "solde_recu" && <Btn sm onClick={() => { const o = updateOrder(order.id, { status: "expediee" }); setEmailPreview({ order: o, type: "expediee" }); }}>🚚 Expédier</Btn>}
                    <Btn sm variant="ghost" onClick={() => setEmailPreview({ order, type: "confirmation" })}>📧 Email</Btn>
                    {!["annulee", "expediee"].includes(order.status) && <Btn sm variant="red" onClick={() => updateOrder(order.id, { status: "annulee" })}>Annuler</Btn>}
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* CUSTOM REQUESTS */}
        {tab === "custom" && (
          <div>
            <div style={{ background: "linear-gradient(135deg, #F5EEF8, #EDE4F2)", border: "1px solid #D4B8E0", borderRadius: 14, padding: "16px 20px", marginBottom: 24, display: "flex", gap: 12, alignItems: "center" }}>
              <span style={{ fontSize: 24 }}>🔍</span>
              <div style={{ fontSize: 13, color: "#6B4D7E", lineHeight: 1.7, fontFamily: "Jost, sans-serif" }}>
                Ces demandes proviennent de clients ayant envoyé une photo d'un article qu'ils souhaitent. <strong>Aucun acompte n'a été encaissé.</strong> Contactez-les pour leur donner disponibilité et prix.
              </div>
            </div>
            {orders.filter(o => o.isCustom).length === 0
              ? <div style={{ textAlign: "center", padding: 60, color: C.textLight }}>Aucune demande personnalisée.</div>
              : orders.filter(o => o.isCustom).map(order => (
                <div key={order.id} style={{ background: C.surface, border: `2px solid #D4B8E0`, borderRadius: 14, padding: 22, marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 16 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 10 }}>
                        <span style={{ fontSize: 12, color: "#8B6B9E", fontWeight: 600, letterSpacing: 1 }}>{order.id}</span>
                        <StatusPill s={order.status} />
                        <span style={{ fontSize: 10, color: C.textLight, fontFamily: "Jost, sans-serif" }}>{order.date}</span>
                      </div>
                      <div style={{ fontSize: 18, color: C.text, fontFamily: "Cormorant, Georgia, serif", fontWeight: 600, marginBottom: 10 }}>
                        {getEmoji(order.productCategory)} {order.productCategory}
                      </div>
                      {order.clientSize && (
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#F5EEF8", border: "1px solid #D4B8E0", borderRadius: 8, padding: "6px 14px" }}>
                          <span style={{ fontSize: 16 }}>👟</span>
                          <span style={{ fontSize: 13, color: "#6B4D7E", fontWeight: 600, fontFamily: "Jost, sans-serif" }}>Pointure : {order.clientSize}</span>
                        </div>
                      )}
                    </div>
                    {/* Photo du client */}
                    {order.productImg && (
                      <div style={{ flexShrink: 0 }}>
                        <div style={{ fontSize: 10, color: C.textLight, letterSpacing: 2, marginBottom: 6, fontFamily: "Jost, sans-serif" }}>PHOTO CLIENT</div>
                        <img
                          src={order.productImg}
                          alt="Article souhaité"
                          style={{ width: 140, height: 140, objectFit: "cover", borderRadius: 12, border: `2px solid #D4B8E0`, cursor: "pointer" }}
                          onClick={() => setViewingCustom(order.productImg)}
                        />
                        <div style={{ fontSize: 10, color: "#8B6B9E", marginTop: 4, textAlign: "center", fontFamily: "Jost, sans-serif", cursor: "pointer" }} onClick={() => setViewingCustom(order.productImg)}>🔍 Agrandir</div>
                      </div>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <Btn sm variant="green" onClick={() => acceptCustomRequest(order)}>✓ Accepter → Ajouter au catalogue</Btn>
                    <Btn sm variant="red" onClick={() => updateOrder(order.id, { status: "annulee" })}>Refuser</Btn>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* STOCK */}
        {tab === "stock" && (
          <div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
              <Btn onClick={() => setShowAddStock(true)}>+ Ajouter un article</Btn>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 18 }}>
              {stock.map(p => (
                <div key={p.id} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden", opacity: p.available ? 1 : 0.6 }}>
                  <div style={{ background: C.bgDark, aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", position: "relative" }}>
                    {p.img ? <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontSize: 52 }}>{getEmoji(p.category)}</span>}
                    <div style={{ position: "absolute", top: 10, right: 10, background: p.available ? C.green + "25" : C.red + "20", color: p.available ? C.green : C.red, border: `1px solid ${p.available ? C.green : C.red}40`, borderRadius: 20, padding: "2px 10px", fontSize: 9, fontWeight: 700, letterSpacing: 1.5 }}>{p.available ? "DISPO" : "VENDU"}</div>
                  </div>
                  <div style={{ padding: 16 }}>
                    <div style={{ fontSize: 9, color: C.textLight, letterSpacing: 2, marginBottom: 3 }}>{p.brand}</div>
                    <div style={{ fontSize: 15, color: C.text, fontFamily: "Cormorant, Georgia, serif", fontWeight: 600, marginBottom: 2 }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: C.textMid, marginBottom: 10 }}>{p.color} · {p.ref}</div>
                    <div style={{ fontSize: 22, color: C.text, fontFamily: "Cormorant, Georgia, serif", fontWeight: 600, marginBottom: 14 }}>{fmt(p.price)}</div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <Btn sm variant="ghost" onClick={() => { setEditItem({ ...p }); setEditType("stock"); }}>✏️ Modifier</Btn>
                      <Btn sm variant="ghost" onClick={() => setStock(s => s.map(x => x.id === p.id ? { ...x, available: !x.available } : x))}>{p.available ? "Vendu" : "Dispo"}</Btn>
                      <Btn sm variant="red" onClick={() => setStock(s => s.filter(x => x.id !== p.id))}>✕</Btn>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CATALOG */}
        {tab === "catalog" && (
          <div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
              <Btn onClick={() => setShowAddCatalog(true)}>+ Ajouter au catalogue</Btn>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 18 }}>
              {catalog.map(p => (
                <div key={p.id} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
                  <div style={{ background: C.bgDark, aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", position: "relative" }}>
                    {p.img ? <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontSize: 52 }}>{getEmoji(p.category)}</span>}
                    <div style={{ position: "absolute", top: 10, left: 10, background: C.gold + "22", color: C.gold, border: `1px solid ${C.gold}40`, borderRadius: 20, padding: "2px 10px", fontSize: 9, fontWeight: 700, letterSpacing: 1.5 }}>COMMANDE</div>
                    {isShoeCategory(p.category) && p.sizes && p.sizes.length > 0 && (
                      <div style={{ position: "absolute", bottom: 8, left: 8, right: 8, display: "flex", flexWrap: "wrap", gap: 3 }}>
                        {p.sizes.map((s, i) => <span key={i} style={{ background: "rgba(255,255,255,0.9)", color: C.accentDark, border: `1px solid ${C.border}`, borderRadius: 5, padding: "1px 6px", fontSize: 9, fontWeight: 600, fontFamily: "Jost, sans-serif" }}>T.{s}</span>)}
                      </div>
                    )}
                  </div>
                  <div style={{ padding: 16 }}>
                    <div style={{ fontSize: 9, color: C.textLight, letterSpacing: 2, marginBottom: 3 }}>{p.brand}</div>
                    <div style={{ fontSize: 15, color: C.text, fontFamily: "Cormorant, Georgia, serif", fontWeight: 600, marginBottom: 2 }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: C.textMid, marginBottom: 10 }}>{p.color} · ⏱ {p.leadTime}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                      <div><div style={{ fontSize: 9, color: C.textLight }}>ESTIMÉ</div><div style={{ fontSize: 20, color: C.text, fontFamily: "Cormorant, Georgia, serif", fontWeight: 600 }}>{fmt(p.estimatedPrice)}</div></div>
                      <div style={{ textAlign: "right" }}><div style={{ fontSize: 9, color: C.textLight }}>ACOMPTE</div><div style={{ fontSize: 20, color: C.green, fontFamily: "Cormorant, Georgia, serif", fontWeight: 600 }}>{fmt(p.deposit)}</div></div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <Btn sm variant="ghost" onClick={() => { setEditItem({ ...p, sizes: p.sizes ? p.sizes.join(", ") : "" }); setEditType("catalog"); }}>✏️ Modifier</Btn>
                      <Btn sm variant="red" onClick={() => setCatalog(c => c.filter(x => x.id !== p.id))}>Retirer</Btn>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CATEGORIES */}
        {tab === "settings" && (
          <div style={{ maxWidth: 500 }}>
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 28 }}>
              <div style={{ fontSize: 13, color: C.text, fontWeight: 500, letterSpacing: 2, textTransform: "uppercase", marginBottom: 20 }}>Gérer les catégories</div>
              {categories.map((c, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: C.bg, borderRadius: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: 14, color: C.text, fontFamily: "Jost, sans-serif" }}>{getEmoji(c)} {c} {isShoeCategory(c) && <span style={{ fontSize: 10, color: "#8B6B9E", marginLeft: 6 }}>+ pointure</span>}</span>
                  <button onClick={() => setCategories(cats => cats.filter((_, j) => j !== i))} style={{ background: "none", border: "none", color: C.red, cursor: "pointer", fontSize: 18, lineHeight: 1 }}>×</button>
                </div>
              ))}
              <div style={{ fontSize: 11, color: C.textLight, marginBottom: 12, fontFamily: "Jost, sans-serif", padding: "8px 12px", background: "#F5EEF8", borderRadius: 8 }}>
                👟 Les catégories <strong>Claquettes, Baskets, Talons</strong> affichent automatiquement un champ pointure.
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                <input value={newCat} onChange={e => setNewCat(e.target.value)} placeholder="Nouvelle catégorie..." style={{ flex: 1, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", color: C.text, fontSize: 14, fontFamily: "Jost, sans-serif", outline: "none" }} />
                <Btn onClick={() => { if (newCat.trim()) { setCategories(c => [...c, newCat.trim()]); setNewCat(""); } }}>Ajouter</Btn>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Stock Modal */}
      {showAddStock && (
        <Modal title="Ajouter au stock" onClose={() => setShowAddStock(false)} wide>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 18px" }}>
            <Field label="Nom" value={sf.name} onChange={ssf("name")} required />
            <Field label="Marque" value={sf.brand} onChange={ssf("brand")} required />
            <Field label="Prix (€)" type="number" value={sf.price} onChange={ssf("price")} required />
            <Field label="Référence" value={sf.ref} onChange={ssf("ref")} />
            <Sel label="Catégorie" value={sf.category} onChange={ssf("category")} options={categories.map(c => ({ v: c, l: `${getEmoji(c)} ${c}` }))} />
            <Field label="Couleur / Matière" value={sf.color} onChange={ssf("color")} />
          </div>
          <Field label="Description" value={sf.desc} onChange={ssf("desc")} rows={3} />
          <ImgUpload value={sf.img} onChange={(v) => setSfRaw(f => ({ ...f, img: v }))} />
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Btn variant="ghost" onClick={() => setShowAddStock(false)}>Annuler</Btn>
            <Btn onClick={addStock}>Ajouter au stock</Btn>
          </div>
        </Modal>
      )}

      {/* Add Catalog Modal */}
      {showAddCatalog && (
        <Modal title="Ajouter au catalogue" onClose={() => setShowAddCatalog(false)} wide>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 18px" }}>
            <Field label="Nom" value={cf.name} onChange={scf("name")} required />
            <Field label="Marque" value={cf.brand} onChange={scf("brand")} required />
            <Field label="Prix estimé (€)" type="number" value={cf.estimatedPrice} onChange={scf("estimatedPrice")} required />
            <Field label="Acompte (€)" type="number" value={cf.deposit} onChange={scf("deposit")} required />
            <Sel label="Catégorie" value={cf.category} onChange={scf("category")} options={categories.map(c => ({ v: c, l: `${getEmoji(c)} ${c}` }))} />
            <Field label="Couleur / Matière" value={cf.color} onChange={scf("color")} />
            <Field label="Référence" value={cf.ref} onChange={scf("ref")} />
            <Field label="Délai estimé" value={cf.leadTime} onChange={scf("leadTime")} placeholder="ex: 3-6 semaines" />
          </div>
          {isShoeCategory(cf.category) && (
            <Field label="Tailles disponibles 👟" value={cf.sizes} onChange={scf("sizes")} placeholder="ex: 36, 37, 38, 39, 40" hint="Séparez les tailles par des virgules. Elles seront affichées sur la fiche produit." />
          )}
          <Field label="Description" value={cf.desc} onChange={scf("desc")} rows={3} />
          <ImgUpload value={cf.img} onChange={(v) => setCfRaw(f => ({ ...f, img: v }))} />
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Btn variant="ghost" onClick={() => setShowAddCatalog(false)}>Annuler</Btn>
            <Btn onClick={addCatalog}>Ajouter au catalogue</Btn>
          </div>
        </Modal>
      )}

      {/* Edit Modal */}
      {editItem && (
        <Modal title={`Modifier — ${editItem.name}`} onClose={() => setEditItem(null)} wide>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 18px" }}>
            <Field label="Nom" value={editItem.name} onChange={e => setEditItem(i => ({ ...i, name: e.target.value }))} required />
            <Field label="Marque" value={editItem.brand} onChange={e => setEditItem(i => ({ ...i, brand: e.target.value }))} />
            {editType === "stock"
              ? <Field label="Prix (€)" type="number" value={editItem.price} onChange={e => setEditItem(i => ({ ...i, price: +e.target.value }))} required />
              : <>
                <Field label="Prix estimé (€)" type="number" value={editItem.estimatedPrice} onChange={e => setEditItem(i => ({ ...i, estimatedPrice: +e.target.value }))} />
                <Field label="Acompte (€)" type="number" value={editItem.deposit} onChange={e => setEditItem(i => ({ ...i, deposit: +e.target.value }))} />
                <Field label="Délai estimé" value={editItem.leadTime} onChange={e => setEditItem(i => ({ ...i, leadTime: e.target.value }))} />
              </>}
            <Field label="Couleur" value={editItem.color} onChange={e => setEditItem(i => ({ ...i, color: e.target.value }))} />
            <Field label="Référence" value={editItem.ref} onChange={e => setEditItem(i => ({ ...i, ref: e.target.value }))} />
          </div>
          {editType === "catalog" && isShoeCategory(editItem.category) && (
            <Field label="Tailles disponibles 👟" value={typeof editItem.sizes === "string" ? editItem.sizes : (editItem.sizes || []).join(", ")} onChange={e => setEditItem(i => ({ ...i, sizes: e.target.value }))} placeholder="ex: 36, 37, 38, 39, 40" hint="Séparez les tailles par des virgules." />
          )}
          <Field label="Description" value={editItem.desc} onChange={e => setEditItem(i => ({ ...i, desc: e.target.value }))} rows={3} />
          <ImgUpload value={editItem.img} onChange={(v) => setEditItem(i => ({ ...i, img: v }))} label="Modifier l'image" />
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Btn variant="ghost" onClick={() => setEditItem(null)}>Annuler</Btn>
            <Btn onClick={saveEdit}>Enregistrer</Btn>
          </div>
        </Modal>
      )}

      {/* Email Preview */}
      {emailPreview && (
        <Modal title="📧 Email client" onClose={() => setEmailPreview(null)}>
          {(() => { const t = genEmail(emailPreview.order, emailPreview.type); return (
            <div>
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 10, color: C.accentDark, letterSpacing: 2, textTransform: "uppercase", marginBottom: 5 }}>À</div>
                <div style={{ color: C.accent, fontSize: 14 }}>{emailPreview.order.email}</div>
              </div>
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 10, color: C.accentDark, letterSpacing: 2, textTransform: "uppercase", marginBottom: 5 }}>Objet</div>
                <div style={{ color: C.text, fontSize: 13, background: C.bg, padding: "10px 14px", borderRadius: 8, border: `1px solid ${C.border}` }}>{t.subject}</div>
              </div>
              <div style={{ marginBottom: 22 }}>
                <div style={{ fontSize: 10, color: C.accentDark, letterSpacing: 2, textTransform: "uppercase", marginBottom: 5 }}>Message</div>
                <textarea readOnly value={t.body} style={{ width: "100%", height: 200, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: "12px 14px", color: C.text, fontSize: 13, fontFamily: "Jost, sans-serif", resize: "none", boxSizing: "border-box", lineHeight: 1.7 }} />
              </div>
              <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                <Btn variant="ghost" onClick={() => setEmailPreview(null)}>Fermer</Btn>
                <Btn onClick={() => window.location.href = `mailto:${emailPreview.order.email}?subject=${encodeURIComponent(t.subject)}&body=${encodeURIComponent(t.body)}`}>Ouvrir dans Mail</Btn>
              </div>
            </div>
          ); })()}
        </Modal>
      )}

      {/* Image viewer for custom requests */}
      {viewingCustom && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, cursor: "pointer" }} onClick={() => setViewingCustom(null)}>
          <img src={viewingCustom} alt="Article souhaité" style={{ maxWidth: "90vw", maxHeight: "90vh", borderRadius: 16, objectFit: "contain", boxShadow: "0 32px 80px rgba(0,0,0,0.5)" }} />
          <div style={{ position: "absolute", top: 20, right: 24, color: "white", fontSize: 32, cursor: "pointer", lineHeight: 1 }} onClick={() => setViewingCustom(null)}>×</div>
        </div>
      )}
    </div>
  );
}

// ── ROOT ──
export default function App() {
  const [view, setView] = useState("client");
  const [pwd, setPwd] = useState("");
  const [pwdError, setPwdError] = useState(false);
  const [stock, setStock] = useState(INIT_STOCK);
  const [catalog, setCatalog] = useState(INIT_CATALOG);
  const [orders, setOrders] = useState(INIT_ORDERS);
  const [categories, setCategories] = useState(INIT_CATS);

  useEffect(() => {
    const h = () => setView("admin_login");
    window.addEventListener("openAdmin", h);
    return () => window.removeEventListener("openAdmin", h);
  }, []);

  const login = () => {
    if (pwd === ADMIN_PWD) { setView("admin"); setPwd(""); setPwdError(false); }
    else setPwdError(true);
  };

  return (
    <div>
      <style>{`${FONTS} * { box-sizing: border-box; } body { margin: 0; } ::-webkit-scrollbar { width: 5px; } ::-webkit-scrollbar-thumb { background: ${C.borderDark}; border-radius: 3px; } input::placeholder, textarea::placeholder { color: ${C.textLight} !important; } select option { background: ${C.surface}; color: ${C.text}; }`}</style>

      {view === "client" && <ClientShop stock={stock} setStock={setStock} catalog={catalog} orders={orders} setOrders={setOrders} categories={categories} />}

      {view === "admin_login" && (
        <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, padding: "52px 48px", maxWidth: 400, width: "100%", textAlign: "center", boxShadow: `0 20px 60px ${C.accent}15` }}>
            <div style={{ fontSize: 30, fontFamily: "Cormorant, Georgia, serif", fontWeight: 600, letterSpacing: 6, color: C.text, marginBottom: 4 }}>LK Luxe</div>
            <div style={{ fontSize: 9, letterSpacing: 5, color: C.textLight, textTransform: "uppercase", marginBottom: 40 }}>Administration</div>
            <Field label="Mot de passe" type="password" value={pwd} onChange={e => setPwd(e.target.value)} hint={pwdError ? "❌ Mot de passe incorrect" : ""} />
            <div onKeyDown={e => e.key === "Enter" && login()}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
                <Btn full onClick={login} disabled={!pwd}>Accéder →</Btn>
                <Btn full variant="ghost" onClick={() => setView("client")}>← Retour au site</Btn>
              </div>
            </div>
          </div>
        </div>
      )}

      {view === "admin" && (
        <AdminApp stock={stock} setStock={setStock} catalog={catalog} setCatalog={setCatalog} orders={orders} setOrders={setOrders} categories={categories} setCategories={setCategories} onLogout={() => setView("client")} />
      )}
    </div>
  );
}
