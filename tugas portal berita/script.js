const apiKey = '2d2a00afcc394930b72468aa973aef09';
const newsContainer = document.getElementById('news-container');
const searchInput = document.getElementById('search-input');

async function fetchNews(query = 'Indonesia') {
    const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status !== "ok" || !data.articles) {
            throw new Error(data.message || "Gagal memuat artikel berita.");
        }

        newsContainer.innerHTML = '';

        if (data.articles.length > 0) {
            data.articles.forEach(article => {
                const newsCard = document.createElement('div');
                newsCard.classList.add('col-md-4', 'mb-4');
                newsCard.innerHTML = `
                    <div class="card h-100">
                        <img src="${article.urlToImage || 'https://via.placeholder.com/150'}" class="card-img-top" alt="Gambar Berita">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${article.title}</h5>
                            <p class="card-text author">${article.author || 'Penulis Tidak Diketahui'} - ${new Date(article.publishedAt).toLocaleString()}</p>
                            <p class="card-text description">${article.description || ''}</p>
                            <a href="${article.url}" class="btn btn-primary mt-auto" target="_blank">Baca selengkapnya</a>
                        </div>
                    </div>
                `;
                newsContainer.appendChild(newsCard);
            });
        } else {
            newsContainer.innerHTML = '<p class="text-muted">Tidak ada artikel yang ditemukan.</p>';
        }
    } catch (error) {
        console.error("Gagal mengambil data berita:", error);
        newsContainer.innerHTML = `<p class="text-danger">Gagal memuat artikel berita: ${error.message}</p>`;
    }
}

fetchNews();

searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    fetchNews(query || 'Indonesia'); 
});
