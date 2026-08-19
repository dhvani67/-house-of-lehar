/* ==========================================================================
   House of Lehar — site script
   Product catalog, cart (localStorage), nav, filters, product page, forms.
   ========================================================================== */

(function(){

  /* ---------------- Product catalog ---------------- */
  var CATEGORY_LABELS = { lehenga:"Lehenga Collection", saree:"Saree Collection", suit:"Suit Collection", dress:"Dress Collection", kurti:"Kurti Collection", bag:"Bag Collection" };

  var FIT_TEXT = {
    lehenga:"Model is 5'7\" wearing size S. This style runs true to size — see our <a href=\"size-guide.html\">Size Guide</a> for full measurements.",
    saree:"Sarees come unstitched with a matching blouse piece cut to your selected size — see our <a href=\"size-guide.html\">Size Guide</a> for blouse measurements.",
    suit:"Model is 5'7\" wearing size S. This style runs true to size — see our <a href=\"size-guide.html\">Size Guide</a> for full measurements.",
    dress:"Model is 5'7\" wearing size S. This style runs true to size — see our <a href=\"size-guide.html\">Size Guide</a> for full measurements.",
    kurti:"Model is 5'6\" wearing size S. Kurtis have a relaxed, true-to-size fit — see our <a href=\"size-guide.html\">Size Guide</a> for full measurements.",
    bag:"Approx. 9in W × 6in H × 3in D, with a 22in adjustable chain strap and magnetic snap closure. One size."
  };

  var PRODUCTS = [
    { id:"aarohi-lehenga", name:"Aarohi Embroidered Lehenga", category:"lehenga", price:249, was:null, badge:"New", reviews:128,
      images:["images/aarohi-lehenga-1.jpg","https://placehold.co/700x900/d3b99d/39281e?text=Aarohi+Front","https://placehold.co/700x900/c4a487/39281e?text=Aarohi+Back","https://placehold.co/700x900/bf9d7a/39281e?text=Aarohi+Detail","https://placehold.co/700x900/a9896d/39281e?text=Aarohi+Fabric"],
      desc:"A hand-embroidered ivory and gold lehenga set, finished with delicate zari work and a flowing dupatta. Designed for wedding functions and festive celebrations.",
      colorway:"Ivory / Gold" },
    { id:"noor-organza-saree", name:"Noor Embroidered Organza Saree", category:"saree", price:179, was:null, badge:"New", reviews:0,
      images:["images/noor-1.jpg","images/noor-2.jpg","images/noor-3.jpg","images/noor-4.jpg"],
      desc:"A black sheer organza saree hand-finished with delicate floral embroidery along the pallu and border. A statement piece for receptions, sangeet nights and evening celebrations.",
      colorway:"Black / Multi Floral" },
    { id:"rani-bandhani-saree", name:"Rani Bandhani Saree", category:"saree", price:219, was:null, badge:"New", reviews:0,
      images:["images/rani-1.jpg","images/rani-2.jpg","images/rani-3.jpg","images/rani-4.jpg"],
      desc:"A rani pink bandhani saree with a hand-painted gold zari border and a tasseled edge, draped over a matching pleated skirt. A vibrant centerpiece for festive celebrations.",
      colorway:"Rani Pink / Gold" },
    { id:"noor-anarkali", name:"Noor Anarkali Suit", category:"suit", price:159, was:null, badge:null, reviews:41,
      images:["images/Suits of house of lehar.png","images/Suits of house of lehar.png","https://placehold.co/700x900/d3b99d/39281e?text=Noor+Front","https://placehold.co/700x900/c4a487/39281e?text=Noor+Back","https://placehold.co/700x900/bf9d7a/39281e?text=Noor+Detail","https://placehold.co/700x900/a9896d/39281e?text=Noor+Fabric"],
      desc:"A floor-length Anarkali suit with fitted bodice and layered flare, complete with matching churidar and dupatta.",
      colorway:"Blush Pink" },
    { id:"ishani-dress", name:"Ishani Festive Dress", category:"dress", price:139, was:169, badge:"Sale", reviews:37,
      images:["images/ChatGPT Image Aug 19, 2026, 07_15_33 PM.png","https://placehold.co/700x900/b69678/39281e?text=Ishani+Front","https://placehold.co/700x900/a98865/39281e?text=Ishani+Back","https://placehold.co/700x900/c4a487/39281e?text=Ishani+Detail","https://placehold.co/700x900/a9896d/39281e?text=Ishani+Fabric"],
      desc:"A festive fusion dress combining traditional embroidery with a modern silhouette. Perfect for pre-wedding functions.",
      colorway:"Coral" },
    { id:"zoya-saree", name:"Zoya Embroidered Saree", category:"saree", price:199, was:null, badge:null, reviews:52,
      images:["images/sarees.png","https://placehold.co/700x900/d3b99d/39281e?text=Zoya+Front","https://placehold.co/700x900/c4a487/39281e?text=Zoya+Back","https://placehold.co/700x900/bf9d7a/39281e?text=Zoya+Detail","https://placehold.co/700x900/a9896d/39281e?text=Zoya+Fabric"],
      desc:"Georgette saree with all-over thread embroidery and a scalloped border, paired with a designer blouse.",
      colorway:"Emerald" },
    { id:"tanvi-lehenga", name:"Tanvi Mehendi Lehenga", category:"lehenga", price:299, was:null, badge:"New", reviews:0,
      images:["images/tanvi-lehenga-1.jpg"],
      desc:"A mustard yellow lehenga with all-over sequin and thread embroidery, finished with a contrast pink and gold scalloped border and a matching sheer dupatta. A vibrant pick for mehendi and haldi celebrations.",
      colorway:"Mustard Yellow / Pink" },
    { id:"kavya-suit", name:"Kavya Pearl Embroidered Suit", category:"suit", price:185, was:null, badge:"New", reviews:0,
      images:["images/kavya-suit-1.jpg"],
      desc:"A sheer mauve jacket-style top hand-embroidered with pearls and floral lattice work, paired with flowing satin sharara pants. An elegant two-piece for daytime celebrations and receptions.",
      colorway:"Mauve" },
    { id:"naina-dress", name:"Naina Anarkali Gown", category:"dress", price:219, was:null, badge:"New", reviews:0,
      images:["images/naina-dress-1.jpg"],
      desc:"A royal blue anarkali gown with hand-embroidered floral detailing at the bodice and pockets, a pleated flared skirt and a matching sheer dupatta. A statement silhouette for receptions and sangeet nights.",
      colorway:"Royal Blue" },
    { id:"priya-chikankari-kurti", name:"Priya Chikankari Kurti", category:"kurti", price:129, was:null, badge:"New", reviews:0,
      images:["images/kurti-2-1.jpg","images/kurti-2-2.jpg","images/kurti-2-3.jpg","images/kurti-2-4.jpg"],
      desc:"A mauve kurti with all-over floral chikankari embroidery on a soft, textured fabric, cut in a flared A-line silhouette with three-quarter sleeves and a notched neckline.",
      colorway:"Mauve" },
    { id:"anika-chikankari-kurti", name:"Anika Chikankari Kurti", category:"kurti", price:95, was:null, badge:"New", reviews:0,
      images:["images/kurti-3-1.jpg","images/kurti-3-2.jpg","images/kurti-3-3.jpg","images/kurti-3-4.jpg"],
      desc:"A sunny yellow kurti with hand chikankari floral embroidery at the neckline and hem, cut in a relaxed straight silhouette with three-quarter sleeves and a keyhole neckline. Lightweight and easy to dress up or down.",
      colorway:"Yellow" },
    { id:"sana-chikankari-kurti", name:"Sana Chikankari Kurti", category:"kurti", price:89, was:null, badge:"New", reviews:0,
      images:["images/kurti-1-1.jpg","images/kurti-1-2.jpg","images/kurti-1-3.jpg"],
      desc:"An ivory kurti with all-over hand chikankari embroidery on lightweight cotton, finished with pintuck pleating and covered button detailing down the front placket and cuffs.",
      colorway:"Ivory" },
    { id:"zara-clutch", name:"Zara Embellished Clutch", category:"bag", price:85, was:null, badge:"New", reviews:0,
      images:["images/zara-clutch-1.jpg","images/zara-clutch-2.jpg","images/zara-clutch-3.jpg"],
      desc:"A bronze velvet box clutch hand-embellished with an intricate pearl and crystal beaded scroll motif, finished with a pearl-beaded top handle. A statement piece for weddings and evening celebrations.",
      colorway:"Bronze / Pearl" },
    { id:"nadia-potli", name:"Nadia Potli Bag", category:"bag", price:69, was:null, badge:"New", reviews:0,
      images:["images/nadia-potli-1.jpg","images/nadia-potli-2.jpg","images/nadia-potli-3.jpg","images/nadia-potli-4.jpg"],
      desc:"A maroon velvet potli bag hand-embroidered with a gold floral vine motif and finished with pearl beading along the seam and tasseled drawstrings. A versatile finishing touch for sarees and lehengas alike.",
      colorway:"Maroon / Gold" },
    { id:"rihana-bridal-clutch", name:"Riya Beaded Potli Bag", category:"bag", price:75, was:null, badge:"New", reviews:0,
      images:["images/rihana-bridal-clutch-1.jpg","images/rihana-bridal-clutch-2.jpg","images/rihana-bridal-clutch-3.jpg","images/rihana-bridal-clutch-4.jpg"],
      desc:"A royal blue velvet potli bag hand-embroidered with a silver and gold floral vine motif, finished with gold cord drawstrings and pearl tassels — a striking finishing touch for wedding and festive looks.",
      colorway:"Royal Blue / Silver" }
  ];
  var SIZES = ["XS","S","M","L","XL"];
  var CART_KEY = "holCart";

  window.HOL = { PRODUCTS: PRODUCTS, SIZES: SIZES };

  /* ---------------- Cart helpers ---------------- */
  function getCart(){
    try{ return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch(e){ return []; }
  }
  function saveCart(cart){
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadge();
  }
  function findProduct(id){
    for(var i=0;i<PRODUCTS.length;i++){ if(PRODUCTS[i].id===id) return PRODUCTS[i]; }
    return null;
  }
  function addToCart(id, size, qty){
    var cart = getCart();
    size = size || "M";
    qty = qty || 1;
    var existing = cart.find(function(item){ return item.id===id && item.size===size; });
    if(existing){ existing.qty += qty; }
    else{ cart.push({ id:id, size:size, qty:qty }); }
    saveCart(cart);
  }
  function updateCartQty(index, delta){
    var cart = getCart();
    if(!cart[index]) return;
    cart[index].qty += delta;
    if(cart[index].qty < 1){ cart.splice(index,1); }
    saveCart(cart);
    renderCartPage();
  }
  function removeFromCart(index){
    var cart = getCart();
    cart.splice(index,1);
    saveCart(cart);
    renderCartPage();
  }
  function cartCount(){
    return getCart().reduce(function(sum,item){ return sum + item.qty; }, 0);
  }
  function cartSubtotal(){
    var cart = getCart();
    var total = 0;
    cart.forEach(function(item){
      var p = findProduct(item.id);
      if(p) total += p.price * item.qty;
    });
    return total;
  }
  function money(n){ return "$" + n.toFixed(2); }

  function updateCartBadge(){
    var badges = document.querySelectorAll(".cart-count");
    var count = cartCount();
    badges.forEach(function(b){
      b.textContent = count;
      b.style.display = count > 0 ? "flex" : "none";
    });
  }

  /* ---------------- Mobile nav ---------------- */
  function initNav(){
    var toggle = document.querySelector(".menu-toggle");
    var links = document.querySelector(".nav-links");
    if(!toggle || !links) return;
    toggle.addEventListener("click", function(){
      var isOpen = links.classList.toggle("open");
      toggle.classList.toggle("open", isOpen);
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });
    links.querySelectorAll("a").forEach(function(a){
      a.addEventListener("click", function(){
        links.classList.remove("open");
        toggle.classList.remove("open");
        document.body.style.overflow = "";
      });
    });
    window.addEventListener("resize", function(){
      if(window.innerWidth > 900){
        links.classList.remove("open");
        toggle.classList.remove("open");
        document.body.style.overflow = "";
      }
    });

    // active link
    var path = window.location.pathname.split("/").pop() || "index.html";
    links.querySelectorAll("a").forEach(function(a){
      var href = a.getAttribute("href").split("?")[0];
      if(href === path){ a.classList.add("active"); }
    });
  }

  /* ---------------- Back to top ---------------- */
  function initBackToTop(){
    var btn = document.querySelector(".back-to-top");
    if(!btn) return;
    window.addEventListener("scroll", function(){
      btn.classList.toggle("show", window.scrollY > 500);
    });
    btn.addEventListener("click", function(){
      window.scrollTo({ top:0, behavior:"smooth" });
    });
  }

  /* ---------------- Scroll reveal ----------------
     Direct bounding-rect check on scroll/resize (rAF-throttled) rather than
     relying solely on IntersectionObserver, which can miss elements during
     large/instant scroll jumps (keyboard End, scrollbar drag, anchor links). */
  function initReveal(){
    var els = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
    if(!els.length) return;
    var ticking = false;

    function revealVisible(){
      els = els.filter(function(el){
        var r = el.getBoundingClientRect();
        if(r.top < window.innerHeight * 1.05 && r.bottom > 0){
          el.classList.add("in");
          return false;
        }
        return true;
      });
      if(!els.length){
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      }
    }
    function onScroll(){
      if(!ticking){
        window.requestAnimationFrame(function(){ revealVisible(); ticking = false; });
        ticking = true;
      }
    }
    window.addEventListener("scroll", onScroll, { passive:true });
    window.addEventListener("resize", onScroll);
    revealVisible();
  }

  /* ---------------- Filter chips (shop / collection) ---------------- */
  function applyFilter(bar, grid, cat){
    var chip = bar.querySelector('.chip[data-filter="' + cat + '"]');
    if(!chip) return;
    bar.querySelectorAll(".chip").forEach(function(c){ c.classList.remove("active"); });
    chip.classList.add("active");
    grid.querySelectorAll(".card").forEach(function(card){
      var show = cat === "all" || card.getAttribute("data-category") === cat;
      card.style.display = show ? "" : "none";
    });
  }

  function initFilters(){
    var bar = document.querySelector(".filter-bar");
    var grid = document.querySelector("[data-product-grid]");
    if(!bar || !grid) return;
    bar.addEventListener("click", function(e){
      var chip = e.target.closest(".chip");
      if(!chip) return;
      applyFilter(bar, grid, chip.getAttribute("data-filter"));
    });

    // Deep-link support: shop.html#lehenga / #saree / #suit / #dress
    // pre-selects the matching filter chip (used by the homepage category cards).
    var hash = window.location.hash.replace("#", "");
    if(hash){
      // grid is populated by initCatalogGrids asynchronously in the same
      // DOMContentLoaded pass, so defer the filter application slightly.
      setTimeout(function(){ applyFilter(bar, grid, hash); }, 0);
    }
  }

  /* ---------------- Quick add / add to cart buttons on grids ---------------- */
  function initQuickAdd(){
    document.addEventListener("click", function(e){
      var btn = e.target.closest("[data-add-to-cart]");
      if(!btn) return;
      e.preventDefault();
      var id = btn.getAttribute("data-add-to-cart");
      var quickProduct = findProduct(id);
      var quickSize = (quickProduct && quickProduct.category === "bag") ? "One Size" : "M";
      addToCart(id, quickSize, 1);
      var original = btn.textContent;
      btn.textContent = "Added ✓";
      btn.disabled = true;
      setTimeout(function(){ btn.textContent = original; btn.disabled = false; }, 1300);
    });
  }

  /* ---------------- Cart page render ---------------- */
  function renderCartPage(){
    var container = document.querySelector("[data-cart-items]");
    if(!container) return;
    var cart = getCart();
    var emptyEl = document.querySelector("[data-cart-empty]");
    var layoutEl = document.querySelector("[data-cart-layout]");

    if(cart.length === 0){
      if(layoutEl) layoutEl.style.display = "none";
      if(emptyEl) emptyEl.style.display = "block";
      return;
    }
    if(layoutEl) layoutEl.style.display = "";
    if(emptyEl) emptyEl.style.display = "none";

    container.innerHTML = "";
    cart.forEach(function(item, index){
      var p = findProduct(item.id);
      if(!p) return;
      var row = document.createElement("div");
      row.className = "cart-item";
      row.innerHTML =
        '<img src="'+p.images[0]+'" alt="'+p.name+'">' +
        '<div>' +
          '<h3>'+p.name+'</h3>' +
          '<p class="muted">'+p.colorway+'<br>Size: '+item.size+'</p>' +
          '<div class="qty">' +
            '<button data-minus type="button" aria-label="Decrease quantity">−</button>' +
            '<span>'+item.qty+'</span>' +
            '<button data-plus type="button" aria-label="Increase quantity">+</button>' +
          '</div>' +
          '<button class="remove" data-remove type="button">Remove</button>' +
        '</div>' +
        '<strong>'+money(p.price * item.qty)+'</strong>';
      row.querySelector("[data-minus]").addEventListener("click", function(){ updateCartQty(index, -1); });
      row.querySelector("[data-plus]").addEventListener("click", function(){ updateCartQty(index, 1); });
      row.querySelector("[data-remove]").addEventListener("click", function(){ removeFromCart(index); });
      container.appendChild(row);
    });

    var subtotal = cartSubtotal();
    var subtotalEl = document.querySelector("[data-subtotal]");
    var totalEl = document.querySelector("[data-total]");
    if(subtotalEl) subtotalEl.textContent = money(subtotal);
    if(totalEl) totalEl.textContent = money(subtotal) + " CAD";
  }

  /* ---------------- Product detail page ---------------- */
  function initProductPage(){
    var root = document.querySelector("[data-product-page]");
    if(!root) return;
    var params = new URLSearchParams(window.location.search);
    var id = params.get("id") || PRODUCTS[0].id;
    var product = findProduct(id) || PRODUCTS[0];

    document.title = product.name + " | House of Lehar";
    root.querySelectorAll("[data-p-name]").forEach(function(el){ el.textContent = product.name; });
    root.querySelector("[data-p-colorway]").textContent = product.colorway;
    var categoryEl = root.querySelector("[data-p-category]");
    if(categoryEl) categoryEl.textContent = CATEGORY_LABELS[product.category] || "";
    var reviewsEl = root.querySelector("[data-p-reviews]");
    var ratingRowEl = root.querySelector("[data-p-rating-row]");
    if(product.reviews){
      if(reviewsEl) reviewsEl.textContent = "(" + product.reviews + " reviews)";
      if(ratingRowEl) ratingRowEl.style.display = "";
    } else if(ratingRowEl){
      ratingRowEl.style.display = "none";
    }
    root.querySelector("[data-p-desc]").textContent = product.desc;

    var priceEl = root.querySelector("[data-p-price]");
    priceEl.innerHTML = (product.was ? '<span class="was">'+money(product.was)+'</span>' : '') + money(product.price) + ' CAD';

    var mainImg = root.querySelector("[data-p-main-img]");
    mainImg.src = product.images[0];
    mainImg.alt = product.name;

    var thumbsWrap = root.querySelector("[data-p-thumbs]");
    thumbsWrap.innerHTML = "";
    product.images.forEach(function(src, i){
      var b = document.createElement("button");
      b.type = "button";
      if(i===0) b.className = "active";
      b.innerHTML = '<img src="'+src+'" alt="'+product.name+' view '+(i+1)+'">';
      b.addEventListener("click", function(){
        mainImg.src = src;
        thumbsWrap.querySelectorAll("button").forEach(function(t){ t.classList.remove("active"); });
        b.classList.add("active");
      });
      thumbsWrap.appendChild(b);
    });

    var sizeGroupEl = root.querySelector("[data-p-size-group]");
    var sizeWrap = root.querySelector("[data-p-sizes]");
    var hasSizes = product.category !== "bag";
    var selectedSize = hasSizes ? "M" : "One Size";
    if(hasSizes){
      if(sizeGroupEl) sizeGroupEl.style.display = "";
      sizeWrap.innerHTML = "";
      SIZES.forEach(function(size){
        var b = document.createElement("button");
        b.type = "button";
        b.textContent = size;
        if(size===selectedSize) b.className = "active";
        b.addEventListener("click", function(){
          sizeWrap.querySelectorAll("button").forEach(function(s){ s.classList.remove("active"); });
          b.classList.add("active");
          selectedSize = size;
        });
        sizeWrap.appendChild(b);
      });
    } else if(sizeGroupEl){
      sizeGroupEl.style.display = "none";
    }

    var fitBody = root.querySelector("[data-p-fit-body]");
    if(fitBody) fitBody.innerHTML = FIT_TEXT[product.category] || FIT_TEXT.suit;
    var fitTitle = root.querySelector("[data-p-fit-title]");
    if(fitTitle) fitTitle.innerHTML = (product.category === "bag" ? "Details & Dimensions" : "Size &amp; Fit") + ' <span class="plus">+</span>';

    var qty = 1;
    var qtyEl = root.querySelector("[data-p-qty]");
    root.querySelector("[data-p-qty-minus]").addEventListener("click", function(){
      qty = Math.max(1, qty - 1); qtyEl.textContent = qty;
    });
    root.querySelector("[data-p-qty-plus]").addEventListener("click", function(){
      qty += 1; qtyEl.textContent = qty;
    });

    var addBtn = root.querySelector("[data-p-add]");
    addBtn.addEventListener("click", function(){
      addToCart(product.id, selectedSize, qty);
      var original = addBtn.textContent;
      addBtn.textContent = "Added to Cart ✓";
      addBtn.disabled = true;
      setTimeout(function(){ addBtn.textContent = original; addBtn.disabled = false; }, 1400);
    });

    // accordion
    root.querySelectorAll(".accordion-item button").forEach(function(btn){
      btn.addEventListener("click", function(){
        btn.parentElement.classList.toggle("open");
      });
    });

    // related products
    var relatedWrap = root.querySelector("[data-p-related]");
    if(relatedWrap){
      var related = PRODUCTS.filter(function(p){ return p.id !== product.id && p.category === product.category; });
      if(related.length < 4){
        PRODUCTS.forEach(function(p){
          if(related.length < 4 && p.id !== product.id && related.indexOf(p) === -1) related.push(p);
        });
      }
      relatedWrap.innerHTML = related.slice(0,4).map(cardHTML).join("");
    }
  }

  function cardHTML(p){
    var badge = p.badge ? '<span class="badge">'+p.badge+'</span>' : '';
    var was = p.was ? '<span class="was">'+money(p.was)+'</span>' : '';
    return (
      '<a class="card" href="product.html?id='+p.id+'" data-category="'+p.category+'">' +
        '<div class="thumb">'+badge+'<img class="product-img" src="'+p.images[0]+'" alt="'+p.name+'"></div>' +
        '<div class="card-body"><h3>'+p.name+'</h3><div class="price">'+was+money(p.price)+' CAD</div></div>' +
        '<button class="quick-add" data-add-to-cart="'+p.id+'" type="button">Quick Add</button>' +
      '</a>'
    );
  }

  /* auto-populate any grid marked with data-catalog="all|lehenga|saree|suit|dress" */
  function initCatalogGrids(){
    document.querySelectorAll("[data-catalog]").forEach(function(grid){
      var filter = grid.getAttribute("data-catalog");
      var items = filter === "all" ? PRODUCTS.slice() : PRODUCTS.filter(function(p){ return p.category === filter; });
      var limit = parseInt(grid.getAttribute("data-limit"), 10);
      if(limit){ items = items.slice(0, limit); }
      grid.innerHTML = items.map(cardHTML).join("");
    });
  }

  /* ---------------- Forms (contact / newsletter) ---------------- */
  function initForms(){
    var contact = document.querySelector("[data-contact-form]");
    if(contact){
      contact.addEventListener("submit", function(e){
        e.preventDefault();
        var status = document.querySelector("[data-contact-status]");
        if(status){
          status.textContent = "Thanks for reaching out! We'll get back to you within 1–2 business days.";
          status.classList.add("show");
        }
        contact.reset();
      });
    }
    var newsletters = document.querySelectorAll("[data-newsletter-form]");
    newsletters.forEach(function(nl){
      nl.addEventListener("submit", function(e){
        e.preventDefault();
        var note = nl.parentElement.querySelector(".form-note");
        if(note){
          note.textContent = "You're on the list! Welcome to House of Lehar.";
          note.classList.add("success");
        }
        nl.reset();
      });
    });
  }

  /* ---------------- Year stamp ---------------- */
  function initYear(){
    document.querySelectorAll(".year").forEach(function(el){
      el.textContent = new Date().getFullYear();
    });
  }

  /* ---------------- Init ---------------- */
  document.addEventListener("DOMContentLoaded", function(){
    initNav();
    initBackToTop();
    initReveal();
    initFilters();
    initQuickAdd();
    initCatalogGrids();
    renderCartPage();
    initProductPage();
    initForms();
    initYear();
    updateCartBadge();
  });

})();
