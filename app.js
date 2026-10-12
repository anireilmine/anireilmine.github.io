// ==========================================================================
// ANIREIL NOVELS — ДВИЖОК САЙТА (APP.JS)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  // ------------------------------------------------------------------------
  // 1. СИСТЕМА ПЕРЕКЛЮЧЕНИЯ 4 ОСНОВНЫХ ВКЛАДОК
  // ------------------------------------------------------------------------
  const navTabs = document.querySelectorAll('.nav-tab');
  const tabPanes = {
    home: document.getElementById('tab-home'),
    catalog: document.getElementById('tab-catalog'),
    analytics: document.getElementById('tab-analytics'),
    guide: document.getElementById('tab-guide')
  };

  function switchTab(targetKey) {
    if (!tabPanes[targetKey]) return;

    // Переключаем активный класс на всех кнопках в шапке
    navTabs.forEach(tab => {
      if (tab.dataset.tab === targetKey) {
        tab.classList.add('active');
        tab.classList.remove('text-slate-400');
      } else {
        tab.classList.remove('active');
        tab.classList.add('text-slate-400');
      }
    });

    // Показываем нужную вкладку и скрываем остальные
    Object.keys(tabPanes).forEach(key => {
      if (key === targetKey) {
        tabPanes[key].classList.remove('hidden');
      } else {
        tabPanes[key].classList.add('hidden');
      }
    });

    // Закрываем полноэкранный просмотр, если он был открыт
    closeCinemaView();

    // Скроллим наверх
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  // Клик по вкладкам в навигации
  navTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      switchTab(tab.dataset.tab);
    });
  });

  // Кнопки перехода в каталог с Главной страницы
  document.querySelectorAll('.btn-goto-catalog').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      switchTab('catalog');
    });
  });


  // ------------------------------------------------------------------------
  // 2. ВЫПАДАЮЩИЕ ФИЛЬТРЫ В СТИЛЕ IVI (ЖАНРЫ И ПЛАТФОРМЫ)
  // ------------------------------------------------------------------------
  const genreDropdownBtn = document.getElementById('genreDropdownBtn');
  const genreDropdownMenu = document.getElementById('genreDropdownMenu');
  const genreDropdownLabel = document.getElementById('genreDropdownLabel');
  const genreCheckboxGrid = document.getElementById('genreCheckboxGrid');
  const resetGenreFilter = document.getElementById('resetGenreFilter');

  const platformDropdownBtn = document.getElementById('platformDropdownBtn');
  const platformDropdownMenu = document.getElementById('platformDropdownMenu');
  const platformDropdownLabel = document.getElementById('platformDropdownLabel');
  const platformSelectItems = document.querySelectorAll('.platform-select-item');

  const resetAllFiltersBtn = document.getElementById('resetAllFiltersBtn');
  const searchInput = document.getElementById('searchInput');

  // Состояние активных фильтров
  let selectedGenres = new Set(); // Поддержка мульти-выбора
  let selectedPlatform = 'all';
  let searchQuery = '';

  // Открытие/закрытие меню жанров
  if (genreDropdownBtn && genreDropdownMenu) {
    genreDropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = genreDropdownMenu.classList.contains('hidden');
      closeAllDropdowns();
      if (isHidden) {
        genreDropdownMenu.classList.remove('hidden');
        genreDropdownBtn.classList.add('active');
      }
    });
  }

  // Открытие/закрытие меню платформ
  if (platformDropdownBtn && platformDropdownMenu) {
    platformDropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = platformDropdownMenu.classList.contains('hidden');
      closeAllDropdowns();
      if (isHidden) {
        platformDropdownMenu.classList.remove('hidden');
        platformDropdownBtn.classList.add('active');
      }
    });
  }

  // Закрытие выпадающих списков при клике в любое другое место страницы
  document.addEventListener('click', () => {
    closeAllDropdowns();
  });

  if (genreDropdownMenu) {
    genreDropdownMenu.addEventListener('click', (e) => e.stopPropagation());
  }
  if (platformDropdownMenu) {
    platformDropdownMenu.addEventListener('click', (e) => e.stopPropagation());
  }

  function closeAllDropdowns() {
    if (genreDropdownMenu) genreDropdownMenu.classList.add('hidden');
    if (genreDropdownBtn && selectedGenres.size === 0) genreDropdownBtn.classList.remove('active');

    if (platformDropdownMenu) platformDropdownMenu.classList.add('hidden');
    if (platformDropdownBtn && selectedPlatform === 'all') platformDropdownBtn.classList.remove('active');
  }

  // ------------------------------------------------------------------------
  // 3. ГЕНЕРАЦИЯ СПИСКА ЖАНРОВ С ГАЛОЧКАМИ (КАК НА ИВИ)
  // ------------------------------------------------------------------------
  function initGenreDropdown() {
    if (!genreCheckboxGrid || typeof NOVELS_DATA === 'undefined') return;

    const allGenres = new Set();
    NOVELS_DATA.forEach(novel => {
      if (Array.isArray(novel.genres)) {
        novel.genres.forEach(g => allGenres.add(g));
      }
    });

    genreCheckboxGrid.innerHTML = '';

    allGenres.forEach(genre => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'genre-check-btn';
      btn.dataset.genre = genre;
      btn.innerHTML = `
        <span>${genre}</span>
        <i data-lucide="check" class="w-3.5 h-3.5 text-purple-400 hidden check-icon"></i>
      `;

      btn.addEventListener('click', () => {
        toggleGenre(genre, btn);
      });

      genreCheckboxGrid.appendChild(btn);
    });

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  function toggleGenre(genre, btnElement) {
    const checkIcon = btnElement.querySelector('.check-icon');

    if (selectedGenres.has(genre)) {
      selectedGenres.delete(genre);
      btnElement.classList.remove('checked');
      if (checkIcon) checkIcon.classList.add('hidden');
    } else {
      selectedGenres.add(genre);
      btnElement.classList.add('checked');
      if (checkIcon) checkIcon.classList.remove('hidden');
    }

    updateGenreDropdownLabel();
    applyFilters();
  }

  function updateGenreDropdownLabel() {
    if (!genreDropdownLabel) return;

    if (selectedGenres.size === 0) {
      genreDropdownLabel.textContent = 'Жанры: Все';
      genreDropdownBtn?.classList.remove('active');
    } else if (selectedGenres.size === 1) {
      genreDropdownLabel.textContent = `Жанр: ${Array.from(selectedGenres)[0]}`;
      genreDropdownBtn?.classList.add('active');
    } else {
      genreDropdownLabel.textContent = `Жанры (${selectedGenres.size})`;
      genreDropdownBtn?.classList.add('active');
    }
  }

  // Сброс жанров внутри выпадающего меню
  if (resetGenreFilter) {
    resetGenreFilter.addEventListener('click', () => {
      selectedGenres.clear();
      genreCheckboxGrid.querySelectorAll('.genre-check-btn').forEach(btn => {
        btn.classList.remove('checked');
        const icon = btn.querySelector('.check-icon');
        if (icon) icon.classList.add('hidden');
      });
      updateGenreDropdownLabel();
      applyFilters();
    });
  }

  // ------------------------------------------------------------------------
  // 4. ВЫБОР ПЛАТФОРМЫ
  // ------------------------------------------------------------------------
  platformSelectItems.forEach(item => {
    item.addEventListener('click', () => {
      selectedPlatform = item.dataset.platform;

      platformSelectItems.forEach(i => {
        i.classList.remove('text-purple-400');
        const icon = i.querySelector('.check-icon');
        if (icon) icon.classList.add('hidden');
      });

      item.classList.add('text-purple-400');
      const activeIcon = item.querySelector('.check-icon');
      if (activeIcon) activeIcon.classList.remove('hidden');

      if (platformDropdownLabel) {
        if (selectedPlatform === 'all') {
          platformDropdownLabel.textContent = 'Платформа: Все';
          platformDropdownBtn?.classList.remove('active');
        } else if (selectedPlatform === 'pc') {
          platformDropdownLabel.textContent = 'Платформа: PC';
          platformDropdownBtn?.classList.add('active');
        } else if (selectedPlatform === 'android') {
          platformDropdownLabel.textContent = 'Платформа: Android';
          platformDropdownBtn?.classList.add('active');
        }
      }

      closeAllDropdowns();
      applyFilters();
    });
  });

  // ------------------------------------------------------------------------
  // 5. ОБЩИЙ СБРОС И ПОИСК
  // ------------------------------------------------------------------------
  if (resetAllFiltersBtn) {
    resetAllFiltersBtn.addEventListener('click', () => {
      searchQuery = '';
      if (searchInput) searchInput.value = '';

      // Сброс жанров
      selectedGenres.clear();
      if (genreCheckboxGrid) {
        genreCheckboxGrid.querySelectorAll('.genre-check-btn').forEach(btn => {
          btn.classList.remove('checked');
          const icon = btn.querySelector('.check-icon');
          if (icon) icon.classList.add('hidden');
        });
      }
      updateGenreDropdownLabel();

      // Сброс платформы
      selectedPlatform = 'all';
      platformSelectItems.forEach(i => {
        i.classList.remove('text-purple-400');
        const icon = i.querySelector('.check-icon');
        if (icon) icon.classList.add('hidden');
      });
      if (platformDropdownLabel) platformDropdownLabel.textContent = 'Платформа: Все';
      platformDropdownBtn?.classList.remove('active');

      applyFilters();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      applyFilters();
    });
  }


  // ------------------------------------------------------------------------
  // 6. ОТРИСОВКА ВЕРТИКАЛЬНЫХ ПОСТЕРОВ 2:3 (ФОРМАТ IVI)
  // ------------------------------------------------------------------------
  const novelsGrid = document.getElementById('novelsGrid');
  const emptyState = document.getElementById('emptyState');
  const statTotalNovels = document.getElementById('statTotalNovels');

  function renderNovels(list) {
    if (!novelsGrid) return;
    novelsGrid.innerHTML = '';

    if (list.length === 0) {
      emptyState?.classList.remove('hidden');
      return;
    }

    emptyState?.classList.add('hidden');

    list.forEach(novel => {
      const card = document.createElement('div');
      card.className = 'novel-poster-card group';
      card.onclick = () => openCinemaNovel(novel.id);

      // Иконки платформ
      const platformBadge = (novel.platforms || []).includes('android') && (novel.platforms || []).includes('pc')
        ? 'PC / Android'
        : (novel.platforms || []).includes('android') ? 'Android' : 'PC';

      const mainGenre = Array.isArray(novel.genres) && novel.genres.length > 0 
        ? novel.genres[0] 
        : 'Новелла';

      card.innerHTML = `
        <!-- Вертикальный контейнер постера 2:3 -->
        <div class="novel-poster-box">
          <img src="${novel.cover}" alt="${novel.title}" loading="lazy" />
          
          <!-- Градиент затемнения снизу -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

          <!-- Верхние бейджи -->
          <div class="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
            <span class="px-2 py-0.5 rounded-lg bg-black/75 backdrop-blur-md text-[10px] font-extrabold text-slate-300 border border-white/10">
              ${platformBadge}
            </span>
            <span class="px-2 py-0.5 rounded-lg bg-emerald-500/20 backdrop-blur-md text-[10px] font-extrabold text-emerald-400 border border-emerald-500/30">
              0 угроз
            </span>
          </div>

          <!-- Нижняя инфо-плашка на постере -->
          <div class="absolute bottom-3 left-3 right-3 space-y-1">
            <span class="text-[10px] uppercase font-bold text-purple-400 tracking-wider block">
              ${mainGenre}
            </span>
            <h3 class="font-display font-extrabold text-sm text-white line-clamp-1 group-hover:text-purple-300 transition-colors">
              ${novel.title}
            </h3>
            <span class="text-[11px] text-slate-400 font-medium block">
              ${novel.size || 'Полная версия'}
            </span>
          </div>
        </div>
      `;

      novelsGrid.appendChild(card);
    });

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  // ------------------------------------------------------------------------
  // 7. ЛОГИКА ФИЛЬТРАЦИИ КАТАЛОГА
  // ------------------------------------------------------------------------
  function applyFilters() {
    if (typeof NOVELS_DATA === 'undefined') return;

    const filtered = NOVELS_DATA.filter(novel => {
      // Поиск по названию
      const matchesSearch = novel.title.toLowerCase().includes(searchQuery.toLowerCase());

      // Платформа
      const matchesPlatform = selectedPlatform === 'all' || 
        (Array.isArray(novel.platforms) && novel.platforms.includes(selectedPlatform));

      // Жанры (если выбраны жанры, новелла должна содержать хотя бы один из выбранных)
      const matchesGenres = selectedGenres.size === 0 || 
        (Array.isArray(novel.genres) && novel.genres.some(g => selectedGenres.has(g)));

      return matchesSearch && matchesPlatform && matchesGenres;
    });

    renderNovels(filtered);
  }


  // ------------------------------------------------------------------------
  // 8. ПОЛНОЭКРАННЫЙ СТРИМИНГОВЫЙ ПРОСМОТР НОВЕЛЛЫ (#novelCinemaView)
  // ------------------------------------------------------------------------
  const cinemaView = document.getElementById('novelCinemaView');
  const closeCinemaBtn = document.getElementById('closeCinemaBtn');
  const cinemaCover = document.getElementById('cinemaCover');
  const cinemaTitle = document.getElementById('cinemaTitle');
  const cinemaTags = document.getElementById('cinemaTags');
  const cinemaSizeBadge = document.getElementById('cinemaSizeBadge');
  const cinemaSize = document.getElementById('cinemaSize');
  const cinemaEngine = document.getElementById('cinemaEngine');
  const cinemaLang = document.getElementById('cinemaLang');
  const cinemaPlatform = document.getElementById('cinemaPlatform');
  const cinemaSecurityReport = document.getElementById('cinemaSecurityReport');
  const cinemaDescription = document.getElementById('cinemaDescription');
  const cinemaDownloadTg = document.getElementById('cinemaDownloadTg');
  const cinemaMirrorsContainer = document.getElementById('cinemaMirrorsContainer');

  // Глобальная функция открытия кино-просмотра новеллы
  window.openCinemaNovel = function(novelId) {
    if (typeof NOVELS_DATA === 'undefined' || !cinemaView) return;

    const novel = NOVELS_DATA.find(n => n.id === novelId);
    if (!novel) return;

    cinemaCover.src = novel.cover;
    cinemaTitle.textContent = novel.title;
    cinemaDescription.textContent = novel.description;

    cinemaSizeBadge.textContent = novel.size || 'Полная';
    cinemaSize.textContent = novel.size || '—';
    cinemaEngine.textContent = novel.engine || 'Ren\'Py';
    cinemaLang.textContent = novel.language || 'Русский';
    cinemaPlatform.textContent = (novel.platforms || []).map(p => p.toUpperCase()).join(' / ');

    cinemaSecurityReport.textContent = `${novel.safetyReport || 'Проверено на вирусы и малварь.'} Проверил: ${novel.testedBy || 'Anireil Team'} (${novel.testedDate || 'Недавно'}).`;

    // Теги жанров
    cinemaTags.innerHTML = (novel.genres || []).map(g => 
      `<span class="px-3 py-1 rounded-xl bg-white/[0.06] border border-white/10 text-xs font-bold text-slate-200">${g}</span>`
    ).join('');

    // Ссылка в Telegram
    cinemaDownloadTg.href = novel.downloads?.telegram || 'https://t.me/Anireil_Bot';

    // Зеркала для браузера (Mega / Google Drive)
    cinemaMirrorsContainer.innerHTML = '';
    if (novel.downloads?.mega) {
      cinemaMirrorsContainer.innerHTML += `
        <a href="${novel.downloads.mega}" target="_blank" class="btn-download-secondary flex-1 py-3 px-4 rounded-2xl text-xs font-bold text-center flex items-center justify-center gap-2">
          <i data-lucide="download-cloud" class="w-4 h-4 text-purple-400"></i>
          <span>Зеркало Mega</span>
        </a>
      `;
    }
    if (novel.downloads?.gdrive) {
      cinemaMirrorsContainer.innerHTML += `
        <a href="${novel.downloads.gdrive}" target="_blank" class="btn-download-secondary flex-1 py-3 px-4 rounded-2xl text-xs font-bold text-center flex items-center justify-center gap-2">
          <i data-lucide="hard-drive" class="w-4 h-4 text-cyan-400"></i>
          <span>Google Диск</span>
        </a>
      `;
    }

    // Открываем на весь экран
    cinemaView.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    cinemaView.scrollTo({ top: 0, behavior: 'auto' });

    if (window.lucide) {
      lucide.createIcons();
    }
  };

  function closeCinemaView() {
    if (!cinemaView) return;
    cinemaView.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }

  if (closeCinemaBtn) {
    closeCinemaBtn.addEventListener('click', closeCinemaView);
  }

  // Закрытие клавишей Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cinemaView && !cinemaView.classList.contains('hidden')) {
      closeCinemaView();
    }
  });


  // ------------------------------------------------------------------------
  // 9. СТАРТОВАЯ ИНИЦИАЛИЗАЦИЯ
  // ------------------------------------------------------------------------
  if (statTotalNovels && typeof NOVELS_DATA !== 'undefined') {
    statTotalNovels.textContent = NOVELS_DATA.length;
  }

  initGenreDropdown();

  if (typeof NOVELS_DATA !== 'undefined') {
    renderNovels(NOVELS_DATA);
  }

  // При первом запуске открываем вкладку "Главная"
  switchTab('home');
});