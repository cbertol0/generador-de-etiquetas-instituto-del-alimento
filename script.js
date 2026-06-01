const defaults = {
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
  ingredientes: "Harina de trigo 0000 enriquecida segun Ley 25630 (hierro: 30 mg/kg, acido folico: 2.2 mg/kg, tiamina (B1): 6.3 mg/kg, riboflavina (B2): 1.3 mg/kg, niacina: 13 mg/kg), manteca, azucar rubio, avena, huevo, azucar, almidon de maiz, bicarbonato de sodio, sal, canela molida. CONTIENE AVENA, HUEVO, SULFITOS Y DERIVADOS DE TRIGO Y LECHE.",
  elaboradoPor: "Jaquelina Pecora - Jorgito",
  domicilio: "1912 - Rosario - Sta Fe",
  gip: "1497/2025",
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
  ["excesoCalorias", "Exceso en calorias", "octogono-excesoencalorias.png"],
  ["excesoSodio", "Exceso en sodio", "octogono-excesoensodio.png"]
];

const forms = document.querySelectorAll("form");
const fields = document.querySelectorAll("input[name], textarea[name], select[name]");
const nutritionRows = document.querySelector("#nutritionRows");
const octagonStrip = document.querySelector("[data-octagons]");
const stage = document.querySelector("#labelsStage");
const logo = document.querySelector("#brandLogo");
const logoInput = document.querySelector("input[name='logo']");
const logoFileName = document.querySelector("#logoFileName");
const logoError = document.querySelector("#logoError");
const manufacturerForm = document.querySelector("#dorso");
const dateFields = document.querySelectorAll("[data-date-mask]");
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

function render() {
  const state = readState();
  document.querySelectorAll("[data-bind]").forEach((node) => {
    node.textContent = state[node.dataset.bind] || "";
  });
  document.querySelectorAll("[data-optional]").forEach((node) => {
    node.classList.toggle("is-empty", !state[node.dataset.optional]);
  });
  renderNutrition(state);
  renderOctagons(state);
  fitText(document.querySelector(".logo-block strong"), 0.58, 0.32);
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

document.querySelectorAll(".view-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".view-toggle").forEach((el) => el.classList.remove("is-active"));
    button.classList.add("is-active");
    stage.dataset.view = button.dataset.view;
  });
});

forms.forEach((form) => {
  form.addEventListener("input", () => {
    printMessage.textContent = "";
    syncDailyValueControls();
    render();
  });
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

function isValidDate(value) {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) return false;
  const [day, month, year] = value.split("/").map(Number);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

function validateDateField(field) {
  field.value = formatDateInput(field.value);
  if (!field.value) {
    field.setCustomValidity("Completar la fecha en formato dd/mm/aaaa.");
  } else if (!isValidDate(field.value)) {
    field.setCustomValidity("Usar una fecha valida en formato dd/mm/aaaa.");
  } else {
    field.setCustomValidity("");
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
    validateDateField(field);
    render();
  });
  field.addEventListener("blur", () => validateDateField(field));
});

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
  render();
});

stage.dataset.view = "front";
writeState(defaults);
syncDailyValueControls();
dateFields.forEach(validateDateField);
render();
