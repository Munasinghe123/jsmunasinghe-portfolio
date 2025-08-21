import React, { useEffect, useRef } from 'react'
import { useGraph, useFrame } from '@react-three/fiber'
import { useAnimations, useFBX, useGLTF } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'
import * as THREE from 'three'

// helper: "/" in dev, "/jsmunasinghe-portfolio/" on GitHub Pages
const withBase = (p) => `${import.meta.env.BASE_URL}${p.replace(/^\/+/, '')}`

export function Model(props) {
  const group = useRef()

  // 🔧 fixed paths
  const glbUrl = withBase('models/jbro-transformed.glb')
  const fbxUrl = withBase('models/Waving.fbx')

  const { scene } = useGLTF(glbUrl)
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)

  const { animations } = useFBX(fbxUrl)
  animations[0].name = "Dance"
  const { actions, mixer } = useAnimations(animations, group)

  const mouse = useRef(new THREE.Vector2(0, 0))
  const headBone = useRef()

  useEffect(() => {
    if (group.current) {
      const findHeadBone = () => {
        const possibleNames = ['mixamorigHead', 'Head', 'head', 'mixamorigNeck', 'Neck', 'neck']
        for (const name of possibleNames) {
          const bone = group.current.getObjectByName(name)
          if (bone && bone.isBone) return bone
        }
        let foundBone = null
        group.current.traverse((child) => {
          if (child.isBone && (child.name.toLowerCase().includes('head') || child.name.toLowerCase().includes('neck'))) {
            foundBone = child
          }
        })
        return foundBone
      }
      headBone.current = findHeadBone()
    }
  }, [nodes])

  useEffect(() => {
    const act = actions["Dance"]
    if (!act) return

    if (headBone.current) {
      const clip = act.getClip()
      const tracks = clip.tracks.filter(track => {
        const boneName = track.name.split('.')[0]
        const isRotation = track.name.includes('quaternion')
        const isHeadOrNeck =
          boneName.toLowerCase().includes('head') ||
          boneName.toLowerCase().includes('neck') ||
          boneName === 'mixamorigHead' ||
          boneName === 'mixamorigNeck'
        return !(isHeadOrNeck && isRotation)
      })

      if (tracks.length < clip.tracks.length) {
        const newClip = new THREE.AnimationClip(clip.name + '_NoHead', clip.duration, tracks)
        mixer.uncacheClip(clip)
        const newAction = mixer.clipAction(newClip)
        newAction.play()
      } else {
        act.play()
      }
    } else {
      act.play()
    }
  }, [actions, mixer])

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window
      mouse.current.x = (e.clientX / innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / innerHeight) * 2 + 1
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useFrame((_, delta) => {
    if (headBone.current) {
      const targetY = mouse.current.x * 0.6
      const targetX = -mouse.current.y * 0.4
      headBone.current.rotation.x = THREE.MathUtils.lerp(headBone.current.rotation.x, targetX, delta * 5)
      headBone.current.rotation.y = THREE.MathUtils.lerp(headBone.current.rotation.y, targetY, delta * 5)
      headBone.current.rotation.x = THREE.MathUtils.clamp(headBone.current.rotation.x, -0.5, 0.3)
      headBone.current.rotation.y = THREE.MathUtils.clamp(headBone.current.rotation.y, -0.8, 0.8)
    }
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={nodes.Hips} />
      <skinnedMesh geometry={nodes.Wolf3D_Body.geometry} material={materials.Wolf3D_Body} skeleton={nodes.Wolf3D_Body.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Outfit_Bottom.geometry} material={materials.Wolf3D_Outfit_Bottom} skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Outfit_Footwear.geometry} material={materials.Wolf3D_Outfit_Footwear} skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Outfit_Top.geometry} material={materials.Wolf3D_Outfit_Top} skeleton={nodes.Wolf3D_Outfit_Top.skeleton} />
      <skinnedMesh name="EyeLeft" geometry={nodes.EyeLeft.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary} morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences} />
      <skinnedMesh name="EyeRight" geometry={nodes.EyeRight.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary} morphTargetInfluences={nodes.EyeRight.morphTargetInfluences} />
      <skinnedMesh name="Wolf3D_Head" geometry={nodes.Wolf3D_Head.geometry} material={materials.Wolf3D_Skin} skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences} />
      <skinnedMesh name="Wolf3D_Teeth" geometry={nodes.Wolf3D_Teeth.geometry} material={materials.Wolf3D_Teeth} skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences} />
      <skinnedMesh name="Wolf3D_Beard" geometry={nodes.Wolf3D_Beard.geometry} material={materials.Wolf3D_Beard} skeleton={nodes.Wolf3D_Beard.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Beard.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Beard.morphTargetInfluences} />
    </group>
  )
}

// ✅ preload using the same base-aware path
useGLTF.preload(withBase('models/jbro-transformed.glb'))
