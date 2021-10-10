'use strict';

/* global THREE */

function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({canvas, antialias:true});

  const fov = 45;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  // var camera = new THREE.OrthographicCamera( 1000 / - 2, 1000 / 2, 500 / 2, 500 / - 2, 1, 1000 );
  camera.position.z = 40;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('grey');

  
  const color = 0xFFFFFF;
  const intensity = 1.3;
  var light = new THREE.DirectionalLight(color, intensity);

  light.position.set(-9, 2, 1);
  scene.add(light);

  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(1, -2, -4);
    scene.add(light);
  }

  const objects = [];
  const spread = 15;

  function addObject(x, y, obj) {
    obj.position.x = x * spread;
    obj.position.y = y * spread;

    scene.add(obj);
    objects.push(obj);
  }

  function createMaterial() {
    const material = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
    });

    const hue = Math.random();
    const saturation = 1;
    const luminance = .5;
    material.color.setHSL(hue, saturation, luminance);

    return material;
  }


  function addSolidGeometry(x, y, geometry, _material) {
    const mesh = new THREE.Mesh(geometry, createMaterial());
    addObject(x, y, mesh);
  }

  {
    const loader = new THREE.FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
      var geometry = new THREE.TextBufferGeometry('z i d a n', {
        font: font,
        size: 3.0,
        height: .6,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.3, 
        bevelSize: .3,
        bevelSegments: 5,
      });

      var mesh = new THREE.Mesh(geometry, createMaterial());
      geometry.computeBoundingBox();
      geometry.boundingBox.getCenter(mesh.position).multiplyScalar(-1);
      const parent = new THREE.Object3D();
      parent.add(mesh);
      addObject(0, 0, parent);

      geometry = new THREE.WireframeGeometry(new THREE.TorusKnotBufferGeometry(2.5, 0.8, 128, 50, 2, 3));
      addSolidGeometry(0,  .7, geometry);

      geometry = new THREE.OctahedronBufferGeometry(4);
      addSolidGeometry(-1.7,  0, geometry);

      geometry = new THREE.BoxGeometry(4,4,7,1,1,1);
      // addSolidGeometry(1.7,  0,  geometry);
      var material = new THREE.MeshNormalMaterial( {color: 0xffff00} );
      var boxx = new THREE.Mesh( geometry, material );
      addObject(1.7,0, boxx);

      geometry = new THREE.SphereGeometry( 2, 12, 12 );
      material = new THREE.MeshLambertMaterial( {color: 0xffff00} );
      var sphere = new THREE.Mesh( geometry, material );
      addObject(0,-.8, sphere);
    });
  }

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {
    time *= 0.001;
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    objects.forEach((obj, ndx) => {
      const speed = .5 + ndx * .05;
      const rot = time * speed;
      obj.rotation.x = rot;
      obj.rotation.y = rot;
    });

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }



  document.getElementById("light1").addEventListener("click", function() {
    console.info("KLIK");
    // light.position.set(9, 20, 30);
    scene.remove(light);
    light = new THREE.AmbientLight(color, intensity);
    scene.add(light);
  });
  
  document.getElementById("light2").addEventListener("click", function() {
    // light.position.set(-9, 2, 1);
    scene.remove(light);
    light = new THREE.HemisphereLight(color, intensity);
    scene.add(light);
  });

  document.getElementById("light3").addEventListener("click", function() {
    // light.position.set(-9, 2, 1);
    scene.remove(light);
    light = new THREE.DirectionalLight(color, intensity);
    scene.add(light);
  });

  document.getElementById("light4").addEventListener("click", function() {
    // light.position.set(-9, 2, 1);
    scene.remove(light);
    light = new THREE.PointLight(color, intensity);
    scene.add(light);
  });

  document.getElementById("light5").addEventListener("click", function() {
    // light.position.set(-9, 2, 1);
    scene.remove(light);
    light = new THREE.SpotLight(color, intensity);
    scene.add(light);
  });



  requestAnimationFrame(render);
}

main();
