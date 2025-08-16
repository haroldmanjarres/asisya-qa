# Frontend – Playwright

## Requisitos
- Node.js 18+
- Navegadores Playwright: `npx playwright install --with-deps`

## Variables de entorno
- `BASE_URL` (ej. `https://tu-app.com`)
- `TEST_EMAIL`, `TEST_PASSWORD`
- `TEST_PLACA` (por defecto `ABC123`)

## Ejecutar
```bash
npm ci
npx playwright install --with-deps
npm test
npm run report

---

## 3) API – Postman + Newman

### 3.1 Colección `api/collections/asisya.postman_collection.json`
```json
{
  "info": {
    "name": "Asisya API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "POST /api/asisya/solicitud-asistencia",
      "request": {
        "method": "POST",
        "header": [
          { "key": "Content-Type", "value": "application/json" }
        ],
        "url": {
          "raw": "{{baseUrl}}/api/asisya/solicitud-asistencia",
          "host": ["{{baseUrl}}"],
          "path": ["api", "asisya", "solicitud-asistencia"]
        },
        "body": {
          "mode": "raw",
          "raw": "{\n  \"tipoAsistencia\": \"GRUA\",\n  \"ubicacion\": { \"lat\": 4.60971, \"lng\": -74.08175 },\n  \"placa\": \"{{placa}}\"\n}"
        }
      },
      "event": [
        {
          "listen": "test",
          "script": {
            "exec": [
              "pm.test('HTTP 200', function () { pm.response.to.have.status(200); });",
              "pm.test('Tiempo de respuesta < 2000ms', function () { pm.expect(pm.response.responseTime).to.be.below(2000); });",
              "pm.test('Respuesta JSON válida', function () { pm.response.to.be.json; });",
              "const json = pm.response.json();",
              "pm.test('Campos obligatorios presentes', function () {\n  pm.expect(json).to.have.property('casoId');\n  pm.expect(json).to.have.property('estado');\n  pm.expect(json.estado).to.match(/(SOLICITADA|ASIGNADA|EN_CAMINO|COMPLETADA)/);\n});",
              "pm.test('Schema básico', function () {\n  const required = ['casoId','estado','timestamp'];\n  required.forEach(k => pm.expect(json).to.have.property(k));\n});"
            ],
            "type": "text/javascript"
          }
        }
      ]
    },
    {
      "name": "GET /api/asisya/seguimiento/:casoId (opcional)",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "{{baseUrl}}/api/asisya/seguimiento/{{casoId}}",
          "host": ["{{baseUrl}}"],
          "path": ["api", "asisya", "seguimiento", "{{casoId}}"]
        }
      },
      "event": [
        {
          "listen": "test",
          "script": {
            "exec": [
              "pm.test('HTTP 200', function () { pm.response.to.have.status(200); });",
              "pm.test('Respuesta JSON válida', function () { pm.response.to.be.json; });",
              "const json = pm.response.json();",
              "pm.test('Incluye estado y datos del profesional', function () {\n  pm.expect(json).to.have.property('estado');\n  pm.expect(json).to.have.property('profesional');\n  pm.expect(json.profesional).to.have.property('nombre');\n  pm.expect(json.profesional).to.have.property('telefono');\n});"
            ],
            "type": "text/javascript"
          }
        }
      ]
    }
  ]
}