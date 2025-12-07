// ข้อมูลจำลองสำหรับ Logic
let myUsername = localStorage.getItem('tastlinkUsername') || "ผู้กล้าแห่งคณะ";
let currentAvatarLook = localStorage.getItem('tastlinkAvatarLook') || 'linear-gradient(45deg, #3498db, #2980b9)'; 

const mockReviews = [
    { user: "นักชิมเบอร์หนึ่ง", review: "ข้าวมันไก่ร้านนี้เนื้อนุ่มมาก ให้ 5 ดาวเลย! หนังกรอบจริงไม่จกตา.", shop: "ร้านข้าวมันไก่ป้าหน่อย", rating: 5, time: "10 นาทีที่แล้ว" },
    { user: "GamerFoodie", review: "ก๋วยเตี๋ยวรสชาติเข้มข้นดี แต่รอนานไปหน่อย รสชาติเผ็ดถึงใจ.", shop: "ร้านก๋วยเตี๋ยวเรือเทพ", rating: 4, time: "30 นาทีที่แล้ว" },
    { user: "MasterChefX", review: "ชาเย็นร้านใหม่ดีงามมาก หวานกำลังดี! สั่งไป 2 แก้วเลย.", shop: "ร้านน้ำปั่นเจ๊จอย", rating: 5, time: "1 ชั่วโมงที่แล้ว" },
    { user: "Freshman_01", review: "ผัดกะเพราร้านหน้าคณะคือที่สุดของความเผ็ด! ชอบมากครับ", shop: "ร้านส้มตำแซ่บเวอร์", rating: 4, time: "2 ชั่วโมงที่แล้ว" }
];
const shopMenus = {
    // ... (ข้อมูลเมนูจำลองเดิม) ...
    1: { name: "ร้านข้าวมันไก่ป้าหน่อย", rating: "4.5 (89 รีวิว)", menu: [{ name: "ข้าวมันไก่ต้ม", price: 45, status: "avail" }, { name: "ข้าวมันไก่ทอด", price: 50, status: "low" }, { name: "ข้าวมันไก่ผสม", price: 55, status: "avail" }, { name: "น่องไก่พะโล้", price: 60, status: "out" } ] },
    2: { name: "ร้านก๋วยเตี๋ยวเรือเทพ", rating: "4.8 (120 รีวิว)", menu: [{ name: "ก๋วยเตี๋ยวเรือเนื้อเปื่อย", price: 65, status: "low" }, { name: "ก๋วยเตี๋ยวเรือหมูน้ำตก", price: 50, status: "avail" }, { name: "แคบหมู (ชุดใหญ่)", price: 20, status: "avail" } ] },
    3: { name: "ร้านน้ำปั่นเจ๊จอย", rating: "4.2 (55 รีวิว)", menu: [{ name: "ชาเย็นพรีเมียม", price: 40, status: "avail" }, { name: "โกโก้ปั่นวิปครีม", price: 55, status: "low" }, { name: "น้ำมะนาวโซดา", price: 35, status: "avail" } ] },
    4: { name: "ร้านส้มตำแซ่บเวอร์", rating: "4.6 (95 รีวิว)", menu: [{ name: "ส้มตำไทยไข่เค็ม", price: 60, status: "avail" }, { name: "ลาบหมู", price: 55, status: "low" }, { name: "ต้มแซ่บกระดูกอ่อน", price: 70, status: "out" } ] },
    5: { name: "ร้านเบเกอรี่หวานเจี๊ยบ", rating: "4.3 (70 รีวิว)", menu: [{ name: "ครัวซองต์ช็อกโกแลต", price: 45, status: "low" }, { name: "เค้กสตรอว์เบอร์รี", price: 75, status: "avail" }, { name: "เอแคลร์", price: 30, status: "avail" } ] }
};

// ใช้สำหรับสร้าง Order ID จำลอง
let orderCounter = 100;

// --- [Notification Feed Logic (NEW)] ---

function addFeedItem(message, statusClass) {
    const feedContent = document.getElementById('feed-content');
    const newItem = document.createElement('p');
    newItem.className = `feed-item ${statusClass}`;
    newItem.innerHTML = message;
    
    // เพิ่มไว้บนสุด
    feedContent.prepend(newItem); 
    
    // จำกัดจำนวน Feed
    while (feedContent.children.length > 5) {
        feedContent.removeChild(feedContent.lastChild);
    }
    
    // แสดง Indicator ว่ามี Notification ใหม่ (ถ้า Feed ปิดอยู่)
    const feedIndicator = document.getElementById('feed-indicator');
    if (!document.getElementById('notification-feed').classList.contains('visible')) {
        feedIndicator.style.display = 'block';
    }
}

function toggleNotificationFeed() {
    const feed = document.getElementById('notification-feed');
    const feedIndicator = document.getElementById('feed-indicator');
    
    feed.classList.toggle('visible');
    
    // ซ่อน Indicator เมื่อเปิด Feed
    if (feed.classList.contains('visible')) {
        feedIndicator.style.display = 'none';
    }
}

function closeNotificationFeed() {
    document.getElementById('notification-feed').classList.remove('visible');
}

// --- [Order Simulation (NEW)] ---

function simulateOrder() {
    orderCounter++;
    const currentOrder = orderCounter;
    closeModal('shop-detail-modal');
    
    showXPEffect(`+50 XP! (สั่งซื้อ # ${currentOrder})`);
    
    // 1. สถานะ: กำลังเตรียม (ทันที)
    addFeedItem(`<i class="fas fa-hourglass-half"></i> ออเดอร์ # ${currentOrder} เข้าคิวทำอาหารแล้ว`, 'status-order-prepare');
    
    // 2. สถานะ: พร้อมรับ (หลัง 4 วินาที)
    setTimeout(() => {
        addFeedItem(`<i class="fas fa-check-circle"></i> ออเดอร์ # ${currentOrder} พร้อมรับที่เคาน์เตอร์แล้ว!`, 'status-order-complete');
        // Trigger Alert เหมือนกับการแจ้งเตือนที่สำคัญ
        triggerShopAlert(`ออเดอร์ # ${currentOrder}`, "พร้อมรับแล้ว");
    }, 4000);
}


// --- [General Modal & View Functions] ---
function openModal(modalId) {
    if (modalId === 'avatar-modal') {
        document.getElementById('custom-avatar-display').style.background = currentAvatarLook;
        document.getElementById('new-username').value = myUsername; 
    }
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function openVotingModal() {
    alert("[DEMO MODE] เปิดหน้าจอโหวตสุดสัปดาห์\n(Mockup: โหวต 1 ครั้ง/สัปดาห์ รับ 100 XP!)");
    showXPEffect("+10 XP! (เปิดหน้าโหวต)");
}


// --- [Shop Detail & Menu Logic] ---

function getQueueStatus(shopId) {
    // ... (Logic เดิม) ...
    const card = document.querySelector(`.shop-card[data-shop-id="${shopId}"]`);
    if (!card) return "ไม่พบสถานะ";

    const statusBar = card.querySelector('.status-bar');
    const statusText = statusBar ? statusBar.textContent : "สถานะไม่ระบุ";
    
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

// --- [Avatar & Naming Logic] ---
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
         document.getElementById('username').textContent = myUsername;
    }
    
    document.getElementById('avatar-container').style.background = currentAvatarLook;
    localStorage.setItem('tastlinkAvatarLook', currentAvatarLook);
    
    closeModal('avatar-modal');
    showXPEffect("+10 XP! (บันทึกอวาตาร์/ชื่อ)"); 
}


// --- [Chat & Review Logic] ---
// ... (Logic เดิม) ...
function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (message === "") return;

    appendMessage(myUsername, message); 
    input.value = '';
    
    showXPEffect("+5 XP! (ร่วมแชท)");
    
    // Simulate New Review after chat (Micro-interaction)
    setTimeout(() => {
        addFeedItem(`<i class="fas fa-star"></i> ${myUsername} โพสต์รีวิวใหม่!`, 'status-new-review');
    }, 1000);
    
    setTimeout(simulateBotReply, 1500);
}
// ... (Logic อื่น ๆ เดิม) ...

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
        
        card.classList.remove('status-busy', 'status-chill', 'status-moderate');
        card.classList.add(randomStatus.statusClass);
        statusBar.id = `status-${index + 1}`; 
        statusBar.innerHTML = `สถานะ: ${randomStatus.text}`;
    });
}


// --- [Initialization] ---
function hideLoadingOverlay() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.style.opacity = '0'; 
        setTimeout(() => {
            overlay.style.display = 'none'; 
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    
    hideLoadingOverlay(); 

    // โหลดชื่อผู้ใช้และอวาตาร์
    document.getElementById('username').textContent = myUsername;
    document.getElementById('avatar-container').style.background = currentAvatarLook;

    // Load Data
    // ... (displayReviewPreview, displayRankings, updateShopStatuses) ...
    
    // ตั้งค่าเริ่มต้นของ Notification Feed (ซ่อน)
    closeNotificationFeed();
    document.getElementById('feed-indicator').style.display = 'block'; // แสดง Indicator ตั้งแต่แรก

    // ตั้งค่า Interval และ Timers
    // ... (setInterval, setTimeout) ...
    
    // 🌟 NEW: Initial Notifications to show activity
    addFeedItem('<i class="fas fa-bullhorn"></i> ยินดีต้อนรับสู่ Tastlink Premium Demo!', 'status-new-review');
});
