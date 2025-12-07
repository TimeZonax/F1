// ข้อมูลจำลองสำหรับ Logic
// ใช้ localStorage เพื่อจำชื่อผู้ใช้ที่ตั้งไว้
let myUsername = localStorage.getItem('tastlinkUsername') || "ผู้กล้าแห่งคณะ";

const mockReviews = [
    // ... (ข้อมูลรีวิวเดิม) ...
    { user: "นักชิมเบอร์หนึ่ง", review: "ข้าวมันไก่ร้านนี้เนื้อนุ่มมาก ให้ 5 ดาวเลย! หนังกรอบจริงไม่จกตา.", shop: "ร้านข้าวมันไก่ป้าหน่อย", rating: 5, time: "10 นาทีที่แล้ว" },
    { user: "GamerFoodie", review: "ก๋วยเตี๋ยวรสชาติเข้มข้นดี แต่รอนานไปหน่อย รสชาติเผ็ดถึงใจ.", shop: "ร้านก๋วยเตี๋ยวเรือเทพ", rating: 4, time: "30 นาทีที่แล้ว" },
    { user: "MasterChefX", review: "ชาเย็นร้านใหม่ดีงามมาก หวานกำลังดี! สั่งไป 2 แก้วเลย.", shop: "ร้านน้ำปั่นเจ๊จอย", rating: 5, time: "1 ชั่วโมงที่แล้ว" },
    { user: "Freshman_01", review: "ผัดกะเพราร้านหน้าคณะคือที่สุดของความเผ็ด! ชอบมากครับ", shop: "ร้านส้มตำแซ่บเวอร์", rating: 4, time: "2 ชั่วโมงที่แล้ว" }
];
// ... (ข้อมูล shopRanks, menuRanks, shopMenus เดิม) ...
const shopRanks = [
    { name: "ร้านก๋วยเตี๋ยวเรือเทพ", score: 4.8 },
    { name: "ร้านข้าวมันไก่ป้าหน่อย", score: 4.5 },
    { name: "ร้านส้มตำแซ่บเวอร์", score: 4.6 }
];
const menuRanks = [
    { name: "ข้าวมันไก่หนังกรอบ", score: 4.9 },
    { name: "ก๋วยเตี๋ยวเรือเนื้อเปื่อย", score: 4.7 },
    { name: "ชาเย็นอาม่า", score: 4.6 }
];
let currentAvatarLook = localStorage.getItem('tastlinkAvatarLook') || 'linear-gradient(45deg, #3498db, #2980b9)'; 
let shopMenus = {
    // ... (ข้อมูลเมนูจำลองเดิม) ...
    1: { name: "ร้านข้าวมันไก่ป้าหน่อย", rating: "4.5 (89 รีวิว)", menu: [ /* ... */ { name: "ข้าวมันไก่ต้ม", price: 45, status: "avail" }, { name: "ข้าวมันไก่ทอด", price: 50, status: "low" }, { name: "ข้าวมันไก่ผสม", price: 55, status: "avail" }, { name: "น่องไก่พะโล้", price: 60, status: "out" } ] },
    2: { name: "ร้านก๋วยเตี๋ยวเรือเทพ", rating: "4.8 (120 รีวิว)", menu: [ /* ... */ { name: "ก๋วยเตี๋ยวเรือเนื้อเปื่อย", price: 65, status: "low" }, { name: "ก๋วยเตี๋ยวเรือหมูน้ำตก", price: 50, status: "avail" }, { name: "แคบหมู (ชุดใหญ่)", price: 20, status: "avail" } ] },
    3: { name: "ร้านน้ำปั่นเจ๊จอย", rating: "4.2 (55 รีวิว)", menu: [ /* ... */ { name: "ชาเย็นพรีเมียม", price: 40, status: "avail" }, { name: "โกโก้ปั่นวิปครีม", price: 55, status: "low" }, { name: "น้ำมะนาวโซดา", price: 35, status: "avail" } ] },
    4: { name: "ร้านส้มตำแซ่บเวอร์", rating: "4.6 (95 รีวิว)", menu: [ /* ... */ { name: "ส้มตำไทยไข่เค็ม", price: 60, status: "avail" }, { name: "ลาบหมู", price: 55, status: "low" }, { name: "ต้มแซ่บกระดูกอ่อน", price: 70, status: "out" } ] },
    5: { name: "ร้านเบเกอรี่หวานเจี๊ยบ", rating: "4.3 (70 รีวิว)", menu: [ /* ... */ { name: "ครัวซองต์ช็อกโกแลต", price: 45, status: "low" }, { name: "เค้กสตรอว์เบอร์รี", price: 75, status: "avail" }, { name: "เอแคลร์", price: 30, status: "avail" } ] }
};

// --- [General Modal Functions] ---
function openModal(modalId) {
    if (modalId === 'avatar-modal') {
        document.getElementById('custom-avatar-display').style.background = currentAvatarLook;
        // ใส่ชื่อผู้ใช้ปัจจุบันในช่อง input
        document.getElementById('new-username').value = myUsername; 
    }
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// --- [XP & Button Effects] ---
function showXPEffect(text) {
    // ... (Logic เดิม) ...
    const oldEffect = document.getElementById('xp-effect');
    if (oldEffect) oldEffect.remove();

    const xpEffect = document.createElement('div');
    xpEffect.id = 'xp-effect';
    xpEffect.className = 'xp-gained-effect';
    xpEffect.textContent = text;
    document.body.appendChild(xpEffect);

    setTimeout(() => {
        if (xpEffect) xpEffect.remove();
    }, 2000);
}

function openVotingModal() {
    alert("[DEMO MODE] เปิดหน้าจอโหวตสุดสัปดาห์\n(Mockup: โหวต 1 ครั้ง/สัปดาห์ รับ 100 XP!)");
    showXPEffect("+10 XP! (เปิดหน้าโหวต)");
}


// --- [Shop Detail & Menu Logic] ---
// ... (Logic เดิม) ...
function getQueueStatus(shopId) {
    const card = document.querySelector(`.shop-card:nth-child(${shopId})`);
    if (!card) return "ไม่พบสถานะ";

    const statusBar = card.querySelector('.status-bar');
    const statusText = statusBar ? statusBar.textContent : "สถานะไม่ระบุ";
    
    // คัดลอกสีสถานะ
    let statusClass = '';
    if (card.classList.contains('status-busy')) statusClass = 'status-busy-text';
    else if (card.classList.contains('status-chill')) statusClass = 'status-chill-text';
    else if (card.classList.contains('status-moderate')) statusClass = 'status-moderate-text';

    return `<span class="${statusClass}">${statusText}</span>`;
}

function viewShopDetails(shopId) {
    // ... (Logic เดิม) ...
    const shopData = shopMenus[shopId];
    if (!shopData) {
        alert("ไม่พบข้อมูลร้านค้า!");
        return;
    }

    document.getElementById('shop-detail-title').innerHTML = `<i class="fas fa-utensils"></i> ${shopData.name}`;
    document.getElementById('shop-detail-rating').innerHTML = `<i class="fas fa-star"></i> ${shopData.rating}`;
    document.getElementById('shop-detail-queue-status').innerHTML = getQueueStatus(shopId);

    const menuContainer = document.getElementById('menu-list-container');
    menuContainer.innerHTML = shopData.menu.map(item => {
        let statusText = '';
        let statusClass = '';
        
        if (item.status === 'out') {
            statusText = 'หมดแล้ว';
            statusClass = 'status-out';
        } else if (item.status === 'low') {
            statusText = 'ใกล้หมด';
            statusClass = 'status-low';
        } else {
            statusText = 'พร้อมขาย';
            statusClass = 'status-avail';
        }

        return `
            <div class="menu-item-card">
                <div>
                    <h4>${item.name}</h4>
                    <span class="menu-status ${statusClass}">${statusText}</span>
                </div>
                <p class="menu-price">${item.price} ฿</p>
            </div>
        `;
    }).join('');

    openModal('shop-detail-modal');
    showXPEffect("+15 XP! (ดูเมนู)");
}

// --- [Avatar Customization & Naming Logic (ปรับปรุง)] ---

function changeAvatarLook(lookType) {
    const avatarDisplay = document.getElementById('custom-avatar-display');

    if (lookType === 'blue-hat') {
        currentAvatarLook = 'linear-gradient(135deg, #1abc9c, #16a085)'; 
    } else if (lookType === 'green-hair') {
        currentAvatarLook = 'linear-gradient(135deg, #9b59b6, #8e44ad)';
    } else if (lookType === 'sunglasses') {
        currentAvatarLook = 'linear-gradient(135deg, #f39c12, #e67e22)';
    } else if (lookType === 'default') {
         currentAvatarLook = 'linear-gradient(45deg, #3498db, #2980b9)';
    }
    
    avatarDisplay.style.background = currentAvatarLook;
}

function saveAvatar() {
    const newName = document.getElementById('new-username').value.trim();
    
    if (newName) {
        myUsername = newName;
        document.getElementById('username').textContent = myUsername;
        localStorage.setItem('tastlinkUsername', myUsername);
    } else {
         // ถ้าไม่ได้ตั้งชื่อ ให้ใช้ชื่อเดิม
         document.getElementById('username').textContent = myUsername;
    }
    
    document.getElementById('avatar-container').style.background = currentAvatarLook;
    localStorage.setItem('tastlinkAvatarLook', currentAvatarLook);
    
    closeModal('avatar-modal');
    showXPEffect("+10 XP! (บันทึกอวาตาร์/ชื่อ)"); 
}


// --- [Ranking Logic] ---
function displayRankings() {
    // ... (Logic เดิม) ...
    const shopList = document.getElementById('shop-ranking');
    const menuList = document.getElementById('menu-ranking');
    
    shopList.innerHTML = shopRanks.map((item, index) => `
        <li class="rank-item">
            #${index + 1} ${item.name}
            <span class="rank-stars">⭐️ ${item.score}</span>
        </li>
    `).join('');

    menuList.innerHTML = menuRanks.map((item, index) => `
        <li class="rank-item">
            #${index + 1} ${item.name}
            <span class="rank-stars">⭐️ ${item.score}</span>
        </li>
    `).join('');
}


// --- [Review Logic] ---
function createReviewCard(review) {
    // ... (Logic เดิม) ...
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    
    return `
        <div class="review-card-full">
            <div class="review-header">
                <div class="mini-avatar" style="background-color: ${randomColor};">${review.user.substring(0, 2)}</div>
                <div class="review-user-info">
                    <h4>${review.user}</h4>
                    <p>รีวิวจากร้าน ${review.shop} (${review.time})</p>
                </div>
            </div>
            <p class="review-rating">คะแนน: ⭐️ ${review.rating}.0 / 5</p>
            <blockquote>${review.review}</blockquote>
        </div>
    `;
}

function openReviewPage() {
    // ... (Logic เดิม) ...
    const container = document.getElementById('all-reviews-container');
    container.innerHTML = mockReviews.map(createReviewCard).join('');
    
    openModal('review-page-modal');
    showXPEffect("+10 XP! (เข้าหน้า Review)");
}

function displayReviewPreview() {
    // ... (Logic เดิม) ...
    const review1 = document.getElementById('latest-review-1');
    const review2 = document.getElementById('latest-review-2');
    
    if (mockReviews.length > 0) {
        const r1 = mockReviews[0];
        const r2 = mockReviews[1];

        // Preview 1
        const randomColor1 = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
        review1.innerHTML = `<div class="mini-avatar" style="background-color: ${randomColor1};">${r1.user.substring(0, 2)}</div><span>**${r1.user}:** ${r1.review.substring(0, 20)}...</span>`;
        
        // Preview 2
        const randomColor2 = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
        review2.innerHTML = `<div class="mini-avatar" style="background-color: ${randomColor2};">${r2.user.substring(0, 2)}</div><span>**${r2.user}:** ${r2.review.substring(0, 20)}...</span>`;
    }
}


// --- [Chat Simulation Logic] ---
function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (message === "") return;

    // ใช้ myUsername ที่ตั้งค่าล่าสุด
    appendMessage(myUsername, message); 
    input.value = '';
    
    showXPEffect("+5 XP! (ร่วมแชท)");
    
    setTimeout(simulateBotReply, 1500);
}
// ... (Logic อื่น ๆ เดิม) ...

// --- [Real-time Status Update & Alert] ---
function updateShopStatuses() {
    // ... (Logic เดิม) ...
    const allShopCards = document.querySelectorAll('.shop-card');
    const statuses = [
        { statusClass: 'status-busy', text: '🔴 รอนาน (15-20 นาที)' },
        { statusClass: 'status-chill', text: '🟢 สบายๆ (3-5 นาที)' },
        { statusClass: 'status-moderate', text: '🟡 ปานกลาง (8-10 นาที)' }
    ];

    allShopCards.forEach((card, index) => {
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        const statusBar = card.querySelector('.status-bar');
        
        // ลบคลาสสถานะเดิมออก
        card.classList.remove('status-busy', 'status-chill', 'status-moderate');
        card.classList.add(randomStatus.statusClass);
        // ใช้ ID เพื่อให้ Modal ดึงสถานะปัจจุบันไปแสดงผลได้ถูกต้อง (ID 1-5)
        statusBar.id = `status-${index + 1}`; 
        statusBar.innerHTML = `สถานะ: ${randomStatus.text}`;
    });
}
// ... (Logic triggerShopAlert เดิม) ...

// --- [Loading Overlay Logic: แสดงผลทันที] ---
function hideLoadingOverlay() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.style.opacity = '0'; 
        setTimeout(() => {
            overlay.style.display = 'none'; 
        }, 500);
    }
}

// --- [Initialization] ---
document.addEventListener('DOMContentLoaded', () => {
    
    hideLoadingOverlay(); 

    // โหลดชื่อผู้ใช้และอวาตาร์ที่บันทึกไว้
    document.getElementById('username').textContent = myUsername;
    document.getElementById('avatar-container').style.background = currentAvatarLook;

    displayReviewPreview(); 
    displayRankings();      
    updateShopStatuses();   

    setInterval(updateShopStatuses, 10000); 
    
    setTimeout(() => {
        triggerShopAlert("ร้านเบเกอรี่หวานเจี๊ยบ", "ปิดทำการกะทันหัน (วัตถุดิบหมด)");
    }, 15000); 
});
