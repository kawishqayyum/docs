window.dataLayer = window.dataLayer || [];
function gtag(){
    dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', 'TAG_ID');

const ALLOWED_STATUS = ['premium', 'remove_candidate'];
const PREM_DOMAINS_URL = 'https://brightdata.com/users/zone/premium_domains';
let prm_promise;
const fetch_premium_domains = ()=>{
    return prm_promise = prm_promise || fetch(PREM_DOMAINS_URL)
        .then(r=>r.json())
        .then(data=>Object.keys(data?.domains||{})
            .filter(d=>ALLOWED_STATUS.includes(data?.domains?.[d]?.status))
            .sort());
};

const find_block = ()=>document.querySelector('#premium_domains');
const apply_to_block = fn=>{
    const c = find_block();
    return c && fn(c);
};

const show_premium_domains = async()=>{
    let c = '';
    let domains;
    try {
        domains = await fetch_premium_domains();
    } catch(e){
        apply_to_block(ct=>ct.innerHTML = 'Failed to load premium domains');
        console.error(e);
        return;
    }
    if (!domains.length)
    {
        apply_to_block(ct=>ct.innerHTML = 'No premium domains found');
        return;
    }
    for (let i=0; i<domains.length; i+=2)
    {
        const d2 = i+1<domains.length ? domains[i+1] : '';
        c += `<tr><td>${domains[i]}</td><td>${d2}</td></tr>`;
    }
    apply_to_block(ct=>ct.innerHTML='<table><thead><tr><th></th><th>'
        +`</th></tr></thead><tbody>${c}</tbody></table>`);
};

const check_premium_element = _.debounce(()=>{
    const el = find_block();
    return !!el && show_premium_domains();
}, 250);

window.addEventListener('DOMContentLoaded', check_premium_element);
window.addEventListener('navigate', check_premium_element);
let prev_el;
const observer = new MutationObserver(()=>{
    let new_el = find_block();
    if (!new_el)
        return;
    if (!prev_el || new_el!=prev_el)
    {
        check_premium_element();
        prev_el = new_el;
    }
});
observer.observe(document.body, {subtree: true, childList: true});
