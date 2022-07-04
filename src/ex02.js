import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// ----- 주제: 기본 Geometry 파티클

export default function example() {
    //TweenMax

    function typing () {
        const univ = document.querySelectorAll('.menu div')
        const star = document.querySelector('.star')


        for(let i =0; i < univ.length; i++){

            let title = univ[i]
            TweenMax.from(title, 1 ,{
                autoAlpha: 0,
                delay: Math.random() * i,
                ease: Power3.easeInOut
            })
        }

        TweenMax.to(star, 5, {
            autoAlpha: 0,
            top: 30,
            left: 100,
            delay: 2,
            ease: Power3.easeInOut

        })

        

    }

    typing()



	// Renderer
	const canvas = document.querySelector('#three-canvas');
	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

	// Scene
	const scene = new THREE.Scene();

	// Camera
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	camera.position.y = 1.5;
	camera.position.z = 4;
	scene.add(camera);

	// Light
	const ambientLight = new THREE.AmbientLight('white', 0.5);
	scene.add(ambientLight);

	const directionalLight = new THREE.DirectionalLight('white', 1);
	directionalLight.position.x = 1;
	directionalLight.position.z = 2;
	scene.add(directionalLight);

	// Controls
	const controls = new OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;
	

	// Mesh
	const geometry1 = new THREE.BufferGeometry();
	const count = 1000;
    const positions = new Float32Array(count * 3)

    for(let i =0; i<positions.length; i++){
        positions[i] = (Math.random() - 0.5) * 10;
    }
    geometry1.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const material1 = new THREE.PointsMaterial({
        size: 0.01,
        color: 'white',
    })

    const particles = new THREE.Points(geometry1, material1);
    scene.add(particles);


    const geometry2 = new THREE.SphereGeometry(1, 32, 32);
    const material2 = new THREE.MeshStandardMaterial({
        color: "blue"
    })

    const sphere1 = new THREE.SphereGeometry(1, 48, 48);
    const material3 = new THREE.MeshStandardMaterial({
        color: "gray"
    })

    const earth = new THREE.Mesh(sphere1, material3)

    const sphere = new THREE.Mesh(geometry2, material2)

    sphere.position.set(3, 0, 0)
    sphere.rotation.x = -Math.PI*0.5;

    scene.add(sphere, earth)

        // 그리기
	const clock = new THREE.Clock();

	function draw() {
		const delta = clock.getDelta();

		controls.update();

		renderer.render(scene, camera);
		renderer.setAnimationLoop(draw);
	}

	function setSize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.render(scene, camera);
	}

	// 이벤트
	window.addEventListener('resize', setSize);

	draw();
}
