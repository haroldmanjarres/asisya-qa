import { expect } from '@playwright/test';
import { test } from './fixtures';

/**
 * Cobertura requerida:
 * 1) Ingreso al módulo “Mi Asistencia”
 * 2) Visualización de estado de asistencia en tiempo real
 * 3) Validación de datos del profesional asignado
 * 4) Uso de fixtures, auto-wait y grabación de video (config)
 */

test.describe('Asisya - Mi Asistencia (móvil)', () => {
  test.beforeEach(async ({ page }, { credentials }) => {
    await page.goto('/login');
    await page.getByTestId('login-email').fill(credentials.email);
    await page.getByTestId('login-password').fill(credentials.password);
    await page.getByTestId('login-submit').click();
    await expect(page.getByTestId('navbar-mi-asistencia')).toBeVisible();
  });

  test('Ingreso al módulo "Mi Asistencia"', async ({ page }) => {
    await page.getByTestId('navbar-mi-asistencia').click();
    await expect(page).toHaveURL(/.*mi-asistencia/);
    await expect(page.getByRole('heading', { name: 'Mi Asistencia' })).toBeVisible();
  });

  test('Estado en tiempo real y datos del profesional', async ({ page }) => {
    // Entrar a Mi Asistencia
    await page.getByTestId('navbar-mi-asistencia').click();

    // Auto-wait: espera a que cargue la tarjeta de la asistencia activa
    const card = page.getByTestId('asistencia-activa-card');
    await expect(card).toBeVisible();

    // Estado en tiempo real: validamos que haya un indicador o badge
    const estado = card.getByTestId('estado-badge');
    await expect(estado).toBeVisible();
    await expect(estado).toHaveText(/(Solicitada|Asignada|En camino|Completada)/);

    // Validación de datos del profesional asignado
    const pro = card.getByTestId('profesional-asignado');
    await expect(pro).toBeVisible();
    await expect(pro.getByTestId('pro-nombre')).not.toHaveText('');
    await expect(pro.getByTestId('pro-placa')).not.toHaveText('');
    await expect(pro.getByTestId('pro-telefono')).toHaveText(/\+?\d{7,}/);

    // Opcional: mapa o ETA
    const eta = card.getByTestId('eta-minutos');
    if (await eta.isVisible()) {
      await expect(eta).toHaveText(/\d+ min/);
    }
  });

  test('Flujo breve: crear solicitud y confirmar recepción', async ({ page }, { placa }) => {
    await page.getByTestId('navbar-solicitar').click();
    await expect(page).toHaveURL(/.*solicitar/);

    await page.getByTestId('assist-type-select').click();
    await page.getByRole('option', { name: 'Grúa' }).click();

    // Ubicación: permitir o usar ubicación mock
    const ubicacionBtn = page.getByTestId('usar-ubicacion-actual');
    if (await ubicacionBtn.isVisible()) await ubicacionBtn.click();

    await page.getByTestId('input-placa').fill(placa);
    await page.getByTestId('btn-enviar-solicitud').click();

    // Confirmación inmediata
    const toast = page.getByTestId('toast-confirmacion');
    await expect(toast).toBeVisible();
    await expect(toast).toHaveText(/Solicitud recibida|Caso #/);
  });
});