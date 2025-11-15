// Minimal demo script for featured posts, comments, subscribe
const POSTS = [
  {id:1,title:"A Day in Kudla: Markets, Beaches & Biryani",author:"Riya",date:"2025-11-10",excerpt:"Short intro...",image:"assets/images/udupi-beach.jpg"},
  {id:2,title:"Hidden Temples of Kudla",author:"Arun",date:"2025-10-21",excerpt:"Discover ancient sites...",image:"assets/images/temple.jpg"},
  {id:3,title:"Local Food Trail",author:"Sana",date:"2025-09-15",excerpt:"Try the local seafood...",image:"assets/images/seafood.jpg"}
];

document.addEventListener('DOMContentLoaded',()=>{
  // mobile menu toggle
  const h = document.getElementById('hamburger');
  if(h) h.addEventListener('click',()=>{ document.getElementById('mainNav').classList.toggle('open') });

  // inject featured posts & recent posts on index
  const featured = document.getElementById('featuredPosts');
  const recent = document.getElementById('recentPosts');
  if(featured) POSTS.slice(0,3).forEach(p=>{
    const card = document.createElement('article'); card.className='card';
    card.innerHTML = `<img src="${p.image}" alt="${p.title}" style="width:100%;border-radius:6px"/><h4>${p.title}</h4><p class="muted">By ${p.author} • ${p.date}</p><p>${p.excerpt}</p><a href="blog.html" class="btn">Read</a>`;
    featured.appendChild(card);
  });
  if(recent) POSTS.forEach(p=>{
    const item = document.createElement('div'); item.className='card';
    item.innerHTML = `<h4>${p.title}</h4><p class="muted">${p.date}</p>`;
    recent.appendChild(item);
  });

  // subscribe form
  const subscribeForm = document.getElementById('subscribeForm');
  if(subscribeForm){
    subscribeForm.addEventListener('submit',e=>{
      e.preventDefault();
      const email = subscribeForm.email.value;
      // small demo: save to localStorage
      const subs = JSON.parse(localStorage.getItem('subs')||'[]');
      subs.push({email,ts:new Date().toISOString()});
      localStorage.setItem('subs',JSON.stringify(subs));
      document.getElementById('subMessage').textContent = "Thanks! You're on the list.";
      subscribeForm.reset();
    });
  }

  // comments for blog post
  const commentForm = document.getElementById('commentForm');
  const commentList = document.getElementById('commentList');
  if(commentForm && commentList){
    function renderComments(){
      const comments = JSON.parse(localStorage.getItem('comments_post1')||'[]');
      commentList.innerHTML = comments.map(c=>`<li class="card"><strong>${escapeHTML(c.name)}</strong><p>${escapeHTML(c.text)}</p><p class="muted small">${new Date(c.ts).toLocaleString()}</p></li>`).join('');
    }
    commentForm.addEventListener('submit', e=>{
      e.preventDefault();
      const form = new FormData(commentForm);
      const entry = {name: form.get('name'), text: form.get('comment'), ts: new Date().toISOString()};
      const comments = JSON.parse(localStorage.getItem('comments_post1')||'[]');
      comments.unshift(entry);
      localStorage.setItem('comments_post1', JSON.stringify(comments));
      commentForm.reset();
      renderComments();
    });
    renderComments();
  }

  // helper to escape
  function escapeHTML(s){ return String(s).replace(/[&<>"']/g, m=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' })[m]); }

});
