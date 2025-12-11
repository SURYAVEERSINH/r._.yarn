import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Petals = ({ count = 300 }) => {
    const mesh = useRef();
    const dummy = useMemo(() => new THREE.Object3D(), []);

    // Generate random positions and speeds
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const xFactor = -50 + Math.random() * 100;
            const yFactor = -50 + Math.random() * 100;
            const zFactor = -50 + Math.random() * 100;
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
        }
        return temp;
    }, [count]);

    useFrame((state) => {
        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle;

            // Update time
            t = particle.t += speed / 2;
            const a = Math.cos(t) + Math.sin(t * 1) / 10;
            const b = Math.sin(t) + Math.cos(t * 2) / 10;
            const s = Math.cos(t);

            // Update position
            particle.mx += (state.mouse.x * 1000 - particle.mx) * 0.01;
            particle.my += (state.mouse.y * 1000 - 1 - particle.my) * 0.01;

            dummy.position.set(
                (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
            );

            // Rotate petals
            dummy.rotation.set(s * 5, s * 5, s * 5);
            dummy.scale.set(s, s, s); // Pulsating size

            dummy.updateMatrix();
            mesh.current.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[null, null, count]}>
            <planeGeometry args={[0.8, 0.8]} />
            <meshBasicMaterial color="#FFC1CC" transparent opacity={0.9} side={THREE.DoubleSide} depthWrite={false} />
        </instancedMesh>
    );
};

const Background = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full z-40 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 30], fov: 75 }} gl={{ alpha: true }}>
                <Petals count={300} />
            </Canvas>
        </div>
    );
};

export default Background;
