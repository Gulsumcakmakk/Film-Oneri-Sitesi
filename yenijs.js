// API Anahtarı ve Temel URL'ler
const API_KEY = '87048d805c2e527d9856f7de6f108fca';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';


// DOM Elementleri
const filmTuruSelect = document.getElementById('filmTuru');
const siralamaSelect = document.getElementById('sıralamar');
const aramaInput = document.querySelector('.aramaamotoru');
const filmSonuclariDiv = document.getElementById('filmSonuclari');

const aramaButton = document.querySelector('.butonn');
const gundemdekilerDiv = document.querySelector('.gündemdekiler');

const modal = document.getElementById('filmModal');
const modalContent = document.getElementById('modalContent');
const closeModal = document.querySelector('.close');

// Global film listesi
let popularMovies = [];

// Sayfa yüklendiğinde popüler filmleri getir
document.addEventListener('DOMContentLoaded', () => {
    fetchPopularMovies();
    setupEventListeners();
});

// Event listener'ları kur
function setupEventListeners() {
    // Arama butonu
    aramaButton.addEventListener('click', handleSearch);

    // Enter tuşu ile arama
    aramaInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    // Film türü filtreleme
    filmTuruSelect.addEventListener('change', handleGenreFilter);

    // Sıralama seçeneği
    siralamaSelect.addEventListener('change', handleSorting);

    // Modal kapatma
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Dışarı tıklayarak modal kapatma
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Popüler filmleri getir
async function fetchPopularMovies() {
    try {
        const response = await fetch('${BASE_URL}/movie/popular?api_key=${API_KEY}&language=tr-TR');
        const data = await response.json();
        popularMovies = data.results.slice(0, 6);

        // Her film için detayları al
        const detailedMovies = await Promise.all(
            popularMovies.map(async movie => {
                const details = await fetchMovieDetails(movie.id);
                return { ...movie, ...details };
            })
        );

        displayMovies(detailedMovies, gundemdekilerDiv);
    } catch (error) {
        console.error('Popüler filmler alınırken hata:', error);
        alert('Popüler filmler yüklenirken bir hata oluştu.');
    }
}

// Film detaylarını getir
async function fetchMovieDetails(movieId) {
    try {
        const response = await fetch('${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=tr-TR');
        return await response.json();
    } catch (error) {
        console.error('Film detayları alınırken hata:', error);
        return null;
    }
}

// Filmleri ekranda göster
function displayMovies(movies, container) {
    container.innerHTML = '';

    movies.forEach((movie, index) => {
        const movieElement = document.createElement('div');
        movieElement.className = 'gündem';
        movieElement.addEventListener('click', () => showMovieDetails(movie));

        const posterPath = movie.poster_path
            ? '${IMG_BASE_URL}${movie.poster_path}'
            : 'https://via.placeholder.com/200x300?text=Poster+Yok';

        movieElement.innerHTML = `
            <img src="${posterPath}" alt="${movie.title}" loading="lazy">
            <div class="rank">${index + 1}</div>
            <div class="movie-overview">
                <h3>${movie.title}</h3>
                <p>${movie.overview ? movie.overview.substring(0, 100) + '...' : 'Açıklama bulunamadı.'}</p>
                <p><small>${movie.release_date || 'Yıl bilgisi yok'}</small></p>
            </div>
        `;

        container.appendChild(movieElement);
    });
}

// Film detaylarını modalda göster
function showMovieDetails(movie) {
    const posterPath = movie.poster_path
        ? '${IMG_BASE_URL}${movie.poster_path}'
        : 'https://via.placeholder.com/500x750?text=Poster+Yok';

    const backdropPath = movie.backdrop_path
        ? 'https://image.tmdb.org/t/p/original${movie.backdrop_path}'
        : '';

    modalContent.innerHTML = `
        <div style="display: flex; gap: 20px; margin-bottom: 20px;">
            <img src="${posterPath}" alt="${movie.title}" style="width: 300px; border-radius: 8px;">
            <div style="font-family:fantasy;font-size:14">
                <h2 style="color:#e50914;">${movie.title} (${movie.release_date ? movie.release_date.substring(0, 4) : ''})</h2>
                <p><strong>Türler:</strong> ${movie.genres ? movie.genres.map(g => g.name).join(', ') : 'Bilgi yok'}</p>
                <p><strong>Süre:</strong> ${movie.runtime ? movie.runtime + ' dakika' : 'Bilgi yok'}</p>
                <p><strong>IMDb:</strong> ${movie.vote_average ? movie.vote_average.toFixed(1) + '/10' : 'Puan yok'}</p>


                <h3 style="color:#e50914;">Filmin Konusu</h3>
                <p >${movie.overview || 'Açıklama bulunamadı.'}</p>
            </div>
        </div>
        
   `;

    modalContent.style.color = "#1a1a1a";

    modal.style.display = 'block';
}

// Arama işlemi
async function handleSearch() {
    const query = aramaInput.value.trim();
    if (!query) {
        alert('Lütfen bir film adı girin.');
        return;
    }

    try {
        const response = await fetch('${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=tr-TR');
        const data = await response.json();

        if (data.results.length > 0) {
            const detailedMovies = await Promise.all(
                data.results.slice(0, 6).map(async movie => {
                    const details = await fetchMovieDetails(movie.id);
                    return { ...movie, ...details };
                })
            );

            displayMovies(detailedMovies, filmSonuclariDiv);
            filmSonuclariDiv.scrollIntoView({ behavior: 'smooth' });
        } else {
            filmSonuclariDiv.innerHTML = '<p>Aradığınız film bulunamadı.</p>';
        }
    } catch (error) {
        console.error('Arama sırasında hata:', error);
        alert('Arama yapılırken bir hata oluştu.');
    }


}

// Tür filtreleme
async function handleGenreFilter(e) {
    const genre = e.target.value;
    if (!genre) return;

    try {
        const genreMap = {
            'aksiyon': 28,
            'komedi': 35,
            'dram': 18,
            'korku': 27,
            'bilimkurgu': 878
        };

        const genreId = genreMap[genre];
        const response = await fetch('${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=tr-TR');
        const data = await response.json();

        const detailedMovies = await Promise.all(
            data.results.slice(0, 6).map(async movie => {
                const details = await fetchMovieDetails(movie.id);
                return { ...movie, ...details };
            })
        );

        displayMovies(detailedMovies, filmSonuclariDiv);
        filmSonuclariDiv.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('Türe göre filtreleme hatası:', error);
    }


}

// Sıralama işlemi
async function handleSorting(e) {
    const sortBy = e.target.value;
    if (!sortBy) return;

    try {
        const sortMap = {
            'süre': 'runtime.desc',
            'imbd': 'vote_average.desc',
            'yıl': 'primary_release_date.desc'
        };

        const sortValue = sortMap[sortBy];
        const response = await fetch('${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=${sortValue}&language=tr-TR');
        const data = await response.json();

        const detailedMovies = await Promise.all(
            data.results.slice(0, 6).map(async movie => {
                const details = await fetchMovieDetails(movie.id);
                return { ...movie, ...details };
            })
        );

        displayMovies(detailedMovies, filmSonuclariDiv);
        filmSonuclariDiv.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('Sıralama hatası:', error);
    }
}

//////////

document.addEventListener("DOMContentLoaded", function () {

    // Hemen Başla butonu tıklanınca ilk section görünür olsun
    const baslaButonu = document.querySelector('.buton');
    const ilkSoru = document.querySelectorAll('.section')[0];

    baslaButonu.addEventListener('click', function (e) {
        e.preventDefault(); // #modsec bağlantısını engelle
        ilkSoru.style.display = 'block';
        ilkSoru.scrollIntoView({ behavior: 'smooth' });
    });

    // Diğer tüm .section'ları ilk başta gizliyoruz (güvenlik amaçlı tekrar)
    document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');


    const sections = document.querySelectorAll('.section');
    const nextButtons = document.querySelectorAll('.btn.btn-primary.btn-lg');
    const userAnswers = {
        mood: null,
        situation: null,
        genre: null,
        year: null
    };

    const API_KEY = "87048d805c2e527d9856f7de6f108fca";

    const genreMap = {
        "romantik": 10749,
        "komedi": 35,
        "aksiyon": 28,
        "gerilim": 53,
        "bilim kurgu": 878,
        "animasyon": 16
    };


    // 1. Soru (Mod Seçimi)
    document.querySelectorAll('.secim td').forEach(td => {
        td.addEventListener('click', function () {
            const moodText = this.querySelector('h5').textContent;
            userAnswers.mood = moodText.trim().toLowerCase();

            document.querySelectorAll('.secim td').forEach(item => {
                item.style.backgroundColor = '';
            });
            this.style.backgroundColor = 'rgba(248, 179, 25, 0.3)';
        });
    });

    // 2. Soru (Durum)
    document.querySelectorAll('.container .option').forEach(option => {
        option.addEventListener('click', function () {
            userAnswers.situation = this.textContent.trim();
            document.querySelectorAll('.container .option input').forEach(input => {
                input.checked = false;
            });
            this.querySelector('input').checked = true;
        });
    });


    document.querySelectorAll('.grid .box').forEach(box => {
        box.addEventListener('click', function () {
            userAnswers.genre = this.textContent
                .trim()
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");  // Türkçe karakter düzeltmesi

            console.log("DÜZENLENMİŞ Tür:", userAnswers.genre);

            document.querySelectorAll('.grid .box input').forEach(input => {
                input.checked = false;
            });
            this.querySelector('input').checked = true;
        });
    });

    // 4. Soru (Yıl)
    document.querySelectorAll('.years .aralik').forEach(item => {
        item.addEventListener('click', function () {
            userAnswers.year = this.textContent.trim();
            document.querySelectorAll('.years .aralik input').forEach(input => {
                input.checked = false;
            });
            this.querySelector('input').checked = true;
        });
    });

    // N E X T butonları
    nextButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const currentSection = sections[index];
            if (!validateSelection(index)) {
                alert("Lütfen bir seçim yapınız.");
                return;
            }

            sections[index].style.display = 'none';

            if (index + 1 < sections.length) {
                sections[index + 1].style.display = 'block';
                sections[index + 1].scrollIntoView({ behavior: 'smooth' });
            } else {
                //alert("SON NEXT butonu tıklandı, önerilenFilmiGetir çağrılacak");
                önerilenFilmiGetir();
            }
        });
    });

    function validateSelection(index) {
        switch (index) {
            case 0: return userAnswers.mood !== null;
            case 1: return userAnswers.situation !== null;
            case 2: return userAnswers.genre !== null;
            case 3: return userAnswers.year !== null;
            default: return false;
        }
    }


    function önerilenFilmiGetir() {
        const genreId = genreMap[userAnswers.genre];
        if (!genreId) {
            alert("Tür eşleştirilemedi.");
            return;
        }

        // Yıl sıralamasını düzelt
        let [y1, y2] = userAnswers.year.split('-').map(y => parseInt(y.trim()));
        const yearStart = Math.min(y1, y2);
        const yearEnd = Math.max(y1, y2);

        console.log("Yıl aralığı:", yearStart, "-", yearEnd);

        const url = 'https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=tr-TR&sort_by=popularity.desc&with_genres=${genreId}&primary_release_date.gte=${yearStart}-01-01&primary_release_date.lte=${yearEnd}-12-31';

        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log("API'den gelen veri:", data); // DEBUG için

                if (data.results && data.results.length > 0) {
                    const film = data.results[0];
                    const title = film.title;
                    const overview = film.overview;
                    const poster = 'https://image.tmdb.org/t/p/w500${film.poster_path}';

                    document.body.innerHTML = `
                    <div style="text-align:center; padding-top:20px; font-family:sans-serif">
                        <h2 style="color:#f8b319; font-size:40px;">🎬 Size Önerilen Film:</h2>
                        <h3 style="color:#ffffff; font-size:30px;">${title}</h3>
                        <img src="${poster}" alt="${title}" style="max-width:300px; border-radius:10px;"><br><br>
                        <p style="max-width:600px; font-size:20px; margin:auto; color:#e0e0e0;">${overview}</p>
                    </div>
                `;
                } else {
                    alert("Uygun film bulunamadı.");
                }
            })
            .catch(err => {
                console.error("API Hatası:", err);
                alert("Film önerisi alınırken hata oluştu.");
            });
    }
});






//arama motoru

document.addEventListener("DOMContentLoaded", function () {
    const aramaInput = document.querySelector('.aramaamotoru');
    const aramaButton = document.querySelector('.butonn');
    const filmSonuclariDiv = document.getElementById('filmSonuclari');

    aramaButton.addEventListener('click', async function () {
        const query = aramaInput.value.trim();
        if (!query) {
            alert("Lütfen bir film adı girin.");
            return;
        }

        const API_KEY = '87048d805c2e527d9856f7de6f108fca';
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=tr-TR&query=${encodeURIComponent(query)}`);
        const data = await response.json();

        if (data.results.length === 0) {
            filmSonuclariDiv.innerHTML = "<p style='color:white;'>Film bulunamadı.</p>";
            return;
        }

        const film = data.results[0]; // ilk sonucu al
        const poster = film.poster_path ? `https://image.tmdb.org/t/p/w500${film.poster_path}` : '';
        const title = film.title || 'Başlık yok';
        const overview = film.overview || 'Açıklama yok';
        const releaseDate = film.release_date || 'Tarih yok';

        filmSonuclariDiv.innerHTML = `
            <div style="background-color:#222; color:white; padding:20px; border-radius:10px; max-width:600px; margin:auto;">
                <h3>${title} (${releaseDate.substring(0, 4)})</h3>
                <img src="${poster}" alt="${title}" style="max-width:200px; border-radius:5px;"><br><br>
                <p>${overview}</p>
            </div>
        `;
    });
});



// türe göre 6 film önerir

filmTuruSelect.addEventListener("change", async function () {
    const selectedGenre = this.value;

    const genreMap = {
        'aksiyon': 28,
        'komedi': 35,
        'dram': 18,
        'korku': 27,
        'bilimkurgu': 878
    };

    const genreId = genreMap[selectedGenre];
    if (!genreId) return;

    try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=tr-TR&with_genres=${genreId}&sort_by=popularity.desc`);
        const data = await response.json();

        if (data.results.length === 0) {
            filmSonuclariDiv.innerHTML = "<p style='color:white;'>Bu türe ait film bulunamadı.</p>";
            return;
        }

        filmSonuclariDiv.innerHTML = ""; // Önceki sonuçları temizle
        data.results.slice(0, 6).forEach(film => {
            const poster = film.poster_path ? `https://image.tmdb.org/t/p/w500${film.poster_path}` : '';
            const title = film.title || 'Başlık yok';
            const overview = film.overview || 'Açıklama yok';
            const releaseDate = film.release_date || 'Tarih yok';

            filmSonuclariDiv.innerHTML += `
                <div style="background-color:#222; color:white; padding:20px; border-radius:10px; margin:20px 0;">
                    <h3>${title} (${releaseDate.substring(0, 4)})</h3>
                    <img src="${poster}" alt="${title}" style="max-width:200px; border-radius:5px;"><br><br>
                    <p>${overview}</p>
                </div>
            `;
        });
    } catch (err) {
        console.error("Tür seçimine göre film getirme hatası:", err);
        alert("Film türü yüklenemedi.");
    }
});



// Ana Sayfa linkine tıklanınca sayfayı yenile
document.querySelector('header nav a[href="#"]').addEventListener('click', function (e) {
    e.preventDefault(); // Sayfanın yeniden yüklenmesini engelle
    location.reload(); // Sayfayı yeniden yükle
});


// Ana sayfadaki blog linki için (websonn.html)
document.querySelector('nav a[href="blog.html"]').addEventListener('click', function(e) {
    // Normal link davranışı devam edecek (yeni sayfaya yönlendirme)
    // Ekstra bir JavaScript gerekmiyor
});

// Eğer tek sayfa uygulaması istiyorsanız:
/*
document.querySelector('nav a[href="blog.html"]').addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = "blog.html";
});
*/





