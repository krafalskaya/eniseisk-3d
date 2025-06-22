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
    infoBox.style.display = "none";
  }
}

// Подключаем обработчики для мыши и касаний
window.addEventListener("click", handleInteraction);
window.addEventListener("touchstart", handleInteraction);



// Функция анимации
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

};
