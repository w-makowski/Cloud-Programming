function setupGalleryEvents() {
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const closeModal = document.getElementById('close-modal');

    if (modal && closeModal) {

        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('thumbnail')) {
                modalImage.src = e.target.dataset.full;
                modal.classList.remove('hidden');
            }
            if (e.target === modal || e.target === closeModal) {
                modal.classList.add('hidden');
            }
        });
    }
}


function loadGalleryImages() {
    const gallery = document.getElementById('gallery');
    if (!gallery) return;

    gallery.innerHTML = '';
    
    const imageCount = 18;

    for (let i = 1; i <= imageCount; i++) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('gallery-item');

        const placeholder = document.createElement('div');
        placeholder.classList.add('image-placeeholder');

        const img = document.createElement('img');
        img.classList.add('thumbnail');
        img.loading = 'lazy';
        img.alt = `Gallery image ${i}`;
        img.dataset.full = `images/image${i}.png`;
        img.dataset.src = `images/image${i}.png`;
        img.style.opacity = 0;

        wrapper.appendChild(placeholder);
        wrapper.appendChild(img);
        gallery.appendChild(wrapper);
    }

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    console.log(`Loading image: ${img.dataset.src}`);
    
                    fetch(img.dataset.src)
                        .then(res => {
                            if (!res.ok) throw new Error(`HTTP error! ${res.status}`);
                            return res.blob();
                        })
                        .then(blob => {
                            const objectUrl = URL.createObjectURL(blob);
                            img.src = objectUrl;
                            img.onload = () => {
                                img.style.opacity = 1;
                                const placeholder = img.previousElementSibling;
                                if (placeholder) placeholder.remove();
                            }
                        })
                        .catch(err => {
                            const placeholder = img.previousElementSibling;
                            if (placeholder) {
                                placeholder.innerText = 'Image failed to load';
                                placeholder.classList.add('image-error');
                            }
                            console.error(`Image failed to load: ${img.dataset.src}`, err);
                        });
                        
                    obs.unobserve(img);
                }
            });
        }, { threshold: 0.1 });
    
        document.querySelectorAll('.thumbnail').forEach(img => {
            observer.observe(img);
        });
    } else {
        document.querySelectorAll('.thumbnail').forEach(img => {
            const path = img.dataset.src;
            fetch(path)
                .then(res => res.blob())
                .then(blob => {
                    img.src = URL.createObjectURL(blob);
                    img.style.opacity = 1;
                    const placeholder = img.previousElementSibling;
                    if (placeholder) placeholder.remove();
                })
                .catch(err => {
                    const placeholder = img.previousElementSibling;
                    if (placeholder) {
                        placeholder.innerText = 'Image failed to load';
                        placeholder.classList.add('image-error');
                    }
                    console.error(`Image failed to load: ${img.dataset.src}`, err);
                });
        });
    }
    
}