import * as THREE from 'three';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.155.0/examples/jsm/loaders/GLTFLoader.js'; // Импортируем GLTFLoader


window.onload = () => {
const infoTexts = {
  "Borodkin": "Информация об усадьбе Бородукин...",
  "Typography": "Информация о типографии...",
  "GymnasiumFem": "Информация о женской гимназии...",
  "GymnasiumMale": "Информация о мужской гимназии...",
  "KytmanovMuseum": "Информация о музее Кытманова...",
  "Spasskiy": "Информация о Спасском соборе...",
  "Uspenskiy": "Информация об Успенском соборе...",
  "Voyevoda": "Информация о доме воеводы...",
  "Zakhariy": "Информация о Захарии...",
  "Vostrotin": "Информация о Воростроте...",
  "Voskresenskaya": "Информация о Воскресенской церкви...",
  "Urushev": "Информация об Урушеве...",
  "Troytskaya": "Информация о Троицкой церкви...",
  "Khamitkov": "Информация об усадьбе Хаметкова...",
  "Iverskiy": "Информация об Иверской церкви...",
  "Bogoyavlenskiy": "Информация о Богоявленском соборе..."
};


    // Создаем сцену, камеру и рендерер
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(-10, 10, 10);
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
    
    // Создаем параллелепипед, расположенный под углом
    //const box1 = createBox(0, 3, 'Параллелепипед 1', 5, 4, 2, Math.PI / 4); // Поворот на 45 градусов по X и Y 
    //const yeneparkhia = createBox(-5, -14, 'Енисейская Епархия', 5, 0.8, 1.6, Math.PI / 1.7, 0xff0000)
    //const preobrazhenskiy = createBox(-4, -5, 'Преображенский Собор', 4, 2, 2.5, Math.PI / 1.6, 0xff0000)
    //const nastoiatelskiy = createBox(0, -9, 'Настоятельский корпус', 2.7, 0.7, 1.4, Math.PI / 1.6, 0xff0000)
    //const zakharia = createBox(-1, -1, 'Церковь Захария и Елисаветы', 2.1, 1.5, 1.4, Math.PI / 4.6, 0xff0000)

    //const uspenskiy = createBox(0, -20, 'Успенский Собор', 1.7, 2, 3, Math.PI / 1, 0x00abff)

    // const khametkov = createBox(-6, 0, 'Усадьба Хаметкова', 1.6, 0.7, 1.6, Math.PI / 1, 0x5b00d2)
    // const urushev = createBox(-7, 11, 'Дом Урушева', 1.3, 0.5, 1.4, Math.PI / 1, 0x8744de)

    //const borodkin = createBox(-2, 10, 'Дом Бородкина', 3.1, 1, 4.7, Math.PI / 1, 0x777777)
    // const dememntiev = createBox(-1, 3, 'Дом Дементьева', 1.3, 0.6, 1.6, Math.PI / 1, 0xf46df9)
    //const femalegymn = createBox(2, 4, 'Женская Гимназия', 1.9, 0.7, 5.3, Math.PI / 1, 0x1212a9)
    // const kobychev = createBox(7, 6, 'Флигель Кобычева', 0.8, 0.5, 1.7, Math.PI / 1, 0xffff00)

    // const dom1 = createBox(7, -4, 'Чей-то дом1', 1.8, 0.5, 2.4, Math.PI / 1, 0xaf8c4f)
    // const dom2 = createBox(7, -1, 'Чей-то дом2', 1.8, 0.5, 2.4, Math.PI / 1, 0xaf8c4f)
    // const dom3 = createBox(7, 2, 'Чей-то дом3', 1.8, 0.5, 2.4, Math.PI / 1, 0xaf8c4f)
    // const dom4 = createBox(3, -15, 'Чей-то дом4', 1.8, 0.5, 2.4, Math.PI / 1, 0xaf8c4f)
    // const dom5 = createBox(3, -3, 'Чей-то дом5', 1.8, 0.5, 2.4, Math.PI / 1, 0xaf8c4f)

    // const troitskaya = createBox(-6, 5, 'Троицкая Церковь', 3.6, 1.5, 2, Math.PI / 1.7, 0xff9933)

    // const vostrotin = createBox(6, -23, 'Дом Востротина', 1.9, 0.7, 2.6, Math.PI / 1, 0x005eff)
    // const uchilistche = createBox(11, -21, 'Уездное Училище', 2.7, 0.7, 2.7, Math.PI / 1, 0xf46df9)
    // const bogoyavlenskiy = createBox(13, -14, 'Богоявленский Собор', 2.8, 3.6, 5.4, Math.PI / 1, 0x00cdff)
    //const malegymn = createBox(5, -9, 'Мужская Гимназия', 3.1, 1.4, 4.4, Math.PI / 1, 0xcd00ff)
    //const voyevoda = createBox(8, -16, 'Дом Воеводы', 1.6, 0.7, 1.8, Math.PI / 1, 0xffbc00)

    //const typography = createBox(16, 0, 'Типография Дементьева', 1.4, 0.8, 2.9, Math.PI / 1, 0x000000)
    // const makarov = createBox(12, -2, 'Дом Купца Макарова', 2.5, 0.7, 2.3, Math.PI / 1, 0x005eff)
    //const muzeum = createBox(12, 2, 'Енисейский музей-заповедник', 2.5, 0.9, 2.5, Math.PI / 1, 0xff9922)

    // const iverskiy = createBox(16, 5, 'Иверский женский монастырь', 3.4, 2, 1.7, Math.PI / 1, 0x1ee100)
    // const varvara = createBox(21, 4, 'Часовня Варвары Великомученницы', 0.5, 0.8, 0.7, Math.PI / 1, 0x1ee100)
    // const voskresenskaya = createBox(12, 8, 'Воскресенская церковь', 1.3, 4, 2.9, Math.PI / 1, 0x1ee100)

    // const iverskiy2 = createBox(6, 14, 'Иверский женский монастырь 2', 1.6, 1, 2.5, Math.PI / 1, 0x5b00d2)
    // const konovalov = createBox(2, 16, 'Усадьба Коновалова', 1.8, 0.4, 2.5, Math.PI / 1, 0x00abff)









    

    /*
    // Функция создания параллелепипеда
    function createBox(x, z, name, width = 1, height = 1, depth = 1) {
    const geometry = new THREE.BoxGeometry(width, height, depth);  // Изменили на BoxGeometry с параметрами
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const box = new THREE.Mesh(geometry, material);
    box.position.set(x, height / 2, z);  // Изменено, чтобы высота учитывалась правильно
    box.userData.name = name; // Сохраняем имя
    scene.add(box);
    return box;
    }
    */
    
    // Создаем три параллелепипеда с разными размерами
    //const box4 = createBox(0, 3, 'Параллелепипед 1', 2, 2, 3);  // Ширина 2, высота 2, глубина 3
    //const box5 = createBox(2, 4, 'Параллелепипед 2', 1, 3, 1);  // Ширина 1, высота 3, глубина 1
    //const box6 = createBox(-2, 3.5, 'Параллелепипед 3', 3, 1, 2); // Ширина 3, высота 1, глубина 2

    const loader = new GLTFLoader();
//loader.load(
  //'https://cdn.jsdelivr.net/gh/krafalskaya/eniseisk-3d@main/пробный%20дом.glb',
  //function (gltf) {
    //const model = gltf.scene;
    //model.position.set(-2, 0, -10); // Поставим сбоку от кубиков, если они в центре
    //scene.add(model);
  //},
  //undefined,
  //function (error) {
    //console.error('Ошибка загрузки модели:', error);
  //}
//);
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
    assignUserData(model, 'Бородкин');
    model.position.set(-12, 0, -6);
    scene.add(model);
    clickableObjects.push(model);
  }
);

loader.load(
  'https://cdn.jsdelivr.net/gh/krafalskaya/eniseisk-3d@main/Typography.glb',
  function (gltf) {
    const model = typography = gltf.scene;
    assignUserData(model, 'Типография');
    model.position.set(-5, 0, 5);
    scene.add(model);
    clickableObjects.push(model);
  }
);

loader.load(
  'https://cdn.jsdelivr.net/gh/krafalskaya/eniseisk-3d@main/gymnasiumfem.glb',
  function (gltf) {
    const model = gymnasiumFem = gltf.scene;
    assignUserData(model, 'Гимназия (женская)');
    model.position.set(-7, 0, -4);
    scene.add(model);
    clickableObjects.push(model);
  }
);

loader.load(
  'https://cdn.jsdelivr.net/gh/krafalskaya/eniseisk-3d@main/gymnaziummale.glb',
  function (gltf) {
    const model = gymnasiumMale = gltf.scene;
    assignUserData(model, 'Гимназия (мужская)');
    model.position.set(0, 0, 0);
    scene.add(model);
    clickableObjects.push(model);
  }
);

loader.load(
  'https://cdn.jsdelivr.net/gh/krafalskaya/eniseisk-3d@main/kytmanovmuseum.glb',
  function (gltf) {
    const model = kytmanovMuseum = gltf.scene;
    assignUserData(model, 'Музей Кытманова');
    model.position.set(-6, 0, 0);
    scene.add(model);
    clickableObjects.push(model);
  }
);

loader.load(
  'https://cdn.jsdelivr.net/gh/krafalskaya/eniseisk-3d@main/spasskiy2.glb',
  function (gltf) {
    const model = spasskiy2 = gltf.scene;
    assignUserData(model, 'Спасский');
    model.position.set(10, 0, -3);
    scene.add(model);
    clickableObjects.push(model);
  }
);

loader.load(
  'https://cdn.jsdelivr.net/gh/krafalskaya/eniseisk-3d@main/uspenskiy.glb',
  function (gltf) {
    const model = uspenskiy = gltf.scene;
    assignUserData(model, 'Успенский');
    model.position.set(12, 0, 4);
    model.rotation.y = Math.PI;
    scene.add(model);
    clickableObjects.push(model);
  }
);

loader.load(
  'https://cdn.jsdelivr.net/gh/krafalskaya/eniseisk-3d@main/voyevoda.glb',
  function (gltf) {
    const model = voyevoda = gltf.scene;
    assignUserData(model, 'Воевода');
    model.position.set(7, 0, 4);
    scene.add(model);
    clickableObjects.push(model);
  }
);

loader.load(
  'https://cdn.jsdelivr.net/gh/krafalskaya/eniseisk-3d@main/zakhariy.glb',
  function (gltf) {
    const model = zakhariy = gltf.scene;
    assignUserData(model, 'Захарий');
    model.position.set(6, 0, -2);
    model.rotation.y = -Math.PI / 2;
    scene.add(model);
    clickableObjects.push(model);
  }
);

loader.load(
  'https://cdn.jsdelivr.net/gh/krafalskaya/eniseisk-3d@main/vostrotin.glb',
  function (gltf) {
    const model = vostrotin = gltf.scene;
    assignUserData(model, 'Востротин');
    model.position.set(11, 0, 7);
    scene.add(model);
    clickableObjects.push(model);
  }
);

loader.load(
  'https://cdn.jsdelivr.net/gh/krafalskaya/eniseisk-3d@main/voskresenskaya.glb',
  function (gltf) {
    const model = voskresenskaya = gltf.scene;
    assignUserData(model, 'Воскресенская');
    model.position.set(-11, 0, 2);
    scene.add(model);
    clickableObjects.push(model);
  }
);

loader.load(
  'https://cdn.jsdelivr.net/gh/krafalskaya/eniseisk-3d@main/urushev.glb',
  function (gltf) {
    const model = urushev = gltf.scene;
    assignUserData(model, 'Урушев');
    model.position.set(4, 0, -6);
    scene.add(model);
    clickableObjects.push(model);
  }
);

loader.load(
  'https://cdn.jsdelivr.net/gh/krafalskaya/eniseisk-3d@main/troytskaya.glb',
  function (gltf) {
    const model = troytskaya = gltf.scene;
    assignUserData(model, 'Троицкая');
    model.position.set(0, 0, -10);
    scene.add(model);
    clickableObjects.push(model);
  }
);

loader.load(
  'https://cdn.jsdelivr.net/gh/krafalskaya/eniseisk-3d@main/khamitkov.glb',
  function (gltf) {
    const model = khamitkov = gltf.scene;
    assignUserData(model, 'Хаметков');
    model.position.set(0, 0, -6);
    scene.add(model);
    clickableObjects.push(model);
  }
);

loader.load(
  'https://cdn.jsdelivr.net/gh/krafalskaya/eniseisk-3d@main/iverskiy.glb',
  function (gltf) {
    const model = iverskiy = gltf.scene;
    assignUserData(model, 'Иверский');
    model.position.set(-10, 0, 5);
    scene.add(model);
    clickableObjects.push(model);
  }
);

loader.load(
  'https://cdn.jsdelivr.net/gh/krafalskaya/eniseisk-3d@main/bogoyavlenskiy2.glb',
  function (gltf) {
    const model = bogoyavlenskiy2 = gltf.scene;
    assignUserData(model, 'Богоявленский');
    model.position.set(3, 0, 6);
    scene.add(model);
    clickableObjects.push(model);
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
window.addEventListener("click", (event) => {

  // Ищем ближайшего родителя с userData.name
function findNamedParent(object) {
  while (object && !object.userData.name && object.parent) {
    object = object.parent;
  }
  return object;
}

  // Получаем размеры и позицию плашки
  const rect = infoBox.getBoundingClientRect();
  const clickX = event.clientX;
  const clickY = event.clientY;

  // Проверяем, кликнули ли по плашке
  const clickedOnInfoBox =
    clickX >= rect.left && clickX <= rect.right &&
    clickY >= rect.top && clickY <= rect.bottom;

  if (clickedOnInfoBox) {
    // Если клик по плашке — ничего не делаем (оставляем её открытой)
    return;
  }

  // Переводим координаты мыши в нормализованные координаты Three.js
  mouse.x = (clickX / window.innerWidth) * 2 - 1;
  mouse.y = -(clickY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  // Проверяем пересечение с кликабельными объектами
  const intersects = raycaster.intersectObjects(clickableObjects);

  if (intersects.length > 0) {
    const rawObject = intersects[0].object;
const selectedObject = findNamedParent(rawObject); // ← ищем родителя с userData.name

const objectPosition = new THREE.Vector3();
selectedObject.getWorldPosition(objectPosition);

const screenPosition = objectPosition.project(camera);
const x = (screenPosition.x * 0.5 + 0.5) * window.innerWidth;
const y = (1 - (screenPosition.y * 0.5 + 0.5)) * window.innerHeight;

infoBox.style.display = "block";
infoBox.style.left = `${x}px`;
infoBox.style.top = `${y}px`;

const name = selectedObject.userData.name || 'Без названия';
const text = infoTexts[name] || `Информация об объекте: ${name}`;
infoBox.innerText = text;

  } else {
    // Если клик вне объектов и вне плашки — скрываем плашку
    infoBox.style.display = "none";
  }
});


// Функция анимации
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

};
