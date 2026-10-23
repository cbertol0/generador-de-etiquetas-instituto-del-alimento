// Importador del formulario PDF del Instituto del Alimento.
// Lee el folio de datos del rótulo y el folio de información nutricional
// (Modelo vertical A) y devuelve un producto por cada folio de datos.
// La parte de lectura (pdf.js) corre en el navegador; el análisis es
// independiente para poder probarlo fuera del sitio.

(function (root) {
  const LINE_TOLERANCE = 3;
  const SEGMENT_GAP = 14;
  const VALUE_COLUMN_MIN_X = 195;

  const DATA_LABELS = [
    ["sellos", /^sellos de advertencia/i],
    ["denominacion", /^denominaci[oó]n del producto/i],
    ["marca", /^marca\b/i],
    ["peso", /^peso\s*\/\s*volumen/i],
    ["leyenda", /^otra leyenda/i],
    ["elaborador", /^nombre y domicilio/i],
    ["origen", /^identificaci[oó]n del origen/i],
    ["fechas", /^fecha de elaboraci[oó]n y/i],
    ["conservacion", /^modo de conservaci[oó]n/i],
    ["ingredientes", /^lista de ingredientes/i],
    ["nutricional", /^informaci[oó]n nutricional$/i]
  ];

  const NUTRIENTS = [
    ["carbohidratos", /carbohidratos/i],
    ["azucares", /az[uú]cares totales/i],
    ["azucaresAnadidos", /az[uú]cares a[nñ]adidos/i],
    ["proteinas", /prote[ií]nas/i],
    ["grasasTotales", /grasas totales/i],
    ["grasasSaturadas", /grasas saturadas/i],
    ["grasasTrans", /grasas trans/i],
    ["fibra", /fibra alimentaria/i],
    ["sodio", /sodio/i]
  ];

  const clean = (text) => String(text || "").replace(/[\uE000-\uF8FF→]/g, " ").replace(/\s+/g, " ").trim();
  // Las flechas del formulario vienen como símbolos (Wingdings): no cuentan como texto.
  const hasText = (item) => clean(item.str) !== "";
  const toNumber = (text) => String(text || "").replace(/\s/g, "").replace(",", ".");

  // Agrupa los fragmentos de texto en renglones (por altura) y segmentos (por separación horizontal).
  function buildLines(items) {
    const sorted = items
      .filter(hasText)
      .sort((a, b) => b.y - a.y || a.x - b.x);
    const lines = [];
    sorted.forEach((item) => {
      let line = lines.find((candidate) => Math.abs(candidate.y - item.y) <= LINE_TOLERANCE);
      if (!line) {
        line = { y: item.y, items: [] };
        lines.push(line);
      }
      line.items.push(item);
    });
    lines.forEach((line) => {
      line.items.sort((a, b) => a.x - b.x);
      line.x = line.items[0].x;
      line.segments = [];
      line.items.forEach((item) => {
        const last = line.segments[line.segments.length - 1];
        if (last && item.x - last.end < SEGMENT_GAP) {
          last.text += (item.x - last.end > 1 ? " " : "") + item.str;
          last.end = item.x + item.w;
        } else {
          line.segments.push({ x: item.x, end: item.x + item.w, text: item.str });
        }
      });
      line.segments.forEach((segment) => { segment.text = clean(segment.text); });
      line.text = clean(line.segments.map((segment) => segment.text).join(" "));
    });
    return lines.sort((a, b) => b.y - a.y);
  }

  function pageText(page) {
    return buildLines(page.items).map((line) => line.text).join("\n");
  }

  function classifyPage(page) {
    const text = pageText(page);
    const folioMatch = text.match(/FOLIO\s*(\d+)/i);
    const folio = folioMatch ? Number(folioMatch[1]) : null;
    if (/obligatoriamente debe figurar/i.test(text) || /denominaci[oó]n del producto/i.test(text)) {
      return { type: "data", folio };
    }
    if (/modelo vertical|valor energ[eé]tico/i.test(text)) {
      return { type: "nutrition", folio };
    }
    return { type: "other", folio };
  }

  // ---------- Folio de datos ----------

  function dataBlocks(page) {
    const lines = buildLines(page.items);
    const labelItems = page.items.filter((item) => item.x < VALUE_COLUMN_MIN_X && hasText(item));
    const anchors = [];
    DATA_LABELS.forEach(([key, pattern]) => {
      const item = labelItems.find((candidate) => pattern.test(clean(candidate.str)));
      if (item) anchors.push({ key, y: item.y });
    });
    anchors.sort((a, b) => b.y - a.y);

    const valueLines = lines
      .map((line) => ({
        y: line.y,
        segments: line.segments.filter((segment) => segment.x >= VALUE_COLUMN_MIN_X)
      }))
      .filter((line) => line.segments.length);

    const blocks = {};
    anchors.forEach((anchor, index) => {
      const top = anchor.y + 8;
      const bottom = index + 1 < anchors.length ? anchors[index + 1].y + 5 : -Infinity;
      blocks[anchor.key] = valueLines.filter((line) => line.y <= top && line.y > bottom);
    });
    return blocks;
  }

  const blockText = (block) => clean((block || []).map((line) => line.segments.map((s) => s.text).join(" ")).join(" "));
  const blockSegments = (block) => (block || []).flatMap((line) => line.segments.map((segment) => clean(segment.text)));

  function afterLabel(segments, pattern) {
    const index = segments.findIndex((segment) => pattern.test(segment));
    if (index < 0) return "";
    const own = clean(segments[index].replace(pattern, ""));
    if (own) return own;
    return segments[index + 1] || "";
  }

  function parseDate(text) {
    const match = String(text || "").match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    if (!match) return "";
    return `${match[1].padStart(2, "0")}/${match[2].padStart(2, "0")}/${match[3]}`;
  }

  function splitAllergens(ingredients) {
    const text = clean(ingredients).replace(/^ingredientes\s*:\s*/i, "");
    const match = text.match(/\b(PUEDE CONTENER|CONTIENE)\b[\s\S]*$/);
    if (!match) return { ingredientes: text, alergenos: "" };
    return {
      ingredientes: clean(text.slice(0, match.index)),
      alergenos: clean(match[0]).toUpperCase()
    };
  }

  function parseDataPage(page) {
    const blocks = dataBlocks(page);
    const fields = {};
    const warnings = [];

    fields.producto = blockText(blocks.denominacion);
    fields.marca = blockText(blocks.marca);

    const peso = blockText(blocks.peso).match(/([\d.,]+)\s*(kg|g|ml|cc|cm3|l)\b/i);
    if (peso) {
      fields.pesoValor = toNumber(peso[1]);
      const unit = peso[2].toLowerCase();
      fields.pesoUnidad = unit === "cc" || unit === "cm3" ? "ml" : unit;
    } else {
      warnings.push("peso neto");
    }

    const tenor = blockText(blocks.leyenda).match(/tenor graso\s*:?\s*([\d.,]+)\s*%/i);
    fields.tenorValor = tenor ? toNumber(tenor[1]) : "";

    const makerSegments = blockSegments(blocks.elaborador);
    fields.elaboradoPor = afterLabel(makerSegments, /^elaborado y envasado por\s*:?/i);
    fields.domicilio = clean(afterLabel(makerSegments, /^direcci[oó]n\s*:?/i)).replace(/\.$/, "");

    const originSegments = blockSegments(blocks.origen);
    fields.industria = originSegments.find((segment) => /industria|origen|elaborado en/i.test(segment) && !/GIP/i.test(segment)) || "";
    fields.venta = originSegments.find((segment) => /venta/i.test(segment)) || "";
    const gipText = afterLabel(originSegments, /^N\s*[°º.o]*\s*DE\s*GIP\s*:?/i) || blockText(blocks.origen);
    const gip = gipText.match(/(\d{3,4})\s*\/\s*(\d{4})\s*-?\s*(\d{1,2})?/);
    if (gip) {
      fields.gipBase = `${gip[1].padStart(4, "0")}/${gip[2]}`;
      fields.gipSufijo = gip[3] ? gip[3].padStart(2, "0") : "";
    } else {
      warnings.push("N.º de GIP");
    }

    const dateSegments = blockSegments(blocks.fechas);
    fields.fechaElaboracion = parseDate(afterLabel(dateSegments, /^fecha de elaboraci[oó]n\s*:?/i));
    fields.fechaVencimiento = parseDate(afterLabel(dateSegments, /^fecha de vencimiento\s*:?/i));

    fields.conservacion = blockText(blocks.conservacion);
    Object.assign(fields, splitAllergens(blockText(blocks.ingredientes)));

    ["producto", "marca", "elaboradoPor", "domicilio", "conservacion", "ingredientes"].forEach((key) => {
      if (!fields[key]) warnings.push(key);
    });
    if (!fields.alergenos) warnings.push("alérgenos");
    return { fields, warnings };
  }

  // ---------- Folio nutricional ----------

  function nutritionLines(page) {
    const lines = buildLines(page.items);
    const startIndex = lines.findIndex((line) => /modelo vertical a/i.test(line.text));
    const endIndex = lines.findIndex((line, index) => index > startIndex && /modelo vertical b|modelo lineal/i.test(line.text));
    const from = startIndex >= 0 ? startIndex : 0;
    const to = endIndex >= 0 ? endIndex : lines.length;
    return lines.slice(from, to).map((line) => line.text);
  }

  function linearText(page) {
    const lines = buildLines(page.items).map((line) => line.text);
    const start = lines.findIndex((line) => /informaci[oó]n nutricional\s*:/i.test(line));
    return start >= 0 ? clean(lines.slice(start, start + 6).join(" ")) : "";
  }

  const NUM = "(\\d+(?:[.,]\\d+)?)";
  const VD = "(\\d+(?:[.,]\\d+)?|-|–)";

  function setVd(fields, key, raw) {
    if (raw === undefined || raw === "" || raw === "-" || raw === "–") {
      fields[`${key}VdValor`] = "";
      fields[`${key}VdDash`] = true;
    } else {
      fields[`${key}VdValor`] = toNumber(raw);
      fields[`${key}VdDash`] = false;
    }
  }

  function parseNutritionPage(page) {
    const fields = {};
    const found = new Set();
    const lines = nutritionLines(page);

    const portionLine = lines.find((line) => /^porci[oó]n\b/i.test(line));
    if (portionLine) {
      fields.porcion = clean(portionLine.replace(/^porci[oó]n\s*:?/i, ""))
        .replace(/(\d)\s*(g|ml)\b/i, "$1 $2")
        .replace(/\(\s*/g, "(")
        .replace(/\s*\)/g, ")");
    }

    const energyRe = new RegExp(`valor energ[eé]tico\\s*${NUM}\\s*kcal\\s*=?\\s*${NUM}\\s*kj\\s*${VD}?`, "i");
    const energyLine = lines.find((line) => energyRe.test(line));
    if (energyLine) {
      const match = energyLine.match(energyRe);
      fields.energiaKcal = toNumber(match[1]);
      fields.energiaKj = toNumber(match[2]);
      setVd(fields, "energia", match[3]);
      found.add("energia");
    }

    NUTRIENTS.forEach(([key, pattern]) => {
      const rowRe = new RegExp(`^${pattern.source}\\s*${NUM}\\s*(?:mg|g)\\s*${VD}?\\s*$`, "i");
      const line = lines.find((candidate) => rowRe.test(candidate));
      if (!line) return;
      const match = line.match(rowRe);
      fields[`${key}Valor`] = toNumber(match[1]);
      setVd(fields, key, match[2]);
      found.add(key);
    });

    // Respaldo: modelo lineal, sólo para lo que no apareció en el modelo vertical A.
    const linear = linearText(page);
    if (linear) {
      if (!found.has("energia")) {
        const match = linear.match(new RegExp(`valor energ[eé]tico\\s*${NUM}\\s*kcal\\s*=\\s*${NUM}\\s*kj\\s*(?:\\(\\s*${NUM}\\s*%\\s*VD)?`, "i"));
        if (match) {
          fields.energiaKcal = toNumber(match[1]);
          fields.energiaKj = toNumber(match[2]);
          setVd(fields, "energia", match[3]);
          found.add("energia");
        }
      }
      NUTRIENTS.forEach(([key, pattern]) => {
        if (found.has(key)) return;
        const match = linear.match(new RegExp(`${pattern.source}\\s*${NUM}\\s*(?:mg|g)\\s*;?\\s*(?:\\(\\s*${NUM}\\s*%\\s*VD)?`, "i"));
        if (!match) return;
        fields[`${key}Valor`] = toNumber(match[1]);
        setVd(fields, key, match[2]);
        found.add(key);
      });
    }

    const missing = ["energia", ...NUTRIENTS.map(([key]) => key)].filter((key) => !found.has(key));
    return { fields, missing };
  }

  // ---------- Armado de productos ----------

  function parsePages(pages) {
    const classified = pages.map((page, index) => ({ ...page, index, ...classifyPage(page) }));
    const dataPages = classified.filter((page) => page.type === "data");
    const nutritionPages = classified.filter((page) => page.type === "nutrition");
    const used = new Set();

    const pickNutrition = (dataPage) => {
      const sameFile = nutritionPages.filter((page) => page.file === dataPage.file && !used.has(page));
      const byFolio = dataPage.folio != null
        ? sameFile.find((page) => page.folio === dataPage.folio + 1)
        : null;
      const choice = byFolio || sameFile[0] || nutritionPages.find((page) => !used.has(page)) || null;
      if (choice) used.add(choice);
      return choice;
    };

    const ordered = [...dataPages].sort((a, b) => a.file - b.file || (a.folio ?? a.index) - (b.folio ?? b.index));
    return ordered.map((dataPage) => {
      const data = parseDataPage(dataPage);
      const nutritionPage = pickNutrition(dataPage);
      const nutrition = nutritionPage ? parseNutritionPage(nutritionPage) : { fields: {}, missing: ["toda la tabla nutricional"] };
      return {
        fields: { ...data.fields, ...nutrition.fields },
        warnings: [...data.warnings, ...nutrition.missing.map((key) => `tabla nutricional: ${key}`)],
        fileName: dataPage.fileName || "",
        folio: dataPage.folio
      };
    });
  }

  // ---------- Lectura con pdf.js (navegador) ----------

  const PDFJS_BASE = "assets/vendor/pdfjs/";
  let pdfjsPromise = null;

  function loadPdfJs() {
    if (root.pdfjsLib) return Promise.resolve(root.pdfjsLib);
    if (!pdfjsPromise) {
      pdfjsPromise = new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = `${PDFJS_BASE}pdf.min.js`;
        script.onload = () => {
          root.pdfjsLib.GlobalWorkerOptions.workerSrc = `${PDFJS_BASE}pdf.worker.min.js`;
          resolve(root.pdfjsLib);
        };
        script.onerror = () => {
          pdfjsPromise = null;
          reject(new Error("No se pudo cargar el lector de PDF."));
        };
        document.head.appendChild(script);
      });
    }
    return pdfjsPromise;
  }

  async function readPdfPages(file, fileIndex) {
    const pdfjs = await loadPdfJs();
    const data = new Uint8Array(await file.arrayBuffer());
    const doc = await pdfjs.getDocument({ data }).promise;
    const pages = [];
    for (let number = 1; number <= doc.numPages; number += 1) {
      const page = await doc.getPage(number);
      const content = await page.getTextContent();
      pages.push({
        file: fileIndex,
        fileName: file.name,
        items: content.items.map((item) => ({
          x: item.transform[4],
          y: item.transform[5],
          w: item.width,
          str: item.str
        }))
      });
    }
    return pages;
  }

  async function importPdfFiles(files) {
    const pages = [];
    for (let index = 0; index < files.length; index += 1) {
      pages.push(...await readPdfPages(files[index], index));
    }
    return parsePages(pages);
  }

  const api = { parsePages, importPdfFiles };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.ImportadorPdf = api;
})(typeof window !== "undefined" ? window : globalThis);
