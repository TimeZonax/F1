// ข้อมูลจำลองสำหรับ Logic
const myUsername = "ผู้กล้าแห่งคณะ";
const mockReviews = [
    { user: "นักชิมเบอร์หนึ่ง", review: "ข้าวมันไก่ร้านนี้เนื้อนุ่มมาก ให้ 5 ดาวเลย!", shop: "ข้าวมันไก่ป้าหน่อย" },
    { user: "GamerFoodie", review: "ก๋วยเตี๋ยวรสชาติเข้มข้นดี แต่รอนานไปหน่อย", shop: "ก๋วยเตี๋ยวเรือเทพ" },
    { user: "MasterChefX", review: "ชาเย็นร้านใหม่ดีงามมาก หวานกำลังดี!", shop: "ร้านน้ำปั่นเจ๊จอย" },
    { user: "Freshman_01", review: "ผัดกะเพราร้านหน้าคณะคือที่สุดของความเผ็ด!", shop: "ครัวลุงสมชาย" }
];
const shopRanks = [
    { name: "ร้านก๋วยเตี๋ยวเรือเทพ", score: 4.8 },
    { name: "ร้านข้าวมันไก่ป้าหน่อย", score: 4.5 },
    { name: "ร้านน้ำปั่นเจ๊จอย", score: 4.2 }
];
const menuRanks = [
    { name: "ข้าวมันไก่หนังกรอบ", score: 4.9 },
    { name: "ก๋วยเตี๋ยวเรือเนื้อเปื่อย", score: 4.7 },
    { name: "ชาเย็นอาม่า", score: 4.6 }
];
let currentAvatarLook = 'linear-gradient(45deg, #004d99, #003366)'; // สีเริ่มต้นของอวาตาร์

// --- [General Modal Functions] ---
function openModal(modalId) {
    if (modalId === 'avatar-modal') {
        // อัปเดต Preview เมื่อเปิด Modal
        document.getElementById('custom-avatar-display').style.background = currentAvatarLook;
    }
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// --- [XP & Button Effects] ---

/**
 * ฟังก์ชันแสดง XP Gain Effect
 * @param {string} text ข้อความที่จะแสดง
 */
function showXPEffect(text) {
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

function viewShopDetails(shopId) {
    alert(`[DEMO MODE] กำลังนำคุณไปยังหน้ารายละเอียดร้านค้า ID: ${shopId}\n(Mockup: เมนู, รีวิว, แผนที่ความหนาแน่น)`);
    showXPEffect("+20 XP! (กดดูร้าน)");
}

function openVotingModal() {
    alert("[DEMO MODE] เปิดหน้าจอโหวตสุดสัปดาห์\n(Mockup: โหวต 1 ครั้ง/สัปดาห์ รับ 100 XP!)");
    showXPEffect("+10 XP! (เปิดหน้าโหวต)");
}


// --- [Avatar Customization Logic] ---
function changeAvatarLook(lookType) {
    const avatarDisplay = document.getElementById('custom-avatar-display');

    if (lookType === 'blue') {
        currentAvatarLook = 'linear-gradient(135deg, #3498db, #004d99)'; // Deep Blue Look
    } else if (lookType === 'green') {
        currentAvatarLook = 'linear-gradient(135deg, #2ecc71, #27ae60)'; // Green Look
    }
    
    avatarDisplay.style.background = currentAvatarLook;
}

function saveAvatar() {
    document.getElementById('avatar-container').style.background = currentAvatarLook;
    closeModal('avatar-modal');
    showXPEffect("+10 XP! (แต่งตัว)"); 
}


// --- [Ranking Logic] ---
function displayRankings() {
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

// --- [Park & Review Bubble Logic] ---
function displayReviewBubbles() {
    const parkArea = document.getElementById('review-bubbles');
    parkArea.innerHTML = ''; 

    mockReviews.forEach((item, index) => {
        const avatarImg = document.createElement('div');
        avatarImg.className = 'mini-avatar';
        avatarImg.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16); 
        avatarImg.innerText = item.user.substring(0, 3); 

        const bubble = document.createElement('div');
        bubble.className = 'review-bubble';
        bubble.innerHTML = `
            ${avatarImg.outerHTML}
            <p>${item.review}</p>
        `;
        
        const leftPos = Math.floor(Math.random() * 60) + 5; 
        const topPos = Math.floor(Math.random() * 55) + 15; 

        bubble.style.left = `${leftPos}%`;
        bubble.style.top = `${topPos}%`;
        bubble.style.animationDelay = `${index * 1.5}s`; 
        
        parkArea.appendChild(bubble);
    });
}

// --- [Chat Simulation Logic] ---
function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (message === "") return;

    appendMessage(myUsername, message);
    input.value = '';
    
    showXPEffect("+5 XP! (ร่วมแชท)");
    
    setTimeout(simulateBotReply, 1500);
}

function handleChatInput(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

function appendMessage(user, text) {
    const chatHistory = document.getElementById('chat-messages');
    const msgElement = document.createElement('div');
    msgElement.className = 'chat-message';
    msgElement.innerHTML = `<span class="chat-user">${user}:</span> ${text}`;
    
    chatHistory.appendChild(msgElement);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

function simulateBotReply() {
    const replies = [
        "ร้านข้าวมันไก่ป้าหน่อยคนเริ่มน้อยลงแล้วนะ!",
        "อวาตาร์คุณเท่มาก! ได้หมวกใหม่มาเหรอ?",
        "อย่าลืมไปโหวตร้านสุดสัปดาห์นี้นะ!"
    ];
    const botUser = "Tastlinl Bot";
    const replyText = replies[Math.floor(Math.random() * replies.length)];
    appendMessage(botUser, replyText);
}

// --- [Real-time Status Update & Alert] ---
function updateShopStatuses() {
    const statuses = [
        { statusClass: 'status-busy', text: '🔴 รอนาน (15-20 นาที)' },
        { statusClass: 'status-chill', text: '🟢 สบายๆ (3-5 นาที)' },
        { statusClass: 'status-moderate', text: '🟡 ปานกลาง (8-10 นาที)' }
    ];

    const shopCards = document.querySelectorAll('.shop-card');
    shopCards.forEach(card => {
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        const statusBar = card.querySelector('.status-bar');
        
        card.classList.remove('status-busy', 'status-chill', 'status-moderate');
        card.classList.add(randomStatus.statusClass);
        statusBar.innerHTML = `สถานะ: ${randomStatus.text}`;
    });
}

function triggerShopAlert(shopName, reason) {
    const alertModal = document.getElementById('alert-modal');
    document.getElementById('alert-message').textContent = `ร้าน ${shopName} ${reason}! กรุณาเลือกซื้อร้านอื่นแทน`;
    openModal('alert-modal');
}


// --- [Initialization] ---
document.addEventListener('DOMContentLoaded', () => {
    // กำหนดสีเริ่มต้นของอวาตาร์
    document.getElementById('avatar-container').style.background = currentAvatarLook;

    displayReviewBubbles(); 
    displayRankings();      
    updateShopStatuses();   

    // อัปเดตสถานะร้านค้าทุก 10 วินาที
    setInterval(updateShopStatuses, 10000); 
    
    // Trigger Alert หลัง 15 วินาที (The WOW Factor)
    setTimeout(() => {
        triggerShopAlert("ร้านก๋วยเตี๋ยวเรือเทพ", "ปิดทำการกะทันหัน (วัตถุดิบหมด)");
    }, 15000); 
});
