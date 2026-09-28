const measurementId = 'G-P4BTY3WB2V';

if (/^G-[A-Z0-9]+$/.test(measurementId)) {
  const consentKey = 'az-modestsoft-website-analytics';
  let choice;
  try {
    choice = localStorage.getItem(consentKey);
  } catch {
    choice = null;
  }

  const banner = document.createElement('div');
  banner.className = 'analytics-banner';
  banner.setAttribute('role', 'region');
  banner.setAttribute('aria-label', 'Website analytics choice');
  banner.innerHTML = '<p>May we use Google Analytics to understand visits to this website? It uses cookies after you accept. <a href="privacy.html#website-analytics">Learn more</a>.</p><div class="analytics-actions"><button type="button" data-choice="declined">Decline</button><button type="button" data-choice="accepted">Accept analytics</button></div>';

  const settings = document.createElement('button');
  settings.className = 'analytics-settings';
  settings.type = 'button';
  settings.textContent = 'Analytics settings';
  document.querySelector('.site-footer nav')?.append(settings);

  const showBanner = () => {
    document.body.append(banner);
    banner.querySelector('button')?.focus();
  };

  let loaded = false;
  const loadAnalytics = () => {
    if (loaded) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
    gtag('consent', 'update', { analytics_storage: 'granted' });
    gtag('js', new Date());
    gtag('config', measurementId, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.append(script);
  };

  banner.addEventListener('click', (event) => {
    const selected = event.target.closest('button[data-choice]')?.dataset.choice;
    if (!selected) return;
    try {
      localStorage.setItem(consentKey, selected);
    } catch {
      // A private browser mode can block storage; the choice still applies now.
    }
    banner.remove();
    if (selected === 'accepted') {
      loadAnalytics();
    } else if (loaded) {
      window[`ga-disable-${measurementId}`] = true;
      location.reload();
    }
  });

  settings.addEventListener('click', showBanner);
  if (choice === 'accepted') loadAnalytics();
  else if (choice !== 'declined') showBanner();
}
