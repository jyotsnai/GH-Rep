import React, { useEffect, useMemo, useState } from "react";
import { ArrowRight, ChevronDown, Heart, Instagram, Mail, Menu, Minus, Plus, Search, ShoppingBag, Sparkles, X } from "lucide-react";
import { siteConfig } from "./config/siteConfig";
import { Product } from "./types";
import { products } from "./data/products";

const money = (n:number) => new Intl.NumberFormat("en-IN", { style:"currency", currency:"INR", maximumFractionDigits:0 }).format(n);

function App() {
  const [view, setView] = useState("home");
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState<{product:Product, qty:number}[]>(() => {
    try { return JSON.parse(localStorage.getItem("moonlit-cart") || "[]"); } catch { return []; }
  });
  const [selected, setSelected] = useState<Product|null>(null);
  const [showCart, setShowCart] = useState(false);
  const [customSent, setCustomSent] = useState(false);

  useEffect(() => {
    localStorage.setItem("moonlit-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const route = () => setView((location.hash || "#home").slice(1) || "home");
    route();
    window.addEventListener("hashchange", route);
    return () => window.removeEventListener("hashchange", route);
  }, []);

  const go = (v:string) => {
    location.hash = v;
    setMenu(false);
    window.scrollTo({top:0, behavior:"smooth"});
  };

  const categories = ["All", ...Array.from(new Set(products.map(p=>p.category)))];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter(p =>
      (category === "All" || p.category === category) &&
      (!q || `${p.name} ${p.category}`.toLowerCase().includes(q))
    );
  }, [category, search]);

  const cartCount = cart.reduce((s,i)=>s+i.qty,0);
  const subtotal = cart.reduce((s,i)=>s+i.qty*i.product.price,0);

  const add = (p:Product) => {
    if (p.status === "Coming soon") return;
    setCart(c => {
      const found = c.find(i=>i.product.id===p.id);
      return found ? c.map(i=>i.product.id===p.id ? {...i,qty:i.qty+1}:i) : [...c,{product:p,qty:1}];
    });
    setShowCart(true);
  };

  const changeQty = (id:string, delta:number) =>
    setCart(c => c.map(i=>i.product.id===id ? {...i,qty:i.qty+delta}:i).filter(i=>i.qty>0));

  const whatsapp = (message:string) => {
    if (!siteConfig.whatsappNumber) {
      alert("WhatsApp ordering is ready to activate. Add Jyotsna's WhatsApp number in src/config/siteConfig.ts first.");
      return;
    }
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const orderCart = () => {
    const lines = cart.map(i=>`• ${i.product.name} × ${i.qty} — ${money(i.product.price*i.qty)}`).join("\n");
    whatsapp(`Hi Jyotsna! I'd like to place an order from Moonlit Loops.\n\n${lines}\n\nEstimated item total: ${money(subtotal)}\nPlease confirm availability, colour/size details, shipping and final payable amount.`);
  };

  return (
    <div className="site">
      <div className="announcement">{siteConfig.noticeBanner}</div>
      <header className="header">
        <button className="brand" onClick={()=>go("home")} aria-label="Moonlit Loops home">
          <span className="brandMark">ML</span>
          <span><strong>{siteConfig.brandName}</strong><small>{siteConfig.subtitle}</small></span>
        </button>
        <nav className={menu ? "nav open":"nav"}>
          {["home","shop","custom","about","faq","contact"].map(x=>
            <button key={x} className={view===x?"active":""} onClick={()=>go(x)}>{x==="faq"?"FAQ":x[0].toUpperCase()+x.slice(1)}</button>
          )}
        </nav>
        <div className="headerActions">
          <button className="iconBtn" onClick={()=>setSearch(s=>s ? "":" ")} aria-label="Search"><Search size={20}/></button>
          <button className="iconBtn bagBtn" onClick={()=>setShowCart(true)} aria-label="Cart"><ShoppingBag size={21}/>{cartCount>0 && <b>{cartCount}</b>}</button>
          <button className="menuBtn" onClick={()=>setMenu(m=>!m)} aria-label="Menu"><Menu size={22}/></button>
        </div>
      </header>

      {search !== "" && <div className="searchBar"><Search size={18}/><input autoFocus value={search.trim()} onChange={e=>setSearch(e.target.value)} placeholder="Search crochet pieces…"/><button onClick={()=>setSearch("")}><X size={18}/></button></div>}

      {view==="home" && <Home go={go} add={add} setSelected={setSelected}/>}
      {view==="shop" && <Shop filtered={filtered} categories={categories} category={category} setCategory={setCategory} search={search.trim()} setSelected={setSelected} add={add}/>}
      {view==="custom" && <Custom whatsapp={whatsapp} sent={customSent} setSent={setCustomSent}/>}
      {view==="about" && <About go={go}/>}
      {view==="faq" && <FAQ/>}
      {view==="contact" && <Contact whatsapp={whatsapp}/>}

      <footer className="footer">
        <div className="footerGrid">
          <div><div className="footerBrand">{siteConfig.brandName}<span> {siteConfig.subtitle}</span></div><p>{siteConfig.tagline}</p><p className="muted">Handcrafted in Pune, Maharashtra • India</p></div>
          <div><h4>Explore</h4><button onClick={()=>go("shop")}>Shop</button><button onClick={()=>go("custom")}>Custom Orders</button><button onClick={()=>go("about")}>Our Story</button><button onClick={()=>go("faq")}>FAQ</button></div>
          <div><h4>Contact</h4><a href={`mailto:${siteConfig.email}`}><Mail size={16}/> {siteConfig.email}</a>{siteConfig.instagramUrl && <a href={siteConfig.instagramUrl} target="_blank"><Instagram size={16}/> {siteConfig.instagramHandle}</a>}<button onClick={()=>go("contact")}>Shipping & care</button></div>
        </div>
        <div className="footerBottom">© {new Date().getFullYear()} Moonlit Loops by Jyotsna. All rights reserved.</div>
      </footer>

      {selected && <ProductModal product={selected} add={add} close={()=>setSelected(null)}/>}
      {showCart && <Cart cart={cart} subtotal={subtotal} changeQty={changeQty} remove={(id)=>setCart(c=>c.filter(i=>i.product.id!==id))} order={orderCart} close={()=>setShowCart(false)}/>}
    </div>
  );
}

function Home({go,add,setSelected}:{go:(s:string)=>void,add:(p:Product)=>void,setSelected:(p:Product)=>void}) {
  const featured = products.filter(p=>p.status!=="Coming soon").slice(0,8);
  return <main>
    <section className="hero">
      <div className="heroCopy">
        <div className="eyebrow"><Sparkles size={15}/> Handmade in Pune</div>
        <h1>Little loops.<br/><em>Big heart.</em></h1>
        <p>Thoughtfully crocheted pieces for everyday life, gifting and the little moments that deserve something made by hand.</p>
        <div className="heroBtns"><button className="primary" onClick={()=>go("shop")}>Explore the collection <ArrowRight size={18}/></button><button className="secondary" onClick={()=>go("custom")}>Have an idea?</button></div>
        <div className="trust"><span>✓ Made to order</span><span>✓ India-first</span><span>✓ Personal service</span></div>
      </div>
      <div className="heroVisual"><div className="photoPlaceholder large"><span>PHOTO</span><strong>Jyotsna's crochet world</strong><small>Real product photography coming soon</small></div></div>
    </section>

    <section className="intro section">
      <div><p className="eyebrow">THE MOONLIT WAY</p><h2>Made slowly.<br/><em>Made for you.</em></h2></div>
      <div className="introText"><p>Moonlit Loops is Jyotsna's little crochet studio — a place where yarn, colour and patience turn into gifts, accessories, home pieces and keepsakes.</p><button className="textLink" onClick={()=>go("about")}>Read our story <ArrowRight size={16}/></button></div>
    </section>

    <section className="section">
      <div className="sectionHead"><div><p className="eyebrow">THE COLLECTION</p><h2>Start with something lovely.</h2></div><button className="textLink" onClick={()=>go("shop")}>View all <ArrowRight size={16}/></button></div>
      <div className="productGrid">{featured.map(p=><Card key={p.id} product={p} add={add} select={setSelected}/>)}</div>
    </section>

    <section className="orderStrip">
      <div><p className="eyebrow">SOMETHING IN MIND?</p><h2>Tell Jyotsna what you’re imagining.</h2><p>Colours, gifts, special occasions, a favourite idea — custom requests are welcome.</p></div>
      <button className="primary light" onClick={()=>go("custom")}>Start a custom request <ArrowRight size={18}/></button>
    </section>
  </main>
}

function Shop({filtered,categories,category,setCategory,search,setSelected,add}:any) {
  return <main className="section shopPage">
    <div className="pageIntro"><p className="eyebrow">SHOP HANDMADE</p><h1>Made to order, <em>not mass produced.</em></h1><p>Browse the current launch collection. Every item is prepared by Jyotsna after your order is confirmed.</p></div>
    <div className="filters"><div className="chips">{categories.map((c:string)=><button key={c} className={category===c?"chip active":"chip"} onClick={()=>setCategory(c)}>{c}</button>)}</div>{search && <span className="resultNote">Searching for “{search}”</span>}</div>
    <div className="productGrid">{filtered.map((p:Product)=><Card key={p.id} product={p} add={add} select={setSelected}/>)}</div>
    {filtered.length===0 && <div className="empty"><h3>No pieces found</h3><p>Try another search or category.</p></div>}
  </main>
}

function Card({product,add,select}:{product:Product,add:(p:Product)=>void,select:(p:Product)=>void}) {
  return <article className="card">
    <button className="cardImage" onClick={()=>select(product)}><span>PHOTO COMING SOON</span><small>Moonlit Loops</small></button>
    <div className="cardBody"><div className="cardMeta"><span>{product.category}</span><Heart size={17}/></div><h3>{product.name}</h3><p>{product.description}</p><div className="price">{money(product.price)} <small>starting</small></div><div className="cardFoot"><span className="made">{product.status}</span>{product.status==="Coming soon" ? <button className="outline" onClick={()=>select(product)}>Details</button> : <button className="outline" onClick={()=>add(product)}>Add to bag</button>}</div></div>
  </article>
}

function ProductModal({product,add,close}:{product:Product,add:(p:Product)=>void,close:()=>void}) {
 return <div className="overlay" onMouseDown={e=>e.target===e.currentTarget&&close()}><div className="modal"><button className="close" onClick={close}><X/></button><div className="modalPhoto photoPlaceholder"><span>PHOTO COMING SOON</span></div><div className="modalBody"><p className="eyebrow">{product.category}</p><h2>{product.name}</h2><div className="price big">{money(product.price)} <small>starting</small></div><p>{product.description}</p><div className="detailBox"><strong>Made to order</strong><span>Final colour, size, materials and timeline are confirmed with you before payment.</span></div><p className="muted">{product.note}</p>{product.status!=="Coming soon" && <button className="primary full" onClick={()=>{add(product);close()}}>Add to bag</button>}</div></div></div>
}

function Cart({cart,subtotal,changeQty,remove,order,close}:any) {
 return <div className="drawerOverlay" onMouseDown={e=>e.target===e.currentTarget&&close()}><aside className="cart"><div className="cartHead"><div><p className="eyebrow">YOUR BAG</p><h2>{cart.length ? "Ready when you are." : "Your bag is empty."}</h2></div><button onClick={close}><X/></button></div>{cart.length ? <><div className="cartItems">{cart.map((i:any)=><div className="cartItem" key={i.product.id}><div className="miniPhoto">PHOTO</div><div className="cartInfo"><strong>{i.product.name}</strong><span>{money(i.product.price)}</span><div className="qty"><button onClick={()=>changeQty(i.product.id,-1)}><Minus size={14}/></button><b>{i.qty}</b><button onClick={()=>changeQty(i.product.id,1)}><Plus size={14}/></button><button className="remove" onClick={()=>remove(i.product.id)}>Remove</button></div></div></div>)}</div><div className="cartBottom"><div><span>Estimated item total</span><strong>{money(subtotal)}</strong></div><p>Shipping and any size/colour customisation are confirmed with you before payment.</p><button className="primary full" onClick={order}>Order via WhatsApp</button><small>Payment is arranged manually after order confirmation.</small></div></> : <div className="emptyCart"><ShoppingBag size={42}/><p>Browse the collection and add something you love.</p><button className="primary" onClick={()=>{close();location.hash="shop"}}>Shop handmade</button></div>}</aside></div>
}

function Custom({whatsapp,sent,setSent}:{whatsapp:(s:string)=>void,sent:boolean,setSent:(b:boolean)=>void}) {
 const [form,setForm]=useState({name:"",contact:"",idea:"",colours:"",budget:"",date:""});
 const submit=(e:React.FormEvent)=>{e.preventDefault();const msg=`Hi Jyotsna! I'd like to discuss a custom Moonlit Loops order.\n\nName: ${form.name}\nContact: ${form.contact}\nIdea: ${form.idea}\nColours: ${form.colours}\nBudget: ${form.budget}\nNeeded by: ${form.date||"Flexible"}`;whatsapp(msg);setSent(true)};
 return <main className="section narrow"><div className="pageIntro"><p className="eyebrow">CUSTOM ORDERS</p><h1>Bring us your <em>idea.</em></h1><p>Tell us what you have in mind. Jyotsna will review the request and confirm what can be made, the final price and a realistic timeline before any payment.</p></div>{sent&&<div className="success">Your request is ready to send. Once WhatsApp is connected, this form will open the prepared conversation.</div>}<form className="form" onSubmit={submit}><label>Your name<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label><label>WhatsApp / phone<input required value={form.contact} onChange={e=>setForm({...form,contact:e.target.value})}/></label><label>What would you like made?<textarea required value={form.idea} onChange={e=>setForm({...form,idea:e.target.value})} placeholder="For example: a crochet bouquet for a birthday…"/></label><label>Preferred colours / style<input value={form.colours} onChange={e=>setForm({...form,colours:e.target.value})}/></label><div className="two"><label>Approx. budget<input value={form.budget} onChange={e=>setForm({...form,budget:e.target.value})} placeholder="e.g. ₹1,500"/></label><label>Needed by<input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/></label></div><button className="primary" type="submit">Prepare my WhatsApp request <ArrowRight size={18}/></button></form></main>
}

function About({go}:{go:(s:string)=>void}) {
 return <main className="section narrow"><div className="pageIntro"><p className="eyebrow">OUR STORY</p><h1>A small studio with <em>a lot of loops.</em></h1><p>Moonlit Loops by Jyotsna began with a simple idea: make beautiful things slowly, learn the craft properly, and let each piece have its own personality.</p></div><div className="story"><div className="photoPlaceholder tall"><span>PHOTO</span><small>Studio / Jyotsna photo coming later</small></div><div><h2>Made by hand, not by a machine.</h2><p>Every piece starts with yarn, a hook and time. Some designs are quick little gifts; others take many hours. That is why Moonlit Loops works primarily on a made-to-order basis.</p><p>We are starting in India, learning what customers love, refining quality and packaging, and building the brand one order at a time.</p><div className="values"><div><strong>01</strong><span>Thoughtful</span></div><div><strong>02</strong><span>Handmade</span></div><div><strong>03</strong><span>Personal</span></div></div></div></div><div className="noteBlock"><Sparkles/><div><strong>Why made to order?</strong><p>It lets Jyotsna make each piece for its owner instead of holding large amounts of ready stock. It also means colours, size and small details can often be discussed before the order is confirmed.</p></div></div><button className="textLink" onClick={()=>go("shop")}>Explore the collection <ArrowRight size={16}/></button></main>
}

function FAQ() {
 const faqs=[
 ["How do I place an order?","Add pieces to your bag and choose Order via WhatsApp. Jyotsna will confirm the details, shipping and final amount before payment."],
 ["Are all pieces made to order?","Yes for the launch model, unless a piece is specifically shown as ready stock or coming soon. The current collection is primarily made after you order."],
 ["Can I choose another colour or size?","For many pieces, yes. Tell us what you have in mind and we will confirm what is practical before accepting the order."],
 ["How long will my order take?","The timeline depends on the piece, quantity and customisation. A realistic preparation estimate will be confirmed before payment."],
 ["Do you ship outside India?","Not at launch. Moonlit Loops is starting with India so we can learn and refine the full customer and delivery experience first."],
 ["How does payment work?","At launch, payment is handled manually after the order is confirmed. Shipping is also confirmed before payment."],
 ["Can I return a handmade order?","Please contact us first if something arrives damaged or materially different from the confirmed order. Custom and made-to-order pieces may have different return conditions, which will be confirmed before payment."],
 ];
 return <main className="section narrow"><div className="pageIntro"><p className="eyebrow">GOOD TO KNOW</p><h1>Questions, <em>answered.</em></h1><p>We want ordering handmade to feel simple and personal.</p></div><div className="faq">{faqs.map(([q,a],i)=><details key={i}><summary>{q}<ChevronDown size={18}/></summary><p>{a}</p></details>)}</div></main>
}

function Contact({whatsapp}:{whatsapp:(s:string)=>void}) {
 return <main className="section narrow"><div className="pageIntro"><p className="eyebrow">CONTACT</p><h1>Let's talk <em>crochet.</em></h1><p>Questions about a product, colours, a gift or a custom idea? Start with a message.</p></div><div className="contactCards"><a className="contactCard" href={`mailto:${siteConfig.email}`}><Mail/><span>Email</span><strong>{siteConfig.email}</strong></a><button className="contactCard" onClick={()=>whatsapp("Hi Jyotsna! I have a question about Moonlit Loops.")}><ShoppingBag/><span>WhatsApp</span><strong>{siteConfig.whatsappDisplay||"Number to be added"}</strong></button></div><div className="shipping"><h3>India-first launch</h3><p>We currently ship within India. Shipping charges and delivery timelines are confirmed with you before payment because handmade orders can vary by size, weight and destination.</p><h3>Care</h3><p>Care instructions vary by yarn and product. Product-specific care guidance will be provided with the confirmed order.</p></div></main>
}

export default App;
