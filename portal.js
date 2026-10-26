(() => {
  'use strict';
  const target = String(window.CURSO_CONFIG?.appsScriptExec ?? '').trim();
  const valid = /^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec(?:\?.*)?$/.test(target);
  if (!valid) { document.getElementById('setup').hidden = false; return; }
  const url = new URL(target);
  const params = new URLSearchParams(location.search);
  // NUNCA permitimos enrutar el admin desde la pagina publica de GitHub.
  // Este puente solo entrega a Apps Script acciones publicas de activacion.
  const accion = params.get('accion') || '';
  const token = params.get('token') || '';
  if (['activar','verificar','reset'].includes(accion) && /^[A-Za-z0-9_-]{42,44}$/.test(token)) {
    url.searchParams.set('accion', accion);
    url.searchParams.set('token', token);
    // Evita que una URL de invitacion permanezca visible en la barra del navegador.
    history.replaceState(null, '', location.pathname + location.hash);
  }
  const iframe = document.getElementById('studentFrame');
  const fallback = document.getElementById('fallback');
  iframe.src = url.toString();
  document.getElementById('framebox').hidden = false;
  fallback.href = url.toString();
  fallback.hidden = false;
})();
