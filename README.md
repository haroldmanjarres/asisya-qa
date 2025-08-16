asisya-qa – Automatización QA

Repositorio con la solución de la Prueba Técnica QA – Asisya, organizado en dos componentes principales:

Frontend** con Playwright.
API** con Postman/Newman.

---

Estructura del proyecto

```
asisya-qa/
├─ frontend/              # Playwright (UI)
│  ├─ tests/ (asistencia.spec.ts, fixtures.ts)
│  ├─ package.json
│  ├─ playwright.config.ts
│  └─ README.md
├─ api/                   # Postman/Newman (API)
│  ├─ collections/ (asisya.postman_collection.json)
│  ├─ env/ (local.postman_environment.json)
│  ├─ scripts/ (run-newman.sh)
│  └─ README.md
└─ .gitignore
```

---

Instrucciones de ejecución

1. Clonar repositorio

```bash
git clone https://github.com/TU_USUARIO/asisya-qa.git
cd asisya-qa
```

2. Frontend – Playwright

1. Moverse a la carpeta frontend:

   ```bash
   cd frontend
   ```
2. Instalar dependencias:

   ```bash
   npm install
   npx playwright install --with-deps
   ```
3. Ejecutar pruebas:

   ```bash
   npm test
   npm run report   # abre el reporte HTML
   ```

3. API – Postman/Newman

1. Moverse a la carpeta API:

   ```bash
   cd ../api
   ```
2. Ejecutar colección con Newman:

   ```bash
   bash scripts/run-newman.sh
   ```
3. Ver reporte en `api/newman-report.html`.

---

Variables de entorno

* `BASE_URL` (ej. `https://app.asisya.local`)
* `TEST_EMAIL`, `TEST_PASSWORD`
* `TEST_PLACA` (ej. `ABC123`)

---

Tecnologías usadas

Playwright para automatización UI.
Postman/Newman para pruebas de API.
Node.js como runtime de pruebas.

---

Notas técnicas

* Uso de `data-testid` para selectores estables.
* Fixtures para credenciales y datos dinámicos.
* Auto-wait de Playwright (sin `waitForTimeout`).
* Grabación de video y reporte HTML en ejecución de tests.
* Comentarios técnicos en los archivos de prueba.

---

✅ Con este README podrás subir el repositorio a GitHub y documentar claramente cómo ejecutar las pruebas de los dos componentes.
