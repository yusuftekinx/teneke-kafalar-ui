

import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
function Circle(props) {
    const ref = useRef(null)
    useFrame(() => (ref.current.rotation.x = ref.current.rotation.y += 0.01))
    return (
        <mesh ref={ref} {...props}>
            <sphereBufferGeometry args={[0.3, 20, 20]} attach="geometry" />
            <meshBasicMaterial color="red" attach="material" />
            <meshStandardMaterial color={'#608AF5'} />
        </mesh>
    )
}

export default Circle
