const defaults = {
  labelTemplate: "",
  octagonMode: "provisorio",
  productSurface: "",
  marca: "ALGO DULCE",
  rubro: "REPOSTERIA",
  producto: "Alfajor relleno de dulce de leche con bano de producto de reposteria semiamargo",
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
  grasasTotalesVdValor: "19",
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
  ingredientes: "Harina de trigo 0000 enriquecida segun Ley 25630 (hierro: 30 mg/kg, acido folico: 2.2 mg/kg, tiamina (B1): 6.3 mg/kg, riboflavina (B2): 1.3 mg/kg, niacina: 13 mg/kg), manteca, azucar rubio, avena, huevo, azucar, almidon de maiz, bicarbonato de sodio, sal, canela molida.",
  alergenos: "CONTIENE AVENA, HUEVO, SULFITOS Y DERIVADOS DE TRIGO Y LECHE.",
  elaboradoPor: "Jaquelina Pecora - Jorgito",
  domicilio: "1912 - Rosario - Sta Fe",
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
  ["energia", "energiaVd", "Valor energetico"],
  ["carbohidratos", "carbohidratosVd", "Carbohidratos"],
  ["azucares", "azucaresVd", "Azucares Totales"],
  ["azucaresAnadidos", "azucaresAnadidosVd", "Azucares Anadidos"],
  ["proteinas", "proteinasVd", "Proteinas"],
  ["grasasTotales", "grasasTotalesVd", "Grasas Totales"],
  ["grasasSaturadas", "grasasSaturadasVd", "Grasas Saturadas"],
  ["grasasTrans", "grasasTransVd", "Grasas Trans"],
  ["fibra", "fibraVd", "Fibra Alimentaria"],
  ["sodio", "sodioVd", "Sodio"]
];

const sealLabels = [
  ["excesoAzucares", "Exceso en azucares", "octogono-excesoenazucares.png"],
  ["excesoGrasasTotales", "Exceso en grasas totales", "octogono-excesoengrasastotales.png"],
  ["excesoGrasasSaturadas", "Exceso en grasas saturadas", "octogono-excesoengrasassaturadas.png"],
  ["excesoSodio", "Exceso en sodio", "octogono-excesoensodio.png"],
  ["excesoCalorias", "Exceso en calorias", "octogono-excesoencalorias.png"]
];

const labelTemplates = {
  frasco: {
    hint: "Frente y dorso - Frascos - 6 cm x 7 cm",
    widthCm: 6,
    heightCm: 7,
    provisionalOctagonCm: 0.78,
    logoMax: 0.42,
    logoMin: 0.22,
    productMax: 0.24,
    productMin: 0.16
  },
  panificacionOtros: {
    hint: "Frente y dorso - Panificacion / Otros - 10 cm x 10 cm",
    widthCm: 10,
    heightCm: 10,
    provisionalOctagonCm: 1.15,
    logoMax: 0.52,
    logoMin: 0.28,
    productMax: 0.32,
    productMin: 0.2
  },
  panificacionBudines: {
    hint: "Frente y dorso - Panificacion / Budines - 10 cm x 5 cm",
    widthCm: 10,
    heightCm: 5,
    provisionalOctagonCm: 0.85,
    logoMax: 0.36,
    logoMin: 0.2,
    productMax: 0.23,
    productMin: 0.16
  },
  panificacionCookies: {
    hint: "Frente y dorso - Panificacion / Cookies - 7 cm x 7 cm",
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
const vdDashFields = document.querySelectorAll(".vd-field input[type='checkbox']");
const cropModal = document.querySelector("#cropModal");
const cropCanvas = document.querySelector("#cropCanvas");
const cropStage = document.querySelector("#cropStage");
const cropZoom = document.querySelector("#cropZoom");
const cropApplyBtn = document.querySelector("#cropApplyBtn");
const cropCancelBtns = document.querySelectorAll("#cropCancelBtn, #cropCancelBtn2");
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
  state.peso = state.pesoValor ? `${state.pesoValor} ${state.pesoUnidad || ""}`.trim() : "";
  state.tenor = state.tenorValor ? `${state.tenorValor}%` : "";
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
    ? `Superficie envase ${displayNumber(octagonMetrics.productSurface)} cm2 - ${octagonMetrics.usesAds ? `ADS ${displayNumber(octagonMetrics.referenceArea)} cm2 - ` : ""}Octogonos ${displayNumber(octagonMetrics.size)} cm`
    : `Octogonos provisorios ${displayNumber(octagonMetrics.size)} cm`;
  labelSizeHint.textContent = state.labelTemplate
    ? `${template.hint} - ${normativeHint}`
    : "Elegir categoria y formato para comenzar";
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
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function activatePanel(panelId) {
  document.querySelectorAll(".tab, .panel").forEach((el) => el.classList.remove("is-active"));
  document.querySelector(`.tab[data-panel="${panelId}"]`).classList.add("is-active");
  document.querySelector(`#${panelId}`).classList.add("is-active");
}

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => activatePanel(tab.dataset.panel));
});

forms.forEach((form) => {
  const handleFormUpdate = () => {
    printMessage.textContent = "";
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
    field.setCustomValidity("El dia debe estar entre 01 y 31.");
  } else if (month.length === 2 && (Number(month) < 1 || Number(month) > 12)) {
    field.setCustomValidity("El mes debe estar entre 01 y 12.");
  } else if (year.length === 4 && (Number(year) < min || Number(year) > max)) {
    field.setCustomValidity(`El ano debe estar entre ${min} y ${max}.`);
  } else if (!isValidDate(field.value, field)) {
    field.setCustomValidity("Usar una fecha valida en formato dd/mm/aaaa.");
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
    vencimiento.setCustomValidity("La fecha de vencimiento no puede ser anterior a la fecha de elaboracion.");
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
    labelTemplateField.setCustomValidity("Elegir que tipo de etiqueta se va a armar.");
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
    allergensField.setCustomValidity("Completar los alergenos en mayusculas.");
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
    printMessage.textContent = `Revisar ${fieldLabel(invalidField)}: ${invalidField.validationMessage}`;
    invalidField.focus();
    invalidField.closest("form").reportValidity();
    return false;
  }
  printMessage.textContent = "Datos completos.";
  return true;
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
  cropContext.fillStyle = "#f4f6f6";
  cropContext.fillRect(0, 0, size, size);
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

document.querySelector("#printBtn").addEventListener("click", () => {
  if (!showManufacturerValidation()) return;
  printMessage.textContent = "Abriendo impresion...";
  window.print();
});

document.querySelector("#validateManufacturerBtn").addEventListener("click", showManufacturerValidation);

document.querySelector("#resetBtn").addEventListener("click", () => {
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
