# Portfolio de Miquel Molina Pedrero

Web estàtica (HTML, CSS i JavaScript, sense compilar). Idiomes: català, castellà i anglès.
Basada en l'estructura de https://paulareixach.github.io/ amb contingut, paleta (blanc i cian) i idiomes propis.

## Publicar-la a GitHub Pages
1. Crea un repositori públic a GitHub anomenat exactament `miquel-molina.github.io`.
2. Puja tot el contingut d'aquesta carpeta (`docs/`, `README.md`).
3. A Settings → Pages: Source = "Deploy from a branch", branch `main`, carpeta `/docs`.
4. En un parell de minuts estarà a https://miquel-molina.github.io/

## Què falta per posar (busca TODO a `docs/assets/js/content.js`)
- **Foto**: desa-la a `docs/assets/img/` i canvia `profile.photo`. Ara hi ha un placeholder amb "MM".
- **CV en PDF**: puja'l a `docs/assets/cv/` i posa la ruta a `profile.cv` (ca / es / en). Mentre sigui `null`, el botó no es mostra.
- Captures dels projectes (opcional): a `docs/assets/img/projects/` i `cover` / `gallery` de cada projecte.

## Editar el contingut
Tot és a `docs/assets/js/content.js`. Cada text és `{ ca: "...", es: "...", en: "..." }`.
Si la web queda en blanc després d'editar, gairebé sempre és una coma o unes cometes que falten.
`?lang=ca|es|en` i `?theme=light|dark` a la URL forcen idioma i tema.
