import * as THREE from 'three'
import {
    EffectComposer
} from 'three/addons/postprocessing/EffectComposer.js'
import {
    RenderPass
} from 'three/addons/postprocessing/RenderPass.js'
import {
    UnrealBloomPass
} from 'three/addons/postprocessing/UnrealBloomPass.js'
import {
    ShaderPass
} from 'three/addons/postprocessing/ShaderPass.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let fpsFrequency = 0;
let renderLines = [];

function main() {
    let keys = []; //存放琴键
    let locks = [false, false, false]
    const canvas = document.getElementById("content");
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas
    });

    const audio = document.getElementById("audio");
    let musicId = window.location.search.split('?')[1] || false;
    if (musicId === false) {
        alert('找不到对象：音频数据');
        window.open("/music/3d/target.html")
        return false;
    }
    if (data[musicId].id) {
        audio.src = "https://music.163.com/song/media/outer/url?id=" + data[musicId].id;
    } else if (data[musicId].source) {
        if (info.source.search("local:") != -1) {
            //本地音乐文件播放
            document.getElementById("fps").innerHTML+="○您当前所选音乐可能播放较慢或无法正常播放"
            audio.src = data[musucId].source.split('local:')[1];
        } else {
            //ifrane
            alert("暂不支持此音乐的播放")
        }
    }
    document.getElementById("content").onclick = () => {
        init();
        document.getElementById("fps").innerHTML = "";
        if (document.documentElement.RequestFullScreen) {
            document.documentElement.RequestFullScreen();
        }
        document.getElementById("content").onclick = () => {
            if (document.documentElement.RequestFullScreen) {
                document.documentElement.RequestFullScreen();
            }
        };
    }
    let analyser = null;
    let dataArray = null;
    let isPlayed = false;
    let isInit = false;
    let currentTime = null;
    audio.onplay = () => {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();

        const source = ctx.createMediaElementSource(audio);
        analyser = ctx.createAnalyser();
        analyser.fftSize = 512;
        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Float32Array(bufferLength);
        source.connect(analyser);
        analyser.connect(ctx.destination);
        isPlayed = true;
    }
    let a = null

    function audioManager() {
        if (isPlayed) {
            analyser.getFloatFrequencyData(dataArray);
            let tempSum = 0;
            let targetArray = [];
            dataArray.forEach((e, index) => {
                //tempSum = Math.max(tempSum,-e);
                tempSum -= e;
                if (index % 4 === 0) {
                    targetArray.push(tempSum / 4);
                    tempSum = 0;
                }
            })
            for (let i = 0; i < 55; ++i) {
                //keys[i].scale.y = 320 * Math.sin(Math.PI / 2 * (targetArray[i] / 55)) + 1;
                keys[i].scale.y = targetArray[i];
            }
            a = dataArray;
        }
    }

    function init() {
        audio.play();
        let mainLine = createLine([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 100, 0)]);
        let lines = [];
        let positionXZ = [{ x: -36, z: -24 }, { x: 36, z: -24 }, { x: 0, z: 36 }];
        positionXZ.forEach((e) => {
            lines.push(createLine([new THREE.Vector3(e.x, 0, e.z), new THREE.Vector3(e.x, 100, e.z)]));
        })
        positionXZ = null;
        scene.add(mainLine);
        setTimeout(() => {
            lines.forEach((e) => { scene.add(e) })
        }, 2500)
        setTimeout(() => {
            locks[0] = true;
            scene.remove(mainLine);
            lines.forEach((e) => { scene.remove(e) });
            lines = null;
            mainLine = null;
            risingLines(0, 10, 0)
        }, 5000)
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 512);
    const controls = new OrbitControls(camera, canvas);
    controls.autoRotate = true;
    controls.enabled = false;
    controls.update();

    const plane = (() => {
        const model = new THREE.PlaneGeometry(512, 512);
        const material = new THREE.MeshPhongMaterial({
            color: 0x151515,
            side: THREE.DoubleSide
        })
        return new THREE.Mesh(model, material);
    })()
    plane.rotation.x = Math.PI / 2;
    scene.add(plane);

    function createLine(points) {
        const material = new THREE.LineBasicMaterial({
            color: 0x99ccff,
            linewidth: 3
        })
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        return new THREE.Line(geometry, material);
    }

    function risingLines(x, y, z) {
        let obj = createLine([new THREE.Vector3(x, 0, z), new THREE.Vector3(x, -y, z)]);
        renderLines.push(obj);
        scene.add(obj);
    }

    {
        //环境光
        const ambientLight = new THREE.AmbientLight(0xffffff, 3);
        scene.add(ambientLight);

    }
    camera.up.set(0, 1, 0);
    camera.position.set(-60, 50, 0);
    camera.lookAt(10, 6, 0);


    const stageSys = new THREE.Object3D();
    stageSys.position.set(0, 0, 0);
    scene.add(stageSys);
    const stageRotate = new THREE.Object3D();
    stageSys.add(stageRotate);
    stageRotate.rotation.x = Math.PI / 6;
    stageRotate.position.y = 6;

    const ball = (() => {
        const model = new THREE.DodecahedronGeometry(11, 8);
        const material = new THREE.PointsMaterial({
            size: 0.3,
            color: 0x0088ff,
        })
        return new THREE.Points(model, material);
    })()
    stageSys.add(ball);
    ball.position.y = 13;
    ball.name = "ball";

    const universe = (() => {
        const model = new THREE.DodecahedronGeometry(512, 5);
        const material = new THREE.PointsMaterial({
            size: 1.2,
            color: 0xffffff
        })
        return new THREE.Points(model, material);
    })()
    stageSys.add(universe);


    //辉光图层
    const bloomLayer = new THREE.Layers();
    //Layer层级为1
    bloomLayer.set(1);

    const renderPass = new RenderPass(scene, camera);
    // bloomComposer效果合成器 产生辉光效果材质，不渲染到屏幕上
    const bloomComposer = new EffectComposer(renderer);
    bloomComposer.renderToScreen = false; // 不渲染到屏幕上
    bloomComposer.addPass(renderPass); //add Pass

    // 渲染到屏幕上的效果合成器 finalComposer 
    const finalComposer = new EffectComposer(renderer);
    finalComposer.addPass(renderPass);

    const tempMaterials = {};

    const darkMaterial = new THREE.MeshBasicMaterial({
        color: 0x000000
    });

    //添加辉光效
    const effect = new UnrealBloomPass(
        new THREE.Vector2(
            renderer.domElement.offsetWidth,
            renderer.domElement.offsetHeight),
        1, 1, 0.1)
    effect.strength = 0.8; //辉光强度
    effect.radius = 1; //辉光半径
    effect.exposure = 1; //曝光

    bloomComposer.addPass(effect);

    function darkenNonBloomed(obj) {
        //不需要辉光的转化为黑色材质，同时储存在tempMaterials内
        //判断Mesh和Layer层级
        if (obj.isPlane && bloomLayer.test(obj.layers) == false) {
            tempMaterials[obj.uuid] = obj.material;
            obj.material = darkMaterial;
        }
    }

    function restoreMaterial(obj) {
        //将临时的黑色材质转回
        if (tempMaterials[obj.uuid]) {
            obj.material = tempMaterials[obj.uuid];
            delete tempMaterials[obj.uuid];
        }
    }
    const shaderPass = new ShaderPass(
        new THREE.ShaderMaterial({
            uniforms: {
                baseTexture: {
                    value: null
                },
                bloomTexture: {
                    value: bloomComposer.renderTarget2.texture,
                },
            },
            //GLSG
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
                }
            `,
            fragmentShader: `
                uniform sampler2D baseTexture;
                uniform sampler2D bloomTexture;
                varying vec2 vUv;
                void main() {
                    gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );
                }
            `,
            defines: {},
        }),
        'baseTexture',
    );

    // 创建自定义的着色器Pass
    shaderPass.needsSwap = true;
    finalComposer.addPass(shaderPass);

    function createKeys(color) {
        const model = new THREE.BoxGeometry(0.8, 0.1, 6);
        const material = new THREE.MeshPhongMaterial({
            color
        });
        return new THREE.Mesh(model, material);
    }
    for (let i = 0; i < 55; ++i) {
        const obj = createKeys(0x80a0ff);
        obj.position.x = 20 * Math.sin(i * 2 * Math.PI / 55);
        obj.position.z = 20 * Math.cos(i * 2 * Math.PI / 55);
        obj.rotation.y = 2 * Math.PI / 55 * i;
        obj.name = 'key';
        keys.push(obj);
        scene.add(obj);
    }

    function roundLines() {
        let n = 0;
        setInterval(() => {
            let x = 32 * Math.sin(2 * Math.PI / 25 * n);
            let z = 32 * Math.cos(2 * Math.PI / 25 * n);
            let line = createLine([new THREE.Vector3(x, 0, z), new THREE.Vector3(x, 64, z)])
            scene.add(line);
            ++n;
            setTimeout(() => {
                scene.remove(line);
            }, 550)
        }, 200)
    }

    function render(time) {
        time *= 0.001; // 将时间单位变为秒

        // 实现局部辉光
        // 1. 利用 darkenNonBloomed 函数将除辉光物体外的其他物体的材质转成黑色
        scene.traverse(darkenNonBloomed);
        // 2. 用 bloomComposer 产生辉光
        bloomComposer.render();
        // 3. 将转成黑色材质的物体还原成初始材质
        scene.traverse(restoreMaterial);
        // 4. 用 finalComposer 作最后渲染
        finalComposer.render();

        audioManager();

        ball.rotation.set(time * Math.PI / 6, time * Math.PI / 6, 0);
        let scaleTrack = 0.2 * Math.sin(time) + 0.9;
        ball.scale.set(scaleTrack, scaleTrack, scaleTrack);
        universe.rotation.set(time * Math.PI / 300, time * Math.PI / 300, 0);

        controls.update();
        if (locks[0]) {
            currentTime = currentTime == null ? time : currentTime;
            time = time - currentTime;
            if (locks[2]) {
                if (stageRotate.position.y <= 25) {
                    camera.position.set(36 * Math.sin(time * 0.5), 12, 36 * Math.cos(time * 0.5));
                    camera.lookAt(0, 0, 0);
                    //controls.rotation.x = Math.PI/5;
                    stageRotate.position.y += 0.05;
                    console.log(stageRotate.position.y)
                } else {
                    locks[0] = false;
                    locks[1] = false;
                    locks[2] = false;
                    controls.autoRotateSpeed = 2.0;
                    stageRotate.remove(camera);
                    controls.autoRotate = false;
                    setTimeout(() => {
                        camera.position.set(-36, 5, 0);
                        camera.lookAt(0, 9, 0);
                        setTimeout(() => {
                            camera.position.set(-32, 25, 16);
                            camera.lookAt(0, 9, 0);
                        }, 12000)
                    }, 5000)
                }
            } else if (locks[1]) {
                camera.position.set(0, 100, 0);
                camera.lookAt(0, 0, 0);
                camera.position.y -= time * 2;
                if (camera.position.y <= 15) {
                    locks[2] = true;
                    camera.position.y = 12;
                    stageRotate.add(camera);
                    camera.lookAt(0, 0, 0);
                    controls.autoRotateSpeed = 6.0;
                    //  camera.rotation.z = Math.PI / 3;
                }
            } else {
                camera.position.x += time * 0.01;
                camera.position.y -= time * 0.005;
                if (camera.position.y <= 14) {
                    locks[1] = true;
                    roundLines();
                    alert(a)
                }
            }
        }
        ++fpsFrequency;
        //renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}
/*
setInterval(() => {
    document.getElementById("fps").innerHTML = "fps:" + fpsFrequency;
    fpsFrequency = 0;
    
}, 1000)
*/

main();

function getIdByLink() {
    let musicId = window.location.search.split('?')[1] || false;
    if (musicId == false) {
        alert('音频数据错误');
        window.open("/music/3d/target.html")
        return false;
    }
    setTimeout(() => {
        let info = data[musicId];
        if (data[musicId].id) {
            document.getElementById("audio").src = "https://music.163.com/song/media/outer/url?id=" + data[musicId].id;
            return true;
        }
        if (data[musicId].source) {
            if (info.source.search("local:") != -1) {
                //本地音乐文件播放
                document.getElementById("audio").src = data[musucId].source.split('local:')[1];
                return true;
            }
            //ifrane
            alert("暂不支持此音乐的播放")
        }
    }, 800)
    return true;
}
getIdByLink();