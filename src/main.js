export function getJwtPayload(token) {
  try {
    // 1. Obtener la segunda parte del token (payload)
    const base64Url = token.split('.')[1];
    // 2. Reemplazar caracteres especiales de Base64URL a Base64
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    // 3. Decodificar y convertir a JSON
    return JSON.parse(window.atob(base64));
  } catch (e) {
    console.error("Error al decodificar el token", e);
    return null;
  }
}

export function getUserNameFromToken(token) {
  const payload = getJwtPayload(token);

  if (!payload) return null;

  try {
    return {
      display_name: payload.user_metadata?.display_name || null,
    };
  } catch (error) {
    console.error("Error al extraer datos del usuario", error);
    return null;
  }
}