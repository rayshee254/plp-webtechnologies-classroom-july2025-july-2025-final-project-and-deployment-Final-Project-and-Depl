const petsData = [
    {
        id: 1,
        name: "Buddy",
        type: "dog",
        breed: "Golden Retriever",
        age: "2 years",
        description: "Friendly and energetic golden retriever who loves to play fetch.",
        image: "https://images.pexels.com/photos/30106761/pexels-photo-30106761.jpeg"
    },
    {
        id: 2,
        name: "Luna",
        type: "cat",
        breed: "Siamese",
        age: "1 year",
        description: "Gentle and affectionate Siamese cat who enjoys cuddling.",
        image: "https://images.pexels.com/photos/29043481/pexels-photo-29043481.jpeg"
    },
    {
        id: 3,
        name: "Rex",
        type: "dog",
        breed: "German Shepherd",
        age: "3 years",
        description: "Loyal and protective German Shepherd, great with families.",
        image: "https://images.pexels.com/photos/7119301/pexels-photo-7119301.jpeg"
    },
    {
        id: 4,
        name: "Mittens",
        type: "cat",
        breed: "Domestic Shorthair",
        age: "6 months",
        description: "Playful kitten who loves toys and exploring new environments.",
        image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop"
    },
    {
        id: 5,
        name: "Coco",
        type: "other",
        breed: "Rabbit",
        age: "1 year",
        description: "Sweet and gentle rabbit who is litter-trained and loves carrots.",
        image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&h=300&fit=crop"
    },
    {
        id: 6,
        name: "Max",
        type: "dog",
        breed: "Labrador Mix",
        age: "4 years",
        description: "Calm and loving lab mix, perfect for first-time dog owners.",
        image: "https://images.pexels.com/photos/20449895/pexels-photo-20449895.jpeg"
    }
];


const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const petsContainer = document.getElementById('pets-container');
const adoptionForm = document.getElementById('adoption-form');
const filterBtns = document.querySelectorAll('.filter-btn');


navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
       
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));
        
       
        link.classList.add('active');
        
        
        const targetId = link.getAttribute('href').substring(1);
        document.getElementById(targetId).classList.add('active');
        
       
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});


function initializePetsContainer() {
    petsContainer.innerHTML = '';
    
    petsData.forEach(pet => {
        const petCard = document.createElement('div');
        petCard.className = 'pet-card';
        petCard.setAttribute('data-type', pet.type);
        petCard.innerHTML = `
            <img src="${pet.image}" alt="${pet.name}" class="pet-image">
            <div class="pet-info">
                <h3>${pet.name}</h3>
                <span class="pet-type">${pet.type.charAt(0).toUpperCase() + pet.type.slice(1)}</span>
                <p><strong>Breed:</strong> ${pet.breed}</p>
                <p><strong>Age:</strong> ${pet.age}</p>
                <p>${pet.description}</p>
            </div>
        `;
        petsContainer.appendChild(petCard);
    });
}


filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        filterPets(filter);
    });
});

function filterPets(filterType) {
    const allPets = document.querySelectorAll('.pet-card');
    let hasVisibleCards = false;
    
    allPets.forEach(pet => {
        const petType = pet.getAttribute('data-type');
        // Check if the pet matches the filter or if filter is 'all'
        if (filterType === 'all' || petType === filterType) {
            pet.style.display = 'block';
            hasVisibleCards = true;
        } else {
            pet.style.display = 'none';
        }
    });
    
   
    void petsContainer.offsetHeight;
    
    
    const noPetsMessage = document.getElementById('no-pets-message');
    if (!hasVisibleCards) {
        if (!noPetsMessage) {
            const message = document.createElement('p');
            message.id = 'no-pets-message';
            message.textContent = `No ${filterType} pets available for adoption right now. Check back later!`;
            message.style.textAlign = 'center';
            message.style.gridColumn = '1 / -1';
            message.style.padding = '2rem';
            message.style.color = '#6c757d';
            petsContainer.appendChild(message);
        }
    } else if (noPetsMessage) {
        noPetsMessage.remove();
    }
}

// Form Submission
adoptionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(adoptionForm);
    const formObject = Object.fromEntries(formData.entries());
    
   
    if (!formObject.name || !formObject.email || !formObject.message) {
        alert('Please fill in all required fields');
        return;
    }
    
   
    console.log('Adoption inquiry submitted:', formObject);
    alert('Thank you for your inquiry! We will contact you within 24 hours.');
    adoptionForm.reset();
});

// Initialize the website
document.addEventListener('DOMContentLoaded', () => {
    initializePetsContainer();
});
