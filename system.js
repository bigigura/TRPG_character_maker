/* image system */
const imageInput = document.querySelector('.imageInput');
const preview = document.querySelector('.preview');

document.querySelector('.image-picker-zone')
  .addEventListener('click', () => {
    imageInput.click();
  });

imageInput.addEventListener('change', (e) => {
  const file = e.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = (event) => {
      preview.src = event.target.result;
      preview.style.display = 'block';
    };

    reader.readAsDataURL(file);
  }
});

/* status and skills */
const statFields = [...document.querySelectorAll('input[type="number"][style*="top: 180px"]')];
const [str, con, pow, dex, , siz, int, edu] = statFields;
const statInputs = { str, con, pow, dex, siz, int, edu };
const has = input => input.value.trim() !== '';

/* skills */
const skillList = [
  { value: 0, label: '信用' },
  { value: 'dex-half', label: '回避' },
  { value: 'options', label: '近接戦闘' },
  { value: 20, label: '投擲' },
  { value: 'options', label: '射撃' },
  { value: 30, label: '応急手当' },
  { value: 1, label: '鍵開け' },
  { value: 10, label: '手さばき' },
  { value: 20, label: '聞き耳' },
  { value: 20, label: '隠密' },
  { value: 1, label: '精神分析' },
  { value: 10, label: '追跡' },
  { value: 20, label: '登攀' },
  { value: 20, label: '図書館' },
  { value: 25, label: '目星' },
  { value: 5, label: '鑑定' },
  { value: 20, label: '運転' },
  { value: 10, label: '機械修理' },
  { value: 1, label: '重機械操作' },
  { value: 5, label: '乗馬' },
  { value: 20, label: '水泳' },
  { value: 5, label: '芸術/制作' },
  { value: 1, label: '操縦' },
  { value: 20, label: '跳躍' },
  { value: 10, label: '電気修理' },
  { value: 10, label: 'ナビゲート' },
  { value: 5, label: '変装' },
  { value: 5, label: '言いくるめ' },
  { value: 10, label: '説得' },
  { value: 'edu', label: '母国語' },
  { value: 15, label: '威圧' },
  { value: 15, label: '魅惑' },
  { value: 1, label: '言語' },
  { value: 1, label: '医学' },
  { value: 5, label: 'オカルト' },
  { value: 0, label: 'クトゥルフ神話' },
  { value: 5, label: '経理' },
  { value: 1, label: '考古学' },
  { value: 5, label: 'コンピューター' },
  { value: 'options', label: '科学' },
  { value: 10, label: '心理学' },
  { value: 1, label: '人類学' },
  { value: 1, label: '電子工学' },
  { value: 10, label: '自然' },
  { value: 5, label: '法律' },
  { value: 5, label: '歴史' },
  { value: 10, label: 'サバイバル' },
  { value: 'else', label: 'その他' }
];

const detailOptions = {
    '近接戦闘': [{value:15, label: '<斧>'}, {value: 25, label: '<格闘>'}, {value:15, label: '<絞殺ひも>'}, {value:10, label: '<チェーンソー>'}, {value:20, label: '<刀剣>'}, {value:10, label: '<フレイル>'}, {value:5, label: '<むち>'}, {value:20, label: '<槍>'}],
    '射撃': [{value:10, label: '<火炎放射器>'}, {value:20, label: '<拳銃>'}, {value:15, label: '<サブマシンガン>'}, {value:10, label: '<重火器>'}, {value:15, label: '<マシンガン>'}, {value:15, label: '<弓>'}, {value:25, label: '<ライフル/ショットガン>'}],
    '科学': [{value:1, label: '<暗号学>'}, {value:1, label: '<化学>'}, {value:1, label: '<気象学>'}, {value:1, label: '<工学>'}, {value:1, label: '<植物学>'}, {value:10, label: '<数学>'}, {value:1, label: '<生物学>'}, {value:1, label: '<地質学>'}, {value:1, label: '<天文学>'}, {value:1, label: '<動物学>'}, {value:1, label: '<物理学>'}, {value:1, label: '<法医学>'}, {value:1, label: '<薬学>'}],
  };

const skillContainers = document.querySelectorAll('.skill-list');
const skillOptions = document.createDocumentFragment();
const skillsWithDetail = new Set(['近接戦闘', '射撃', '運転', '芸術/制作', '操縦', '母国語', '言語', '科学', 'サバイバル', 'その他']);
skillOptions.append(new Option('', ''));
skillList.forEach(({ value, label }) => skillOptions.append(new Option(label, value)));

function createNumberInput(Name) {
  const input = document.createElement('input');

  input.type = 'number';
  input.className = 'text left mini with_bottom_border ' + Name;

  return input;
}

function addSkillRow(container) {
  const row = document.createElement('div');
  row.className = 'skill-row';

  const select = document.createElement('select');
  select.className = 'text left mini with_bottom_border skill-select';
  select.append(skillOptions.cloneNode(true));

  const skillDetail = document.createElement('select');
  skillDetail.className = 'text left mini with_bottom_border skill-detail';
  skillDetail.style.display = 'none';
  skillDetail.style.zIndex = 2;
  skillDetail.append(new Option('', ''));

  const skillDetailelse = document.createElement('input');
  skillDetailelse.type = 'text';
  skillDetailelse.className = 'text left mini with_bottom_border skill-detail'
  skillDetailelse.style.display = 'none';
  skillDetailelse.style.zIndex = 1;
  
  const initialValue = createNumberInput('initial-value');
  initialValue.readOnly = true;

  const occupationPoints = createNumberInput('occupation-points');

  const interestPoints = createNumberInput('interest-points');

  const growthPoints = createNumberInput('growth-points');

  const totalValue = document.createElement('span');
  totalValue.className =  'text left mini with_bottom_border total-value';

  function updateDetailOptions(skillName) {
    skillDetail.replaceChildren(new Option());
    (detailOptions[skillName] || []).forEach(({ value, label }) => {
      skillDetail.appendChild(new Option(label, value));
    });
    if (select.value === 'options') skillDetail.appendChild(new Option('自由記述', 'else'));
    skillDetail.remove(0);
  }

  function changeskillDetail() {
    const isOther = skillsWithDetail.has(select.options[select.selectedIndex].textContent);
    select.classList.toggle('with-detail', isOther);
    if (select.value === 'options' && skillDetail.value === 'else') {
      skillDetail.selectedIndex = -1;
      skillDetail.classList.add('else');
      initialValue.value = '';
      skillDetailelse.style.display = '';
      skillDetailelse.value = '';
      setTimeout(() => { skillDetailelse.focus();} , 50);
    }
    else if (isOther && select.value !== 'options' && select.value !== 'else') {
      skillDetail.style.display = 'none';
      skillDetail.classList.remove('else');
      skillDetailelse.style.display = ''
      setTimeout(() => { skillDetailelse.focus();} , 50);
    }
    else if (isOther && skillDetail.value !== 'else'  && select.value !== 'else') {
      skillDetail.style.display = '';
      skillDetail.classList.remove('else');
      skillDetailelse.style.display = 'none'
    }
    else if (select.value === 'else') {
      skillDetail.style.display = 'none';
      skillDetail.classList.remove('else');
      initialValue.value = '';
      skillDetailelse.style.display = ''
      setTimeout(() => { skillDetailelse.focus();} , 50);
    }
    else {
      skillDetail.style.display = 'none';
      skillDetail.classList.remove('else');
      skillDetailelse.style.display = 'none'
    }
  }

  function updateTotal() {
    if (select.value === '') {
      initialValue.value = '';
      totalValue.textContent = '';
      return;
    }

    let initial;
    if (select.value === 'dex-half') {
      initial = has(statInputs.dex)? Math.floor(dex.value/2) : '';
    }
    else if (select.value === 'edu') {
      initial = has(statInputs.edu)? edu.value : '';
    }
    else if (select.value === 'options') {
      initial = Number(skillDetail.value);
    }
    else {
      initial = Number(select.value);
    }

    if (select.value === 'options' && skillDetail.selectedIndex === -1) {
      initialValue.readOnly = false;
    }
    else if (select.value === 'else') {
      initialValue.readOnly = false;
    }
    else {
      initialValue.value = initial;
      initialValue.readOnly = true;
    }

    totalValue.textContent = (Number(initialValue.value) || 0) + (Number(occupationPoints.value) || 0) + (Number(interestPoints.value) || 0) + (Number(growthPoints.value) || 0);
  }

  select.addEventListener('change', () => {
    if(skillsWithDetail.has(select.options[select.selectedIndex].textContent)) updateDetailOptions(select.options[select.selectedIndex].textContent);
    changeskillDetail();
    updateTotal();
  });

  skillDetail.addEventListener('change', () => {
    changeskillDetail();
    updateTotal();
  });

  Object.values(statInputs).forEach(input =>input.addEventListener('input', updateTotal));

  initialValue.addEventListener('input', updateTotal);
  occupationPoints.addEventListener('input', updateTotal);
  interestPoints.addEventListener('input', updateTotal);
  growthPoints.addEventListener('input', updateTotal);

  row.append(
    select,
    skillDetail,
    skillDetailelse,
    initialValue,
    occupationPoints,
    interestPoints,
    growthPoints,
    totalValue
  );

  container.appendChild(row);
}

skillContainers.forEach(container => {
  for (let i = 0; i < 10; i++) {
    addSkillRow(container, i);
  }
});

/* status */
function getOccupationTotal() {
  let total = 0;
  document.querySelectorAll('.occupation-points').forEach(input => {
    total += Number(input.value) || 0;
  });
  return total;
}

function getInterestTotal() {
  let total = 0;
  document.querySelectorAll('.interest-points').forEach(input => {
    total += Number(input.value) || 0;
  });
  return total;
}

const derived = Object.fromEntries(['luck','hp','mp','san','indefinite','idea','knowledge','mov','db','build','job-point','interest-point'].map(id => [id, document.getElementById(id)]));

function updateDerivedStats() {
  const { str, con, pow, dex, siz, int, edu } = Object.fromEntries(Object.entries(statInputs).map(([key, input]) => [key, Number(input.value)]));

  derived['hp'].value = has(statInputs.con) && has(statInputs.siz)? Math.floor((con + siz) / 10) : '';

  derived['mp'].value = has(statInputs.pow)? Math.floor(pow / 5) : '';

  derived['san'].value = has(statInputs.pow) ? pow + '/99' : '';

  derived['idea'].value = has(statInputs.int) ? int : '';

  derived['knowledge'].value = has(statInputs.edu) ? edu : '';

  if (has(statInputs.str) && has(statInputs.dex) && has(statInputs.siz)) {
    let mov = str < siz && dex < siz ? 7 : str > siz && dex > siz ? 9 : 8;
    derived['mov'].value = mov;
  } else {
    derived['mov'].value = '';
  }

  if (has(statInputs.str) && has(statInputs.siz)) {
    const total = str + siz;
    let db;
    let build;

    if (total <= 64) {
      db = '−2';
      build = -2;
    } else if (total <= 84) {
      db = '−1';
      build = -1;
    } else if (total <= 124) {
      db = '0';
      build = 0;
    } else if (total <= 164) {
      db = '+1D4';
      build = 1;
    } else if (total <= 204) {
      db = '+1D6';
      build = 2;
    } else {
      const tier = Math.floor((total - 125) / 80);
      const dice = Math.floor((total - 125) / 80);
      db = `+${dice}D6`;
      build = tier + 1;
    }

    derived['db'].value = db;
    derived['build'].value = build;
  } else {
    derived['db'].value = '';
    derived['build'].value = '';
  }

  derived['job-point'].value = has(statInputs.edu) ? (getOccupationTotal()) + '/' + (edu*4): '';

  derived['interest-point'].value = has(statInputs.int) ? (getInterestTotal()) + '/' + (int*2): '';
}

Object.values(statInputs).forEach(input =>
  input.addEventListener('input', updateDerivedStats)
);

document.addEventListener('input', (event) => {
  if (event.target.classList.contains('occupation-points') || event.target.classList.contains('interest-points')) {
    updateDerivedStats();
  }
});

function updateLuck() {
  const roll = () => Math.floor(Math.random() * 6) + 1;
  derived['luck'].value =
    (roll() + roll() + roll()) * 5;
}

Object.values(statInputs).forEach(input => {
  input.addEventListener('change', updateLuck);
});

function updateIndefinite() {
  const san = derived['san'].value.trim().split('/')[0];
  derived['indefinite'].value = san !== '' ? Math.floor(Number(san) * 4 / 5) : '';
}

derived['san'].addEventListener('input', updateIndefinite);
statInputs.pow.addEventListener('input', updateIndefinite);

updateDerivedStats();
derived['indefinite'].value = derived['san'].value.trim() !== '' ? Math.floor(Number(derived['san'].value) * 4 / 5) : '';

/* inport data */
const saveButton = document.getElementById('saveData');
const loadButton = document.getElementById('loadData');
const loadFile = document.getElementById('loadFile');

const imageToBase64 = () => preview.style.display === 'none' ? '' : preview.src;

saveButton.addEventListener('click', () => {
  const data = {
    inputs: [],
    image: imageToBase64(),
    luck: derived['luck'].value
  };

  document.querySelectorAll('input, select').forEach(element => {
    if (element.type === 'file') return;
    
    data.inputs.push({
      tag: element.tagName,
      type: element.type || '',
      value: element.value,

      selectedText: element.tagName === 'SELECT' && element.selectedIndex >= 0? element.options[element.selectedIndex].textContent : null,

      display: element.style.display,
      className: element.className
    });
  });

  const json = JSON.stringify(data, null, 2);

  const blob = new Blob([json], { type: 'application/json' });

  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'data.json';
  link.click();
  
  URL.revokeObjectURL(url);
});

loadButton.addEventListener('click', () => {
  loadFile.click();
});

loadFile.addEventListener('change', event => {
  const file = event.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = e => {
    try {
      const data = JSON.parse(e.target.result);

      const elements = Array.from(document.querySelectorAll('input, select')).filter(element => element.type !== 'file');

      data.inputs.forEach((item, index) => {
        const element = elements[index];
        if (!element) return;
        if (element.tagName === item.tag && element.type === item.type) {              
          if (item.tag === 'SELECT') {
            if (item.selectedText == null) {
              element.selectedIndex = -1;
            }
            else {
              const index = Array.from(element.options).findIndex(
                option => option.textContent === item.selectedText
              );

              element.selectedIndex = index;
            }
          }
          else {
            element.value = item.value ?? '';
          }
          
          element.dispatchEvent(new Event('input', { bubbles: true }));
          element.dispatchEvent(new Event('change', { bubbles: true }));

        }

        if (item.display !== undefined) {
          element.style.display = item.display;
        }

        if (item.className !== undefined) {
          element.className = item.className;
        }

        document.querySelectorAll('.skill-row').forEach(row => {
          const select = row.querySelector('.skill-select');
          const detail = row.querySelector('.skill-detail');
          const detailElse = row.querySelector('.skill-detail[type="text"]');

          if (detailElse && detailElse.value !== '') {
            detailElse.style.display = '';
          }
        });
      });

      if (data.image) {
        preview.src = data.image;
        preview.style.display = 'block';
      }
      else {
        preview.removeAttribute('src');
        preview.style.display = 'none';
      }

      updateDerivedStats();

      if (data.luck !== undefined) {
        derived['luck'].value = data.luck;
      }

      data.inputs.forEach((item, index) => {
        const element = elements[index];
        if (element && ['luck', 'hp', 'mp', 'san', 'indefinite', 'idea', 'knowledge', 'mov', 'db', 'build'].includes(element.id)) {
          element.value = item.value;
        }
      });
    }
    catch (error) {
      alert('データの読み込みに失敗しました。');
      console.error(error);
    }
  };

  reader.readAsText(file);

  loadFile.value = '';
});

document.getElementById("saveImage").addEventListener("click", async () => {

  if (preview.src) {
    try {
      await preview.decode();
    } catch (error) {
      console.warn("画像の読み込みに失敗しました", error);
    }
  }

  const canvas = await html2canvas(document.body, {
    scale: 2,
    backgroundColor: null,
    useCORS: true,
    allowTaint: false,

    width: document.documentElement.scrollWidth,
    height: 820,

    windowWidth: document.documentElement.scrollWidth,
    windowHeight: 800,

    scrollX: 0,
    scrollY: 0,

    onclone: (clonedDoc) => {
      
      clonedDoc.querySelectorAll(
        ".skill-row input.skill-detail"
      ).forEach(input => {
        if (input.value.trim() === "") {
          input.remove();
        }
      });

      clonedDoc.querySelectorAll(".skill-row").forEach(row => {
        const skillSelect = row.querySelector(".skill-select");

        if (!skillSelect || skillSelect.value.trim() === "") {
          row.style.display = "none";
        }
      });

      const clonedPreview = clonedDoc.querySelector(".preview");
      const clonedZone = clonedDoc.querySelector(".image-picker-zone");

      if (clonedPreview && clonedZone && preview.naturalWidth > 0 && preview.naturalHeight > 0) {
        const boxWidth = clonedZone.clientWidth;
        const boxHeight = clonedZone.clientHeight;

        const scale = Math.max(boxWidth / preview.naturalWidth, boxHeight / preview.naturalHeight);

        clonedPreview.style.width = (preview.naturalWidth * scale) + "px";

        clonedPreview.style.height = (preview.naturalHeight * scale) + "px";

        clonedPreview.style.maxWidth = "none";
        clonedPreview.style.maxHeight = "none";
        clonedPreview.style.flex = "none";
        clonedPreview.style.objectFit = "fill";
      }
      const originalSelects = document.querySelectorAll(".skill-row select");

      const clonedSelects = clonedDoc.querySelectorAll(".skill-row select");

      clonedSelects.forEach((select, index) => {
        const original = originalSelects[index];

        if (!original) return;

        const selectedText = original.options[original.selectedIndex]?.textContent || "";
        
        if (original.value.trim() === "" || selectedText.trim() === "") {
          select.remove();
          return;
        }

        const label = clonedDoc.createElement("div");

        label.textContent = selectedText;

        const style = getComputedStyle(select);

        [
          "position",
          "left",
          "top",
          "width",
          "height",
          "boxSizing",
          "margin",
          "padding",
          "fontFamily",
          "fontSize",
          "fontWeight",
          "lineHeight",
          "color",
          "textAlign",
          "transform",
          "backgroundColor",
          "border",
          "borderBottom"
        ].forEach(property => {
          label.style[property] = style[property];
        });

        label.style.display = "flex";
        label.style.alignItems = "center";
        label.style.whiteSpace = "nowrap";
        label.style.overflow = "hidden";

        select.replaceWith(label);


      });
      
      clonedDoc.querySelectorAll(
        ".skill-row input.skill-detail[type='text']"
      ).forEach(input => {
        const label = clonedDoc.createElement("div");
        label.textContent = input.value;

        const style = getComputedStyle(input);

        [
          "position",
          "left",
          "top",
          "width",
          "height",
          "boxSizing",
          "margin",
          "fontFamily",
          "fontSize",
          "fontWeight",
          "lineHeight",
          "color",
          "textAlign",
          "transform",
          "backgroundColor",
          "border",
          "borderBottom"
        ].forEach(property => {
          label.style[property] = style[property];
        });

        label.style.padding = "2px 4px";
        label.style.display = "flex";
        label.style.alignItems = "center";
        label.style.whiteSpace = "nowrap";
        label.style.overflow = "hidden";

        input.replaceWith(label);
      });

    }
  });
  const link = document.createElement("a");
  link.download = "キャラシ.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});
