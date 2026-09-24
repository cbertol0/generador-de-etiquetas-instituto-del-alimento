const defaults = {
  labelTemplate: "",
  octagonMode: "provisorio",
  productSurface: "",
  marca: "ALGO DULCE",
  rubro: "REPOSTERÍA",
  producto: "Alfajor relleno de dulce de leche con baño de producto de repostería semiamargo",
  pesoValor: "120",
  pesoUnidad: "g",
  tenorValor: "23",
  industria: "INDUSTRIA ARGENTINA",
  instagram: "@algodulce.2431",
  facebook: "",
  porcion: "50 g (1 unidad)",
  porciones: "1",
  energiaKcal: "233",
  energiaKj: "976",
  energiaVdValor: "12",
  energiaVdDash: false,
  carbohidratosValor: "31",
  carbohidratosVdValor: "10",
  carbohidratosVdDash: false,
  azucaresValor: "15",
  azucaresVdValor: "",
  azucaresVdDash: true,
  azucaresAnadidosValor: "15",
  azucaresAnadidosVdValor: "",
  azucaresAnadidosVdDash: true,
  proteinasValor: "3.7",
  proteinasVdValor: "5",
  proteinasVdDash: false,
  grasasTotalesValor: "10",
  grasasTotalesVdValor: "18",
  grasasTotalesVdDash: false,
  grasasSaturadasValor: "5.4",
  grasasSaturadasVdValor: "25",
  grasasSaturadasVdDash: false,
  grasasTransValor: "0",
  grasasTransVdValor: "",
  grasasTransVdDash: true,
  fibraValor: "0.5",
  fibraVdValor: "2",
  fibraVdDash: false,
  sodioValor: "120",
  sodioVdValor: "5",
  sodioVdDash: false,
  ingredientes: "Harina de trigo 0000 enriquecida según Ley 25630 (hierro: 30 mg/kg, ácido fólico: 2,2 mg/kg, tiamina (B1): 6,3 mg/kg, riboflavina (B2): 1,3 mg/kg, niacina: 13 mg/kg), manteca, azúcar rubio, avena, huevo, azúcar, almidón de maíz, bicarbonato de sodio, sal, canela molida.",
  alergenos: "CONTIENE AVENA, HUEVO, SULFITOS Y DERIVADOS DE TRIGO Y LECHE.",
  elaboradoPor: "Nombre del elaborador",
  domicilio: "Calle 1234 - Rosario - Santa Fe",
  gip: "1267/2025-01",
  conservacion: "Conservar en lugar fresco y seco",
  fechaElaboracion: "",
  fechaVencimiento: "",
  venta: "VENTA EXCLUSIVA EN ROSARIO",
  excesoAzucares: true,
  excesoGrasasTotales: true,
  excesoGrasasSaturadas: true,
  excesoCalorias: true,
  excesoSodio: false
};

const nutritionLabels = [
  ["energia", "energiaVd", "Valor energético"],
  ["carbohidratos", "carbohidratosVd", "Carbohidratos"],
  ["azucares", "azucaresVd", "Azúcares totales"],
  ["azucaresAnadidos", "azucaresAnadidosVd", "Azúcares añadidos"],
  ["proteinas", "proteinasVd", "Proteínas"],
  ["grasasTotales", "grasasTotalesVd", "Grasas totales"],
  ["grasasSaturadas", "grasasSaturadasVd", "Grasas saturadas"],
  ["grasasTrans", "grasasTransVd", "Grasas trans"],
  ["fibra", "fibraVd", "Fibra alimentaria"],
  ["sodio", "sodioVd", "Sodio"]
];

const sealLabels = [
  ["excesoAzucares", "Exceso en azúcares", "octogono-excesoenazucares.png"],
  ["excesoGrasasTotales", "Exceso en grasas totales", "octogono-excesoengrasastotales.png"],
  ["excesoGrasasSaturadas", "Exceso en grasas saturadas", "octogono-excesoengrasassaturadas.png"],
  ["excesoSodio", "Exceso en sodio", "octogono-excesoensodio.png"],
  ["excesoCalorias", "Exceso en calorías", "octogono-excesoencalorias.png"]
];

const labelTemplates = {
  frasco: {
    hint: "Frascos · 6 × 7 cm",
    widthCm: 6,
    heightCm: 7,
    provisionalOctagonCm: 0.78,
    logoMax: 0.42,
    logoMin: 0.22,
    productMax: 0.24,
    productMin: 0.16
  },
  panificacionOtros: {
    hint: "Panificación / Otros · 10 × 10 cm",
    widthCm: 10,
    heightCm: 10,
    provisionalOctagonCm: 1.15,
    logoMax: 0.52,
    logoMin: 0.28,
    productMax: 0.32,
    productMin: 0.2
  },
  panificacionBudines: {
    hint: "Panificación / Budines · 10 × 5 cm",
    widthCm: 10,
    heightCm: 5,
    provisionalOctagonCm: 0.85,
    logoMax: 0.36,
    logoMin: 0.2,
    productMax: 0.23,
    productMin: 0.16
  },
  panificacionCookies: {
    hint: "Panificación / Cookies · 7 × 7 cm",
    widthCm: 7,
    heightCm: 7,
    provisionalOctagonCm: 0.72,
    logoMax: 0.4,
    logoMin: 0.22,
    productMax: 0.25,
    productMin: 0.16
  }
};

const octagonSizeTable = [
  { min: 10, max: 15, size: 1.1, exclusiveMin: true },
  { min: 15, max: 20, size: 1.3 },
  { min: 20, max: 25, size: 1.4 },
  { min: 25, max: 30, size: 1.5 },
  { min: 30, max: 35, size: 1.7 },
  { min: 35, max: 40, size: 1.8 },
  { min: 40, max: 50, size: 2.0 },
  { min: 50, max: 60, size: 2.2 },
  { min: 60, max: 80, size: 2.5 },
  { min: 80, max: 100, size: 2.8 },
  { min: 100, max: 125, size: 3.1 },
  { min: 125, max: 150, size: 3.4 },
  { min: 150, max: 200, size: 3.9 },
  { min: 200, max: 250, size: 4.4 },
  { min: 250, max: 300, size: 4.8 }
];

const forms = document.querySelectorAll("form");
const fields = document.querySelectorAll("input[name], textarea[name], select[name]");
const labelTemplateField = document.querySelector("select[name='labelTemplate']");
const octagonModeField = document.querySelector("select[name='octagonMode']");
const productSurfaceField = document.querySelector("input[name='productSurface']");
const surfaceFieldWrap = document.querySelector("[data-surface-field]");
const allergensField = document.querySelector("textarea[name='alergenos']");
const nutritionRows = document.querySelector("#nutritionRows");
const octagonStrip = document.querySelector("[data-octagons]");
const stage = document.querySelector("#labelsStage");
const labelSizeHint = document.querySelector("#labelSizeHint");
const logo = document.querySelector("#brandLogo");
const logoInput = document.querySelector("input[name='logo']");
const logoFileName = document.querySelector("#logoFileName");
const logoError = document.querySelector("#logoError");
const manufacturerForm = document.querySelector("#dorso");
const dateFields = document.querySelectorAll("[data-date-mask]");
const gipField = document.querySelector("input[name='gip']");
const printMessage = document.querySelector("#printMessage");
const printBtn = document.querySelector("#printBtn");
const calcVdBtn = document.querySelector("#calcVdBtn");
const vdDashFields = document.querySelectorAll(".vd-field input[type='checkbox']");
const cropModal = document.querySelector("#cropModal");
const cropCanvas = document.querySelector("#cropCanvas");
const cropStage = document.querySelector("#cropStage");
const cropZoom = document.querySelector("#cropZoom");
const cropApplyBtn = document.querySelector("#cropApplyBtn");
const cropCancelBtns = document.querySelectorAll("#cropCancelBtn, #cropCancelBtn2");
const exportDataBtn = document.querySelector("#exportDataBtn");
const importDataBtn = document.querySelector("#importDataBtn");
const importDataInput = document.querySelector("#importDataInput");
const cropContext = cropCanvas.getContext("2d");
const cropState = {
  image: null,
  scale: 1,
  minScale: 1,
  x: 0,
  y: 0,
  dragging: false,
  startX: 0,
  startY: 0,
  startImageX: 0,
  startImageY: 0
};

function setMessage(text, tone = "error") {
  printMessage.textContent = text;
  printMessage.dataset.tone = text ? tone : "";
}

function displayNumber(value) {
  return String(value || "").replace(".", ",");
}

function nutrientValue(state, key, unit) {
  return state[`${key}Valor`] ? `${displayNumber(state[`${key}Valor`])} ${unit}` : "";
}

function dailyValue(state, key) {
  return state[`${key}VdDash`] ? "-" : displayNumber(state[`${key}VdValor`]);
}

function readState() {
  const state = [...fields].reduce((currentState, field) => {
    currentState[field.name] = field.type === "checkbox" ? field.checked : field.value;
    return currentState;
  }, {});
  state.peso = state.pesoValor ? `${displayNumber(state.pesoValor)} ${state.pesoUnidad || ""}`.trim() : "";
  state.tenor = state.tenorValor ? `${displayNumber(state.tenorValor)}%` : "";
  state.energia = state.energiaKcal || state.energiaKj ? `${displayNumber(state.energiaKcal)} kcal = ${displayNumber(state.energiaKj)} kJ` : "";
  state.energiaVd = dailyValue(state, "energia");
  state.carbohidratos = nutrientValue(state, "carbohidratos", "g");
  state.carbohidratosVd = dailyValue(state, "carbohidratos");
  state.azucares = nutrientValue(state, "azucares", "g");
  state.azucaresVd = dailyValue(state, "azucares");
  state.azucaresAnadidos = nutrientValue(state, "azucaresAnadidos", "g");
  state.azucaresAnadidosVd = dailyValue(state, "azucaresAnadidos");
  state.proteinas = nutrientValue(state, "proteinas", "g");
  state.proteinasVd = dailyValue(state, "proteinas");
  state.grasasTotales = nutrientValue(state, "grasasTotales", "g");
  state.grasasTotalesVd = dailyValue(state, "grasasTotales");
  state.grasasSaturadas = nutrientValue(state, "grasasSaturadas", "g");
  state.grasasSaturadasVd = dailyValue(state, "grasasSaturadas");
  state.grasasTrans = nutrientValue(state, "grasasTrans", "g");
  state.grasasTransVd = dailyValue(state, "grasasTrans");
  state.fibra = nutrientValue(state, "fibra", "g");
  state.fibraVd = dailyValue(state, "fibra");
  state.sodio = nutrientValue(state, "sodio", "mg");
  state.sodioVd = dailyValue(state, "sodio");
  return state;
}

function writeState(state) {
  fields.forEach((field) => {
    if (!(field.name in state) || field.type === "file") return;
    if (field.type === "checkbox") {
      field.checked = Boolean(state[field.name]);
    } else {
      field.value = state[field.name];
    }
  });
  syncDailyValueControls();
}

function syncDailyValueControls() {
  vdDashFields.forEach((field) => {
    const numberField = field.closest(".vd-field").querySelector("input[type='number']");
    numberField.disabled = field.checked;
    numberField.required = !field.checked;
  });
}

function fitText(element, max, min) {
  element.style.fontSize = `${max}cm`;
  const limit = element.parentElement.clientWidth;
  while (element.scrollWidth > limit && parseFloat(element.style.fontSize) > min) {
    element.style.fontSize = `${parseFloat(element.style.fontSize) - 0.03}cm`;
  }
}

function renderNutrition(state) {
  nutritionRows.innerHTML = nutritionLabels
    .map(([key, vdKey, label]) => `<tr><td>${label}</td><td>${escapeHtml(state[key])}</td><td>${escapeHtml(state[vdKey])}</td></tr>`)
    .join("");
}

function overflows(element, tolerance = 8) {
  return element.scrollHeight > element.clientHeight + tolerance || element.scrollWidth > element.clientWidth + tolerance;
}

function checkLabelOverflow() {
  const frontLabel = document.querySelector(".label-front");
  const frontBody = document.querySelector(".front-body");
  const backLabel = document.querySelector(".label-back");
  const frontOverflow = frontBody.scrollHeight > frontBody.clientHeight + 4 || frontBody.clientHeight < frontLabel.clientHeight * 0.35;
  const backOverflow = overflows(backLabel);
  frontLabel.classList.toggle("is-overflowing", frontOverflow);
  backLabel.classList.toggle("is-overflowing", backOverflow);
  if (!printMessage.textContent) {
    if (frontOverflow) {
      setMessage("El frente no tiene lugar suficiente: los octógonos ocupan demasiado o el texto es largo. Revisar formato o superficie.");
    } else if (backOverflow) {
      setMessage("El dorso excede el espacio disponible. Reducir texto para evitar cortes.");
    }
  }
  return { front: frontOverflow, back: backOverflow };
}

function renderOctagons(state) {
  octagonStrip.innerHTML = sealLabels
    .filter(([key]) => state[key])
    .map(([, label, file]) => `<img class="octagon-img" src="assets/${file}" alt="${label}">`)
    .join("");
}

function activeSealCount(state) {
  return sealLabels.filter(([key]) => state[key]).length;
}

function tableOctagonSize(area) {
  const row = octagonSizeTable.find(({ min, max, exclusiveMin }) => {
    const minMatches = exclusiveMin ? area > min : area >= min;
    return minMatches && area < max;
  });
  if (row) return row.size;
  if (area > 300) {
    const sealArea = area * 0.05;
    return Math.ceil(Math.sqrt(sealArea * 1.5) * 1000) / 1000;
  }
  if (area <= 10) {
    const sealArea = area * 0.15;
    return Math.ceil(Math.sqrt(sealArea * 1.5) * 1000) / 1000;
  }
  return 1.1;
}

function octagonMetrics(state, template) {
  const count = activeSealCount(state);
  if (state.octagonMode !== "normativo") {
    return {
      count,
      mode: "provisorio",
      size: template.provisionalOctagonCm
    };
  }

  const productSurface = Number(state.productSurface);
  const usesAds = count >= 2 && productSurface >= 20 && productSurface <= 300;
  const referenceArea = usesAds ? productSurface * 0.65 : productSurface;
  return {
    count,
    mode: "normativo",
    productSurface,
    referenceArea,
    usesAds,
    size: tableOctagonSize(referenceArea)
  };
}

function applyOctagonSizing(state, template) {
  const metrics = octagonMetrics(state, template);
  const maxSealsPerRow = Math.max(1, Math.floor(template.widthCm / metrics.size));
  const sealRows = Math.max(1, Math.ceil(metrics.count / maxSealsPerRow));
  stage.style.setProperty("--octagon-size", `${metrics.size}cm`);
  stage.style.setProperty("--front-top-space", `${metrics.size * sealRows + 0.18}cm`);
  return metrics;
}

function syncSurfaceField(state) {
  const isNormative = state.octagonMode === "normativo";
  surfaceFieldWrap.classList.toggle("is-hidden", !isNormative);
  productSurfaceField.required = isNormative;
  productSurfaceField.disabled = !isNormative;
}

function render() {
  const state = readState();
  const template = labelTemplates[state.labelTemplate] || labelTemplates.panificacionOtros;
  stage.dataset.template = state.labelTemplate || "panificacionOtros";
  const octagonMetrics = applyOctagonSizing(state, template);
  const normativeHint = octagonMetrics.mode === "normativo"
    ? `Superficie del envase ${displayNumber(octagonMetrics.productSurface)} cm² · ${octagonMetrics.usesAds ? `ADS ${displayNumber(octagonMetrics.referenceArea)} cm² · ` : ""}Octógonos de ${displayNumber(octagonMetrics.size)} cm`
    : `Octógonos provisorios de ${displayNumber(octagonMetrics.size)} cm`;
  labelSizeHint.textContent = state.labelTemplate
    ? `${template.hint} · ${normativeHint}`
    : "Elegir categoría y formato para comenzar";
  syncSurfaceField(state);
  document.querySelectorAll("[data-bind]").forEach((node) => {
    node.textContent = state[node.dataset.bind] || "";
  });
  document.querySelectorAll("[data-optional]").forEach((node) => {
    node.classList.toggle("is-empty", !state[node.dataset.optional]);
  });
  renderNutrition(state);
  renderOctagons(state);
  fitText(document.querySelector(".logo-block strong"), template.logoMax, template.logoMin);
  fitText(document.querySelector(".product-copy h2"), template.productMax, template.productMin);
  checkLabelOverflow();
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function activatePanel(panelId) {
  const tab = document.querySelector(`.tab[data-panel="${panelId}"]`);
  if (!tab) return;
  document.querySelectorAll(".tab, .panel").forEach((el) => el.classList.remove("is-active"));
  document.querySelectorAll(".tab").forEach((el) => el.setAttribute("aria-selected", "false"));
  tab.classList.add("is-active");
  tab.setAttribute("aria-selected", "true");
  document.querySelector(`#${panelId}`).classList.add("is-active");
}

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => activatePanel(tab.dataset.panel));
});

forms.forEach((form) => {
  const handleFormUpdate = () => {
    setMessage("");
    validateLabelTemplateField();
    validateProductSurfaceField();
    syncAllergensField();
    syncDailyValueControls();
    render();
  };
  form.addEventListener("input", handleFormUpdate);
  form.addEventListener("change", handleFormUpdate);
});

vdDashFields.forEach((field) => {
  field.addEventListener("change", syncDailyValueControls);
});

function formatDateInput(value) {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

function dateYearLimits(field) {
  return {
    min: Number(field?.dataset.minYear || 2020),
    max: Number(field?.dataset.maxYear || 2099)
  };
}

function isValidDate(value, field) {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) return false;
  const [day, month, year] = value.split("/").map(Number);
  const { min, max } = dateYearLimits(field);
  if (day < 1 || day > 31 || month < 1 || month > 12 || year < min || year > max) return false;
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

function parseDate(value, field) {
  if (!isValidDate(value, field)) return null;
  const [day, month, year] = value.split("/").map(Number);
  return new Date(year, month - 1, day);
}

function validateDateField(field) {
  field.value = formatDateInput(field.value);
  const [day = "", month = "", year = ""] = field.value.split("/");
  const { min, max } = dateYearLimits(field);
  if (!field.value) {
    field.setCustomValidity("");
  } else if (day.length === 2 && (Number(day) < 1 || Number(day) > 31)) {
    field.setCustomValidity("El día debe estar entre 01 y 31.");
  } else if (month.length === 2 && (Number(month) < 1 || Number(month) > 12)) {
    field.setCustomValidity("El mes debe estar entre 01 y 12.");
  } else if (year.length === 4 && (Number(year) < min || Number(year) > max)) {
    field.setCustomValidity(`El año debe estar entre ${min} y ${max}.`);
  } else if (!isValidDate(field.value, field)) {
    field.setCustomValidity("Usar una fecha válida en formato dd/mm/aaaa.");
  } else {
    field.setCustomValidity("");
  }
}

function validateDateRange() {
  const elaboracion = document.querySelector("input[name='fechaElaboracion']");
  const vencimiento = document.querySelector("input[name='fechaVencimiento']");
  const elaboracionDate = parseDate(elaboracion.value, elaboracion);
  const vencimientoDate = parseDate(vencimiento.value, vencimiento);
  if (elaboracionDate && vencimientoDate && vencimientoDate < elaboracionDate) {
    vencimiento.setCustomValidity("La fecha de vencimiento no puede ser anterior a la fecha de elaboración.");
  }
}

function formatGipInput(value) {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length <= 4) return digits;
  if (digits.length <= 8) return `${digits.slice(0, 4)}/${digits.slice(4)}`;
  return `${digits.slice(0, 4)}/${digits.slice(4, 8)}-${digits.slice(8)}`;
}

function validateGipField() {
  gipField.value = formatGipInput(gipField.value);
  if (!gipField.value) {
    gipField.setCustomValidity("Completar el GIP en formato 1267/2025-01.");
  } else if (!/^\d{4}\/\d{4}-(0[1-9]|[1-9][0-9])$/.test(gipField.value)) {
    gipField.setCustomValidity("Usar el formato 1267/2025-01, con registro final de 01 a 99.");
  } else {
    gipField.setCustomValidity("");
  }
}

function validateLabelTemplateField() {
  if (!labelTemplateField.value) {
    labelTemplateField.setCustomValidity("Elegir qué tipo de etiqueta se va a armar.");
  } else {
    labelTemplateField.setCustomValidity("");
  }
}

function validateProductSurfaceField() {
  syncSurfaceField(readState());
  if (octagonModeField.value !== "normativo") {
    productSurfaceField.setCustomValidity("");
    return;
  }
  const value = Number(productSurfaceField.value);
  if (!productSurfaceField.value) {
    productSurfaceField.setCustomValidity("Completar la superficie principal del envase final.");
  } else if (!Number.isFinite(value) || value <= 0) {
    productSurfaceField.setCustomValidity("La superficie del envase debe ser mayor a cero.");
  } else {
    productSurfaceField.setCustomValidity("");
  }
}

function syncAllergensField() {
  allergensField.value = allergensField.value.toUpperCase();
  if (!allergensField.value.trim()) {
    allergensField.setCustomValidity("Completar los alérgenos.");
  } else {
    allergensField.setCustomValidity("");
  }
}

function fieldLabel(field) {
  const label = field.closest("label");
  if (!label) return "un campo obligatorio";
  return [...label.childNodes]
    .filter((node) => node.nodeType === Node.TEXT_NODE)
    .map((node) => node.textContent.trim())
    .join(" ")
    .trim() || "un campo obligatorio";
}

function firstInvalidManufacturerField() {
  dateFields.forEach(validateDateField);
  validateDateRange();
  validateLabelTemplateField();
  validateProductSurfaceField();
  syncAllergensField();
  validateGipField();
  return document.querySelector(".editor form :invalid");
}

function showManufacturerValidation() {
  const invalidField = firstInvalidManufacturerField();
  if (invalidField) {
    activatePanel(invalidField.closest("form").id);
    setMessage(`Revisar «${fieldLabel(invalidField)}»: ${invalidField.validationMessage}`);
    invalidField.scrollIntoView({ block: "center", behavior: "smooth" });
    invalidField.focus({ preventScroll: true });
    invalidField.reportValidity();
    return false;
  }
  setMessage("");
  const overflow = checkLabelOverflow();
  if (overflow.front || overflow.back) {
    activatePanel(overflow.front ? "frontal" : "dorso");
    return false;
  }
  setMessage("Datos completos. Listo para imprimir.", "ok");
  return true;
}

const dailyReference = {
  energia: 2000,
  carbohidratos: 300,
  proteinas: 75,
  grasasTotales: 55,
  grasasSaturadas: 22,
  fibra: 25,
  sodio: 2400
};

function setField(name, value) {
  const field = document.querySelector(`[name='${name}']`);
  if (field) field.value = value;
}

function calculateDailyValues() {
  const state = readState();
  const kcal = Number(state.energiaKcal);
  if (state.energiaKcal !== "" && Number.isFinite(kcal)) {
    setField("energiaKj", Math.round(kcal * 4.2));
  }
  Object.entries(dailyReference).forEach(([key, reference]) => {
    if (state[`${key}VdDash`]) return;
    const amount = Number(key === "energia" ? state.energiaKcal : state[`${key}Valor`]);
    if (!Number.isFinite(amount)) return;
    setField(`${key}VdValor`, Math.round((amount / reference) * 100));
  });
  syncDailyValueControls();
  render();
  setMessage("kJ y %VD recalculados. Revisar antes de imprimir.", "ok");
}

function filenamePart(value, fallback, maxLength) {
  const clean = String(value || fallback)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return (clean || fallback).slice(0, maxLength).replace(/-$/g, "");
}

function suggestedPdfTitle() {
  const state = readState();
  const maker = filenamePart(state.elaboradoPor, "elaborador", 28);
  const product = filenamePart(state.producto, "producto", 42);
  return `${maker}-${product}`;
}

function openPrintDialog(message) {
  if (!showManufacturerValidation()) return;
  const originalTitle = document.title;
  document.title = suggestedPdfTitle();
  setMessage(message, "ok");
  window.print();
  document.title = originalTitle;
}

function drawCropCanvas() {
  if (!cropState.image) return;
  const size = cropCanvas.width;
  const drawWidth = cropState.image.naturalWidth * cropState.scale;
  const drawHeight = cropState.image.naturalHeight * cropState.scale;
  if (drawWidth <= size) {
    cropState.x = (size - drawWidth) / 2;
  } else {
    cropState.x = Math.min(0, Math.max(size - drawWidth, cropState.x));
  }
  if (drawHeight <= size) {
    cropState.y = (size - drawHeight) / 2;
  } else {
    cropState.y = Math.min(0, Math.max(size - drawHeight, cropState.y));
  }
  cropContext.clearRect(0, 0, size, size);
  cropContext.drawImage(cropState.image, cropState.x, cropState.y, drawWidth, drawHeight);
}

function openCropper(image) {
  const size = cropCanvas.width;
  const shortestSide = Math.min(image.naturalWidth, image.naturalHeight);
  if (shortestSide < 500) {
    logoError.textContent = "La imagen es menor a 500 px en uno de sus lados. Se puede usar igual, pero podria verse con menos calidad al imprimir.";
  } else {
    logoError.textContent = "";
  }
  cropState.image = image;
  cropState.minScale = Math.min(size / image.naturalWidth, size / image.naturalHeight);
  cropState.scale = cropState.minScale;
  cropState.x = (size - image.naturalWidth * cropState.scale) / 2;
  cropState.y = (size - image.naturalHeight * cropState.scale) / 2;
  cropZoom.min = cropState.minScale.toFixed(3);
  cropZoom.max = (cropState.minScale * 3).toFixed(3);
  cropZoom.value = cropState.scale;
  cropModal.classList.add("is-open");
  cropModal.setAttribute("aria-hidden", "false");
  drawCropCanvas();
}

function closeCropper() {
  cropModal.classList.remove("is-open");
  cropModal.setAttribute("aria-hidden", "true");
  cropState.image = null;
  logoInput.value = "";
}

function applyCrop() {
  logo.src = cropCanvas.toDataURL("image/png");
  logoFileName.textContent = "Logo cargado y ajustado";
  closeCropper();
}

function exportFilename(state) {
  const maker = filenamePart(state.elaboradoPor, "elaborador", 28);
  const product = filenamePart(state.producto, "producto", 42);
  return `${maker}-${product}.json`;
}

function exportLabelData() {
  const state = readState();
  const payload = {
    version: 1,
    exportedAt: new Date().toISOString(),
    fields: state,
    logoSrc: logo.src.startsWith("data:image/") ? logo.src : ""
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = exportFilename(state);
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
  setMessage("Datos guardados en un archivo .json.", "ok");
}

function applyImportedData(payload) {
  const importedFields = payload?.fields || payload;
  if (!importedFields || typeof importedFields !== "object") {
    throw new Error("Archivo inválido.");
  }
  writeState({ ...defaults, ...importedFields });
  if (payload.logoSrc && typeof payload.logoSrc === "string" && payload.logoSrc.startsWith("data:image/")) {
    logo.src = payload.logoSrc;
    logoFileName.textContent = "Logo importado";
  } else {
    logo.src = "assets/foto-de-producto.webp";
    logoFileName.textContent = "Sin imagen seleccionada";
  }
  logoInput.value = "";
  logoError.textContent = "";
  dateFields.forEach(validateDateField);
  validateDateRange();
  validateLabelTemplateField();
  validateProductSurfaceField();
  syncAllergensField();
  validateGipField();
  render();
  setMessage("Datos cargados.", "ok");
}

function importLabelData(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      applyImportedData(JSON.parse(reader.result));
    } catch (error) {
      setMessage("No se pudo abrir el archivo. Tiene que ser un .json guardado con este generador.");
    } finally {
      importDataInput.value = "";
    }
  });
  reader.readAsText(file);
}

dateFields.forEach((field) => {
  field.addEventListener("input", () => {
    dateFields.forEach(validateDateField);
    validateDateRange();
    render();
  });
  field.addEventListener("blur", () => {
    dateFields.forEach(validateDateField);
    validateDateRange();
  });
});

gipField.addEventListener("input", () => {
  validateGipField();
  activatePanel("frontal");
  setMessage("");
  render();
});
gipField.addEventListener("blur", validateGipField);

logoInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    logoError.textContent = "El archivo debe ser una imagen PNG, JPG o JPEG.";
    logoInput.value = "";
    return;
  }
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const preview = new Image();
    preview.addEventListener("load", () => {
      openCropper(preview);
    });
    preview.src = reader.result;
  });
  reader.readAsDataURL(file);
});

cropZoom.addEventListener("input", () => {
  if (!cropState.image) return;
  const size = cropCanvas.width;
  const oldScale = cropState.scale;
  const newScale = Number(cropZoom.value);
  const centerX = size / 2;
  const centerY = size / 2;
  cropState.x = centerX - ((centerX - cropState.x) / oldScale) * newScale;
  cropState.y = centerY - ((centerY - cropState.y) / oldScale) * newScale;
  cropState.scale = newScale;
  drawCropCanvas();
});

cropStage.addEventListener("pointerdown", (event) => {
  if (!cropState.image) return;
  cropState.dragging = true;
  cropState.startX = event.clientX;
  cropState.startY = event.clientY;
  cropState.startImageX = cropState.x;
  cropState.startImageY = cropState.y;
  cropStage.setPointerCapture(event.pointerId);
});

cropStage.addEventListener("pointermove", (event) => {
  if (!cropState.dragging) return;
  cropState.x = cropState.startImageX + event.clientX - cropState.startX;
  cropState.y = cropState.startImageY + event.clientY - cropState.startY;
  drawCropCanvas();
});

cropStage.addEventListener("pointerup", () => {
  cropState.dragging = false;
});

cropApplyBtn.addEventListener("click", applyCrop);
cropCancelBtns.forEach((button) => button.addEventListener("click", closeCropper));
exportDataBtn.addEventListener("click", exportLabelData);
importDataBtn.addEventListener("click", () => importDataInput.click());
importDataInput.addEventListener("change", (event) => importLabelData(event.target.files[0]));

printBtn.addEventListener("click", () => openPrintDialog("Para PDF, elegir «Guardar como PDF» en el destino de impresión."));
calcVdBtn.addEventListener("click", calculateDailyValues);

document.querySelector("#validateManufacturerBtn").addEventListener("click", showManufacturerValidation);

document.querySelector("#resetBtn").addEventListener("click", () => {
  if (!window.confirm("¿Restaurar el ejemplo? Se reemplazan todos los datos cargados. Si los necesitás, primero usá «Guardar datos».")) return;
  writeState(defaults);
  logo.src = "assets/foto-de-producto.webp";
  logoInput.value = "";
  logoFileName.textContent = "Sin imagen seleccionada";
  logoError.textContent = "";
  dateFields.forEach(validateDateField);
  validateDateRange();
  validateLabelTemplateField();
  validateProductSurfaceField();
  syncAllergensField();
  validateGipField();
  activatePanel("frontal");
  setMessage("");
  render();
});

stage.dataset.template = "panificacionOtros";
writeState(defaults);
syncDailyValueControls();
dateFields.forEach(validateDateField);
validateDateRange();
validateLabelTemplateField();
validateProductSurfaceField();
syncAllergensField();
validateGipField();
render();
