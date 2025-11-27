document.addEventListener('DOMContentLoaded', function() {
    // --- CONFIGURATION ---
    const FOLDER_PATH = 'photos/';
    
    // The specific list of photos you provided
    const photoFiles = [
        "224_2160.jpg", "225_2160.jpg", "226_2160.jpg", "227_2160.jpg", "228_2160.jpg",
        "229_2160.jpg", "230_2160.jpg", "231_2160.jpg", "232_2160.jpg", "233_2160.jpg",
        "234_2160.jpg", "235_2160.jpg", "236_2160.jpg", "237_2160.jpg", "238_2160.jpg",
        "239_2160.jpg", "240_2160.jpg", "241_2160.jpg", "242_2160.jpg", "243_2160.jpg",
        "244_2160.jpg", "245_2160.jpg", "246_2160.jpg", "247_2160.jpg", "248_2160.jpg",
        "249_2160.jpg", "250_2160.jpg", "251_2160.jpg", "252_2160.jpg", "253_2160.jpg",
        "254_2160.jpg", "255_2160.jpg", "256_2160.jpg", "257_2160.jpg", "258_2160.jpg",
        "259_2160.jpg", "260_2160.jpg", "261_2160.jpg", "262_2160.jpg", "263_2160.jpg",
        "264_2160.jpg", "265_2160.jpg", "266_2160.jpg", "267_2160.jpg", "268_2160.jpg",
        "269_2160.jpg"
    ];
    // --- END CONFIGURATION ---

    const gallery = document.getElementById('photo-gallery');
    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('modal-image');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    let imageSources = [];
    let currentIndex;

    // Clear the "Loading photos..." text immediately
    gallery.innerHTML = '';

    // Loop through the defined list and create the gallery
    if (photoFiles.length > 0) {
        photoFiles.forEach(filename => {
            // Construct the path relative to the index.html file
            const imageUrl = FOLDER_PATH + filename;
            imageSources.push(imageUrl);

            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = `Photo from our new home`;
            img.loading = 'lazy'; // Lazy load for performance

            galleryItem.appendChild(img);
            gallery.appendChild(galleryItem);
        });
    } else {
        gallery.innerHTML = '<p>No photos found in the gallery.</p>';
    }

    // --- LIGHTBOX LOGIC (Same as before) ---
    gallery.addEventListener('click', function(e) {
        if (e.target.tagName === 'IMG') {
            const clickedSrc = e.target.src;
            // We compare the full URL to find the index
            // (Browsers automatically expand img.src to the full domain path)
            currentIndex = imageSources.findIndex(src => clickedSrc.includes(src));
            
            // Fallback if findIndex fails (rare)
            if (currentIndex === -1) currentIndex = 0;

            showImage(currentIndex);
            modal.style.display = 'block';
        }
    });

    function closeModal() {
        modal.style.display = 'none';
    }

    function showImage(index) {
        if (index >= imageSources.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = imageSources.length - 1;
        } else {
            currentIndex = index;
        }
        // Use the stored relative path
        modalImg.src = imageSources[currentIndex];
    }
    
    const showNextImage = () => showImage(currentIndex + 1);
    const showPrevImage = () => showImage(currentIndex - 1);
    
    closeBtn.addEventListener('click', closeModal);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    window.addEventListener('click', (event) => {
        if (event.target == modal) closeModal();
    });

    document.addEventListener('keydown', (event) => {
        if (modal.style.display === 'block') {
            if (event.key === 'ArrowRight') showNextImage();
            if (event.key === 'ArrowLeft') showPrevImage();
            if (event.key === 'Escape') closeModal();
        }
    });
});