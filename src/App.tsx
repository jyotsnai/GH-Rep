import React, { useEffect, useMemo, useState } from "react";
import { ArrowRight, ChevronDown, Heart, Instagram, Mail, Menu, Minus, Plus, Search, ShoppingBag, Sparkles, X, MessageCircle, GraduationCap, BookOpen, Gift, Truck, Leaf } from "lucide-react";
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
            <button key={x} className={view===x?"active":""} onClick={()=>go(x)}>{x==="faq"?"FAQ":x==="custom"?"Custom Orders":x[0].toUpperCase()+x.slice(1)}</button>
          )}
          <button onClick={()=>window.scrollTo({top:document.body.scrollHeight/3,behavior:"smooth"})} className="navSoon">Digital Patterns <span>Soon</span></button>
          <button onClick={()=>window.scrollTo({top:document.body.scrollHeight/3,behavior:"smooth"})} className="navSoon">Crochet Coaching <span>Soon</span></button>
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
  const categories = [
    {name:"Clothes & Accessories", sub:"Tops, scarves, cardigans, beanies & more", img:"/categories/clothes.jpg"},
    {name:"Pillows & Blankets", sub:"Cushions, throws & cozy creations", img:"/categories/pillows.jpg"},
    {name:"Bags, Holders & Scrunchies", sub:"Totes, pouches, wallets, mobile holders & more", img:"/categories/bags.jpg"},
    {name:"Bouquets, Flowers & Coasters", sub:"Bouquets, crochet flowers, coasters & table runners", img:"/categories/flowers.jpg"},
    {name:"Crochet for Pets", sub:"Pet blankets, sweaters, harnesses & cozy wear", img:"/categories/pets.jpg"},
    {name:"Keychains & Soft Toys", sub:"Keychains, bracelets, soft toys & handmade treasures", img:"/categories/toys.jpg"},
  ];
  const notify = (message:string) => {
    if (!siteConfig.whatsappNumber) return;
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };
  return <main>
    <section className="heroHero">
      <div className="heroHeroCopy">
        <div className="brandCrescent"><span>☾</span><small>handmade under the stars</small></div>
        <p className="heroKicker">MOONLIT LOOPS <em>by Jyotsna</em></p>
        <h1>Young hands.<br/><em>Big imagination.</em><br/><span>Beautiful crochet.</span></h1>
        <p className="heroLead">Handmade crochet creations made with care, made to order in Pune — from little treasures to thoughtful gifts and everyday favourites.</p>
        <div className="heroBtns"><button className="primary heroPrimary" onClick={()=>go("shop")}><ShoppingBag size={18}/> Shop Crochet <ArrowRight size={18}/></button><button className="secondary heroSecondary" onClick={()=>go("custom")}><Heart size={18}/> Custom Order <ArrowRight size={18}/></button></div>
        <div className="trust heroTrust"><span><Heart size={16}/> Handmade with love</span><span><Leaf size={16}/> Made to order</span><span><Truck size={16}/> India-wide delivery</span><span><Gift size={16}/> Perfect for gifting</span></div>
      </div>
      <div className="heroHeroVisual">
        <div className="heroBrandVisual">
          <img src="/brand/moon-hook.jpg" alt="Moonlit Loops moon and crochet hook artwork"/>
          <div className="heroPhotoNote"><span>JYOTSNA'S PHOTO COMING SOON</span><strong>We will use her actual photograph here.</strong><small>No AI-generated likeness will be used as her final creator photo.</small></div>
        </div>
      </div>
    </section>

    <section className="categorySection section">
      <div className="categoryIntro"><p className="eyebrow">THE MOONLIT COLLECTION</p><h2>What can Moonlit Loops make?</h2><p>Explore handmade crochet creations across different categories.</p></div>
      <div className="categoryGrid">{categories.map(c=><button className="categoryCard" key={c.name} onClick={()=>go("shop")}><img src={c.img} alt=""/><div><h3>{c.name}</h3><p>{c.sub}</p><span>Shop Now <ArrowRight size={15}/></span></div></button>)}</div>
    </section>

    <section className="engageSection">
      <div className="sectionHead centered"><div><p className="eyebrow">COMING SOON</p><h2>More ways to engage with Moonlit Loops</h2><p>New ways to learn, create and connect are on the way.</p></div></div>
      <div className="engageGrid">
        <article className="engageCard lavender"><div className="engageIcon"><BookOpen size={34}/></div><div><span className="soonBadge">COMING SOON</span><h3>Digital Crochet Patterns</h3><p>Step-by-step patterns to make your own crochet creations — for beginners and crochet lovers.</p><button className="outline" onClick={()=>notify("Hi Jyotsna! I'm interested in the upcoming Moonlit Loops digital crochet patterns. Please let me know when they launch.")}>Notify Me <ArrowRight size={15}/></button></div></article>
        <article className="engageCard pink"><div className="engageIcon"><GraduationCap size={38}/></div><div><span className="soonBadge">COMING SOON</span><h3>Crochet Coaching</h3><p>Learn, create and grow with Jyotsna. Online and in Pune — details coming soon.</p><button className="outline" onClick={()=>notify("Hi Jyotsna! I'm interested in the upcoming Moonlit Loops crochet coaching. Please let me know when it launches.")}>I'm Interested <ArrowRight size={15}/></button></div></article>
      </div>
    </section>

    <section className="creatorSection section">
      <div className="creatorPhoto realPhotoPlaceholder small"><img src="/photos/jyotsna-portrait.jpg" alt="Jyotsna with her crochet creations"/></div>
      <div className="creatorCopy"><p className="eyebrow">MEET JYOTSNA</p><h2>A young creator with a love for crochet.</h2><p>Moonlit Loops began with Jyotsna turning simple loops of yarn into something colourful, useful and uniquely yours. Every piece is made with care, creativity and a lot of heart.</p><p>Her crochet journey is still growing — one loop, one idea and one creation at a time.</p><div className="signature">— Jyotsna ♡</div></div>
    </section>

    <section className="section featuredHome"><div className="sectionHead"><div><p className="eyebrow">SHOP HANDMADE</p><h2>Start with something lovely.</h2></div><button className="textLink" onClick={()=>go("shop")}>View all <ArrowRight size={16}/></button></div><div className="productGrid">{featured.map(p=><Card key={p.id} product={p} add={add} select={setSelected}/>)}</div></section>

    <section className="finalCta"><div><p className="eyebrow">READY WHEN YOU ARE?</p><h2>Find your next handmade favourite.</h2><p>Shop the collection, dream up something custom, or simply say hello.</p></div><div className="finalBtns"><button className="primary light" onClick={()=>go("shop")}><ShoppingBag size={18}/> Shop Crochet</button><button className="secondary lightBorder" onClick={()=>go("custom")}><Heart size={18}/> Custom Order</button><button className="whatsappBtn" onClick={()=>notify("Hi Jyotsna! I'd like to know more about Moonlit Loops.")}><MessageCircle size={18}/> Chat on WhatsApp</button></div></section>
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
    <button className="cardImage" onClick={()=>select(product)}>{product.photo ? <img src={product.photo} alt={product.name}/> : <><span>PHOTO COMING SOON</span><small>Moonlit Loops</small></>}</button>
    <div className="cardBody"><div className="cardMeta"><span>{product.category}</span><Heart size={17}/></div><h3>{product.name}</h3><p>{product.description}</p><div className="price">{money(product.price)} <small>starting</small></div><div className="cardFoot"><span className="made">{product.status}</span>{product.status==="Coming soon" ? <button className="outline" onClick={()=>select(product)}>Details</button> : <button className="outline" onClick={()=>add(product)}>Add to bag</button>}</div></div>
  </article>
}

function ProductModal({product,add,close}:{product:Product,add:(p:Product)=>void,close:()=>void}) {
 return <div className="overlay" onMouseDown={e=>e.target===e.currentTarget&&close()}><div className="modal"><button className="close" onClick={close}><X/></button><div className="modalPhoto photoPlaceholder">{product.photo ? <img src={product.photo} alt={product.name}/> : <span>PHOTO COMING SOON</span>}</div><div className="modalBody"><p className="eyebrow">{product.category}</p><h2>{product.name}</h2><div className="price big">{money(product.price)} <small>starting</small></div><p>{product.description}</p><div className="detailBox"><strong>Made to order</strong><span>Final colour, size, materials and timeline are confirmed with you before payment.</span></div><p className="muted">{product.note}</p>{product.status!=="Coming soon" && <button className="primary full" onClick={()=>{add(product);close()}}>Add to bag</button>}</div></div></div>
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
 return <main className="section narrow"><div className="pageIntro"><p className="eyebrow">OUR STORY</p><h1>A small studio with <em>a lot of loops.</em></h1><p>Moonlit Loops by Jyotsna began with a simple idea: make beautiful things slowly, learn the craft properly, and let each piece have its own personality.</p></div><div className="story"><div className="creatorPhoto tall"><img src="/photos/jyotsna-portrait.jpg" alt="Jyotsna with her crochet creations"/></div><div><h2>Made by hand, not by a machine.</h2><p>Every piece starts with yarn, a hook and time. Some designs are quick little gifts; others take many hours. That is why Moonlit Loops works primarily on a made-to-order basis.</p><p>We are starting in India, learning what customers love, refining quality and packaging, and building the brand one order at a time.</p><div className="values"><div><strong>01</strong><span>Thoughtful</span></div><div><strong>02</strong><span>Handmade</span></div><div><strong>03</strong><span>Personal</span></div></div></div></div><div className="noteBlock"><Sparkles/><div><strong>Why made to order?</strong><p>It lets Jyotsna make each piece for its owner instead of holding large amounts of ready stock. It also means colours, size and small details can often be discussed before the order is confirmed.</p></div></div><button className="textLink" onClick={()=>go("shop")}>Explore the collection <ArrowRight size={16}/></button></main>
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
