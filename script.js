import * as THREE from 'three';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.155.0/examples/jsm/loaders/GLTFLoader.js'; // Импортируем GLTFLoader


window.onload = () => {
const infoTexts = {
  "Spasskiy": "Это главный храм Спасского монастыря — первого мужского монастыря в Сибири. Построен в XVIII веке, он стал образцом сибирского барокко. Его строгий и величественный облик подчёркивает важность монастыря в духовной жизни города.",
  "Zakhariy": "Небольшая каменная церковь, построенная в конце XVIII века. Она посвящена святым Захарии и Елисавете — родителям Иоанна Предтечи. Здание отличается гармоничными пропорциями и архитектурной сдержанностью.",
  "Uspenskiy": "Один из старейших храмов Енисейска, построенный в стиле сибирского барокко. Его главный престол освящён в честь Успения Богородицы. В архитектуре сочетаются пышность декора и строгость форм.",
  "Troytskaya": "Эта церковь была частью Троицкого прихода, важного для жителей города. Её внешний вид отражает черты народного зодчества и сибирской каменной архитектуры. Здание отличается выразительным силуэтом.",
  "Bogoyavlenskiy": "Один из крупнейших и красивейших храмов города, построенный в начале XIX века. Его белокаменное здание украшено колоннами и пилястрами. Собор играл важную роль в религиозной и культурной жизни Енисейска.",
  "Iverskiy": "Монастырь был основан в XIX веке как обитель для женщин, выбравших путь служения Богу. Здесь находилась церковь и жилые корпуса. Здание отличается спокойной, уравновешенной архитектурой.",
  "Voskresenskaya": "Эта церковь занимает особое место в архитектурном ансамбле города. Её постройка связана с возрождением религиозной жизни в Енисейске в XVIII веке. Здание сочетает строгость форм с выразительными деталями.",

  "GymnasiumMale": "Одна из первых учебных организаций города, открытая в XIX веке. Здесь обучались юноши по классической программе, включающей латынь, математику и историю. Здание гимназии выполнено в стиле классицизма.",
  "GymnasiumFem": "Эта школа давала образование девушкам из состоятельных семей. Учебная программа включала языки, музыку, рукоделие и основы наук. Здание отличается аккуратной симметричной архитектурой.",
  "Typography": "В этом здании располагалась типография, где печатали книги и газеты для Енисейска и всей губернии. Типография сыграла важную роль в просвещении и распространении знаний. Архитектура здания проста и функциональна.",
  "Khamitkov": "Дом купца Хамиткова — яркий пример городской усадьбы XIX века. Здесь жили и вели хозяйство представители состоятельного сословия. Здание украшено деревянной резьбой и сохранило элементы первоначального декора.",
  "Urushev": "Каменный дом, принадлежавший купеческой семье Урушевых. Построенный в XIX веке, он служил и жилым помещением, и торговым местом. Фасад здания украшен элементами кирпичной архитектуры.",
  "Borodkin": "Усадьба купца Бородкина — характерный пример купеческой застройки Енисейска. Дом сочетает жилые и хозяйственные функции. Его архитектура отражает вкусы зажиточных горожан XIX века.",
  "Vostrotin": "Этот дом принадлежал известному горожанину Востротину. Здание интересно тем, как сочетаются жилые и складские функции. Оно хорошо передаёт атмосферу деловой части Енисейска XIX века.",
  "Voyevoda": "Один из самых старых домов города, где жил и работал царский представитель — воевода. Здание выполнено из дерева и относится к раннему этапу застройки Енисейска. Оно имеет большое историческое значение.",
  "KytmanovMuseum": "Ранее — усадьба купца Кытманова, а теперь — главный музей города. Здесь собраны предметы быта, документы, картины, рассказывающие об истории Енисейска. Архитектура здания сочетает черты классицизма и сибирского купеческого дома."
};



    // Создаем сцену, камеру и рендерер
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // Функция для проверки, мобильное ли устройство
function isMobile() {
  return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
}

// В месте установки камеры
if (isMobile()) {
  // Настраиваем камеру для мобильных — ниже и дальше
  camera.position.set(-15, 20, 20); // Пример: смещаем вниз (меньше по Y) и дальше (больше по Z)
} else {
  // Для ПК — стандартная позиция
  camera.position.set(-10, 10, 10);
}
camera.lookAt(0, 0, 0);


    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000033);
    document.body.appendChild(renderer.domElement);

    // Добавляем свет
    // Мягкий рассеянный свет
const ambientLight = new THREE.AmbientLight(0xfff4e6, 0.6); // тёплый и не слишком яркий
scene.add(ambientLight);

// Направленный "солнечный" свет
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2); // ярче и четче
directionalLight.position.set(50, 100, 50);
directionalLight.castShadow = true;
scene.add(directionalLight);


    // Добавляем плоскость
    const planeGeometry = new THREE.PlaneGeometry(30, 25);
    const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x4f463f, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);

    // Создаем сетку 10x10
    // const gridHelper = new THREE.GridHelper(100, 10, 0xffff00, 0xffff00);  // 10 — размер сетки, 10 — количество делений
    // scene.add(gridHelper);

    // Функция создания параллелепипеда с вращением
    function createBox(x, z, name, width = 1, height = 1, depth = 1, rotationY = 0, color = 0x00ff00) {
    const geometry = new THREE.BoxGeometry(width, height, depth); // создаем куб
    const material = new THREE.MeshBasicMaterial({ color: color });
    const box = new THREE.Mesh(geometry, material);
    box.position.set(x, height / 2, z);  // позиционируем на плоскости

    // Устанавливаем вращение объекта вокруг осеи Y
    box.rotation.y = rotationY;

    box.userData.name = name; // Сохраняем имя
    scene.add(box);
    return box;
    }

    const loader = new GLTFLoader();
const clickableObjects = [];

let borodkin1, typography, gymnasiumFem, gymnasiumMale, kytmanovMuseum;
let spasskiy2, uspenskiy, voyevoda, zakhariy, vostrotin;
let voskresenskaya, urushev, troytskaya, khamitkov, iverskiy, bogoyavlenskiy2;

const assignUserData = (object, name) => {
  object.traverse(child => {
    if (child.isMesh) {
      child.material.side = THREE.DoubleSide;
      child.userData.name = name;
    }
  });
};

loader.load(
  'https://cdn.jsdelivr.net/gh/krafalskaya/eniseisk-3d@main/borodkin1.glb',
  function (gltf) {
    const model = borodkin1 = gltf.scene;
    assignUserData(model, 'Borodkin');
    model.position.set(-12, 0, -6);
    scene.add(model);
model.traverse(child => {
      if (child.isMesh) {
        clickableObjects.push(child);
      }
    });  }
);

loader.load(
  'https://cdn.jsdelivr.net/gh/krafalskaya/eniseisk-3d@main/Typography.glb',
  function (gltf) {
    const model = typography = gltf.scene;
    assignUserData(model, 'Typography');
    model.position.set(-5, 0, 5);
    scene.add(model);
model.traverse(child => {
      if (child.isMesh) {
        clickableObjects.push(child);
      }
    });  }
);

loader.load(
  'https://cdn.jsdelivr.net/gh/krafalskaya/eniseisk-3d@main/gymnasiumfem.glb',
  function (gltf) {
    const model = gymnasiumFem = gltf.scene;
    assignUserData(model, 'GymnasiumFem');
    model.position.set(-7, 0, -4);
    scene.add(model);
model.traverse(child => {
      if (child.isMesh) {
        clickableObjects.push(child);
      }
    });  }
);

loader.load(
  'https://cdn.jsdelivr.net/gh/krafalskaya/eniseisk-3d@main/gymnaziummale.glb',
  function (gltf) {
    const model = gymnasiumMale = gltf.scene;
    assignUserData(model, 'GymnasiumMale');
    model.position.set(0, 0, 0);
    scene.add(model);
model.traverse(child => {
      if (child.isMesh) {
        clickableObjects.push(child);
      }
    });  }
);

loader.load(
  'https://cdn.jsdelivr.net/gh/krafalskaya/eniseisk-3d@main/kytmanovmuseum.glb',
  function (gltf) {
    const model = kytmanovMuseum = gltf.scene;
    assignUserData(model, 'KytmanovMuseum');
    model.position.set(-6, 0, 0);
    scene.add(model);
model.traverse(child => {
      if (child.isMesh) {
        clickableObjects.push(child);
      }
    });  }
);

loader.load(
  'https://cdn.jsdelivr.net/gh/krafalskaya/eniseisk-3d@main/spasskiy2.glb',
  function (gltf) {
    const model = spasskiy2 = gltf.scene;
    assignUserData(model, 'Spasskiy');
    model.position.set(10, 0, -3);
    scene.add(model);
model.traverse(child => {
      if (child.isMesh) {
        clickableObjects.push(child);
      }
    });  }
);

loader.load(
  'https://cdn.jsdelivr.net/gh/krafalskaya/eniseisk-3d@main/uspenskiy.glb',
  function (gltf) {
    const model = uspenskiy = gltf.scene;
    assignUserData(model, 'Uspenskiy');
    model.position.set(12, 0, 4);
    model.rotation.y = Math.PI;
    scene.add(model);
model.traverse(child => {
      if (child.isMesh) {
        clickableObjects.push(child);
      }
    });  }
);

loader.load(
  'https://cdn.jsdelivr.net/gh/krafalskaya/eniseisk-3d@main/voyevoda.glb',
  function (gltf) {
    const model = voyevoda = gltf.scene;
    assignUserData(model, 'Voyevoda');
    model.position.set(7, 0, 4);
    scene.add(model);
model.traverse(child => {
      if (child.isMesh) {
        clickableObjects.push(child);
      }
    });  }
);

loader.load(
  'https://cdn.jsdelivr.net/gh/krafalskaya/eniseisk-3d@main/zakhariy.glb',
  function (gltf) {
    const model = zakhariy = gltf.scene;
    assignUserData(model, 'Zakhariy');
    model.position.set(6, 0, -2);
    model.rotation.y = -Math.PI / 2;
    scene.add(model);
model.traverse(child => {
      if (child.isMesh) {
        clickableObjects.push(child);
      }
    });  }
);

loader.load(
  'https://cdn.jsdelivr.net/gh/krafalskaya/eniseisk-3d@main/vostrotin.glb',
  function (gltf) {
    const model = vostrotin = gltf.scene;
    assignUserData(model, 'Vostrotin');
    model.position.set(11, 0, 7);
    scene.add(model);
model.traverse(child => {
      if (child.isMesh) {
        clickableObjects.push(child);
      }
    });  }
);

loader.load(
  'https://cdn.jsdelivr.net/gh/krafalskaya/eniseisk-3d@main/voskresenskaya.glb',
  function (gltf) {
    const model = voskresenskaya = gltf.scene;
    assignUserData(model, 'Voskresenskaya');
    model.position.set(-11, 0, 2);
    scene.add(model);
model.traverse(child => {
      if (child.isMesh) {
        clickableObjects.push(child);
      }
    });  }
);

loader.load(
  'https://cdn.jsdelivr.net/gh/krafalskaya/eniseisk-3d@main/urushev.glb',
  function (gltf) {
    const model = urushev = gltf.scene;
    assignUserData(model, 'Urushev');
    model.position.set(4, 0, -6);
    scene.add(model);
model.traverse(child => {
      if (child.isMesh) {
        clickableObjects.push(child);
      }
    });  }
);

loader.load(
  'https://cdn.jsdelivr.net/gh/krafalskaya/eniseisk-3d@main/troytskaya.glb',
  function (gltf) {
    const model = troytskaya = gltf.scene;
    assignUserData(model, 'Troytskaya');
    model.position.set(0, 0, -10);
    scene.add(model);
model.traverse(child => {
      if (child.isMesh) {
        clickableObjects.push(child);
      }
    });  }
);

loader.load(
  'https://cdn.jsdelivr.net/gh/krafalskaya/eniseisk-3d@main/khamitkov.glb',
  function (gltf) {
    const model = khamitkov = gltf.scene;
    assignUserData(model, 'Khamitkov');
    model.position.set(0, 0, -6);
    scene.add(model);
model.traverse(child => {
      if (child.isMesh) {
        clickableObjects.push(child);
      }
    });  }
);

loader.load(
  'https://cdn.jsdelivr.net/gh/krafalskaya/eniseisk-3d@main/iverskiy.glb',
  function (gltf) {
    const model = iverskiy = gltf.scene;
    assignUserData(model, 'Iverskiy');
    model.position.set(-10, 0, 5);
    scene.add(model);
model.traverse(child => {
      if (child.isMesh) {
        clickableObjects.push(child);
      }
    });  }
);

loader.load(
  'https://cdn.jsdelivr.net/gh/krafalskaya/eniseisk-3d@main/bogoyavlenskiy2.glb',
  function (gltf) {
    const model = bogoyavlenskiy2 = gltf.scene;
    assignUserData(model, 'Bogoyavlenskiy');
    model.position.set(3, 0, 6);
    scene.add(model);
     model.traverse(child => {
      if (child.isMesh) {
        clickableObjects.push(child);
      }
    });
  }
);





    // Создаем OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.rotateSpeed = 0.7;

// Создаем Raycaster для обработки кликов
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Массив кликабельных объектов
//const clickableObjects = [yeneparkhia]; // Добавляй сюда свои модели

// Получаем ссылку на плашку
const infoBox = document.getElementById("info-box");

if (!infoBox) {
  console.error("Элемент #info-box не найден!");
  return;
}

// Обработчик кликов по странице
// Общая функция обработки взаимодействия (клик или касание)
function handleInteraction(event) {
  // Координаты взаимодействия (мышь или палец)
  const clickX = event.clientX || event.touches?.[0]?.clientX;
  const clickY = event.clientY || event.touches?.[0]?.clientY;

  if (clickX === undefined || clickY === undefined) return;

  // Проверка клика по инфобоксу
  const rect = infoBox.getBoundingClientRect();
  const clickedOnInfoBox =
    clickX >= rect.left && clickX <= rect.right &&
    clickY >= rect.top && clickY <= rect.bottom;

  if (clickedOnInfoBox) return;

  // Переводим в координаты Three.js
  mouse.x = (clickX / window.innerWidth) * 2 - 1;
  mouse.y = -(clickY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(clickableObjects);

  if (intersects.length > 0) {
  const rawObject = intersects[0].object;

  function findNamedParent(object) {
    while (object && !object.userData.name && object.parent) {
      object = object.parent;
    }
    return object;
  }

  const selectedObject = findNamedParent(rawObject);

  const name = selectedObject.userData.name || 'Без названия';
  const text = infoTexts[name] || `Информация об объекте: ${name}`;

  const objectPosition = new THREE.Vector3();
  selectedObject.getWorldPosition(objectPosition);
  const screenPosition = objectPosition.project(camera);
  const x = (screenPosition.x * 0.5 + 0.5) * window.innerWidth;
  const y = (1 - (screenPosition.y * 0.5 + 0.5)) * window.innerHeight;

  infoBox.style.display = "block";
  infoBox.innerText = text;

  // Получаем размеры плашки
  const infoWidth = infoBox.offsetWidth;
  const infoHeight = infoBox.offsetHeight;

  // Корректируем позицию по горизонтали
  let finalX = x;
  if (x + infoWidth > window.innerWidth) {
    finalX = window.innerWidth - infoWidth - 10;
  } else if (x < 10) {
    finalX = 10;
  }

  // Корректируем позицию по вертикали
  let finalY = y;
  if (y + infoHeight > window.innerHeight) {
    finalY = window.innerHeight - infoHeight - 10;
  } else if (y < 10) {
    finalY = 10;
  }

  infoBox.style.left = `${finalX}px`;
  infoBox.style.top = `${finalY}px`;

} else {
  infoBox.style.display = "none";
}

}

// Подключаем обработчики для мыши и касаний
window.addEventListener("click", handleInteraction);
window.addEventListener("touchstart", (event) => {
  // Преобразуем touch в event-like объект
  const touch = event.touches[0];
  const fakeMouseEvent = new MouseEvent("click", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  window.dispatchEvent(fakeMouseEvent);
}, { passive: true });



// Функция анимации
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

};
