# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

---

## Cómo Publicar en Internet (Gratis)

Esta guía te llevará paso a paso para publicar tu aplicación usando GitHub y Cloudflare. Esta es una configuración que solo se hace una vez. Después, tu app se actualizará automáticamente cuando subas nuevo código.

**Necesitarás:**
*   Una cuenta de GitHub.
*   Una cuenta de Cloudflare.
*   Node.js y Git instalados en tu ordenador.

### Paso 1: Obtén el Código en tu Ordenador

Necesitas descargar todos los archivos del proyecto de este espacio de trabajo a una carpeta en tu ordenador. **No descargues la carpeta `node_modules`.**

### Paso 2: Configura tu Proyecto Localmente

Abre una terminal o consola de comandos en tu ordenador y navega hasta la carpeta de tu proyecto.

1.  **Instala las dependencias:** Esto descarga todos los paquetes necesarios para que la aplicación funcione.
    ```bash
    npm install
    ```

### Paso 3: Crea un Repositorio en GitHub

1.  Ve a [GitHub](https://github.com) y crea un **repositorio nuevo y vacío**. No añadas un archivo `README` o `.gitignore` desde la interfaz de GitHub.
2.  Dale un nombre (por ejemplo, `app-alergia`).

### Paso 4: Sube tu Código a GitHub

En tu terminal (aún dentro de la carpeta de tu proyecto), ejecuta estos comandos uno por uno.

1.  **Inicializa Git y crea la rama 'main':**
    ```bash
    git init -b main
    ```

2.  **Añade todos tus archivos:**
    ```bash
    git add .
    ```

3.  **Crea una "foto" de tu código:**
    ```bash
    git commit -m "Versión inicial del proyecto"
    ```

4.  **Conecta tu carpeta local con el repositorio de GitHub:**
    *(Reemplaza la URL con la URL de tu propio repositorio)*
    ```bash
    git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
    ```

5.  **Sube tu código a GitHub:**
    ```bash
    git push -u origin main
    ```
    Ahora todo tu código está guardado de forma segura en GitHub.

### Paso 5: Despliega con Cloudflare Pages

1.  Inicia sesión en tu [panel de control de Cloudflare](https://dash.cloudflare.com).
2.  En la barra lateral izquierda, ve a **Workers & Pages**.
3.  Haz clic en **Crear aplicación** > **Pages** > **Conectar a Git**.
4.  Selecciona el repositorio de GitHub que acabas de crear.
5.  En la sección "Configurar compilaciones e implementaciones", verifica la configuración (Cloudflare debería detectarlo como una app de Next.js):
    *   **Framework preset:** `Next.js`
    *   **Comando de compilación:** `npm run build`
    *   **Directorio de salida:** `out`
6.  Haz clic en **Guardar e Implementar**.

Cloudflare ahora compilará y desplegará tu sitio. Una vez que termine, te dará una URL pública (como `tu-repo.pages.dev`).

### Paso 6: Futuras Actualizaciones (La Parte Fácil)

De ahora en adelante, cada vez que hagas cambios en tu proyecto y quieras actualizar el sitio web en vivo, solo necesitas ejecutar estos tres comandos en tu terminal:

```bash
# 1. Añade tus cambios
git add .

# 2. Crea una nueva "foto"
git commit -m "Describe tus cambios aquí"

# 3. Sube a GitHub
git push origin main
```

Cloudflare detectará automáticamente la subida y volverá a desplegar tu sitio con los últimos cambios.