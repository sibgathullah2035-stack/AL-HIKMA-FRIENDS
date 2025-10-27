// Gallery Modal Functionality
function createGalleryModal() {
    const modal = document.createElement('div');
    modal.id = 'galleryModal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 90%; background: none; padding: 0;">
            <span class="close-modal" onclick="closeGalleryModal()" style="position: absolute; right: 15px; top: 15px; color: white; font-size: 2rem; cursor: pointer; z-index: 1002;">&times;</span>
            <button class="gallery-nav prev" onclick="navigateGallery(-1)">❮</button>
            <button class="gallery-nav next" onclick="navigateGallery(1)">❯</button>
            <img id="galleryModalImage" src="" alt="Gallery Image" style="max-width: 100%; max-height: 90vh; margin: auto; display: block;">
            <div class="image-counter" style="color: white; text-align: center; margin-top: 10px; font-size: 1rem;"></div>
        </div>
    `;
    document.body.appendChild(modal);
}

let currentGalleryItems = [];
let currentImageIndex = 0;

function openGalleryModal(img, items) {
    const modal = document.getElementById('galleryModal') || createGalleryModal();
    const modalImg = document.getElementById('galleryModalImage');
    const counter = modal.querySelector('.image-counter');
    
    currentGalleryItems = items;
    currentImageIndex = items.findIndex(item => item.src === img.src);
    
    modalImg.src = img.src;
    modal.style.display = 'flex';
    updateImageCounter();
}

function closeGalleryModal() {
    const modal = document.getElementById('galleryModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function navigateGallery(direction) {
    currentImageIndex = (currentImageIndex + direction + currentGalleryItems.length) % currentGalleryItems.length;
    const modalImg = document.getElementById('galleryModalImage');
    modalImg.src = currentGalleryItems[currentImageIndex].src;
    updateImageCounter();
}

function updateImageCounter() {
    const counter = document.querySelector('.image-counter');
    if (counter) {
        counter.textContent = `Image ${currentImageIndex + 1} of ${currentGalleryItems.length}`;
    }
}

// Initialize gallery functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const allImages = Array.from(document.querySelectorAll('.gallery-content.active .gallery-item img'));
            openGalleryModal(img, allImages);
        });
    });

    // Close modal when clicking outside the image
    const modal = document.getElementById('galleryModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeGalleryModal();
            }
        });
    }

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        const modal = document.getElementById('galleryModal');
        if (modal && modal.style.display === 'flex') {
            if (e.key === 'ArrowLeft') {
                navigateGallery(-1);
            } else if (e.key === 'ArrowRight') {
                navigateGallery(1);
            } else if (e.key === 'Escape') {
                closeGalleryModal();
            }
        }
    });
});