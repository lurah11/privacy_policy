const measurementId = 'G-P4BTY3WB2V';

if (/^G-[A-Z0-9]+$/.test(measurementId)) {
  const consentKey = 'az-modestsoft-website-analytics';
  let choice;
  try {
    choice = localStorage.getItem(consentKey);
  } catch {
    choice = null;
  }

  const dialog = document.createElement('dialog');
  dialog.className = 'analytics-dialog';
  dialog.setAttribute('aria-labelledby', 'analytics-title');
  dialog.setAttribute('aria-describedby', 'analytics-description');
  dialog.innerHTML = '<p class="analytics-label">Your privacy</p><h2 id="analytics-title">Can we use analytics?</h2><p id="analytics-description">Google Analytics helps us understand which pages people visit. It uses cookies only after you accept. You can change your choice at any time. <a href="privacy.html#website-analytics">Read our privacy policy</a>.</p><div class="analytics-actions"><button type="button" data-choice="declined" autofocus>Decline</button><button type="button" data-choice="accepted">Accept analytics</button></div>';
  document.body.append(dialog);

  const settings = document.createElement('button');
  settings.className = 'analytics-settings';
  settings.type = 'button';
  settings.textContent = 'Analytics settings';
  document.querySelector('.site-footer nav')?.append(settings);

  const showDialog = () => {
    if (!dialog.open) dialog.showModal();
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

  dialog.addEventListener('click', (event) => {
    const selected = event.target.closest('button[data-choice]')?.dataset.choice;
    if (!selected) return;
    try {
      localStorage.setItem(consentKey, selected);
    } catch {
      // A private browser mode can block storage; the choice still applies now.
    }
    dialog.close();
    if (selected === 'accepted') {
      loadAnalytics();
    } else if (loaded) {
      window[`ga-disable-${measurementId}`] = true;
      location.reload();
    }
  });

  settings.addEventListener('click', showDialog);
  if (choice === 'accepted') loadAnalytics();
  else if (choice !== 'declined') showDialog();
}
