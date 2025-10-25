// Dados de usuários (simulando um banco de dados)
const users = JSON.parse(localStorage.getItem('eventify_users')) || [];
let currentUser = JSON.parse(localStorage.getItem('eventify_currentUser')) || null;

// Dados de eventos atualizados com nova imagem para maratona
const events = [
    {
        id: 1,
        title: "Indie Music Festival",
        date: "NOV 18",
        time: "4:00 PM - 12:00 AM",
        location: "Arts Park - NY",
        description: "3 days of independent music with national and international bands.",
        price: 180,
        category: "music",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        seats: generateSeats(100)
    },
    {
        id: 2,
        title: "Romeo and Juliet",
        date: "NOV 22",
        time: "8:00 PM",
        location: "Municipal Theater - NY",
        description: "Shakespeare classic with award-winning cast.",
        price: 90,
        category: "theater",
        image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        seats: generateSeats(150)
    },
    {
        id: 3,
        title: "National Classic",
        date: "NOV 25",
        time: "4:00 PM",
        location: "Maracana Stadium - RJ",
        description: "Decisive match for the national championship.",
        price: 120,
        category: "sports",
        image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1605&q=80",
        seats: generateSeats(500)
    },
    {
        id: 4,
        title: "Rock in Rio 2026",
        date: "NOV 30",
        time: "2:00 PM",
        location: "Olympic Park - RJ",
        description: "The biggest music festival on the planet.",
        price: 350,
        category: "music",
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        seats: generateSeats(1000)
    },
    {
        id: 5,
        title: "Photography Workshop",
        date: "DEC 05",
        time: "2:00 PM - 6:00 PM",
        location: "Cultural Space - NY",
        description: "Learn advanced techniques with award-winning photographer Ricardo Almeida.",
        price: 120,
        category: "workshop",
        image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=1412&q=80",
        seats: generateSeats(50)
    },
   {
        id: 6,
        title: "Hamlet",
        date: "DEC 10",
        time: "9:00 PM",
        location: "Municipal Theater - NY",
        description: "The classic work by Shakespeare.",
        price: 150,
        category: "theater",
        image: "https://th.bing.com/th/id/R.9a6716948f262d5d7abdab2b6ca4e57a?rik=e%2fThEznaOwdPTg&pid=ImgRaw&r=0",
        seats: generateSeats(200)
    },
    {
        id: 7,
        title: "Jazz Night",
        date: "DEC 15",
        time: "7:00 PM - 11:00 PM",
        location: "Jazz House - NY",
        description: "Special night with the best jazz musicians in the country.",
        price: 80,
        category: "music",
        image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        seats: generateSeats(80)
    },
    {
        id: 8,
        title: "City Marathon",
        date: "DEC 20",
        time: "7:00 AM",
        location: "Broadway Avenue - NY",
        description: "10km race through the main avenue of New York.",
        price: 90,
        category: "sports",
        image: "https://images.unsplash.com/photo-1544737151156-6e4c999de2aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80",
        seats: generateSeats(1000)
    },
    {
        id: 9,
        title: "Future of Technology",
        date: "DEC 22",
        time: "7:00 PM - 9:00 PM",
        location: "Online",
        description: "Experts discuss technology trends for the next 10 years.",
        price: 0,
        category: "workshop",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        seats: []
    },
    {
        id: 10,
        title: "New Year's Eve 2025",
        date: "DEC 31",
        time: "10:00 PM - 2:00 AM",
        location: "Copacabana Beach - RJ",
        description: "Celebrate the new year with great artists on Brazil's most famous beach.",
        price: 250,
        category: "music",
        image: "https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        seats: generateSeats(5000)
    }
];

// Função para gerar assentos aleatórios
function generateSeats(count) {
    const seats = [];
    const rows = Math.ceil(count / 10);
    const occupiedCount = Math.floor(count * 0.3);
    const pcdCount = Math.floor(count * 0.1);
    
    for (let row = 1; row <= rows; row++) {
        for (let num = 1; num <= 10; num++) {
            if (seats.length >= count) break;
            
            const seatId = `${row}${String.fromCharCode(64 + num)}`;
            const isOccupied = Math.random() < 0.3;
            const isPcd = seats.filter(s => s.pcd).length < pcdCount && 
                         (row === 1 || row === 2);
            
            seats.push({
                id: seatId,
                row: row,
                number: num,
                occupied: isOccupied,
                pcd: isPcd
            });
        }
    }
    
    return seats;
}

// Variáveis para o processo de reserva
let selectedEvent = null;
let selectedSeats = [];

// Elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');
const authModal = document.getElementById('authModal');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const heroSignupBtn = document.getElementById('heroSignupBtn');
const closeModal = document.getElementById('closeModal');
const loginTab = document.getElementById('loginTab');
const signupTab = document.getElementById('signupTab');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const switchToSignup = document.getElementById('switchToSignup');
const switchToLogin = document.getElementById('switchToLogin');
const modalTitle = document.getElementById('modalTitle');
const authButtons = document.getElementById('authButtons');
const userMenu = document.getElementById('userMenu');
const userName = document.getElementById('userName');
const logoutBtn = document.getElementById('logoutBtn');

// Verificar se há usuário logado
function checkAuthState() {
    if (currentUser) {
        authButtons.style.display = 'none';
        userMenu.style.display = 'flex';
        userName.textContent = currentUser.name;
    } else {
        authButtons.style.display = 'block';
        userMenu.style.display = 'none';
    }
}

// Mobile Menu Toggle
mobileMenuBtn?.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            navMenu?.classList.remove('show');
        }
    });
});

// Auth Modal Functions
function openModal(formType) {
    if (!authModal) return;
    
    authModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    if (formType === 'signup') {
        loginTab?.classList.remove('active');
        signupTab?.classList.add('active');
        loginForm?.classList.remove('active');
        signupForm?.classList.add('active');
        if (modalTitle) modalTitle.textContent = 'Sign Up to Eventify';
    } else {
        loginTab?.classList.add('active');
        signupTab?.classList.remove('active');
        loginForm?.classList.add('active');
        signupForm?.classList.remove('active');
        if (modalTitle) modalTitle.textContent = 'Sign In to Eventify';
    }
}

function closeAuthModal() {
    if (!authModal) return;
    authModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Event Listeners
loginBtn?.addEventListener('click', () => openModal('login'));
signupBtn?.addEventListener('click', () => openModal('signup'));

heroSignupBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    if (!currentUser) {
        openModal('signup');
    } else {
        showCreateEventForm();
    }
});

closeModal?.addEventListener('click', closeAuthModal);
loginTab?.addEventListener('click', () => openModal('login'));
signupTab?.addEventListener('click', () => openModal('signup'));

switchToSignup?.addEventListener('click', (e) => {
    e.preventDefault();
    openModal('signup');
});

switchToLogin?.addEventListener('click', (e) => {
    e.preventDefault();
    openModal('login');
});

// Logout
logoutBtn?.addEventListener('click', () => {
    currentUser = null;
    localStorage.removeItem('eventify_currentUser');
    checkAuthState();
    alert('Logout successful!');
});

// Form Submissions
loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail')?.value;
    const password = document.getElementById('loginPassword')?.value;
    
    if (!email || !password) {
        alert('Please fill in all fields!');
        return;
    }
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('eventify_currentUser', JSON.stringify(user));
        
        const rememberMe = document.getElementById('rememberMe');
        if (rememberMe?.checked) {
            localStorage.setItem('eventify_rememberedEmail', email);
        }
        
        alert('Login successful!');
        closeAuthModal();
        checkAuthState();
    } else {
        alert('Incorrect email or password!');
    }
});

signupForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('signupName')?.value;
    const email = document.getElementById('signupEmail')?.value;
    const password = document.getElementById('signupPassword')?.value;
    const confirmPassword = document.getElementById('signupConfirmPassword')?.value;
    
    if (!name || !email || !password || !confirmPassword) {
        alert('Please fill in all fields!');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    if (password.length < 6) {
        alert('Password must be at least 6 characters!');
        return;
    }
    
    if (users.some(u => u.email === email)) {
        alert('This email is already registered!');
        return;
    }
    
    const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        bookings: []
    };
    
    users.push(newUser);
    localStorage.setItem('eventify_users', JSON.stringify(users));
    
    currentUser = newUser;
    localStorage.setItem('eventify_currentUser', JSON.stringify(newUser));
    
    alert('Registration successful! You are now logged in.');
    closeAuthModal();
    checkAuthState();
});

// Contact Form
document.getElementById('contactForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name')?.value;
    const email = document.getElementById('email')?.value;
    const subject = document.getElementById('subject')?.value;
    const message = document.getElementById('message')?.value;
    
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields!');
        return;
    }
    
    alert(`Thank you, ${name}! Your message has been sent successfully. We will respond to ${email} soon.`);
    
    // Limpar formulário
    e.target.reset();
});

// Event Filter Functionality
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const category = btn.dataset.category;
        filterEvents(category);
    });
});

function filterEvents(category) {
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Gerar cards de eventos
function generateEventCards() {
    const eventCardsContainer = document.getElementById('eventCards');
    if (!eventCardsContainer) return;
    
    eventCardsContainer.innerHTML = '';

    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card fade-in';
        eventCard.dataset.id = event.id;
        eventCard.dataset.category = event.category;

        eventCard.innerHTML = `
            <div class="event-image">
                <img src="${event.image}" alt="${event.title}" loading="lazy">
            </div>
            <div class="event-info">
                <span class="event-date">${event.date}</span>
                <h3>${event.title}</h3>
                <div class="event-meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${event.location}</span>
                    <span><i class="far fa-clock"></i> ${event.time}</span>
                </div>
                <p class="event-description">${event.description}</p>
                <div class="event-actions">
                    <span class="event-price ${event.price === 0 ? 'free' : ''}">${event.price === 0 ? 'Free' : `$ ${event.price.toFixed(2)}`}</span>
                    <button class="btn btn-primary btn-book">Book</button>
                </div>
            </div>
        `;

        eventCardsContainer.appendChild(eventCard);
    });

    // Adicionar event listeners aos botões de reserva
    document.querySelectorAll('.btn-book').forEach(btn => {
        btn.addEventListener('click', function() {
            if (!currentUser) {
                openModal('login');
                return;
            }
            
            const eventCard = this.closest('.event-card');
            const eventId = parseInt(eventCard.dataset.id);
            selectedEvent = events.find(e => e.id === eventId);
            
            if (!selectedEvent) return;
            
            showSeatingSection();
        });
    });
}

// Função para mostrar a seção de assentos
function showSeatingSection() {
    if (!selectedEvent) return;
    
    // Atualizar informações do evento
    const seatingTitle = document.getElementById('seating-title');
    const seatingSubtitle = document.getElementById('seating-subtitle');
    const summaryEvent = document.getElementById('summary-event');
    const summaryDate = document.getElementById('summary-date');
    const summaryLocation = document.getElementById('summary-location');
    const summaryPrice = document.getElementById('summary-price');
    
    if (seatingTitle) seatingTitle.textContent = `Seat Selection: ${selectedEvent.title}`;
    if (seatingSubtitle) seatingSubtitle.textContent = selectedEvent.description;
    if (summaryEvent) summaryEvent.textContent = selectedEvent.title;
    if (summaryDate) summaryDate.textContent = `${selectedEvent.date} - ${selectedEvent.time}`;
    if (summaryLocation) summaryLocation.textContent = selectedEvent.location;
    if (summaryPrice) summaryPrice.textContent = selectedEvent.price.toFixed(2);
    
    // Limpar seleção anterior
    selectedSeats = [];
    updateBookingSummary();
    
    // Gerar mapa de assentos
    generateSeatingMap(selectedEvent.seats);
    
    // Mostrar seção de assentos
    const eventsSection = document.getElementById('events');
    const seatingSection = document.getElementById('seating');
    
    if (eventsSection) eventsSection.style.display = 'none';
    if (seatingSection) seatingSection.style.display = 'block';
    
    window.scrollTo({
        top: seatingSection?.offsetTop - 80 || 0,
        behavior: 'smooth'
    });
}

// Gerar mapa de assentos
function generateSeatingMap(seats) {
    const seatingMap = document.getElementById('seatingMap');
    if (!seatingMap) return;
    
    seatingMap.innerHTML = '';
    
    if (seats.length === 0) {
        seatingMap.innerHTML = '<p style="text-align: center; color: var(--medium-gray);">This event does not require specific seat reservations.</p>';
        return;
    }
    
    // Legenda dos assentos
    const legend = document.createElement('div');
    legend.className = 'seating-legend';
    legend.innerHTML = `
        <div class="legend-item">
            <div class="legend-color" style="background-color: var(--success-color);"></div>
            <span>Available</span>
        </div>
        <div class="legend-item">
            <div class="legend-color" style="background-color: #4a90e2;"></div>
            <span>PWD</span>
        </div>
        <div class="legend-item">
            <div class="legend-color" style="background-color: var(--danger-color);"></div>
            <span>Occupied</span>
        </div>
        <div class="legend-item">
            <div class="legend-color" style="background-color: var(--warning-color);"></div>
            <span>Selected</span>
        </div>
    `;
    seatingMap.appendChild(legend);
    
    // Criar assentos
    seats.forEach(seat => {
        const seatElement = document.createElement('div');
        seatElement.className = 'seat';
        seatElement.textContent = seat.id;
        seatElement.dataset.id = seat.id;
        seatElement.title = `Seat ${seat.id}${seat.pcd ? ' - PWD' : ''}${seat.occupied ? ' - Occupied' : ''}`;
        
        if (seat.pcd) seatElement.classList.add('pcd-sector');
        if (seat.occupied) seatElement.classList.add('occupied');
        
        if (!seat.occupied) {
            seatElement.addEventListener('click', () => toggleSeatSelection(seat));
        }
        
        seatingMap.appendChild(seatElement);
    });
}

function toggleSeatSelection(seat) {
    const seatIndex = selectedSeats.findIndex(s => s.id === seat.id);
    
    if (seatIndex === -1) {
        selectedSeats.push(seat);
    } else {
        selectedSeats.splice(seatIndex, 1);
    }
    
    updateBookingSummary();
    
    // Atualizar visualização dos assentos
    const seatElements = document.querySelectorAll('.seat');
    seatElements.forEach(el => {
        if (selectedSeats.some(s => s.id === el.dataset.id)) {
            el.classList.add('selected');
        } else {
            el.classList.remove('selected');
        }
    });
}

function calculateTotal() {
    if (!selectedEvent) return 0;
    
    const isPcd = document.getElementById('pcdCheckbox')?.checked || false;
    let total = selectedSeats.length * selectedEvent.price;
    return isPcd ? total * 0.5 : total;
}

function updateBookingSummary() {
    const summarySeats = document.getElementById('summary-seats');
    const summaryTotal = document.getElementById('summary-total');
    const summaryPrice = document.getElementById('summary-price');
    
    if (selectedSeats.length === 0) {
        if (summarySeats) summarySeats.textContent = 'None selected';
        if (summaryTotal) summaryTotal.textContent = '0.00';
        return;
    }

    const isPcd = document.getElementById('pcdCheckbox')?.checked || false;
    const seatsList = selectedSeats.map(s => s.id).join(', ');
    
    // Verifica se assentos PCD foram selecionados
    if (isPcd) {
        const nonPcdSeats = selectedSeats.filter(seat => !seat.pcd);
        if (nonPcdSeats.length > 0) {
            alert('You selected regular seats. PWD must choose only seats from the blue sector.');
            // Remove assentos não PCD da seleção
            selectedSeats = selectedSeats.filter(seat => seat.pcd);
            
            // Atualizar visualização
            const seatElements = document.querySelectorAll('.seat');
            seatElements.forEach(el => {
                if (!selectedSeats.some(s => s.id === el.dataset.id)) {
                    el.classList.remove('selected');
                }
            });
            
            if (selectedSeats.length === 0) {
                updateBookingSummary();
                return;
            }
        }
    }

    let unitPrice = selectedEvent.price;
    
    // Aplica 50% de desconto para PCD
    if (isPcd) {
        unitPrice *= 0.5;
    }

    const total = selectedSeats.length * unitPrice;

    if (summarySeats) summarySeats.textContent = seatsList;
    if (summaryPrice) summaryPrice.textContent = unitPrice.toFixed(2);
    if (summaryTotal) summaryTotal.textContent = total.toFixed(2);
}

// Listener para mostrar/ocultar upload de documento
document.getElementById('pcdCheckbox')?.addEventListener('change', function() {
    const uploadSection = document.getElementById('pcdDocumentUpload');
    if (uploadSection) {
        uploadSection.style.display = this.checked ? 'block' : 'none';
    }
    updateBookingSummary();
});

// Cancelar reserva
document.getElementById('cancelBooking')?.addEventListener('click', () => {
    const eventsSection = document.getElementById('events');
    const seatingSection = document.getElementById('seating');
    
    if (eventsSection) eventsSection.style.display = 'block';
    if (seatingSection) seatingSection.style.display = 'none';
    
    window.scrollTo({
        top: eventsSection?.offsetTop - 80 || 0,
        behavior: 'smooth'
    });
});

// Confirmar reserva
document.getElementById('confirmBooking')?.addEventListener('click', () => {
    if (selectedSeats.length === 0) {
        alert('Select at least one seat!');
        return;
    }

    // Verificar se é PCD e se documento foi enviado
    const isPcd = document.getElementById('pcdCheckbox')?.checked || false;
    const pcdDocument = document.getElementById('pcdDocument')?.files[0];
    
    if (isPcd && !pcdDocument) {
        alert("Please upload PWD proof to validate your discount.");
        return;
    }

    // Criar reserva
    const booking = {
        id: Date.now(),
        eventId: selectedEvent.id,
        eventTitle: selectedEvent.title,
        date: selectedEvent.date,
        seats: selectedSeats.map(s => s.id),
        total: calculateTotal(),
        bookingDate: new Date().toLocaleDateString('en-US'),
        isPcd: isPcd
    };
    
    // Adicionar reserva ao usuário
    if (currentUser) {
        currentUser.bookings.push(booking);
        
        // Atualizar usuário no "banco de dados"
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        if (userIndex !== -1) {
            users[userIndex] = currentUser;
            localStorage.setItem('eventify_users', JSON.stringify(users));
            localStorage.setItem('eventify_currentUser', JSON.stringify(currentUser));
        }
    }
    
    // Atualizar assentos como ocupados
    selectedSeats.forEach(seat => {
        const eventIndex = events.findIndex(e => e.id === selectedEvent.id);
        if (eventIndex !== -1) {
            const seatIndex = events[eventIndex].seats.findIndex(s => s.id === seat.id);
            if (seatIndex !== -1) {
                events[eventIndex].seats[seatIndex].occupied = true;
            }
        }
    });
    
    // Mostrar confirmação
    const confirmationModal = document.getElementById('confirmationModal');
    if (confirmationModal) {
        confirmationModal.style.display = 'flex';
    }
});

// Fechar confirmação
document.getElementById('closeConfirmation')?.addEventListener('click', () => {
    const confirmationModal = document.getElementById('confirmationModal');
    const eventsSection = document.getElementById('events');
    const seatingSection = document.getElementById('seating');
    
    if (confirmationModal) confirmationModal.style.display = 'none';
    if (eventsSection) eventsSection.style.display = 'block';
    if (seatingSection) seatingSection.style.display = 'none';
    
    window.scrollTo({
        top: eventsSection?.offsetTop - 80 || 0,
        behavior: 'smooth'
    });
});

// Função para mostrar o formulário de criação de evento
function showCreateEventForm() {
    if (!currentUser) {
        openModal('login');
        return;
    }
    
    const createEventSection = document.getElementById('create-event');
    if (createEventSection) {
        createEventSection.style.display = 'block';
        window.scrollTo({
            top: createEventSection.offsetTop - 80,
            behavior: 'smooth'
        });
    }
}

// Event listener para o formulário de criação de evento
document.getElementById('eventForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Coletar dados do formulário
    const eventData = {
        title: document.getElementById('eventTitle')?.value,
        category: document.getElementById('eventCategory')?.value,
        description: document.getElementById('eventDescription')?.value,
        date: document.getElementById('eventDate')?.value,
        time: document.getElementById('eventTime')?.value,
        location: document.getElementById('eventLocation')?.value,
        price: parseFloat(document.getElementById('eventPrice')?.value || '0'),
        image: document.getElementById('eventImage')?.value || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
        capacity: document.getElementById('eventCapacity')?.value || 100
    };
    
    // Validação básica
    if (!eventData.title || !eventData.category || !eventData.description || 
        !eventData.date || !eventData.time || !eventData.location) {
        alert('Please fill in all required fields!');
        return;
    }
    
    // Simular criação do evento
    alert(`Event "${eventData.title}" created successfully!\n\nYou will soon receive an email with instructions to manage your event.`);
    
    // Limpar formulário
    document.getElementById('eventForm')?.reset();
    
    // Voltar para a seção de eventos
    const createEventSection = document.getElementById('create-event');
    const eventsSection = document.getElementById('events');
    
    if (createEventSection) createEventSection.style.display = 'none';
    if (eventsSection) eventsSection.style.display = 'block';
});

// Event listener para o botão cancelar do formulário de evento
document.getElementById('cancelEvent')?.addEventListener('click', function() {
    const createEventSection = document.getElementById('create-event');
    const eventsSection = document.getElementById('events');
    
    if (createEventSection) createEventSection.style.display = 'none';
    if (eventsSection) eventsSection.style.display = 'block';
});

// Função para os botões de plano
function showPlanConfirmation(planName, planPrice) {
    const planModal = document.getElementById('planConfirmationModal');
    const planModalTitle = document.getElementById('planModalTitle');
    const planConfirmationMessage = document.getElementById('planConfirmationMessage');
    const planDetails = document.getElementById('planDetails');
    
    if (!planModal || !planModalTitle || !planConfirmationMessage || !planDetails) return;
    
    planModalTitle.textContent = `${planName} Plan Subscription`;
    planConfirmationMessage.textContent = `Congratulations! Your ${planName} plan subscription has been confirmed successfully.`;
    planDetails.textContent = `Price: $ ${planPrice}/month. Shortly you will receive an email with all the details.`;
    planModal.style.display = 'block';
}

// Event listeners para os botões de planos
document.getElementById('proPlanBtn')?.addEventListener('click', function(e) {
    e.preventDefault();
    
    if (!currentUser) {
        openModal('login');
        return;
    }
    
    showPlanConfirmation('Professional', '99');
});

document.getElementById('enterprisePlanBtn')?.addEventListener('click', function(e) {
    e.preventDefault();
    
    if (!currentUser) {
        openModal('login');
        return;
    }
    
    showPlanConfirmation('Enterprise', '299');
});

// Fechar modal de confirmação de plano
document.getElementById('closePlanModal')?.addEventListener('click', function() {
    const planModal = document.getElementById('planConfirmationModal');
    if (planModal) planModal.style.display = 'none';
});

document.getElementById('confirmPlanOk')?.addEventListener('click', function() {
    const planModal = document.getElementById('planConfirmationModal');
    if (planModal) planModal.style.display = 'none';
});

// Scroll Reveal Animation
function revealOnScroll() {
    const elements = document.querySelectorAll('.fade-in');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const revealPoint = 100;
        
        if (elementPosition < windowHeight - revealPoint) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    if (e.target === authModal) {
        closeAuthModal();
    }
    
    const planModal = document.getElementById('planConfirmationModal');
    if (e.target === planModal) {
        planModal.style.display = 'none';
    }
    
    const confirmationModal = document.getElementById('confirmationModal');
    if (e.target === confirmationModal) {
        confirmationModal.style.display = 'none';
    }
});

// Initialize on DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
    // Verificar se há e-mail para lembrar
    const rememberedEmail = localStorage.getItem('eventify_rememberedEmail');
    const loginEmailInput = document.getElementById('loginEmail');
    const rememberMeCheckbox = document.getElementById('rememberMe');
    
    if (rememberedEmail && loginEmailInput && rememberMeCheckbox) {
        loginEmailInput.value = rememberedEmail;
        rememberMeCheckbox.checked = true;
    }
    
    // Verificar estado de autenticação
    checkAuthState();
    
    // Gerar cards de eventos
    generateEventCards();
    
    // Trigger initial reveal check
    revealOnScroll();
    
    // Initialize date picker with minimum date as today
    const eventDateInput = document.getElementById('eventDate');
    if (eventDateInput) {
        const today = new Date().toISOString().split('T')[0];
        eventDateInput.min = today;
    }
});

// Função para validar formulário de contato
function validateContactForm(form) {
    const requiredFields = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = 'var(--danger-color)';
            isValid = false;
        } else {
            field.style.borderColor = 'var(--border-color)';
        }
    });
    
    // Validar email
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
            emailField.style.borderColor = 'var(--danger-color)';
            isValid = false;
            alert('Please enter a valid email!');
        }
    }
    
    return isValid;
}

// Error handling for images
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
        e.target.alt = 'Event image';
    }
}, true);
    